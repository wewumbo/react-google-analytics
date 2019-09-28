import React from 'react';
import './rooms.scss';
import AddRoom from './add-room';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { setRoomList, setEditRoom } from '../../redux/rooms/action';
import { setRoomAmenities } from '../../redux/rooms/action';

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
  setRoomList: (payload) => dispatch(setRoomList(payload)),
  setEditRoom: (payload) => dispatch(setEditRoom(payload)),
  setRoomAmenities: (payload) => dispatch(setRoomAmenities(payload)),
});

class Rooms extends React.Component {
  constructor(props) {
    super(props);
    this.addRoomElement = React.createRef();
    this.loadRooms();
  }

  async loadRooms() {
    const response =
      await axios.get(this.props.settings.url + "/api/get_rooms?api_token=88d20ed5e541d92a80c595fc414359fb047a71a3dff71bd1a0daac824ab4d6cb");
    this.props.setRoomList(response.data.rooms);

  }

  resetFields() {
    this.props.setEditRoom({
      name: "",
      room_view: " ",
      occupancy: "",
      size: "",
      units: "",
      amenities: [],
      photos: []
    });
  }

  onAddNewClick = () => {
    this.resetFields();
    this.addRoomElement.current.toggle();
  };


  async onRoomEdit(room) {
    await this.resetFields();
    await this.props.setEditRoom(room);

    var amenities = this.props.rooms.roomAmenities;
    this.props.rooms.roomAmenities.map((object, i) => {
      if (this.props.rooms.editRoom.amenities.lenght > 0) {
        var has = this.props.rooms.editRoom.amenities.includes(object.name);
        if (has) {
          amenities[i].checked = true;
        } else {
          amenities[i].checked = false;
        }
      } else {
        amenities[i].checked = false;
      }

    });

    this.props.setRoomAmenities(amenities);
    this.addRoomElement.current.toggle();

  };

  async onRoomDelete(id) {
    console.log(id);
    const response =
      await axios.post(this.props.settings.url + "/api/delete_room?id=" + id + "&api_token=88d20ed5e541d92a80c595fc414359fb047a71a3dff71bd1a0daac824ab4d6cb");

    this.loadRooms();
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
                <CardTitle>Add new room category</CardTitle>
              </CardBody>
            </Card>
          </Col>
          {this.props.rooms.roomList.map((room, index) => {
            return <Col xs="12" md="3">
              <Card className="card-room">
                <img src={(room.photos.length > 0) ? room.photos[0] : ""} />
                <CardBody>
                  <CardTitle>{room.name}</CardTitle>
                  <CardText>
                    <i className="fas fa-eye"></i>  Room View - {room.room_view} <br />
                    <i className="fas fa-user-plus"></i> Occupancy - {room.occupancy} <br />
                    <i className="fas fa-expand"></i> Room Size - {room.size} <br />
                    <i className="fas fa-th"></i> Num. Units - {room.units} <br />
                  </CardText>
                  <Button onClick={this.onRoomEdit.bind(this, room)} >Edit</Button><Button color="danger" onClick={this.onRoomDelete.bind(this, room._id)} >Delete</Button>
                </CardBody>
              </Card>
            </Col>
          })}
        </Row>
      </div>
      <AddRoom
        ref={this.addRoomElement}
        boxedTheme={this.boxedTheme}
        rtl={this.rtl}
        headerPosition={this.headerPosition}
        sidebarPosition={this.sidebarPosition}

      />
    </div>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Rooms);
