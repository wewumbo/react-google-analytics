import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { setData } from '../../redux/availability/action';

import {
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
  Input,
  CardText,
  Button,
} from 'reactstrap';

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  setData: (payload) => dispatch(setData(payload)),
});

class Avl extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      availability: {},
      rates: {},
      avaialabilityDefault: {}
    };

    this.loadList();
  }


  async loadList() {
    const response =
      await axios.post(this.props.settings.url + "/api/get_availability?api_token=88d20ed5e541d92a80c595fc414359fb047a71a3dff71bd1a0daac824ab4d6cb");

    var data = response.data;
    this.props.setData(response.data);
    console.log(this.props.availability.data.data_grid.rooms);

  }

  onClickLeft() {
    document.getElementById("ui-scroller").scrollLeft += 20;
  }

  onClickRight() {
    document.getElementById("ui-scroller").scrollLeft -= 20;
  }

  onRoomEdit() {
    console.log(this.state.availability);
    var val = this.state.availability[0]
    this.setState({ availability: this.state.availability[0] + 1 });
  }

  onClickSave() {
    var formData = new FormData();
    var avl = this.state.availability;
    var price = this.state.rates;
    formData.append('availability', JSON.stringify(avl));
    formData.append('price', JSON.stringify(price));

    formData.set('api_token', "88d20ed5e541d92a80c595fc414359fb047a71a3dff71bd1a0daac824ab4d6cb");
    //console.log(formData.getAll('availability'));
    const response =
      axios.post(this.props.settings.url + "/api/save_availability", formData, {});

  }



  handleOnAvailabilityChange(roomId, day, event) {

    var data = this.state.availability;
    if (data[roomId] == null) {
      data[roomId] = {};
    }

    data[roomId][day] = event.target.value;
    console.log(data);
    this.setState({ availability: data });
  }


  async handleOnRateChange(rateId, day, event) {

    var data = this.state.rates;

    if (data[rateId] == null) {
      data[rateId] = {};
    }
    data[rateId][day] = event.target.value;
    console.log(data);
    this.setState({ rates: data });
  }




  render() {
    return <div>
      {/* --------------------------------------------------------------------------------*/}
      {/* Row*/}
      {/* --------------------------------------------------------------------------------*/}
      <h5 className="mb-3">Availability</h5>
      <div className="zui-wrapper">
        <div className="zui-scroller" id="ui-scroller">
          <table className="zui-table">
            <thead>
              <tr>
                <th className="zui-sticky-col left-top-th">
                  <button onClick={this.onClickSave.bind(this)} class="btn  btn-dark btn-block">Save</button>
                  <a href="#" onClick={this.onClickLeft.bind(this)} id="left-button" class="btn btn-float btn-square btn-success btn-table-back"><i className="fa fa-chevron-left"></i></a>
                </th>
                {this.props.availability.data.days.map((item) => {
                  return <th className="bg-blue-grey">
                    {item[0]}<br />
                    <strong>{item[1]}</strong><br />
                    {item[2]}<br />
                    {item[3]}<br />
                  </th>
                })
                }
              </tr>
            </thead>
            <tbody>
              {this.props.availability.data.data_grid.map((category) => {
                return <React.Fragment><tr>
                  <td className="table-left-headings-1 zui-sticky-col">
                    {category.name} - (No.rooms)
                </td>
                  {this.props.availability.data.days.map((day) => {
                    return <td>
                      <div className="col-md-3 no-padding">
                        <input onChange={this.handleOnAvailabilityChange.bind(this, category._id.$oid, day[4])} defaultValue={category.availability[day[4]]} className="form-control input-table avaialability"></input>
                      </div>
                    </td>
                  })}
                </tr>
                  {category.room_rates.map((rate) => {
                    return <tr>
                      <td className="table-left-headings zui-sticky-col">{rate.name}</td>
                      {this.props.availability.data.days.map((day) => {
                        return <td>
                          <div className="col-md-3 no-padding">
                            <input onChange={this.handleOnRateChange.bind(this, rate._id.$oid, day[4])} defaultValue={rate.prices[day[4]]} class="form-control input-table"></input>
                          </div>
                        </td>
                      })}
                    </tr>
                  })}
                </React.Fragment>
              })}
              <a href="#" onClick={this.onClickRight.bind(this)} id="right-button" className="btn btn-float btn-square btn-success btn-table-forward"><i className="fa fa-chevron-right"></i></a>
            </tbody>
          </table>
        </div>
      </div>
    </div>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Avl);
