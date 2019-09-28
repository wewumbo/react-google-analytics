import React from 'react';
import { connect } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { withRouter } from "react-router-dom";
import classnames from 'classnames';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import axios from 'axios';
import { setProperty } from '../../redux/property/action';
import { setPropertyFacilities } from '../../redux/property/action';
import { setCountries } from '../../redux/settings/action';
import { setStorageUrl } from '../../redux/settings/action';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

import {
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  CustomInput
} from 'reactstrap';


const mapStateToProps = state => ({
  ...state
});

const mapStyles = {
  width: '95%',
  height: '800px',
};

const mapDispatchToProps = dispatch => ({
  setProperty: (payload) => dispatch(setProperty(payload)),
  setCountries: (payload) => dispatch(setCountries(payload)),
  setPropertyFacilities: (payload) => dispatch(setPropertyFacilities(payload)),
  setStorageUrl: (payload) => dispatch(setStorageUrl(payload)),
});

var formData;

class MyProperty extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showController: false,
      'activeTab': '1',
      form: {}
    };
    this.formData = new FormData();

    this.handleInputChange = this.handleInputChange.bind(this);
    this.save = this.save.bind(this);
    this.loadData();

  }

  async loadData() {
    var formData = new FormData();
    formData.append('api_token', "88d20ed5e541d92a80c595fc414359fb047a71a3dff71bd1a0daac824ab4d6cb");

    const response =
      await axios.post(this.props.settings.url + "/api/get_property", formData, {}
      );
    this.props.setProperty(response.data.property);
    this.props.setPropertyFacilities(response.data.facilities);
    this.props.setCountries(response.data.countries);
    this.props.setStorageUrl(response.data.storage_url)
  }


  async save() {

    this.formData.append('api_token', "88d20ed5e541d92a80c595fc414359fb047a71a3dff71bd1a0daac824ab4d6cb");
    this.formData.append('_id', this.props.rate_plans.edit._id);

    const response =
      await axios.post(this.props.settings.url + "/api/save_property", this.formData, {}
      );

    this.setState(response.data);
  }

  handleInputChange(event) {

    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    const name = target.name;
    const item = this.props.property.edit;
    item[name] = value;
    this.props.setEdit(item);
    this.formData.append(name, value)
    //console.log(this.props.property.edit);

  }

  async removeImage(image) {


  }

  componentDidMount() {
    window.addEventListener("load", this.defaultSettings);
  }

  showTab(tab) {
    this.setState({
      'activeTab': tab
    });
  }

  render() {
    return (

      <PerfectScrollbar>
        <Row>
          {/*--------------------------------------------------------------------------------*/}
          {/* Ordinary Form                                                                  */}
          {/*--------------------------------------------------------------------------------*/}
          <Col md="12">
            <Card>
              <CardTitle className="bg-light border-bottom p-3 mb-0">
                <i className="mdi mdi-book mr-2"></i>
                My Property
              </CardTitle>
              <CardBody>
                <Nav tabs>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        'active': this.state.activeTab === '1'
                      })}
                      onClick={() => {
                        this.showTab('1');
                      }}
                    >
                      Basic Details
                      </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        'active': this.state.activeTab === '2'
                      })}
                      onClick={() => {
                        this.showTab('2');
                      }}
                    >
                      Facilities
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        'active': this.state.activeTab === '3'
                      })}
                      onClick={() => {
                        this.showTab('3');
                      }}
                    >
                      Property Photos
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        'active': this.state.activeTab === '4'
                      })}
                      onClick={() => {
                        this.showTab('4');
                      }}
                    >
                      Other Phots
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        'active': this.state.activeTab === '5'
                      })}
                      onClick={() => {
                        this.showTab('5');
                      }}
                    >
                      Map
                    </NavLink>
                  </NavItem>
                </Nav>
                <Form>
                  <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                      <Row>
                        <Col md="4">
                          <FormGroup>
                            <Label>Property Code</Label>
                            <Input type="text" name="name" id="name" readOnly onChange={this.handleInputChange} defaultValue={this.props.property.details.property_code} />
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <FormGroup>
                            <Label>Property Name</Label>
                            <Input type="text" name="name" id="name" onChange={this.handleInputChange} defaultValue={this.props.property.details.property_name} />
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <FormGroup>
                            <Label>Website</Label>
                            <Input type="text" name="name" id="name" onChange={this.handleInputChange} defaultValue={this.props.property.details.website} />
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <FormGroup>
                            <Label>Address Line 1</Label>
                            <Input type="text" name="name" id="name" onChange={this.handleInputChange} defaultValue={this.props.property.details.address_line_1} />
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <FormGroup>
                            <Label>Address Line 2</Label>
                            <Input type="text" name="name" id="name" onChange={this.handleInputChange} defaultValue={this.props.property.details.address_line_2} />
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <FormGroup>
                            <Label>City</Label>
                            <Input type="text" name="name" id="name" onChange={this.handleInputChange} defaultValue={this.props.property.details.city} />
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <FormGroup>
                            <Label>Country</Label>
                            <Input type="select" id="country" name="country" onChange={this.handleInputChange} value={this.props.property.details.country}>
                              <option value=" "  >Select view</option>
                              {this.props.settings.countries.map(function (view, i) {
                                return <option value={view.country_name} >{view.country_name}</option>
                              })}
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <FormGroup>
                            <Label>Posta/Zip Code</Label>
                            <Input type="text" name="name" id="name" onChange={this.handleInputChange} defaultValue={this.props.property.details.postal_zip_code} />
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <FormGroup>
                            <Label>Contact No</Label>
                            <Input type="text" name="name" id="name" onChange={this.handleInputChange} defaultValue={this.props.property.details.contact_no} />
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <FormGroup>
                            <Label>Email</Label>
                            <Input type="text" name="name" id="name" onChange={this.handleInputChange} defaultValue={this.props.property.details.email_address} />
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <FormGroup>
                            <Label>Map GPS Coordinates</Label>
                            <Input type="text" name="name" id="name" onChange={this.handleInputChange} defaultValue={this.props.property.details.map_cordinate} />
                          </FormGroup>
                        </Col>
                        <Col md="12">
                          <FormGroup>
                            <Label>Description</Label>
                            <Input type="text" name="name" id="name" onChange={this.handleInputChange} defaultValue={this.props.property.details.description} />
                          </FormGroup>
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="2">
                      <Form inline>
                        {this.props.property.facilities.map((object, i) => {
                          return <Col xs="6" sm="4">
                            <div className="p-2 left">
                              <CustomInput type="checkbox" name={'amenities' + i} id={'amenities' + i} label={object.name} value={object.name} onChange={this.handleCheckBoxChange} checked={object.checked} />
                            </div>
                          </Col>
                        })}
                      </Form>
                    </TabPane>
                    <TabPane tabId="3">
                      <FilePond allowMultiple={true} name="photo[]" ref={ref => (this.pond = ref)}
                        onupdatefiles={(fileItems) => {
                          this.formData.delete('photos[]');
                          fileItems.map((fileItem) => this.formData.append('photos[]', fileItem.file));
                        }}
                      />
                      <div className="image-list-small-edit">
                        <Row>
                          {
                            Object.values(Object.values(this.props.property.details.photo)).map((image, i) => {
                              return <Col xs="12" md="6">
                                <Card>
                                  <Button className="center-delete-button" color="danger" onClick={this.removeImage.bind(this, image)}>Remove</Button>
                                  <img src={this.props.settings.storageUrl + "/" + image} />
                                </Card>
                              </Col>
                            })}
                        </Row>
                      </div>
                    </TabPane>
                    <TabPane tabId="4">

                      <div className="image-list-small-edit-v1">
                        <Row>
                          <Col xs="12" md="6">
                            <Card>
                              <FilePond allowMultiple={false} name="logo_photo[]" ref={ref => (this.pond = ref)}
                                onupdatefiles={(fileItems) => {
                                  // Set current file objects to this.state
                                  this.formData.delete('logo_photo[]');
                                  fileItems.map((fileItem) => this.formData.append('logo_photo[]', fileItem.file));
                                }}
                              />
                              <div className="logo-thumb">
                                <img src={this.props.settings.storageUrl + "/" + this.props.property.details.logo} />
                              </div>
                              <Button className="center-delete-button" color="danger" onClick={this.removeImage.bind(this, this.props.property.details.logo)}>Remove</Button>
                              <img className="logo" src={this.props.settings.storageUrl + "/" + this.props.property.details.logo} />
                            </Card>
                          </Col>
                          {/* 
                          <Col xs="12" md="6">
                            <Card>
                              <FilePond allowMultiple={false} name="map_photo[]" ref={ref => (this.pond = ref)}
                                onupdatefiles={(fileItems) => {
                                  // Set current file objects to this.state
                                  this.formData.delete('map_photo[]');
                                  fileItems.map((fileItem) => this.formData.append('map_photo[]', fileItem.file));
                                }}
                              />
                              <Button className="center-delete-button" color="danger" onClick={this.removeImage.bind(this, this.props.property.details.logo)}>Remove</Button>
                              <img className="logo" src={this.props.settings.storageUrl + "/" + this.props.property.details.logo} />
                            </Card>
                          </Col>
                          */}
                        </Row>
                      </div>
                    </TabPane>
                    <TabPane tabId="5">
                      <div style={mapStyles}>
                        <Map
                          google={this.props.google}
                          zoom={8}
                          style={mapStyles}
                          initialCenter={{ lat: 7.409012, lng: 80.847223 }}
                        >
                          <Marker position={this.props.property.details.latlng} />
                        </Map>
                        </div>
                    </TabPane>
                  </TabContent>
                  <Button color="primary" onClick={this.save}>Save</Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </PerfectScrollbar>
    );
  }

}
//export default AddRoom;
export default connect(mapStateToProps, mapDispatchToProps, null)(GoogleApiWrapper({
  apiKey: 'AIzaSyB16whcgw9TOK29TD17WTwj8OsdmCIR03g'
})(MyProperty));
