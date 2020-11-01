import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import Loading from "./loading.jsx";
import Img from "gatsby-image";
import Search from "./search/search.js";
const searchIndices = [{ name: `Posts`, title: `Posts` }];

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Button,
    Collapse,
    NavbarToggler,
    Navbar,
    Nav,
    NavItem,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Modal,
    ModalHeader,
    ModalBody,
    UncontrolledTooltip,
} from "reactstrap";

export default class ReactNavbar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: false,
            isOpen: false,
            dropdownOpen: false,
            loading: true,
            mobileMenuClasses: "d-block d-lg-none mobileMenu",
            togglerClasses: "mr-3 d-lg-none hamburger hamburger--slider",
            appointmentIcon: ["far", "calendar-alt"],
            search: false
        };

        this.toggleMobileMenu = this.toggleMobileMenu.bind(this);
        this.toggleAppointmentModal = this.toggleAppointmentModal.bind(this);
        this.toggle = this.toggle.bind(this);

        this.handleSetFocus = this.handleSetFocus.bind(this);
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.handleButtonHover = this.handleButtonHover.bind(this);

        this.iframe = React.createRef();
        this.searchBtn = React.createRef();
        this.appointmentBtn = React.createRef();
    }

    handleButtonHover = e => {
        if (e.type === "mouseover") {
            this.setState({
                appointmentIcon: ["far", "calendar-plus"],
            })
        } else {
            this.setState({
                appointmentIcon: ["far", "calendar-alt"],
            })
        }
    };

    handleSetFocus = () =>{
        this.setState(prevState => ({
            search: !prevState.search,
        }));
        document.documentElement.classList.toggle('overflow-hidden');
    }

    // Appointment Modal Window Toggler
    toggleAppointmentModal() {
        this.setState(prevState => ({
            modal: !prevState.modal,
            loading: prevState.modal ? true : prevState.loading,
        }));


        document.documentElement.classList.toggle("no-overflow");
        if (this.state.modal) {
            document.body.style.removeProperty("padding-right");
        } 

    }

    // Navbar Toggler Function
    toggleMobileMenu() {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen,
            mobileMenuClasses: !prevState.isOpen
                ? "d-block d-lg-none mobileMenu open"
                : "d-block d-lg-none mobileMenu",
            togglerClasses: !prevState.isOpen
                ? "mr-3 d-lg-none hamburger hamburger--slider is-active"
                : "mr-3 d-lg-none hamburger hamburger--slider"
        }));
        document.documentElement.classList.toggle("overflow-hidden");  
    }

    // Functions for Dropdown menu
    toggle = () => {
        this.setState(prevState=>({
            dropdownOpen: !prevState.dropdownOpen,
        }));
    };

    onMouseEnter = () => {
        this.setState({ dropdownOpen: true });
    };

    onMouseLeave = () => {
        this.setState({ dropdownOpen: false });
    };

    renderMenuLinks = () => {
        return this.props.menuArray.map(item => {
            if (!item.drop) {
                return (
                    <NavItem className="ml-4 my-auto" key={item.id}>
                        <Link to={item.url} className="text-white">
                            {item.name}
                        </Link>
                    </NavItem>
                );
            } else {
                return (
                    <Dropdown
                        tag="li"
                        className="ml-4 my-auto"
                        onMouseOver={this.onMouseEnter}
                        onMouseLeave={this.onMouseLeave}
                        isOpen={this.state.dropdownOpen}
                        toggle={this.toggle}
                        key={item.id}
                    >
                        <DropdownToggle
                            tag="a"
                            className="text-white my-auto"
                            caret
                        >
                            {item.name}
                        </DropdownToggle>
                        <DropdownMenu
                            tag="ul"
                            className="dropMenu"
                            style={{ background: "rgba(8,11,13,.70)" }}
                        >
                            {item.submenu.map(subitem => {
                                return (
                                    <DropdownItem
                                        className="mb-0"
                                        tag="li"
                                        toggle={this.state.toggle}
                                        key={subitem.id}
                                    >
                                        <Link
                                            to={subitem.url}
                                            className="text-white"
                                        >
                                            {subitem.name}
                                        </Link>
                                    </DropdownItem>
                                );
                            })}
                        </DropdownMenu>
                    </Dropdown>
                );
            }
        });
    };

    renderMobileLinks = () => {
        return this.props.menuArray.map(item => {
            if (item.drop) {
                return (
                    <div key={item.id}>
                        <ul className="mobileSubMenu list-unstyled mx-auto text-center mb-5">
                            <NavItem className="text-center font-weight-bold siteTitle">
                                <p className="h4 font-weight-bold mt-5">{item.name}</p>
                                <hr style={{borderColor:"white",width:"50%",margin:"1rem auto"}}/>
                                <ul className="list-unstyled m-0">
                                    {item.submenu.map(subitem => {
                                        return (
                                            <NavItem key={subitem.id}>
                                                <Link
                                                    to={subitem.url}
                                                    className="text-white"
                                                >
                                                    {subitem.name}
                                                </Link>
                                            </NavItem>
                                        );
                                    })}
                                </ul>
                            </NavItem>
                        </ul>
                    </div>
                );
            } else {
                return (
                    <NavItem className="mx-auto font-weight-bold" key={item.id}>
                        <Link to={item.url} className="text-white">
                            {item.name}
                        </Link>
                    </NavItem>
                );
            }
        });
    };

    render() {
        return (
            <>
                <Navbar fixed="top" expand="lg" dark>
                    <Link to="/" className="navbar-brand mr-lg-auto">
                        <Img
                            className="my-auto"
                            fluid={this.props.brand}
                            alt="Alkemy"
                            loading="eager"
                            style={{
                                width: "150px",
                            }}
                        />
                    </Link>
                    <Button
                        color="link"
                        size="lg"
                        className="d-block d-lg-none p-0 mr-5"
                        onClick={this.handleSetFocus}
                    >
                        <FontAwesomeIcon icon="search" color="white" />
                    </Button>
                    <NavbarToggler
                        onClick={this.toggleMobileMenu}
                        // onClickCapture={this.toggleMobileMenu}
                        className={this.state.togglerClasses}
                        aria-label="Menu"
                    >
                        <span className="hamburger-box">
                            <span className="hamburger-inner"></span>
                        </span>
                    </NavbarToggler>
                    <Collapse className="d-none d-lg-block" navbar>
                        <Nav className="ml-auto" navbar>
                            {this.renderMenuLinks()}
                        </Nav>
                        <div className="button-bar ml-4 mr-2">
                            <UncontrolledTooltip
                                placement="bottom"
                                target="search-button"
                            >
                                Search
                            </UncontrolledTooltip>
                            <Button
                                id="search-button"
                                color="link"
                                className="p-0"
                                onClick={this.handleSetFocus}
                            >
                                <FontAwesomeIcon icon="search" color="white" />
                            </Button>

                            <UncontrolledTooltip
                                placement="bottom"
                                target="appt-button"
                            >
                                Book Appointment
                            </UncontrolledTooltip>
                            <Button
                                id="appt-button"
                                color="link"
                                onMouseOver={this.handleButtonHover}
                                onMouseOut={this.handleButtonHover}
                                onClick={this.toggleAppointmentModal}
                                className="ml-4 p-0"
                            >
                                <FontAwesomeIcon
                                    icon={this.state.appointmentIcon}
                                    color="white"
                                />
                            </Button>
                        </div>
                    </Collapse>
                </Navbar>
                <div className={this.state.mobileMenuClasses}>
                    <Nav className="mx-auto w-100" navbar>
                        {this.renderMobileLinks()}
                        <li className="mx-auto">
                            <Button
                                color="light"
                                outline
                                className="btn-white mx-auto my-4 align-middle text-white p-2"
                                onClick={this.toggleAppointmentModal}
                            >
                                <FontAwesomeIcon
                                    icon={this.state.appointmentIcon}
                                    color="white"
                                    className="mr-2"
                                />
                                Reserve Appointment
                            </Button>
                        </li>
                    </Nav>
                </div>
                <Search
                    indices={searchIndices}
                    hasFocus={this.state.search}
                    setFocus={this.handleSetFocus}
                />
                <Modal
                    size={"lg"}
                    className="bookingModal"
                    isOpen={this.state.modal}
                    toggle={this.toggleAppointmentModal}
                >
                    <ModalHeader toggle={this.toggleAppointmentModal}>
                        Reserve Your Appointment
                    </ModalHeader>
                    <ModalBody className="p-0 m-0">
                        {this.state.loading ? <Loading size="4x" /> : null}
                        <iframe
                            title="booking"
                            ref={this.iframe}
                            onLoad={() => this.setState({ loading: false })}
                            seamless
                            className="mb-0 bookingFrame"
                            src="https://squareup.com/appointments/buyer/widget/0dddc8a7-089f-45bc-870f-8a603a6dd412/GYDNKWG11FCR7"
                        />
                    </ModalBody>
                </Modal>
            </>
        );
    }
}

ReactNavbar.propTypes = {
    menuArray: PropTypes.array,
    brand: PropTypes.object
};

