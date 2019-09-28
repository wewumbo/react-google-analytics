import React from 'react';
import { connect } from 'react-redux';
import {
	Nav,
	NavItem,
	NavLink,
	Button,
	Navbar,
	NavbarBrand,
	Collapse,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	UncontrolledCarousel,
	Progress,
	ListGroup,
	ListGroupItem,
	Row,
	Col,
	Form,
	FormGroup,
	Input
} from 'reactstrap';
import * as data from './data.js';

/*--------------------------------------------------------------------------------*/
/* Import images which are need for the HEADER                                    */
/*--------------------------------------------------------------------------------*/
import logodarkicon from '../../../assets/images/logo-icon.png';
import logolighticon from '../../../assets/images/travelhubasia_log.png';
import profilephoto from '../../../assets/images/users/1.jpg';

const mapStateToProps = state => ({
	...state
});

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this);
		this.showMobilemenu = this.showMobilemenu.bind(this);
		this.sidebarHandler = this.sidebarHandler.bind(this);
		this.state = {
			isOpen: false
		};
		this.toggleMenu = this.toggleMenu.bind(this);
	}
	/*--------------------------------------------------------------------------------*/
	/*To open Search Bar                                                              */
	/*--------------------------------------------------------------------------------*/
	toggleMenu() {
		document.getElementById('search').classList.toggle('show-search');
	}
	/*--------------------------------------------------------------------------------*/
	/*To open NAVBAR in MOBILE VIEW                                                   */
	/*--------------------------------------------------------------------------------*/
	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}
	/*--------------------------------------------------------------------------------*/
	/*To open SIDEBAR-MENU in MOBILE VIEW                                             */
	/*--------------------------------------------------------------------------------*/
	showMobilemenu() {
		document.getElementById('main-wrapper').classList.toggle('show-sidebar');
	}
	sidebarHandler = () => {
		let element = document.getElementById('main-wrapper');
		switch (this.props.settings.activeSidebarType) {
			case 'full':
			case 'iconbar':
				element.classList.toggle('mini-sidebar');
				if (element.classList.contains('mini-sidebar')) {
					element.setAttribute('data-sidebartype', 'mini-sidebar');
				} else {
					element.setAttribute(
						'data-sidebartype',
						this.props.settings.activeSidebarType
					);
				}
				break;

			case 'overlay':
			case 'mini-sidebar':
				element.classList.toggle('full');
				if (element.classList.contains('full')) {
					element.setAttribute('data-sidebartype', 'full');
				} else {
					element.setAttribute(
						'data-sidebartype',
						this.props.settings.activeSidebarType
					);
				}
				break;

			default:
		}
	};

	render() {
		return (
			<header
				className="topbar navbarbg"
				data-navbarbg={this.props.settings.activeNavbarBg}
			>
				<Navbar
					className={
						'top-navbar ' +
						(this.props.settings.activeNavbarBg === 'skin6'
							? 'navbar-light'
							: 'navbar-dark')
					}
					expand="md"
				>
					<div
						className="navbar-header"
						id="logobg"
						data-logobg={this.props.settings.activeLogoBg}
					>
						{/*--------------------------------------------------------------------------------*/}
						{/* Mobile View Toggler  [visible only after 768px screen]                         */}
						{/*--------------------------------------------------------------------------------*/}
						<span
							className="nav-toggler d-block d-md-none text-white"
							onClick={this.showMobilemenu}
						>
							<i className="ti-menu ti-close" />
						</span>
						{/*--------------------------------------------------------------------------------*/}
						{/* Logos Or Icon will be goes here for Light Layout && Dark Layout                */}
						{/*--------------------------------------------------------------------------------*/}
						<NavbarBrand href="/">
							<b className="logo-icon">
								<img src={logodarkicon} alt="homepage" className="dark-logo" />
								<img
									src={logolighticon}
									alt="homepage"
									className="light-logo"
								/>
							</b>
							
						</NavbarBrand>
						{/*--------------------------------------------------------------------------------*/}
						{/* Mobile View Toggler  [visible only after 768px screen]                         */}
						{/*--------------------------------------------------------------------------------*/}
						<span
							className="topbartoggler d-block d-md-none text-white"
							onClick={this.toggle}
						>
							<i className="ti-more" />
						</span>
					</div>
					<Collapse
						className="navbarbg"
						isOpen={this.state.isOpen}
						navbar
						data-navbarbg={this.props.settings.activeNavbarBg}
					>
						<Nav className="float-left" navbar>
							<NavItem>
								<NavLink
									href="#"
									className="d-none d-md-block"
									onClick={this.sidebarHandler}
								>
									<i className="ti-menu" />
								</NavLink>
							</NavItem>
						</Nav>
						<Nav className="ml-auto float-right" navbar>
							{/*--------------------------------------------------------------------------------*/}
							{/* Start Notifications Dropdown                                                   */}
							{/*--------------------------------------------------------------------------------*/}
							<UncontrolledDropdown nav inNavbar>
								<DropdownToggle nav caret>
									<i className="mdi mdi-message" />
									<div className="notify">
										<span className="heartbit" /> <span className="point" />
									</div>
								</DropdownToggle>
								<DropdownMenu right className="mailbox">
									<div className="p-4 text-dark border-bottom">
										<h6 className="mb-0 font-medium">Notifications</h6>
									</div>
									<div className="message-center notifications">
										{/*<!-- Message -->*/}
										{data.notifications.map((notification, index) => {
											return (
												<span className="message-item" key={index}>
													<span
														className={
															'btn btn-circle btn-' + notification.iconbg
														}
													>
														<i className={notification.iconclass} />
													</span>
													<div className="mail-contnet">
														<h5 className="message-title">
															{notification.title}
														</h5>
														<span className="mail-desc">
															{notification.desc}
														</span>
														<span className="time">{notification.time}</span>
													</div>
												</span>
											);
										})}
									</div>
									<a className="nav-link text-center mb-1 text-muted" href=";">
										<strong>Check all notifications</strong>
										<i className="fa fa-angle-right" />
									</a>
								</DropdownMenu>
							</UncontrolledDropdown>
							{/*--------------------------------------------------------------------------------*/}
							{/* End Notifications Dropdown                                                     */}
							{/*--------------------------------------------------------------------------------*/}
							{/*--------------------------------------------------------------------------------*/}
							{/* Start Messages Dropdown                                                        */}
							{/*--------------------------------------------------------------------------------*/}
							<UncontrolledDropdown nav inNavbar>
								<DropdownToggle nav caret>
									<i className="mdi mdi-email" />
									<div className="notify">
										<span className="heartbit" /> <span className="point" />
									</div>
								</DropdownToggle>
								<DropdownMenu right className="mailbox">
									<div className="p-4 text-dark border-bottom">
										<h6 className="mb-0 font-medium">
											You have 4 new messages
                    </h6>
									</div>
									<div className="message-center message-body">
										{/*<!-- Message -->*/}
										{data.messages.map((message, index) => {
											return (
												<span className="message-item" key={index}>
													<span className="user-img">
														<img
															src={message.image}
															alt="user"
															className="rounded-circle"
															width=""
														/>
														<span
															className={
																'profile-status pull-right ' + message.status
															}
														/>
													</span>
													<div className="mail-contnet">
														<h5 className="message-title">{message.title}</h5>
														<span className="mail-desc">{message.desc}</span>
														<span className="time">{message.time}</span>
													</div>
												</span>
											);
										})}
									</div>
									<a className="nav-link text-center link text-muted" href="/">
										<b>See all e-Mails</b> <i className="fa fa-angle-right" />
									</a>
								</DropdownMenu>
							</UncontrolledDropdown>
							{/*--------------------------------------------------------------------------------*/}
							{/* End Messages Dropdown                                                          */}
							{/*--------------------------------------------------------------------------------*/}
							{/*--------------------------------------------------------------------------------*/}
							{/* Start Profile Dropdown                                                         */}
							{/*--------------------------------------------------------------------------------*/}
							<UncontrolledDropdown nav inNavbar>
								<DropdownToggle nav caret className="pro-pic">
									<img
										src={profilephoto}
										alt="user"
										className="rounded-circle"
										width="31"
									/>
								</DropdownToggle>
								<DropdownMenu right className="user-dd">
									<div className="d-flex no-block align-items-center p-3 mb-2 border-bottom">
										<div className="">
											<img
												src={profilephoto}
												alt="user"
												className="rounded"
												width="80"
											/>
										</div>
										<div className="ml-3">
											<h4 className="mb-0">Steave Jobs</h4>
											<p className="text-muted mb-0">varun@gmail.com</p>
											<Button color="danger" className="btn-rounded mt-2">
												View Profile
                      </Button>
										</div>
									</div>
									<DropdownItem>
										<i className="ti-user mr-1 ml-1" /> My Account
                  </DropdownItem>
									<DropdownItem>
										<i className="ti-wallet mr-1 ml-1" /> My Balance
                  </DropdownItem>
									<DropdownItem className="border-bottom">
										<i className="ti-email mr-1 ml-1" /> Inbox
                  </DropdownItem>
									<DropdownItem className="border-bottom">
										<i className="ti-settings mr-1 ml-1" /> Account Settings
                  </DropdownItem>
									<DropdownItem href="/authentication/login">
										<i className="fa fa-power-off mr-1 ml-1" /> Logout
                  </DropdownItem>
								</DropdownMenu>
							</UncontrolledDropdown>
							{/*--------------------------------------------------------------------------------*/}
							{/* End Profile Dropdown                                                           */}
							{/*--------------------------------------------------------------------------------*/}
						</Nav>
					</Collapse>
				</Navbar>
			</header>
		);
	}
}
export default connect(mapStateToProps)(Header);
