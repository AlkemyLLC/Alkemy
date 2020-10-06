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
} from "reactstrap";
import Stepper from "react-stepper-horizontal";
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";
import ThankYou from "./thankYou.jsx";
import loadable from "@loadable/component";

const ReCAPTCHA = loadable(() => import("./recaptcha.jsx"));

export default class BuildYourDream extends React.Component {
    constructor() {
        super();

        this.state = {
            success: false,
            formStep: 0,
            formValues: {
                "g-recaptcha-response": "",
                fullName: "",
                email: "",
                phone: "",
                hasWebsite: "no",
                websiteAddress: "",
                companyName: "",
                budget: "",
                timeframe: "",
                designExamples: "",
                industry: "",
                otherIndustry: "",
            },
            errors: {
                companyNameLength: "",
                emailFormat: "",
                fullNameLength: "",
                otherIndustryLength: "",
                phone: "",
                websiteAddressFormat: "",
                ReCAPTCHA: "",
            },
            stepperSteps: [
                {
                    title: "Step One",
                    onClick: e =>
                        this.state.formStep[e.currentTarget.innerHTML],
                },
                {
                    title: "Step Two",
                    onClick: e =>
                        this.state.formStep[e.currentTarget.innerHTML],
                },
                {
                    title: "Step Three",
                    onClick: e =>
                        this.state.formStep[e.currentTarget.innerHTML],
                },
                {
                    title: "Step Four",
                    onClick: e =>
                        this.state.formStep[e.currentTarget.innerHTML],
                },
            ],
        };
        this.dreamForm = React.createRef;
    }

    handleRecaptcha = value => {
        let errors = { ...this.state.errors };
        let formValues = { ...this.state.formValues };
        errors.ReCAPTCHA = "";
        formValues["g-recaptcha-response"] = value;

        this.setState({ formValues, errors });
    };

    // handles field changes
    handleFieldChange = (e, fieldName) => {
        let formValues = { ...this.state.formValues };

        if (fieldName !== "phone") {
            formValues[fieldName] = e.target.value;
        } else {
            if (e[0] === true) {
                formValues[fieldName] = e[1];
            }
        }
        this.setState({ formValues });
        this.setState({
            errors: {
                companyNameLength: "",
                emailFormat: "",
                fullNameLength: "",
                otherIndustryLength: "",
                phone: "",
                websiteAddressFormat: "",
                ReCAPTCHA: "",
            },
        });
    };

    // handles button click (next or back)
    handleButtonClick = (e, action) => {
        e.preventDefault();
        // handle regular form next click
        if (
            action === "next" &&
            this.state.formStep < this.state.stepperSteps.length - 1
        ) {
            let valid = this.validate();

            if (valid) {
                this.setState(prevState => {
                    return {
                        formstep: prevState.formStep++,
                    };
                });
            }
        }

        // handle regular form back click
        if (action === "back" && this.state.formStep > 0)
            this.setState(prevState => {
                return {
                    formstep: prevState.formStep--,
                };
            });
    };

