import React from 'react';
import './rooms.scss';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import AddEarlyBird from '../promotions/add-earlybird';
import AddSeasonal from '../promotions/add-seasonal';

import { setEdit, setList, setTypes } from '../../redux/promotions/action';

import {
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
  CardSubtitle,
  CardText,
  Button,
  Label,
  Input,
} from 'reactstrap';

import img1 from '../../assets/images/plus.png';

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  setEdit: (payload) => dispatch(setEdit(payload)),
  setList: (payload) => dispatch(setList(payload)),
  setTypes: (payload) => dispatch(setTypes(payload)),
});

class Promotions extends React.Component {
  constructor(props) {
    super(props);
    this.addElements = [];
    this.addElements['AddEarlyBird'] = React.createRef();
    this.addElements['AddSeasonal'] = React.createRef();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {
      form: { property: ''}
  };
    this.loadList();
  }

  async handleInputChange(event) {

    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({form : {promotion: value}});
    
  }


  async loadList() {
    const response =
      await axios.get(this.props.settings.url + "/api/get_promotions?api_token=88d20ed5e541d92a80c595fc414359fb047a71a3dff71bd1a0daac824ab4d6cb");

    this.props.setList(response.data.list);
    this.props.setTypes(response.data.types);
    console.log(this.props.promotions.response);

  }

  resetFields() {
    this.props.setEdit({
    });
  }

  onAddNewClick = () => {
    console.log(this.state.form.promotion);
    this.resetFields();
    console.log(this.state.form.promotion.replace(" ",""));
    try {
      this.addElements["Add"+this.state.form.promotion.replace(" ","")].current.toggle();
    } catch (error) {
      console.log("Invalid promotion type");
    }
  };


  async onEdit(item) {

    await this.resetFields();
    await this.props.setEdit(item);
    this.addElements['AddEarlyBird'].current.toggle();

  };

  async onDelete(id) {
    console.log(id);
    const response =
      await axios.post(this.props.settings.url + "/api/delete_promotion?id=" + id + "&api_token=88d20ed5e541d92a80c595fc414359fb047a71a3dff71bd1a0daac824ab4d6cb");
    this.loadList()
  };

  render() {
    return <div>
      {/* --------------------------------------------------------------------------------*/}
      {/* Row*/}
      {/* --------------------------------------------------------------------------------*/}
      <h5 className="mb-3">Rooms</h5>
      <div className="promo-list">
        <Row>
          <Col xs="12" md="3">
            <Card className="card-button">

              <div className="card-button-from">
                <Input type="select" id="promotion_type" name="promotion_type" onChange={this.handleInputChange} value={this.state.form.promotion} >
                  <option value=""  >Select meal plan</option>
                  {this.props.promotions.types.map( (item, index) => {
                    return <option value={item.name} >{item.name}</option>
                  })}
                </Input>
                <img src={img1} onClick={this.onAddNewClick} />
              </div>

              <CardBody>
                <CardTitle>Add new promotion</CardTitle>
              </CardBody>
              <CardText>
              </CardText>
            </Card>
          </Col>
          {this.props.promotions.list.map((item, index) => {
            return <Col xs="12" md="3">
              <Card className="card-room">
              <img src={item.photo} />
                <CardBody>
                  <CardTitle>{(item.name != null) ? item.name : ""} - {item.name}</CardTitle>
                  <CardText>

                  </CardText>
                  <Button onClick={this.onEdit.bind(this, item)} >Edit</Button><Button color="danger" onClick={this.onDelete.bind(this, item._id)} >Delete</Button>
                </CardBody>
              </Card>
            </Col>
          })}
        </Row>
      </div>
      <AddEarlyBird
        ref={this.addElements['AddEarlyBird']}
        boxedTheme={this.boxedTheme}
        rtl={this.rtl}
        headerPosition={this.headerPosition}
        sidebarPosition={this.sidebarPosition}
      />
    </div>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Promotions);
