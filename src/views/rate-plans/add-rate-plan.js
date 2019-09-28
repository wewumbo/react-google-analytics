import React from 'react';
import { connect } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { withRouter } from "react-router-dom";
import classnames from 'classnames';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import axios from 'axios';
import { setEdit } from '../../redux/rate-plans/action';
import { setRoomCategories } from '../../redux/rate-plans/action';
import { setList } from '../../redux/rate-plans/action';

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
    setEdit: (payload) => dispatch(setEdit(payload)),
    setRoomCategories: (payload) => dispatch(setRoomCategories(payload)),
    setList: (payload) => dispatch(setList(payload)),
});

class AddRoomRates extends React.Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            showController: false,
            'activeTab': '1',
            form: { name: '', room_category: '', meal_plan: '', base_occupancy: '', rack_rate: ''}
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.save = this.save.bind(this);
    }

    async loadList() {
        const response =
            await axios.get(this.props.settings.url + "/api/get_rate_plans?api_token=88d20ed5e541d92a80c595fc414359fb047a71a3dff71bd1a0daac824ab4d6cb");
        this.props.setList(response.data.list);
        console.log(response);
    }


    async save() {

        this.formData.append('api_token', "88d20ed5e541d92a80c595fc414359fb047a71a3dff71bd1a0daac824ab4d6cb");
        this.formData.append('_id', this.props.rate_plans.edit._id);
        
        const response =
            await axios.post(this.props.settings.url + "/api/save_room_rate", this.formData, {}
            );

        console.log(response);
        this.loadList();
        this.toggle();
    }

    handleInputChange(event) {

        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        const name = target.name;
        const rate = this.props.rate_plans.edit;
        rate[name] = value;
        this.props.setEdit(rate);
        this.formData.append(name, value)
        console.log(this.props.rate_plans.edit);
    }


    componentDidMount() {
        window.addEventListener("load", this.defaultSettings);
    }

    toggle() {

        this.formData = new FormData();
        if (this.state.showController) {
            this.setState({ showController: false });
        } else {
            this.setState({ showController: true });
        }
        document.getElementById("customizer").classList.toggle("show-service-panel");

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
                                    Room Rete Types
                                </CardTitle>
                                <CardBody>
                                    
                                    <Form>
                                        <TabContent activeTab={this.state.activeTab}>
                                            <TabPane tabId="1">
                                                <Row>
                                                    <Col md="12">
                                                        <FormGroup>
                                                            <Label>Name</Label>
                                                            <Input type="text" name="name" id="name" placeholder="Name for the Rate" onChange={this.handleInputChange} value={this.props.rate_plans.edit.name}/>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md="6">
                                                        <Label>Room Category</Label>
                                                        <Input type="select" id="room_category" name="room_category" onChange={this.handleInputChange} value={ (this.props.rate_plans.edit.room_category != null)? this.props.rate_plans.edit.room_category: ""}>
                                                            <option value=" "  >Select category</option>
                                                            {this.props.rate_plans.roomCategories.map(function (item) {
                                                                return <option value={item} >{item}</option>
                                                            })}
                                                        </Input>
                                                    </Col>
                                                    <Col md="6">
                                                        <Label>Meal Plan</Label>
                                                        <Input type="select" id="meal_plan" name="meal_plan" onChange={this.handleInputChange} value={ (this.props.rate_plans.edit.meal_plan != null)? this.props.rate_plans.edit.meal_plan: ""}>
                                                            <option value=" "  >Select meal plan</option>
                                                            {this.props.rate_plans.mealPlans.map(function (item) {
                                                                return <option value={item} >{item}</option>
                                                            })}
                                                        </Input>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md="6">
                                                        <FormGroup>
                                                            <Label>Base Occupancy</Label>
                                                            <Input type="text" name="base_occupancy" id="base_occupancy" placeholder="Base Occupancy" onChange={this.handleInputChange} value={this.props.rate_plans.edit.base_occupancy} />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md="6">
                                                        <FormGroup>
                                                            <Label>Rack Rate</Label>
                                                            <Input type="text" name="rack_rate" id="rack_rate" placeholder="Rack rate" onChange={this.handleInputChange} value={this.props.rate_plans.edit.rack_rate}  />
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                            </TabPane>
                                        </TabContent>
                                        <Button color="primary" onClick={this.save}>Save</Button>
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
export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(AddRoomRates);