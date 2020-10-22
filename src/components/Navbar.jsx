import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import Loading from "./loading.jsx";
import Img from "gatsby-image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Collapse,
    NavbarToggler,
    Navbar,
    Nav,
    NavItem,
    Button,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Modal,
    ModalHeader,
    ModalBody,
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
            icon: ["far", "calendar-alt"],
        };

        this.toggleMobileMenu = this.toggleMobileMenu.bind(this);
        this.toggleAppointmentModal = this.toggleAppointmentModal.bind(this);
        this.toggle = this.toggle.bind(this);

        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.handleButtonHover = this.handleButtonHover.bind(this);

        this.iframe = React.createRef();
    }

    handleButtonHover = e => {
        if (e.type === "mouseover") {
            this.setState({
                icon: ["far", "calendar-plus"],
            });
        } else {
            this.setState({
                icon: ["far", "calendar-alt"],
            });
        }
    };

    // Appointment Modal Window Toggler
    toggleAppointmentModal() {
        this.setState(prevState => ({
            modal: !prevState.modal,
            loading: prevState.modal ? true : prevState.loading,
        }));

        setTimeout(() => {
            if (this.state.modal) {
                document.documentElement.classList.add("no-overflow");
                document.body.style.removeProperty("padding-right");
            } else {
                document.documentElement.classList.remove("no-overflow");
            }
        }, 300);
    }

    // Navbar Toggler Function
    toggleMobileMenu() {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen,
        }));

        if (this.state.isOpen) {
            this.setState({
                mobileMenuClasses: "d-block d-lg-none mobileMenu open",
                togglerClasses:
                    "mr-3 d-lg-none hamburger hamburger--slider is-active",
            });
            document.body.classList.add("open");
        } else {
            this.setState({
                mobileMenuClasses: "d-block d-lg-none mobileMenu",
                togglerClasses: "mr-3 d-lg-none hamburger hamburger--slider",
            });
        }
    }

    // Functions for Dropdown menu
    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen,
        });
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
                            style={{
                                // height: "auto",
                                width: "150px",
                            }}
                        />
                    </Link>
                    <NavbarToggler
                        onClickCapture={this.toggleMobileMenu}
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
                        <Button
                            outline
                            color="light"
                            onMouseOver={this.handleButtonHover}
                            onMouseOut={this.handleButtonHover}
                            onClick={this.toggleAppointmentModal}
                            className="ml-4 my-auto align-middle text-white"
                        >
                            <FontAwesomeIcon
                                icon={this.state.icon}
                                color="white"
                                size="lg"
                                className="mr-2"
                            />
                            Reserve Appointment
                        </Button>
                    </Collapse>
                </Navbar>
                <div className={this.state.mobileMenuClasses}>
                    <Nav className="mx-auto w-100" navbar>
                        {this.renderMobileLinks()}
                        <li className="mx-auto">
                            <a
                                color="light"
                                className="btn btn-outline btn-white mx-auto my-4 align-middle text-white"
                                onClick={this.toggleAppointmentModal}
                            >
                                <FontAwesomeIcon
                                    icon={this.state.icon}
                                    color="white"
                                    size="lg"
                                    className="mr-2"
                                />
                                Reserve Appointment
                            </a>
                        </li>
                    </Nav>
                </div>
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

