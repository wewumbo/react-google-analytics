import React from 'react';
import { connect } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { withRouter } from "react-router-dom";
import classnames from 'classnames';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import axios from 'axios';
import { setEdit, setList } from '../../redux/promotions/action';

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
    setList: (payload) => dispatch(setList(payload)),
});

class AddEarlyBird extends React.Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            showController: false,
            'activeTab': '1',
            form: {}
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.save = this.save.bind(this);
    }

    async loadList() {
        const response =
            await axios.get(this.props.settings.url + "/api/get_promotions?api_token=88d20ed5e541d92a80c595fc414359fb047a71a3dff71bd1a0daac824ab4d6cb");
        this.props.setList(response.data.list);
        console.log(response);
    }


    async save() {

        this.formData.append('api_token', "88d20ed5e541d92a80c595fc414359fb047a71a3dff71bd1a0daac824ab4d6cb");
        if(typeof this.props.promotions.edit._id != "undefined"){
            this.formData.append('_id', this.props.promotions.edit._id);
        }

        const response =
            await axios.post(this.props.settings.url + "/api/save_promotion", this.formData, {}
            );

        console.log(response);
        this.loadList();
        this.toggle();
    }

    handleInputChange(event) {

        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        const name = target.name;
        const item = this.props.promotions.edit;
        item[name] = value;
        this.props.setEdit(item);
        this.formData.set(name, value);
        console.log(this.props.promotions.edit);
    }


    componentDidMount() {
        window.addEventListener("load", this.defaultSettings);
    }

    async toggle() {
       
        await this.props.setEdit({});
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
                                    Promotion
                                </CardTitle>
                                <CardBody>

                                    <Form>
                                        <TabContent activeTab={this.state.activeTab}>
                                            <TabPane tabId="1">
                                                <Row>
                                                    <Col md="12">
                                                        <FormGroup>
                                                            <Label>Name</Label>
                                                            <Input type="text" name="name" id="name" placeholder="Name for early bird promo" onChange={this.handleInputChange} value="Early Bird" />
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <Label>Tititle</Label>
                                                            <Input type="text" name="title" id="title" placeholder="Name for early bird promo" onChange={this.handleInputChange} value={this.props.promotions.edit.title} />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md="4">
                                                        <FormGroup>
                                                            <Label>Number of days in advance</Label>
                                                            <Input type="text" name="num_days_in_advance" id="num_days_in_advance" placeholder="" onChange={this.handleInputChange} value={this.props.promotions.edit.num_days_in_advance} />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md="4">
                                                        <FormGroup>
                                                            <Label>From date</Label>
                                                            <Input type="text" name="from" id="from" placeholder="" onChange={this.handleInputChange} value={this.props.promotions.edit.from} />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md="4">
                                                        <FormGroup>
                                                            <Label>To date</Label>
                                                            <Input type="text" name="to" id="to" onChange={this.handleInputChange} value={this.props.promotions.edit.to} />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md="4">
                                                        <FormGroup>
                                                            <Label>Minimum Pay</Label>
                                                            <Input type="text" name="minimum_pay" id="minimum_pay" onChange={this.handleInputChange} value={this.props.promotions.edit.minimum_pay} />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md="4">
                                                        <FormGroup>
                                                            <Label>Room Category</Label>
                                                            <Input type="text" name="room_category" id="room_category" onChange={this.handleInputChange} value={this.props.promotions.edit.room_category} />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md="4">
                                                        <FormGroup>
                                                            <Label>Room Rate</Label>
                                                            <Input type="text" name="room_rate" id="room_rate" onChange={this.handleInputChange} value={this.props.promotions.edit.room_rate} />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md="4">
                                                        <FormGroup>
                                                            <Label>Discount</Label>
                                                            <Input type="text" name="discount" id="discount" onChange={this.handleInputChange} value={this.props.promotions.edit.discount} />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md="12">
                                                        <FormGroup>
                                                            <Label>Conditions</Label>
                                                            <Input type="text" name="conditions" id="conditions" onChange={this.handleInputChange} value={this.props.promotions.edit.conditions} />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md="12">
                                                        <FilePond allowMultiple={false} name="photo" ref={ref => (this.pond = ref)}
                                                            onupdatefiles={(fileItems) => {
                                                                console.log(fileItems.length);
                                                                // Set current file objects to this.state
                                                                this.formData.delete('photos[]');
                                                                fileItems.map((fileItem) => this.formData.append('photo', fileItem.file));
                                                            }}
                                                        />
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
export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(AddEarlyBird);