import React from "react";
import "../../../views/maps/vectormap.css";
import { Row, Col } from "reactstrap";
import { GoogleDataChart } from "react-analytics-widget";

// analytics views ID
const views = {
  query: {
    ids: "ga:84472028", // Replace with your Google Analytics ViewID
    key: "dfdfdfdf"
  }
};
var Browsers = {
  reportType: "ga",
  key: "",
  query: {
    dimensions: "ga:browser",
    metrics: "ga:sessions",
    "start-date": "2005-01-01",
    "end-date": "yesterday"
  },
  chart: {
    container: "chart-1-container",
    type: "PIE",
    options: {
      width: "100%",
      pieHole: 4 / 9
    }
  }
};

// query: {
//   metrics: 'ga:sessions',
//   dimensions: 'ga:country',
//   'start-date': '30daysAgo',
//   'end-date': 'yesterday',
//   'max-results': 6,
//   sort: '-ga:sessions'
// },
// chart: {
//   container: 'chart-1-container',
//   type: 'PIE',
//   options: {
//     width: '100%',
//     pieHole: 4/9
//   }
// }

class Browers extends React.Component {
  render() {
    return (
      <div>
        <div
          className="room-list"
          style={{ overflow: "scroll", maxHeight: "600px", marginTop: "50px" }}
        >
          <Row>
            <Col md="12">
              <GoogleDataChart
                views={views}
                className="col-md-12"
                config={Browsers}
              />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Browers;