    handleSubmit = e => {
        e.preventDefault();
        let valid = this.validate();

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
        console.log("test encode: ",encode(this.state.formValues));
        if (valid && recaptchaValue.length > 0) {
            fetch("/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: encode({
                    "form-name": "dreamForm",
                    ...this.state.formValues,
                }),
            })
                .then(res => {
                    this.setState({
                        success: true,
                    });
                    console.log(res);
                })
                .catch(error => console.log(error));
        } else {
            let errors = { ...this.state.errors };
            errors.ReCAPTCHA = "ReCAPTCHA Verification Needed to Submit Form.";
            this.setState({
                errors,
            });
        }
    };

    // handles the cases for rendering each step of the form
    renderForm = () => {
        switch (this.state.formStep) {
            case 0:
                return (
                    <Row form className="my-4 py-0">
                        <Col xs={12} md={4} className="my-2 py-0">
                            <FormGroup>
                                <Input
                                    type="text"
                                    name="fullName"
                                    value={this.state.formValues.fullName}
                                    invalid={
                                        typeof this.state.errors
                                            .fullNameLength !== "undefined" &&
                                        this.state.errors.fullNameLength
                                            .length > 0
                                    }
                                    onChange={e =>
                                        this.handleFieldChange(e, "fullName")
                                    }
                                    placeholder="Full Name"
                                />
                                <FormFeedback className="my-3">
                                    {this.state.errors.fullNameLength}
                                </FormFeedback>
                            </FormGroup>
                        </Col>
                        <Col xs={12} md={4} className="my-2 py-0">
                            <FormGroup>
                                <Input
                                    type="text"
                                    name="email"
                                    value={this.state.formValues.email}
                                    invalid={
                                        typeof this.state.errors.emailFormat !==
                                            "undefined" &&
                                        this.state.errors.emailFormat.length > 0
                                    }
                                    onChange={e =>
                                        this.handleFieldChange(e, "email")
                                    }
                                    placeholder="Email Address"
                                />
                                <FormFeedback>
                                    {this.state.errors.emailFormat}
                                </FormFeedback>
                            </FormGroup>
                        </Col>
                        <Col xs={12} md={4} className="my-2 py-0">
                            <FormGroup>
                                <IntlTelInput
                                    type="tel"
                                    fieldName="phone"
                                    format
                                    containerClassName="intl-tel-input"
                                    className="form-control"
                                    onPhoneNumberChange={(valid, value) =>
                                        this.handleFieldChange(
                                            [valid, value],
                                            "phone"
                                        )
                                    }
                                    defaultCountry="USA"
                                    defaultValue="+1 954 555 1212"
                                />
                                <FormFeedback>
                                    {this.state.errors.phone}
                                </FormFeedback>
                            </FormGroup>
                        </Col>
                    </Row>
                );
            case 1:
                return (
                    <Row form className="my-4 py-0">
                        <Col xs={12} className="my-2 py-0 text-center">
                            <FormGroup>
                                <p className="text-center">
                                    Do you presently have a website?
                                </p>
                                <Label check className="mr-5">
                                    <Input
                                        type="radio"
                                        name="hasWebsite"
                                        value="no"
                                        defaultChecked={
                                            this.state.formValues.hasWebsite ===
                                            "no"
                                        }
                                        onChange={e =>
                                            this.handleFieldChange(
                                                e,
                                                "hasWebsite"
                                            )
                                        }
                                    />{" "}
                                    No
                                </Label>
                                <Label check className="ml-5">
                                    <Input
                                        type="radio"
                                        name="hasWebsite"
                                        value="yes"
                                        defaultChecked={
                                            this.state.formValues.hasWebsite ===
                                            "yes"
                                        }
                                        onChange={e =>
                                            this.handleFieldChange(
                                                e,
                                                "hasWebsite"
                                            )
                                        }
                                    />{" "}
                                    Yes
                                </Label>
                            </FormGroup>
                        </Col>
                        {this.state.formValues.hasWebsite === "yes" ? (
                            <Col xs={12} className="my-2 py-0">
                                <FormGroup>
                                    <Input
                                        type="url"
                                        name="websiteAddress"
                                        value={
                                            this.state.formValues.websiteAddress
                                        }
                                        invalid={
                                            typeof this.state.errors
                                                .websiteAddressFormat !==
                                                "undefined" &&
                                            this.state.errors.websiteAddressFormat
                                                .length > 0
                                        }
                                        onChange={e =>
                                            this.handleFieldChange(
                                                e,
                                                "websiteAddress"
                                            )
                                        }
                                        placeholder="Website Address"
                                    />
                                    <FormFeedback>
                                        {this.state.errors.websiteAddressFormat}
                                    </FormFeedback>
                                </FormGroup>
                            </Col>
                        ) : null}
                    </Row>
                );
            case 2:
                return (
                    <Row form className="my-4 py-0">
                        <Col xs={12} md={6} className="my-2 py-0 pr-md-3">
                            <FormGroup>
                                <Label for="budget">
                                    What is your budget for this project?
                                </Label>
                                <Input
                                    type="select"
                                    name="budget"
                                    value={this.state.formValues.budget}
                                    onChange={e =>
                                        this.handleFieldChange(e, "budget")
                                    }
                                >
                                    <option value="">Select Budget</option>
                                    <option>$5k-$6999k</option>
                                    <option>$7k-$9999k</option>
                                    <option>$10k-$14999k</option>
                                    <option>$15k-$25k</option>
                                    <option>Greater than $25k</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col xs={12} md={6} className="my-2 py-0 pl-md-3">
                            <FormGroup>
                                <Label for="timeframe">
                                    Do you have a specific launch timeframe?
                                </Label>
                                <Input
                                    type="select"
                                    name="timeframe"
                                    value={this.state.formValues.timeframe}
                                    onChange={e =>
                                        this.handleFieldChange(e, "timeframe")
                                    }
                                >
                                    <option value="">
                                        Select Time Constraints
                                    </option>
                                    <option>
                                        No, there are no time constraints.
                                    </option>
                                    <option>1 month or less.</option>
                                    <option>1-2 months</option>
                                    <option>3-5 months</option>
                                    <option>Greater than 5 months.</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col xs={12} className="my-2 py-0">
                            <FormGroup>
                                <Label for="designExamples">
                                    Design Examples:
                                </Label>
                                <Input
                                    type="textarea"
                                    rows="3"
                                    name="designExamples"
                                    value={this.state.formValues.designExamples}
                                    onChange={e =>
                                        this.handleFieldChange(
                                            e,
                                            "designExamples"
                                        )
                                    }
                                    placeholder="If you have any websites that should serve as design examples, please provide them here. (Comma separate if more than one.) "
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                );
            case 3:
                return (
                    <Row form className="my-4 pt-0 pb-2">
                        <Col xs={12} sm={6} className="my-2 py-0 pr-3">
                            <FormGroup>
                                <Input
                                    type="text"
                                    name="companyName"
                                    value={this.state.formValues.companyName}
                                    invalid={
                                        typeof this.state.errors.companyName !==
                                            "undefined" &&
                                        this.state.errors.companyName.length > 0
                                    }
                                    onChange={e =>
                                        this.handleFieldChange(e, "companyName")
                                    }
                                    placeholder="Company Name"
                                />
                            </FormGroup>
                        </Col>
                        <Col xs={12} sm={6} className="my-2 py-0 pr-3">
                            <FormGroup>
                                <Input
                                    type="select"
                                    name="industry"
                                    invalid={
                                        typeof this.state.errors.industry !==
                                            "undefined" &&
                                        this.state.errors.industry.length > 0
                                    }
                                    value={this.state.formValues.industry}
                                    onChange={e =>
                                        this.handleFieldChange(e, "industry")
                                    }
                                >
                                    <option value="" disabled>
                                        Select Your Industry
                                    </option>
                                    <option>Food & Beverage</option>
                                    <option>Government</option>
                                    <option>HR/Payroll Services</option>
                                    <option>Insurance/Healthcare</option>
                                    <option>
                                        Internet/Software/Development
                                    </option>
                                    <option>Legal Services</option>
                                    <option>Non-Profit</option>
                                    <option>Other/Not Listed</option>
                                    <option>Real Estate</option>
                                    <option>Restaurant/Hospitality</option>
                                    <option>Retail</option>
                                    <option>
                                        Sales/Marketing/Digital Marketing
                                    </option>
                                </Input>
                                {this.state.formValues.industry ===
                                "Other/Not Listed" ? (
                                    <Input
                                        type="text"
                                        className="my-2"
                                        name="otherIndustry"
                                        value={
                                            this.state.formValues.otherIndustry
                                        }
                                        invalid={
                                            typeof this.state.errors
                                                .otherIndustry !==
                                                "undefined" &&
                                            this.state.errors.otherIndustry
                                                .length > 0
                                        }
                                        onChange={e =>
                                            this.handleFieldChange(
                                                e,
                                                "otherIndustry"
                                            )
                                        }
                                        placeholder="Your Industry"
                                    />
                                ) : null}
                            </FormGroup>
                        </Col>
                        <Col xs={12} className="my-2 py-0">
                            <FormGroup>
                                <ReCAPTCHA
                                    className="recaptcha"
                                    handleChange={this.handleRecaptcha}
                                />
                                <FormText
                                    color="danger"
                                    className="text-center"
                                >
                                    {this.state.errors.ReCAPTCHA}
                                </FormText>
                            </FormGroup>
                        </Col>
                    </Row>
                );
            default:
                return null;
        }
    };

    isEnabled = () => {
        // Step 1 of Form
        if (
            this.state.formStep === 0 &&
            this.state.formValues.fullName.length > 0 &&
            this.state.formValues.email.length > 0 &&
            this.state.formValues.phone.length > 0
        ) {
            return true;
        }
        // Step 2 of Form
        if (
            this.state.formStep === 1 &&
            this.state.formValues.hasWebsite.length > 0
        ) {
            if (this.state.formValues.hasWebsite === "no") {
                return true;
            } else if (
                this.state.formValues.hasWebsite === "yes" &&
                this.state.formValues.websiteAddress.length > 5
            ) {
                return true;
            }
        }
        // Step 3 of Form
        if (
            this.state.formStep === 2 &&
            this.state.formValues.budget.length > 0 &&
            this.state.formValues.timeframe.length > 0
        )
            return true;
        // Step 4 of Form
        if (
            this.state.formStep === 3 &&
            this.state.formValues.companyName.length > 0 &&
            this.state.formValues.industry.length > 0
        )
            return true;
        else return false;
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
        }

        // Email Validation
        let emailReg = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let emailValid = emailReg.test(
            String(this.state.formValues.email.toLowerCase())
        );

        if (!emailValid) {
            isError = true;
            errors.emailFormat = "Invalid format. Must be name@domain.com";
        }

        // Phone Validation
        let phoneReg = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s/0-9]*$/;
        let phone = this.state.formValues.phone;
        let phoneValidate = phoneReg.test(String(phone));

        if (phoneValidate === false) {
            isError = true;
            errors.phone = "Not a valid phone number.";
        }

        // websiteAddressFormat Validation
        let urlReg = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
        let url = this.state.formValues.websiteAddress;
        let urlValidate = urlReg.test(String(url));

        if (
            this.state.formValues.hasWebsite === "yes" &&
            urlValidate === false
        ) {
            isError = true;
            errors.websiteAddressFormat =
                "Website format is invalid. Must be of type www.yoursite.com";
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
        return (
            <>
                {this.state.success ? (
                    <ThankYou />
                ) : (
                    <section className="dreamForm py-5 px-3">
                        <h1 className="text-center mb-3">
                            Let Us Build Your Dream
                        </h1>
                        <div className="container">
                            <p>
                                We can prepare a custom estimate based on your
                                specific needs. Just fill out the fields below
                                so that we can get a better picture of what kind
                                of site you will need and we’ll do the rest. As
                                soon as we have had a chance to review your
                                information, you’ll get a follow-up call from
                                one of our team members to discuss your project
                                further and iron out all of the details.
                            </p>

                            <Form
                                name="dreamForm"
                                data-netlify="true"
                                data-netlify-honeypot="bot-field"
                                data-netlify-recaptcha="true"
                                onSubmit={e => this.handleSubmit(e)}
                                ref={this.dreamForm}
                                className="py-3 mb-0"
                            >
                                <Stepper
                                    activeColor="#2bb3e5"
                                    activeTitleColor="#2bb3e5"
                                    completeColor="#206a98"
                                    completeTitleColor="#206a98"
                                    steps={this.state.stepperSteps}
                                    activeStep={this.state.formStep}
                                />

                                <div className="my-3">
                                    {this.renderForm(this.state.formStep)}
                                </div>
                                <FormGroup className="text-center">
                                    <Button
                                        color="secondary"
                                        className={
                                            this.state.formStep === 0
                                                ? "d-none"
                                                : "mr-5"
                                        }
                                        onClick={e =>
                                            this.handleButtonClick(e, "back")
                                        }
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        color="primary"
                                        disabled={!this.isEnabled}
                                        type={
                                            this.state.formStep <
                                            this.state.stepperSteps.length - 1
                                                ? "button"
                                                : "submit"
                                        }
                                        onClick={e => {
                                            this.state.formStep <
                                            this.state.stepperSteps.length - 1
                                                ? this.handleButtonClick(
                                                      e,
                                                      "next"
                                                  )
                                                : this.handleSubmit(e);
                                        }}
                                    >
                                        {this.state.formStep <
                                        this.state.stepperSteps.length - 1
                                            ? "Next Step"
                                            : "Submit My Request"}
                                    </Button>
                                </FormGroup>
                                <input
                                    type="hidden"
                                    name="form-name"
                                    value="dreamForm"
                                />
                                <input
                                    type="hidden"
                                    name="bot-field"
                                    className="hp"
                                />
                            </Form>
                        </div>
                    </section>
                )}
            </>
        );
    }
}
