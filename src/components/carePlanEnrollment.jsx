/* eslint-disable no-console */
import React from "react";
import {
    Button,
    Col,
    Row,
    Form,
    FormFeedback,
    FormGroup,
    Label,
    Input,
    FormText,
    Modal,
    ListGroup,
    ListGroupItem,
    ModalHeader,
} from "reactstrap";
import ThankYou from "./thankYou.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import loadable from "@loadable/component";

const ReCAPTCHA = loadable(() => import("./recaptcha.jsx"));

export default class CarePlanEnrollment extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            success: false,
            formValues: {
                "g-recaptcha-response": "",
                fullName: "",
                email: "",
                webAddress: "",
                currentHost: "",
                acceptMigration: true
            },
            errors: {
                fullNameLength: "",
                emailFormat: "",
                websiteURLFormat: "",
                currentHostLength: "",
                ReCAPTCHA: "",
            },
        };
        this.recaptchaRef = React.createRef();
    }



    handleRecaptcha = value => {
        let errors = { ...this.state.errors };
        let formValues = { ...this.state.formValues };
        errors.ReCAPTCHA = "";
        formValues["g-recaptcha-response"] = value;

        this.setState({ formValues, errors });
    };

    handleSubmit = e => {
        e.preventDefault();
        let valid = this.validate();
        
        // handle form submit here
        const encode = data => {
            return Object.keys(data)
                .map(
                    key =>
                        encodeURIComponent(key) +
                        "=" +
                        encodeURIComponent(data[key])
                )
                .join("&");
        };

        const recaptchaValue = this.state.formValues["g-recaptcha-response"];

        if (valid && recaptchaValue.length > 0) {
            // eslint-disable-next-line no-undef
            fetch("/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: encode({
                    "form-name": "carePlanEnrollment",
                    selectedPlan: this.props.plan.name,
                    price: this.props.plan.price,
                    ...this.state.formValues
                })
                // eslint-disable-next-line no-unused-vars
            })
                .then(response => {
                    if(response.ok===false) {
                        throw Error(response.statusText);
                    }
                    this.setState({
                        success: true,
                    });
                })
                // eslint-disable-next-line no-undef
                .catch(error => console.log(error));
        } else if (valid && recaptchaValue.length === 0) {
            let errors = { ...this.state.errors };
            errors.ReCAPTCHA = "ReCAPTCHA Verification Needed to Submit Form.";
            this.setState({
                errors,
            });
        } else {
            let state = this.state;
            state.errors.ReCAPTCHA = "ReCAPTCHA Verification Needed to Submit Form.";
            this.setState({
                state
            });
        } 
    };

    handleFieldChange = e => {
        let formValues = this.state.formValues;
        let errors = this.state.errors
        if (e.target.name === "authCheck") {
            formValues[e.target.name] = !this.state.formValues.authCheck;
        } else if(e.target.id==="authCheck"){
            formValues[e.target.id] = !this.state.formValues.authCheck;
        }else{
            formValues[e.target.name] = e.target.value;
        }

        if(formValues["authCheck"]===true){
            errors.authCheck=""
        }

        this.setState({
            ...this.state,
            formValues,
            errors
        });
    };

    validate = () => {
        let isError = false;
        let errors = {};

        // Full Name Field Validation
        if (this.state.formValues.fullName.length > 0) {
            let nameArray = this.state.formValues.fullName.split(" ");
            // check name is at least 2 words
            if (nameArray.length < 2) {
                isError = true;
                errors.fullNameLength = "Only first name was entered.";
            } else if (nameArray.length >= 2) {
                for (let val in nameArray) {
                    if (nameArray[val].length < 2) {
                        isError = true;
                        errors.fullNameLength =
                            "Length of each name must be 2 or more characters.";
                    }
                }
            }
        } else if (this.state.formValues.fullName.length === 0) {
            isError = true;
            errors.fullNameLength = "You did not provide your Full Name.";
        }

        // Email Validation
        let emailReg = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let emailValid = emailReg.test(
            String(this.state.formValues.email.toLowerCase())
        );

        if (!emailValid) {
            if (this.state.formValues.email.length === 0) {
                isError = true;
                errors.emailFormat = "You did not provide your Email Address.";
            } else {
                isError = true;
                errors.emailFormat = "Invalid format. Must be name@domain.com";
            }
        }

        // websiteURLFormat Validation
        // eslint-disable-next-line no-useless-escape
        let urlReg = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
        let url = this.state.formValues.webAddress;
        let urlValidate = urlReg.test(String(url));

        if (urlValidate === false) {
            if (url.length === 0) {
                isError = true;
                errors.websiteURLFormat =
                    "You did not provide your Website Address.";
            } else {
                isError = true;
                errors.websiteURLFormat =
                    "Website format is invalid. Must be of type www.yoursite.com";
            }
        }else{
            errors.websiteURLFormat='';
        }

        // Current Host Field Validation
        if (this.state.formValues.currentHost.length < 3) {
            isError = true;
            errors.currentHostLength = "Please check your website host name.";
        } else if (this.state.formValues.currentHost.length === 0) {
            isError = true;
            errors.currentHostLength =
                "Please tell us your current website host.";
        } 

        if (isError) {
            this.setState({
                ...this.state,
                errors: { ...errors },
            });
            return false;
        }
        if (!isError) return true;
    };

    

    render() {
        const closeBtn = (
            <button className="close" onClick={this.props.toggle} style={{
                position: "absolute",
                right: "40px",
                top: "42.5px"
            }}>
                <FontAwesomeIcon icon="times-circle" color="white"></FontAwesomeIcon>
            </button>
        );
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={this.props.toggle}
                className="careModal"
            >
                <div className="carePlanEnrollment">
                    <ModalHeader
                        toggle={this.props.toggle}
                        className="subHeader mx-0 alk-container font-weight-normal text-white"
                        close={closeBtn}
                        tag="h2"
                    >
                        Care Plan Enrollment
                    </ModalHeader>
                    {this.state.success ? (
                        <ThankYou />
                    ) : (
                        <div className="alk-container">
                            <h2 className="text-center mb-5">
                                Signing up is as easy as 1 - 2 - 3.
                            </h2>
                            <ol>
                                <li>Provide your website information</li>
                                <li>Our team will process your request</li>
                                <li>
                                    Then we will set up a call to finalize
                                    everything
                                </li>
                            </ol>
                            <p className="mb-0">
                                No payment is taken until we have reviewed your
                                request and completed the setup call.
                            </p>
                            <Form
                                name="carePlanEnrollment"
                                data-netlify="true"
                                data-netlify-honeypot="bot-field"
                                data-netlify-recaptcha="true"
                                onSubmit={e => this.handleSubmit(e)}
                                className="mb-0"
                            >
                                <Row form className="my-2 py-0">
                                    <Col
                                        xs={12}
                                        md={6}
                                        className="pr-lg-4 py-0"
                                    >
                                        <FormGroup>
                                            <Label
                                                for="fullName"
                                                id="fullName"
                                                style={{ visibility: "hidden" }}
                                            >
                                                Full Name
                                            </Label>
                                            <Input
                                                type="text"
                                                name="fullName"
                                                aria-labelledby="fullName"
                                                invalid={
                                                    typeof this.state.errors
                                                        .fullNameLength !==
                                                        "undefined" &&
                                                    this.state.errors
                                                        .fullNameLength.length >
                                                        0
                                                }
                                                onChange={e =>
                                                    this.handleFieldChange(e)
                                                }
                                                placeholder="Full Name"
                                            />
                                            <FormFeedback className="my-3">
                                                {
                                                    this.state.errors
                                                        .fullNameLength
                                                }
                                            </FormFeedback>
                                        </FormGroup>
                                    </Col>
                                    <Col
                                        xs={12}
                                        md={6}
                                        className="pl-lg-4 py-0"
                                    >
                                        <FormGroup>
                                            <Label
                                                for="email"
                                                id="email"
                                                style={{ visibility: "hidden" }}
                                            >
                                                Email Address
                                            </Label>
                                            <Input
                                                type="text"
                                                name="email"
                                                aria-labelledby="email"
                                                invalid={
                                                    typeof this.state.errors
                                                        .emailFormat !==
                                                        "undefined" &&
                                                    this.state.errors
                                                        .emailFormat.length > 0
                                                }
                                                onChange={e =>
                                                    this.handleFieldChange(e)
                                                }
                                                placeholder="Email Address"
                                            />

                                            <FormFeedback className="my-3">
                                                {this.state.errors.emailFormat}
                                            </FormFeedback>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row form className="py-0">
                                    <Col
                                        xs={12}
                                        md={6}
                                        className="pr-lg-4 py-0"
                                    >
                                        <FormGroup>
                                            <Label
                                                for="webAddress"
                                                id="webAddress"
                                                style={{ visibility: "hidden" }}
                                            >
                                                Website Address
                                            </Label>
                                            <Input
                                                type="text"
                                                name="webAddress"
                                                aria-labelledby="webAddress"
                                                invalid={
                                                    typeof this.state.errors
                                                        .websiteURLFormat !==
                                                        "undefined" &&
                                                    this.state.errors
                                                        .websiteURLFormat
                                                        .length > 0
                                                }
                                                onChange={e =>
                                                    this.handleFieldChange(e)
                                                }
                                                placeholder="Website Address"
                                            />
                                            <FormFeedback className="my-3">
                                                {
                                                    this.state.errors
                                                        .websiteURLFormat
                                                }
                                            </FormFeedback>
                                        </FormGroup>
                                    </Col>
                                    <Col
                                        xs={12}
                                        md={6}
                                        className="pl-lg-4 py-0"
                                    >
                                        <FormGroup>
                                            <Label
                                                for="currentHost"
                                                id="currentHost"
                                                style={{ visibility: "hidden" }}
                                            >
                                                Current Website Host
                                            </Label>
                                            <Input
                                                type="text"
                                                name="currentHost"
                                                aria-labelledby="currentHost"
                                                invalid={
                                                    typeof this.state.errors
                                                        .currentHost !==
                                                        "undefined" &&
                                                    this.state.errors
                                                        .currentHostLength
                                                        .length > 0
                                                }
                                                onChange={e =>
                                                    this.handleFieldChange(e)
                                                }
                                                placeholder="Current Website Host"
                                            />

                                            <FormFeedback className="my-3">
                                                {
                                                    this.state.errors
                                                        .currentHostLength
                                                }
                                            </FormFeedback>
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <FormGroup
                                    check
                                    className="mt-4 mb-0 text-center"
                                >
                                    Are you willing to be migrated to our
                                    perfered host?{" "}
                                    <ListGroup
                                        horizontal
                                        className="d-inline-flex"
                                    >
                                        <ListGroupItem
                                            tag="li"
                                            className="bg-transparent border-0"
                                        >
                                            <Label
                                                check
                                                for="acceptMigrationYes"
                                                className="text-left"
                                                onClick={e =>
                                                    this.handleFieldChange(e)
                                                }
                                            >
                                                <Input
                                                    defaultChecked
                                                    type="radio"
                                                    name="acceptMigration"
                                                    value={true}
                                                    id="acceptMigrationYes"
                                                    aria-labelledby="acceptMigrationYes"
                                                    onChange={e =>
                                                        this.handleFieldChange(
                                                            e
                                                        )
                                                    }
                                                />{" "}
                                                Yes
                                            </Label>
                                        </ListGroupItem>
                                        <ListGroupItem
                                            tag="li"
                                            className="bg-transparent border-0"
                                        >
                                            <Label
                                                check
                                                for="acceptMigrationNo"
                                                className="text-left"
                                                onClick={e =>
                                                    this.handleFieldChange(e)
                                                }
                                            >
                                                <Input
                                                    type="radio"
                                                    name="acceptMigration"
                                                    value={false}
                                                    id="acceptMigrationNo"
                                                    aria-labelledby="acceptMigrationNo"
                                                    onChange={e =>
                                                        this.handleFieldChange(
                                                            e
                                                        )
                                                    }
                                                />{" "}
                                                No
                                            </Label>
                                        </ListGroupItem>
                                    </ListGroup>
                                    <FormFeedback className="text-center mb-4">
                                        {this.state.errors.authCheck}
                                    </FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <ReCAPTCHA
                                        className="recaptcha"
                                        handlechange={this.handleRecaptcha}
                                    />
                                    <FormText
                                        color="danger"
                                        className="text-center"
                                    >
                                        {this.state.errors.ReCAPTCHA}
                                    </FormText>
                                </FormGroup>
                                <FormGroup className="text-center">
                                    <Button
                                        className="btn btn-primary"
                                        type="submit"
                                        value="submit"
                                    >
                                        Enroll Now
                                    </Button>
                                </FormGroup>
                                <input
                                    type="hidden"
                                    name="form-name"
                                    value="carePlanEnrollment"
                                />
                                <Label
                                    for="bot-field"
                                    id="bot-field"
                                    style={{ visibility: "hidden" }}
                                >
                                    Bot Field, do not fill.
                                </Label>
                                <input
                                    type="text"
                                    name="bot-field"
                                    className="hp"
                                    aria-labelledby="bot-field"
                                />
                            </Form>
                        </div>
                    )}
                </div>
            </Modal>
        );
    }
}
