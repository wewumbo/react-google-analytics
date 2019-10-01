import React from "react";

import { Row, Col } from "reactstrap";
import { GoogleDataChart } from "react-analytics-widget";

// analytics views ID
const viewID = "ga:198905915";

const views = {
  query: {
    ids: viewID, // Replace with your Google Analytics ViewID
    key: "dfdfdfdf"
  }
};

// graph 1 config
const uniquePerson = {
  reportType: "ga",
  query: {
    metrics: "ga:uniquePageviews",
    dimensions: "ga:userType",
    "start-date": "2017-01-01",
    "end-date": "yesterday"
  },
  chart: {
    type: "COLUMN",
    options: {
      // options for google charts
      // https://google-developers.appspot.com/chart/interactive/docs/gallery
      title: "Unique Visited",
      width: "100%",
      hAxis: {
        title: "Unique Visited"
      }
    }
  }
};
// graph 2 config
const totalVisit = {
  reportType: "ga",
  query: {
    dimensions: "ga:userType",
    metrics: "ga:sessions",
    "start-date": "2007-01-01",
    "end-date": "yesterday"
  },
  chart: {
    type: "COLUMN",
    options: {
      // options for google charts
      // https://google-developers.appspot.com/chart/interactive/docs/gallery
      title: "Total Visits",
      width: "100%",
      hAxis: {
        title: "Total Visits"
      }
    }
  }
};

// graph 4  config

const pageViews = {
  reportType: "ga",
  query: {
    dimensions: "ga:userType",
    metrics: "ga:pageviews",
    "start-date": "2007-01-01",
    "end-date": "yesterday"
  },
  chart: {
    type: "COLUMN",
    options: {
      // options for google charts
      // https://google-developers.appspot.com/chart/interactive/docs/gallery
      title: "Page Views",
      width: "100%",
      hAxis: {
        title: "Page Views"
      }
    }
  }
};

// graph 3 config

const bouncesView = {
  reportType: "ga",
  query: {
    dimensions: "ga:userType",
    metrics: "ga:bounces",
    "start-date": "2007-01-01",
    "end-date": "yesterday"
  },
  chart: {
    type: "COLUMN",
    options: {
      // options for google charts
      // https://google-developers.appspot.com/chart/interactive/docs/gallery
      title: "Bounces Rate",
      width: "100%",
      hAxis: {
        title: "Bounces Rate"
      }
    }
  }
};

class VisitrateView extends React.Component {
  render() {
    return (
      <div>
        <div className="room-list">
          <Row>
            <Col md="3">
              <GoogleDataChart
                views={views}
                className="col-md-12"
                config={uniquePerson}
              />
            </Col>
            <Col md="3">
              <GoogleDataChart
                views={views}
                className="col-md-12"
                config={totalVisit}
              />
            </Col>
            <Col md="3">
              <GoogleDataChart
                views={views}
                className="col-md-12"
                config={bouncesView}
              />
            </Col>
            <Col md="3">
              <GoogleDataChart
                views={views}
                className="col-md-12"
                config={pageViews}
              />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default VisitrateView;
