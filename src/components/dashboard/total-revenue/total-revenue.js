import React from "react";
import "../../../views/maps/vectormap.css";
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
var revenue = {
  query: {
    metrics: "ga:transactionRevenue",
    dimensions: "ga:year",
    "start-date": "2018-01-01",
    "end-date": "yesterday"
  },
  chart: {
    container: "chart-container",
    type: "COLUMN",
    options: {
      width: "100%",
      hAxis: {
        title: "Total Revenues"
      }
    }
  }
};

class TotalRevenue extends React.Component {
  render() {
    return (
      <div>
        <div className="room-list">
          <Row>
            <Col md="12">
              <GoogleDataChart
                views={views}
                className="col-md-12"
                config={revenue}
              />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default TotalRevenue;
