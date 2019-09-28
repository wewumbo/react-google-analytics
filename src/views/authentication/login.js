import React from 'react';
import {
	InputGroup,
	InputGroupAddon,
	InputGroupText,
	Input,
	CustomInput,
	FormGroup,
	Form,
	Row,
	Col,
	UncontrolledTooltip,
	Button
} from 'reactstrap';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import img1 from '../../assets/images/login-logo.png';
import img2 from '../../assets/images/background/login-register.jpg';
import { setAuthToken } from '../../redux/auth/action';
import { setIsLoggedIn } from '../../redux/auth/action';
import { setUser } from '../../redux/auth/action';
import { setProperty } from '../../redux/property/action';
import { setRoomAmenities } from '../../redux/rooms/action';
import { setRoomViews } from '../../redux/rooms/action';
import LoadingOverlay from 'react-loading-overlay'

const sidebarBackground = {
	backgroundImage: "url(" + img2 + ")",
	backgroundRepeat: "no-repeat",
	backgroundPosition: "bottom center"
};
var isError = false;

const mapStateToProps = state => ({
	...state
});
const mapDispatchToProps = dispatch => ({
	setAuthToken: (payload) => dispatch(setAuthToken(payload)),
	setIsLoggedIn: (payload) => dispatch(setIsLoggedIn(payload)),
	setUser: (payload) => dispatch(setUser(payload)),
	setProperty: (payload) => dispatch(setProperty(payload)),
	setRoomAmenities: (payload) => dispatch(setRoomAmenities(payload)),
	setRoomViews: (payload) => dispatch(setRoomViews(payload))
});


class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: 'pearlgrand@gmail.com',
			password: 'pearlgrand@1234',
			isLoading: false,
		};
		console.log(this.props.authReducer);
		//this.handleClick = this.handleClick.bind(this);
		this.doLogin = this.doLogin.bind(this);
		this.onInputChange = this.onInputChange.bind(this);
	}

	onInputChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		});
		//this.formValidators([event.target.name], event.target.value);
	}


	async doLogin(event) {
		const {
			email,
			password
		} = this.state;

		//this.props.setIsLoggedIn(false);
		//this.state.isLoading = true;
		this.setState({
			isLoading: true,
		});
		isError = false;
		const response =
			await axios.post(this.props.settings.url+"/api/login",
				{ "email": this.state.email, "password": this.state.password },
				{ headers: { 'Content-Type': 'application/json' } }
			)
		if (response.data.status == 'success') {
			this.props.setAuthToken(response.data.api_token);
			this.props.setIsLoggedIn(true);
			this.props.setUser(response.data.user);
			this.props.setProperty(response.data.property);
			this.props.setRoomAmenities(response.data.room_amenities);
			this.props.setRoomViews(response.data.room_views);
			this.props.history.push('/avialability');
		} else {
			isError = true;
			this.setState({
				isLoading: false,
			});
		}




	}
	render() {
		return <div className="">

			{/*--------------------------------------------------------------------------------*/}
			{/*Login Cards*/}
			{/*--------------------------------------------------------------------------------*/}
			<div className="auth-wrapper d-flex no-block justify-content-center align-items-center" style={sidebarBackground}>
				<LoadingOverlay
					active={this.state.isLoading}
					spinner
					text='Loading'>
					<p></p>
				</LoadingOverlay>

				<div className="auth-box on-sidebar">
					<div id="loginform">
						<div className="logo">
							<span className="db"><img src={img1} alt="logo" /></span>
							<h5 className="font-medium mb-3">Sign In to Admin</h5>
						</div>
						{isError && (
						<div class="alert alert-danger fade show" role="alert">Login failed. Please try again</div>
						)
						}
						<Row>
							<Col xs="12">
								<Form className="mt-3" id="loginform">
									<InputGroup className="mb-3">
										<InputGroupAddon addonType="prepend">
											<InputGroupText>
												<i className="ti-user"></i>
											</InputGroupText>
										</InputGroupAddon>
										<Input type="text" id="email" name="email" value={this.state.email} onChange={this.onInputChange} placeholder="Email" required />
									</InputGroup>
									<InputGroup className="mb-3">
										<InputGroupAddon addonType="prepend">
											<InputGroupText>
												<i className="ti-pencil"></i>
											</InputGroupText>
										</InputGroupAddon>
										<Input type="password" id="password" name="password" value={this.state.password} onChange={this.onInputChange} placeholder="Password" required />
									</InputGroup>
									<div className="d-flex no-block align-items-center mb-3">
										<CustomInput type="checkbox" id="exampleCustomCheckbox" label="Remember Me" />
										<div className="ml-auto">
											<a href="#recoverform" id="to-recover" onClick={this.handleClick} className="forgot text-dark float-right"><i className="fa fa-lock mr-1"></i> Forgot pwd?</a>
										</div>
									</div>
									<Row className="mb-3">
										<Col xs="12">
											<Button color="primary" size="lg" type="button" onClick={this.doLogin} block>Log In</Button>
										</Col>
									</Row>
									<div className="text-center">
										Don&apos;t have an account? <a href="/authentication/register" className="text-info ml-1"><b>Sign Up</b></a>
									</div>
								</Form>
							</Col>
						</Row>
					</div>
					<div id="recoverform">
						<div className="logo">
							<span className="db"><img src={img1} alt="logo" /></span>
							<h5 className="font-medium mb-3">Recover Password</h5>
							<span>Enter your Email and instructions will be sent to you!</span>
						</div>
						<Row className="mt-3">
							<Col xs="12">
								<Form action="/dashbaord">
									<FormGroup>
										<Input type="text" name="uname" bsSize="lg" id="Name" placeholder="Username" required />
									</FormGroup>
									<Row className="mt-3">
										<Col xs="12">
											<Button color="danger" size="lg" type="submit" block>Reset</Button>
										</Col>
									</Row>
								</Form>
							</Col>
						</Row>
					</div>
				</div>
			</div>
		</div>;
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
