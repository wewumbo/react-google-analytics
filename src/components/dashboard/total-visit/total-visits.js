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
var topCountriesGeo = {
  reportType: "ga",
  key: "",
  query: {
    dimensions: "ga:country",
    metrics: "ga:sessions",
    "start-date": "30daysAgo",
    "end-date": "yesterday"
  },
  chart: {
    type: "GEO"

    // options: {
    //   displayMode: 'markers'
    // }
  }
};

class TotalVisits extends React.Component {
  render() {
    return (
      <div>
        <div
          className="room-list"
          style={{ marginTop: "50px", marginBottom: "50px" }}
        >
          <Row>
            <div style={{ marginLeft: "30px", fontWeight: "bold" }}>
              Total Visits
            </div>
            <Col md="12">
              <GoogleDataChart
                views={views}
                className="col-md-12"
                config={topCountriesGeo}
              />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default TotalVisits;
