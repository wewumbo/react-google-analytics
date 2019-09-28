import React from 'react';
import { connect } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { withRouter } from "react-router-dom";
import classnames from 'classnames';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import axios from 'axios';
import { setRoomList } from '../../redux/rooms/action';
import { setEditRoom } from '../../redux/rooms/action';
import { setRoomAmenities } from '../../redux/rooms/action';



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
    FormText,
    Button,
    CustomInput,
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';


const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    setRoomList: (payload) => dispatch(setRoomList(payload)),
    setEditRoom: (payload) => dispatch(setEditRoom(payload)),
    setRoomAmenities: (payload) => dispatch(setRoomAmenities(payload)),
});

class AddRoom extends React.Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            showController: false,
            'activeTab': '1',
            selectedFile: null,
            form: { name: '', room_view: '', occupancy: '', size: '', units: '', description: '', amenities: {}, photos: {} }
        };

       // this.formData = new FormData();

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);

        this.saveRoom = this.saveRoom.bind(this);
        this.selectedCheckboxes = new Set();
    }

    async loadRooms() {
        const response =
            await axios.get(this.props.settings.url + "/api/get_rooms?api_token=88d20ed5e541d92a80c595fc414359fb047a71a3dff71bd1a0daac824ab4d6cb");
        this.props.setRoomList(response.data.rooms);
        console.log(response);
    }

    handleCheckBoxChange(event) {

        const target = event.target;

        if (this.selectedCheckboxes.has(target.value)) {
            this.selectedCheckboxes.delete(target.value);
        } else {
            this.selectedCheckboxes.add(target.value);
        }

        var amenities = this.props.rooms.roomAmenities;
        this.props.rooms.roomAmenities.map((object, i) => {
            this.selectedCheckboxes.forEach((entry) => {
                if (entry == object.name) {
                    amenities[i].checked = true;
                }
            });
        });

        this.props.setRoomAmenities(amenities);
    }

    async removeImage(image){

        console.log(image);
        this.formData.append('api_token', "88d20ed5e541d92a80c595fc414359fb047a71a3dff71bd1a0daac824ab4d6cb");
        this.formData.append('_id', this.props.rooms.editRoom._id);
        this.formData.append('image', image);
        console.log(image);
        const response =
            await axios.post(this.props.settings.url + "/api/delete_room_image", this.formData, {}
            );
        console.log(response);
        this.props.setEditRoom(response.data);
        this.loadRooms();
    }

    async saveRoom() {

        this.selectedCheckboxes.forEach((entry) => {
            this.formData.append('amenities[]', entry);
        });

        this.formData.append('api_token', "88d20ed5e541d92a80c595fc414359fb047a71a3dff71bd1a0daac824ab4d6cb");
        if(typeof this.props.rooms.editRoom._id !== 'undefined'){
            this.formData.append('_id', this.props.rooms.editRoom._id);
        } else {
            this.formData.delete('_id');
        }

        const response =
            await axios.post(this.props.settings.url + "/api/save_room", this.formData, {}
            );

        this.loadRooms();
        this.toggle();
        

    }

    handleInputChange(event) {

        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        const name = target.name;
        const room = this.props.rooms.editRoom;
        room[name] = value;
        this.props.setEditRoom(room);
        this.formData.append(name, value)
    }


    componentDidMount() {
        window.addEventListener("load", this.defaultSettings);
    }

    toggle() {
        this.pond.removeFiles();
        this.formData = new FormData();
        if (this.state.showController) {
            this.setState({ showController: false });
        } else {
            this.selectedCheckboxes = new Set();
            this.setState({ showController: true });
        }
        document.getElementById("customizer").classList.toggle("show-service-panel");
        //console.log(this.props.rooms.editRoom);

    }

    showTab(tab) {
        this.setState({
            'activeTab': tab
        });
    }

    render() {
        return (
            <aside className="customizer add-room-pannel" id="customizer">
                {/*--------------------------------------------------------------------------------*/}
                {/* Toggle Customizer From Here                                                    */}
                {/*--------------------------------------------------------------------------------*/}
                {this.state.showController ? <span className="service-panel-toggle text-white" onClick={this.toggle}><i className="fas fa-2x fa-chevron-circle-right"></i></span> : null}
                <PerfectScrollbar>
                    <Row>
                        {/*--------------------------------------------------------------------------------*/}
                        {/* Ordinary Form                                                                  */}
                        {/*--------------------------------------------------------------------------------*/}
                        <Col md="12">
                            <Card>
                                <CardTitle className="bg-light border-bottom p-3 mb-0">
                                    <i className="mdi mdi-book mr-2"></i>
                                    Room Category Details
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
                                                Amenities
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
                                                Photos
                                            </NavLink>
                                        </NavItem>
                                    </Nav>
                                    <Form>
                                        <TabContent activeTab={this.state.activeTab}>
                                            <TabPane tabId="1">
                                                <Row>
                                                    <Col md="12">
                                                        <FormGroup>
                                                            <Label>Name</Label>
                                                            <Input type="text" name="name" id="name" placeholder="A name for room category" onChange={this.handleInputChange} value={this.props.rooms.editRoom.name} />
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md="6">
                                                        <Label>Room View</Label>
                                                        <Input type="select" id="room_view" name="room_view" onChange={this.handleInputChange} value={this.props.rooms.editRoom.room_view}>
                                                            <option value=" "  >Select view</option>
                                                            {this.props.rooms.roomViews.map(function (view, i) {
                                                                return <option value={view.name} >{view.name}</option>
                                                            })}
                                                        </Input>
                                                    </Col>
                                                    <Col md="6">
                                                        <FormGroup>
                                                            <Label>Occupancy</Label>
                                                            <Input type="text" name="occupancy" id="occupancy" placeholder="Occupancy" onChange={this.handleInputChange} value={this.props.rooms.editRoom.occupancy} />
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md="6">
                                                        <FormGroup>
                                                            <Label>Number of Units</Label>
                                                            <Input type="text" name="units" id="units" placeholder="Number of Units" onChange={this.handleInputChange} value={this.props.rooms.editRoom.units} />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md="6">
                                                        <FormGroup>
                                                            <Label>Room Size</Label>
                                                            <Input type="text" name="size" id="size" placeholder="100sqft" onChange={this.handleInputChange} value={this.props.rooms.editRoom.size} />
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md="12">
                                                        <FormGroup>
                                                            <Label>Description</Label>
                                                            <Input name="description" id="description" type="description" rows="5" onChange={this.handleInputChange} />
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                            </TabPane>
                                        </TabContent>
                                        <TabContent activeTab={this.state.activeTab}>
                                            <TabPane tabId="2">
                                                <Form inline>
                                                    {this.props.rooms.roomAmenities.map((object, i) => {
                                                        return <Col xs="6" sm="4">
                                                            <div className="p-2 left">
                                                                <CustomInput type="checkbox" name={'amenities' + i} id={'amenities' + i} label={object.name} value={object.name} onChange={this.handleCheckBoxChange} checked={object.checked} />
                                                            </div>
                                                        </Col>
                                                    })}
                                                </Form>
                                            </TabPane>
                                        </TabContent>
                                        <TabContent activeTab={this.state.activeTab}>
                                            <TabPane tabId="3">
                                                <FilePond allowMultiple={true} name="photo[]" ref={ref => (this.pond = ref)}
                                                    onupdatefiles={(fileItems) => {
                                                        console.log(fileItems.length);
                                                        // Set current file objects to this.state
                                                        this.formData.delete('photos[]');
                                                        fileItems.map((fileItem) => this.formData.append('photos[]', fileItem.file));
                                                    }}
                                                />
                                                <div className="image-list-edit">
                                                    <Row>
                                                        { 
                                                            this.props.rooms.editRoom.photos.map((image, i) => {
                                                            return <Col xs="12" md="6">
                                                                <Card>
                                                                    <Button className="center-delete-button" color="danger" onClick={this.removeImage.bind(this, image)}>Remove</Button>
                                                                    <img src={image} />
                                                                </Card>
                                                            </Col>
                                                        })}
                                                    </Row>
                                                </div>


                                            </TabPane>
                                        </TabContent>
                                        <Button color="primary" onClick={this.saveRoom}>Save</Button>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </PerfectScrollbar>
            </aside >
        );
    }
}
//export default AddRoom;
export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(AddRoom);