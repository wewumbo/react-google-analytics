import React from 'react';
import './rooms.scss';
import AddRatePlan from './add-rate-plan';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { setEdit } from '../../redux/rate-plans/action';
import { setList } from '../../redux/rate-plans/action';
import { setRoomCategories } from '../../redux/rate-plans/action';
import { setMealPlans } from '../../redux/rate-plans/action';

import {
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
  CardSubtitle,
  CardText,
  Button,
} from 'reactstrap';

import img1 from '../../assets/images/plus.png';

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  setEdit: (payload) => dispatch(setEdit(payload)),
  setList: (payload) => dispatch(setList(payload)),
  setRoomCategories: (payload) => dispatch(setRoomCategories(payload)),
  setMealPlans: (payload) => dispatch(setMealPlans(payload)),

});

class RatePlans extends React.Component {
  constructor(props) {
    super(props);
    this.addRoomElement = React.createRef();
    this.loadList();

  }


  async loadList() {
    const response =
      await axios.get(this.props.settings.url + "/api/get_rate_plans?api_token=88d20ed5e541d92a80c595fc414359fb047a71a3dff71bd1a0daac824ab4d6cb");

    this.props.setList(response.data.list);
    this.props.setRoomCategories(response.data.room_categories);
    this.props.setMealPlans(response.data.meal_plans);
    console.log(this.props.rate_plans.mealPlans);

  }

  resetFields() {
    this.props.setEdit({
      _id: "",
      name: "",
      room_category: "",
      base_occupancy: "",
      rack_rate: "",
      meal_plan: ""
    });
  }

  onAddNewClick = () => {
    this.resetFields();
    this.addRoomElement.current.toggle();
  };


  async onEdit(item) {

    await this.resetFields();
    await this.props.setEdit(item);
    this.addRoomElement.current.toggle();

  };

  async onDelete(id) {
    console.log(id);
    const response =
      await axios.post(this.props.settings.url + "/api/delete_rate?id=" + id + "&api_token=88d20ed5e541d92a80c595fc414359fb047a71a3dff71bd1a0daac824ab4d6cb");
    this.loadList()
  };

  render() {
    return <div>
      {/* --------------------------------------------------------------------------------*/}
      {/* Row*/}
      {/* --------------------------------------------------------------------------------*/}
      <h5 className="mb-3">Rooms</h5>
      <div className="room-list">
        <Row>
          <Col xs="12" md="3">
            <Card className="card-button" onClick={this.onAddNewClick}>
              <img src={img1} />
              <CardBody>
                <CardTitle>Add new rate plan</CardTitle>
              </CardBody>
            </Card>
          </Col>
          {this.props.rate_plans.list.map((item, index) => {
            return <Col xs="12" md="3">
              <Card className="card-room">
              <img src={(item.category.photos.length > 0) ? item.category.photos[0] : ""} />
                <CardBody>
                  <CardTitle>{(item.category != null) ? item.category.name : ""} - {item.name}</CardTitle>
                  <CardText>
                    <i className="fas fa-eye"></i>  Meal Plan - {item.meal_plan} <br />
                    <i className="fas fa-user"></i>  Base Occupancy - {item.base_occupancy} <br />
                    <i className="fas fa-eye"></i>  Rack Rate - {item.rack_rate} <br />
                  </CardText>
                  <Button onClick={this.onEdit.bind(this, item)} >Edit</Button><Button color="danger" onClick={this.onDelete.bind(this, item._id)} >Delete</Button>
                </CardBody>
              </Card>
            </Col>
          })}
        </Row>
      </div>
      <AddRatePlan
        ref={this.addRoomElement}
        boxedTheme={this.boxedTheme}
        rtl={this.rtl}
        headerPosition={this.headerPosition}
        sidebarPosition={this.sidebarPosition}
      />
    </div>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RatePlans);
