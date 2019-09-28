import React from 'react';
import './css.scss';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { setData } from '../../redux/availability/action';
import {
  Row,
  Col
} from 'reactstrap';

import { GoogleProvider, GoogleDataChart } from 'react-analytics-widget'

  ; (function (w, d, s, g, js, fjs) {
    g = w.gapi || (w.gapi = {})
    g.analytics = {
      q: [],
      ready: function (cb) {
        this.q.push(cb)
      }
    }
    js = d.createElement(s)
    fjs = d.getElementsByTagName(s)[0]
    js.src = "https://apis.google.com/js/platform.js"
    fjs.parentNode.insertBefore(js, fjs)
    js.onload = function () {
      g.load("analytics")
    }
  })(window, document, "script")



// App credential in the google developer console
var CLIENT_ID = "903248131682-lma81d5fvsmjuch17tca5lqkpgv8su52.apps.googleusercontent.com"

// graph 1 config
const last30days = {
  reportType: "ga",
  query: {
    dimensions: "ga:date",
    metrics: "ga:pageviews",
    "start-date": "30daysAgo",
    "end-date": "yesterday"
  },
  chart: {
    type: "LINE",
    options: {
      // options for google charts
      // https://google-developers.appspot.com/chart/interactive/docs/gallery
      title: "Last 30 days visitor trends",
      width: '100%',
    }
  }
}

// graph 2 config
const last7days = {
  reportType: "ga",
  query: {
    dimensions: "ga:date",
    metrics: "ga:pageviews",
    "start-date": "7daysAgo",
    "end-date": "yesterday"
    // filters: "ga:source==tamarindlake.lk"
  },
  chart: {
    type: "LINE",
    options: {
      title: "Last 7 days visitor trends",
      width: '100%',
    }
  }
}

var topCountries = {
  reportType: "ga",
  query: {
    metrics: 'ga:sessions',
    // filters: "ga:source==tamarindlake.lk",
    dimensions: 'ga:country',
    'start-date': '30daysAgo',
    'end-date': 'yesterday',
    'max-results': 6,
    sort: '-ga:sessions'
  },
  chart: {
    container: 'chart-1-container',
    type: 'PIE',
    options: {
      title: "Last 30 days",
      width: '100%',
      pieHole: 4 / 9
    }
  }
};

var topCountriesGeo = {
  reportType: "ga",
  key: "",
  query: {
    'dimensions': 'ga:country',
    'metrics': 'ga:sessions',
    'start-date': '30daysAgo',
    'end-date': 'yesterday',
  },
  chart: {
    type: 'GEO',
    // options: {
    //   displayMode: 'markers'
    // }
  }
};

// analytics views ID
const views = {
  query: {
    ids: "ga:84472028", // Replace with your Google Analytics ViewID
    key: "dfdfdfdf",
  }
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  setData: (payload) => dispatch(setData(payload)),
});

class Availability extends React.Component {
  componentDidMount = () => {
    //Run command: php -S localhost:8088 -t ./ first with PHP source including
    const request = new Request('http://localhost:8088', {
      method: 'GET'
    });
    fetch(request)
      .then(response => response.json())
      .then(({access_token}) => {
        console.log({access_token});
        this.setState({access_token});
      });
  }

  constructor(props) {
    super(props);
    this.state = {
      access_token: ''
    };
  }

  render() {
    return <div>
      <div className="room-list">
        
      <GoogleProvider accessToken={this.state.access_token}>
      
        <Row>
          <Col md="12">
            <GoogleDataChart views={views} className="col-md-12" config={last30days} /> 
          </Col>
          <Col md="6">
            <GoogleDataChart views={views} config={last7days} />
          </Col>
          <Col md="6">
            <GoogleDataChart views={views} config={topCountries} />
          </Col>
          <Col md="12">
            <GoogleDataChart views={views} className="col-md-12" config={topCountriesGeo} />
          </Col>
        </Row>
      </GoogleProvider>
      </div>
    </div>
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Availability);
