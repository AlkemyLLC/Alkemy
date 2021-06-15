import React,{useState} from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import "../utils/utils.js";
import {
    fluidImageLG,
    fluidImageSmall,
    useWindowSize,
} from "../utils/utils.js";
import {
    Col,
    Row,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    CustomInput,
    FormText,
    FormFeedback
} from "reactstrap";
import Layout from "../components/layout";
import ScrollWrapper from "../components/scrollWrapper.jsx";
import SEO from "../components/seo";
import BackgroundImage from "gatsby-background-image";
import ThankYou from "../components/thankYou.jsx";
import loadable from "@loadable/component";

const Recaptcha = loadable(() => import("../components/recaptcha.jsx"));

/*
Layout props:
  pageTitle: SEO friendly title for the title bar
  headerTitle: array that defines subheader props
      [
        boolean (is there a subheader),
        {
            name: string (subheader text),
            url: string (link for subheader text)
        }
      ]
  bodyClasses: additional classes to add to body tag
*/

const ProjectEnquiry = ({ data }) => {
    // pageTitle: SEO friendly title for the title bar
    const pageTitle = { name: "Project Enquiry", url: "/project-enquiry" };
    const size = useWindowSize();
    const heroImg =
        size.width > 767
            ? size.width >= 960
                ? data.doMore.childImageSharp.fluid
                : [
                      data.doMore.childImageSharp.fluid,
                      `linear-gradient(to right, transparent 45vw, white 60vw)`,
                  ].reverse()
            : [
                  data.doMoreMobile.childImageSharp.fluid,
                  `linear-gradient(to bottom, rgba(255,255,255,.25) , white )`,
              ].reverse();

    const [thankYou,setThankYou] = useState(false);
    const [recaptcha,setRecaptcha] = useState(false);
    const [formValues, setFormValues] = useState({
        firstName: "",
        lastName: "",
        contactNumber: "",
        website: "",
        email: "",
        companyName: "",
        industryProductsAndServices: "",
        facebook: "",
        twitter: "",
        linkedin: "",
        instagram: "",
        tiktok: "",
        youtube: "",
        socialMediaFrequency: "",
        socialMediaFollowing: "",
        idealCustomer: "",
        top5reasons: "",
        projectType: "",
        projectBudget: "",
        timeframe: "",
        decisionMakers: "",
        contentReady: "Yes, I have everything ready",
        goal1: "",
        goal2: "",
        goal3: "",
        goal4: "",
        goal5: "",
        currentWebsiteWins: "",
        willSwitchHost: "yes",
        brandFeeling: "",
        competitorWebsites: "",
        top3Competitors: "",
        websitesForDesignAesthetic: "",
        successLooksLike: "",
        additionalComments: "",
    });
    const [errors, setErrors] = useState({
        ReCAPTCHA: "",
        firstName: "",
        lastName: "",
        contactNumber: "",
        website: "",
        email: "",
        companyName: "",
        industryProductsAndServices: "",
        facebook: "",
        twitter: "",
        linkedin: "",
        instagram: "",
        tiktok: "",
        youtube: "",
        socialMediaFrequency: "",
        socialMediaFollowing: "",
        idealCustomer: "",
        top5reasons: "",
        projectType: "",
        projectBudget: "",
        timeframe: "",
        decisionMakers: "",
        contentReady: "",
        goal1: "",
        goal2: "",
        goal3: "",
        goal4: "",
        goal5: "",
        currentWebsiteWins: "",
        willSwitchHost: "",
        brandFeeling: "",
        competitorWebsites: "",
        top3Competitors: "",
        websitesForDesignAesthetic: "",
        successLooksLike: "",
        additionalComments: "",
    });

    const handleFieldChange = async (e)=>{
        let formValueObj = { ...formValues };

        formValueObj[e.target.name] = e.target.value;

        setFormValues(formValueObj);
        setErrors({
            ReCAPTCHA: "",
            firstName: "",
            lastName: "",
            contactNumber: "",
            website: "",
            email: "",
            companyName: "",
            industryProductsAndServices: "",
            facebook: "",
            twitter: "",
            linkedin: "",
            instagram: "",
            tiktok: "",
            youtube: "",
            socialMediaFrequency: "",
            socialMediaFollowing: "",
            idealCustomer: "",
            top5reasons: "",
            projectType: "",
            projectBudget: "",
            timeframe: "",
            decisionMakers: "",
            contentReady: "",
            goal1: "",
            goal2: "",
            goal3: "",
            goal4: "",
            goal5: "",
            currentWebsiteWins: "",
            willSwitchHost: "",
            brandFeeling: "",
            competitorWebsites: "",
            top3Competitors: "",
            websitesForDesignAesthetic: "",
            successLooksLike: "",
            additionalComments: "",
        });
    }

    const handleRecaptcha = value => {
        let errorObj = { ...errors };
        errorObj.ReCAPTCHA = "";
        setErrors(errorObj);
        setRecaptcha(value);
    };

    const handleSubmit = async e => {
        e.preventDefault();
        let valid = await validate();

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

        if (valid && recaptcha) {
            console.log("submitting");
            fetch("/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: encode({
                    "form-name": "project-enquiry-form",
                    "g-recaptcha-response": recaptcha,
                    ...formValues,
                }),
            })
                .then(res => {
                    setThankYou(true);
                    window.scrollTo(0, 0);
                })
                .catch(error => console.log(error));
        } else if (!recaptcha) {
                   let errorObj = { ...errors };
                   errorObj.ReCAPTCHA =
                       "ReCAPTCHA Verification Needed to Submit Form.";
                   setErrors(errorObj);
               } 
        return false;
    };

    const validate = () => {
        let isError = false;
        let errorObj = {...errors};
        console.log('form values',formValues)
        // Name validations
        console.log(
            "formValues.firstName.length",
            formValues["firstName"],
            formValues["firstName"].length
        );
        if(formValues["firstName"].length>0) { 
            errorObj["firstName"] = "";
        } else {
            isError = true;
            errorObj["firstName"] = "First name is a required field.";
        }

        console.log("formValues.lastName.length", formValues.lastName.length);
        if (formValues.lastName.length > 0) {
            errorObj.lastName = "";
        } else {
            isError = true;
            errorObj.lastName = "Last name is a required field.";
        }


        // Email Validation
        let emailReg = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let emailValid = emailReg.test(
            String(formValues.email.toLowerCase())
        );

        console.log(
            "formValues.email.length",
            formValues.email.length
        );
        if (formValues.email.length > 0) {
            errorObj.email = "";
        } else if (formValues.email.length===0) {
            isError = true;
            errorObj.email =
                "Email is a required field.";
        } else if (!emailValid) {
            isError = true;
            errorObj.email =
                "Invalid email format. Must be name@domain.com";
        }

        // Phone Validation
        let phoneReg = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s/0-9]*$/;
        let phone = formValues.contactNumber;
        let phoneValidate = phoneReg.test(String(phone));

        console.log(
            "formValues.contactNumber.length",
            formValues.contactNumber.length
        );
        if (phoneValidate === false) {
            isError = true;
            errorObj.contactNumber = "Not a valid telephone number.";
        }

        // websiteAddressFormat Validation
        let urlReg = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
        let url = formValues.website;
        let urlValidate = urlReg.test(String(url));

        console.log("formValues.website.length", formValues.website.length);
        if (
            formValues.website.length>0 &&
            urlValidate === false
        ) {
            isError = true;
            errorObj.website =
                "Website format is invalid. Must be of type www.yoursite.com";
        }

        // Company name validation
        console.log(
            "formValues.companyName.length",
            formValues.companyName.length
        );
        if (formValues.companyName.length > 0) {
            errorObj.companyName = "";
        } else {
            isError = true;
            errorObj.companyName = "Company Name is a required field.";
        }

        // Industry products and services
        console.log(
            "formValues.industryProductsAndServices.length",
            formValues.industryProductsAndServices.length
        );
        if (formValues.industryProductsAndServices.length > 0) {
            errorObj.industryProductsAndServices = "";
        } else {
            isError = true;
            errorObj.industryProductsAndServices =
                "What your company does is a required field.";
        }

        // Ideal Customer
        console.log(
            "formValues.idealCustomer.length",
            formValues.idealCustomer.length
        );
        if (formValues.idealCustomer.length > 0) {
            errorObj.idealCustomer = "";
        } else {
            isError = true;
            errorObj.idealCustomer = "Ideal customer is a required field.";
        }

        // Top 5 reasons
        console.log(
            "formValues.top5reasons.length",
            formValues.top5reasons.length
        );
        if (formValues.top5reasons.length > 0) {
            errorObj.top5reasons = "";
        } else {
            isError = true;
            errorObj.top5reasons =
                "Top 5 reasons for visiting is a required field";
        }

        // Project Type
        console.log(
            "formValues.projectType.length",
            formValues.projectType.length
        );
        if (formValues.projectType.length > 0) {
            errorObj.projectType = "";
        } else {
            isError = true;
            errorObj.projectType =
                "Type of project is a required field";
        }

        // Project Budget
        console.log(
            "formValues.projectBudget.length",
            formValues.projectBudget.length
        );
        if (formValues.projectBudget.length > 0) {
            errorObj.projectBudget = "";
        } else {
            isError = true;
            errorObj.projectBudget =
                "Project Budget is a required field";
        }

        // Timeframe
        console.log("formValues.timeframe.length", formValues.timeframe.length);
        if (formValues.timeframe.length > 0) {
            errorObj.timeframe = "";
        } else {
            isError = true;
            errorObj.timeframe =
                "Project Timeframe is a required field";
        }

        // Success looks like
        console.log(
            "formValues.successLooksLike.length",
            formValues.successLooksLike.length
        );
        if (formValues.successLooksLike.length > 0) {
            errorObj.successLooksLike = "";
        } else {
            isError = true;
            errorObj.successLooksLike = "Your definition of success is a required field";
        }

        console.log("validation",isError,errorObj)
        if (isError) {
            setErrors({
                ...errorObj
            });
            return false;
        }
        return true;
    };

    return (
        <ScrollWrapper onWindowScroll={handleScroll}>
            <Layout
                renderHeaderSolid={true}
                headerTitle={[true, pageTitle]}
                bodyClasses="enquiry--page"
            >
                <SEO title={pageTitle.name} />

                <BackgroundImage
                    Tag="section"
                    className="section--hero h-100 d-flex flex-column justify-content-center"
                    style={{
                        backgroundSize:
                            size.width > 767 ? "auto 400px" : "cover",
                        backgroundPosition: "left 40%",
                    }}
                    fluid={heroImg}
                    alt="woman interacting with holographic user interface"
                >
                    <Row className="alk-container hero-text">
                        <Col xs={12} md={{ size: 6, offset: 6 }}>
                            <h2 className="h1 text-left text-sm-center text-md-right">
                                {data.enquiryJson &&
                                    data.enquiryJson.sections[0].blocks[0]
                                        .heading}
                            </h2>
                        </Col>
                    </Row>
                </BackgroundImage>

                {thankYou ? (
                    <ThankYou />
                ) : (
                    <section className="section--enquiry-form alk-container my-4">
                        <p className="mt-4 mb-5">
                            {data.enquiryJson &&
                                data.enquiryJson.sections[0].blocks[0].content}
                        </p>

                        <h2>
                            {data.enquiryJson &&
                                data.enquiryJson.sections[1].blocks[0].heading}
                        </h2>
                        <p className="my-5">
                            {data.enquiryJson &&
                                data.enquiryJson.sections[1].blocks[0].content}
                            <br />
                            <br />
                            <strong>Remember:</strong>{" "}
                            {data.enquiryJson &&
                                data.enquiryJson.sections[1].blocks[1].content}
                        </p>
                        <p>
                            <span className="text-danger">*</span> denotes
                            required field.
                        </p>

                        <hr />
                        <Form
                            name="project-enquiry-form"
                            onSubmit={handleSubmit}
                            data-netlify="true"
                            data-netlify-honeypot="bot-field"
                            data-netlify-recaptcha="true"
                        >
                            <Row form className="my-5">
                                <Col xs={12}>
                                    <h2>Business Snapshot</h2>
                                    <p>
                                        First, let&apos;s get a general idea
                                        about you and your business.
                                    </p>
                                </Col>
                                <Col xs={12} sm={6} className="pr-sm-5">
                                    <Row form>
                                        <Col xs={12} sm={6}>
                                            <FormGroup>
                                                <Label for="firstName">
                                                    First name{" "}
                                                    <span className="text-danger">
                                                        *
                                                    </span>
                                                </Label>
                                                <Input
                                                    name="firstName"
                                                    id="firstName"
                                                    type="text"
                                                    required
                                                    invalid={
                                                        typeof errors.firstName !==
                                                            "undefined" &&
                                                        errors.firstName
                                                            .length > 0
                                                    }
                                                    onChange={e =>
                                                        handleFieldChange(e)
                                                    }
                                                />
                                                <FormFeedback>
                                                    {errors.firstName}
                                                </FormFeedback>
                                            </FormGroup>
                                        </Col>
                                        <Col xs={12} sm={6}>
                                            <FormGroup>
                                                <Label for="lastName">
                                                    Last name{" "}
                                                    <span className="text-danger">
                                                        *
                                                    </span>
                                                </Label>
                                                <Input
                                                    name="lastName"
                                                    id="lastName"
                                                    type="text"
                                                    required
                                                    invalid={
                                                        typeof errors.lastName !==
                                                            "undefined" &&
                                                        errors.lastName.length >
                                                            0
                                                    }
                                                    onChange={e =>
                                                        handleFieldChange(e)
                                                    }
                                                />
                                                <FormFeedback>
                                                    {errors.lastName}
                                                </FormFeedback>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <FormGroup>
                                        <Label for="contactNumber">
                                            Contact number{" "}
                                            <span className="text-danger">
                                                *
                                            </span>
                                        </Label>
                                        <Input
                                            name="contactNumber"
                                            id="contactNumber"
                                            type="tel"
                                            invalid={
                                                typeof errors.contactNumber !==
                                                    "undefined" &&
                                                errors.contactNumber.length > 0
                                            }
                                            required
                                            onChange={e => handleFieldChange(e)}
                                        />
                                        <FormFeedback>
                                            {errors.contactNumber}
                                        </FormFeedback>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="website">
                                            What&apos;s your current website
                                            address?
                                        </Label>
                                        <Input
                                            name="website"
                                            id="website"
                                            type="text"
                                            invalid={
                                                typeof errors.website !==
                                                    "undefined" &&
                                                errors.website.length > 0
                                            }
                                            onChange={e => handleFieldChange(e)}
                                        />
                                        <FormFeedback>
                                            {errors.website}
                                        </FormFeedback>
                                    </FormGroup>
                                </Col>
                                <Col xs={12} sm={6} className="pl-sm-5">
                                    <FormGroup>
                                        <Label for="email">
                                            Email{" "}
                                            <span className="text-danger">
                                                *
                                            </span>
                                        </Label>
                                        <Input
                                            name="email"
                                            id="email"
                                            type="email"
                                            required
                                            invalid={
                                                typeof errors.email !==
                                                    "undefined" &&
                                                errors.email.length > 0
                                            }
                                            onChange={e => handleFieldChange(e)}
                                        />
                                        <FormFeedback>
                                            {errors.email}
                                        </FormFeedback>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="companyName">
                                            What&apos;s the name of your
                                            company?{" "}
                                            <span className="text-danger">
                                                *
                                            </span>
                                        </Label>
                                        <Input
                                            name="companyName"
                                            id="companyName"
                                            type="text"
                                            required
                                            invalid={
                                                typeof errors.companyName !==
                                                    "undefined" &&
                                                errors.companyName.length > 0
                                            }
                                            onChange={e => handleFieldChange(e)}
                                        />
                                        <FormFeedback>
                                            {errors.companyName}
                                        </FormFeedback>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="industryProductsAndServices">
                                            What does your company do?
                                            <span className="text-danger">
                                                *
                                            </span>
                                        </Label>
                                        <Input
                                            name="industryProductsAndServices"
                                            id="industryProductsAndServices"
                                            type="textarea"
                                            rows="4"
                                            required
                                            invalid={
                                                typeof errors.industryProductsAndServices !==
                                                    "undefined" &&
                                                errors
                                                    .industryProductsAndServices
                                                    .length > 0
                                            }
                                            onChange={e => handleFieldChange(e)}
                                        />
                                        <FormFeedback>
                                            {errors.industryProductsAndServices}
                                        </FormFeedback>
                                        <FormText>
                                            What are the products and services
                                            you offer?
                                        </FormText>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row form className="my-5">
                                <Col xs={12}>
                                    <h2>Social Media</h2>
                                </Col>
                                <Col xs={12} sm={6} className="pr-sm-5">
                                    <FormGroup>
                                        <Label for="facebook">Facebook</Label>
                                        <Input
                                            name="facebook"
                                            id="facebook"
                                            type="url"
                                            invalid={
                                                typeof errors.facebook !==
                                                    "undefined" &&
                                                errors.facebook.length > 0
                                            }
                                            onChange={e => handleFieldChange(e)}
                                        />
                                        <FormFeedback>
                                            {errors.facebook}
                                        </FormFeedback>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="twitter">Twitter</Label>
                                        <Input
                                            name="twitter"
                                            id="twitter"
                                            type="url"
                                            invalid={
                                                typeof errors.twitter !==
                                                    "undefined" &&
                                                errors.twitter.length > 0
                                            }
                                            onChange={e => handleFieldChange(e)}
                                        />
                                        <FormFeedback>
                                            {errors.twitter}
                                        </FormFeedback>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="instagram">Instagram</Label>
                                        <Input
                                            name="instagram"
                                            id="instagram"
                                            type="url"
                                            invalid={
                                                typeof errors.instagram !==
                                                    "undefined" &&
                                                errors.instagram.length > 0
                                            }
                                            onChange={e => handleFieldChange(e)}
                                        />
                                        <FormFeedback>
                                            {errors.instagram}
                                        </FormFeedback>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="linkedin">Linkedin</Label>
                                        <Input
                                            name="linkedin"
                                            id="linkedin"
                                            type="url"
                                            invalid={
                                                typeof errors.linkedin !==
                                                    "undefined" &&
                                                errors.linkedin.length > 0
                                            }
                                            onChange={e => handleFieldChange(e)}
                                        />
                                        <FormFeedback>
                                            {errors.linkedin}
                                        </FormFeedback>
                                    </FormGroup>
                                </Col>
                                <Col xs={12} sm={6} className="pl-sm-5">
                                    <FormGroup>
                                        <Label for="youtube">Youtube</Label>
                                        <Input
                                            name="youtube"
                                            id="youtube"
                                            type="url"
                                            invalid={
                                                typeof errors.youtube !==
                                                    "undefined" &&
                                                errors.youtube.length > 0
                                            }
                                            onChange={e => handleFieldChange(e)}
                                        />
                                        <FormFeedback>
                                            {errors.youtube}
                                        </FormFeedback>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="tiktok">TikTok</Label>
                                        <Input
                                            name="tiktok"
                                            id="tiktok"
                                            type="url"
                                            invalid={
                                                typeof errors.tiktok !==
                                                    "undefined" &&
                                                errors.tiktok.length > 0
                                            }
                                            onChange={e => handleFieldChange(e)}
                                        />
                                        <FormFeedback>
                                            {errors.tiktok}
                                        </FormFeedback>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="socialMediaFrequency">
                                            How frequently do you post to social
                                            media?
                                        </Label>
                                        <CustomInput
                                            name="socialMediaFrequency"
                                            id="socialMediaFrequency"
                                            type="select"
                                            onChange={e => handleFieldChange(e)}
                                        >
                                            <option value="" selected disabled>
                                                Select your posting frequency
                                            </option>
                                            <option value="once or fewer per month">
                                                Once or fewer times per month
                                            </option>
                                            <option value="Once or twice per week">
                                                Once or twice per week
                                            </option>
                                            <option value="daily">Daily</option>
                                        </CustomInput>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="socialMediaFollowing">
                                            How large would you say your
                                            following is?
                                        </Label>
                                        <CustomInput
                                            name="socialMediaFollowing"
                                            id="socialMediaFollowing"
                                            type="select"
                                            onChange={e => handleFieldChange(e)}
                                        >
                                            <option value="" selected disabled>
                                                Select your social media
                                                following
                                            </option>
                                            <option value="Less than 50">
                                                Less than 50
                                            </option>
                                            <option value="Between 50 and 200">
                                                Between 50 and 200
                                            </option>
                                            <option value="Between 200 and 1000">
                                                Between 200 and 1000
                                            </option>
                                            <option value="Greater than 1000">
                                                Greater than 1000
                                            </option>
                                        </CustomInput>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row form className="my-5">
                                <Col xs={12}>
                                    <h2>Audience</h2>
                                </Col>
                                <Col xs={12} sm={6} className="pr-sm-5">
                                    <FormGroup>
                                        <Label for="idealCustomer">
                                            Tell us about your ideal customer.{" "}
                                            <span className="text-danger">
                                                *
                                            </span>
                                        </Label>
                                        <Input
                                            name="idealCustomer"
                                            id="idealCustomer"
                                            type="textarea"
                                            rows="4"
                                            required
                                            invalid={
                                                typeof errors.idealCustomer !==
                                                    "undefined" &&
                                                errors.idealCustomer.length > 0
                                            }
                                            onChange={e => handleFieldChange(e)}
                                        />
                                        <FormFeedback>
                                            {errors.idealCustomer}
                                        </FormFeedback>
                                        <FormText>
                                            <strong>Eg:</strong> Who are they?
                                            How old are they? Do they identify
                                            as a specific gender, if so, which?
                                            What are their interests?
                                        </FormText>
                                    </FormGroup>
                                </Col>
                                <Col xs={12} sm={6} className="pl-sm-5">
                                    <FormGroup>
                                        <Label for="top5reasons">
                                            What are the top 5 reasons your
                                            ideal customer will visit your
                                            website?{" "}
                                            <span className="text-danger">
                                                *
                                            </span>
                                        </Label>
                                        <Input
                                            name="top5reasons"
                                            id="top5reasons"
                                            type="textarea"
                                            rows="4"
                                            required
                                            invalid={
                                                typeof errors.idealCustomer !==
                                                    "undefined" &&
                                                errors.idealCustomer.length > 0
                                            }
                                            onChange={e => handleFieldChange(e)}
                                        />
                                        <FormFeedback>
                                            {errors.idealCustomer}
                                        </FormFeedback>
                                        <FormText>
                                            <strong>Eg:</strong> make a
                                            purchase, get information about your
                                            product(s), ask questions about
                                            products/services, learn your
                                            pricing, schedule an appointment, or
                                            get your contact information
                                        </FormText>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row form className="my-5">
                                <Col xs={12}>
                                    <h2>About the project</h2>
                                </Col>
                                <Col xs={12} sm={6} className="pr-sm-5">
                                    <FormGroup>
                                        <Label for="projectType">
                                            What type of project is this?{" "}
                                            <span className="text-danger">
                                                *
                                            </span>
                                        </Label>
                                        <CustomInput
                                            type="select"
                                            name="projectType"
                                            id="projectType"
                                            required
                                            invalid={
                                                typeof errors.projectType !==
                                                    "undefined" &&
                                                errors.projectType.length > 0
                                            }
                                            onChange={e => handleFieldChange(e)}
                                        >
                                            <option value="" selected disabled>
                                                Select your project type
                                            </option>
                                            <option value="Web Design">
                                                Web Design
                                            </option>
                                            <option value="Software Development">
                                                Software Development
                                            </option>
                                            <option value="E-commerce">
                                                E-commerce
                                            </option>
                                            <option value="Digital Marketing">
                                                Digital Marketing
                                            </option>
                                            <option value="Consulting">
                                                Consulting
                                            </option>
                                        </CustomInput>
                                        <FormFeedback>
                                            {errors.projectType}
                                        </FormFeedback>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="projectBudget">
                                            What budget have you allocated for
                                            this project?{" "}
                                            <span className="text-danger">
                                                *
                                            </span>
                                        </Label>
                                        <CustomInput
                                            type="select"
                                            name="projectBudget"
                                            id="projectBudget"
                                            required
                                            invalid={
                                                typeof errors.projectBudget !==
                                                    "undefined" &&
                                                errors.projectBudget.length > 0
                                            }
                                            onChange={e => handleFieldChange(e)}
                                        >
                                            <option value="" selected disabled>
                                                Select your budget range
                                            </option>
                                            <option value="Below $3,500">
                                                Less than $3,500
                                            </option>
                                            <option value="$3,500 - $5K">
                                                $3,500 - $5K
                                            </option>
                                            <option value="$5K - $10K">
                                                $5K - $10K
                                            </option>
                                            <option value="$10K - $15K">
                                                $10K - $15K
                                            </option>
                                            <option value="$15K - $20K">
                                                $15K - $20K
                                            </option>
                                            <option value="$20K+">$20K+</option>
                                            <option value="Not sure">
                                                Not sure
                                            </option>
                                        </CustomInput>
                                        <FormFeedback>
                                            {errors.projectBudget}
                                        </FormFeedback>
                                        <FormText>
                                            Be honest and we will tell you what
                                            we can and can&apos;t do.
                                        </FormText>
                                    </FormGroup>

                                    <FormGroup>
                                        <Label for="timeframe">
                                            What timeframe do you need this
                                            project delivered by?{" "}
                                            <span className="text-danger">
                                                *
                                            </span>
                                        </Label>
                                        <Input
                                            name="timeframe"
                                            id="timeframe"
                                            type="text"
                                            required
                                            invalid={
                                                typeof errors.timeframe !==
                                                    "undefined" &&
                                                errors.timeframe.length > 0
                                            }
                                            onChange={e => handleFieldChange(e)}
                                        />
                                        <FormFeedback>
                                            {errors.timeframe}
                                        </FormFeedback>
                                        <FormText>
                                            <strong>Note:</strong> Websites
                                            typically take 1 to 3 months based
                                            on complexity and type.
                                        </FormText>
                                    </FormGroup>
                                </Col>
                                <Col xs={12} sm={6} className="pl-sm-5">
                                    <FormGroup>
                                        <Label for="decisionMakers">
                                            Who are the decision makers for this
                                            project?
                                        </Label>
                                        <Input
                                            name="decisionMakers"
                                            id="decisionMakers"
                                            type="textarea"
                                            rows="4"
                                            onChange={e => handleFieldChange(e)}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="contentReady">
                                            Do you have high quality photos and
                                            content ready?{" "}
                                            <span className="text-danger">
                                                *
                                            </span>
                                        </Label>
                                        <CustomInput
                                            name="contentReady"
                                            id="contentReady"
                                            type="select"
                                            required
                                            invalid={
                                                typeof errors.contentReady !==
                                                    "undefined" &&
                                                errors.contentReady.length > 0
                                            }
                                            onChange={e => handleFieldChange(e)}
                                        >
                                            <option value="Yes, I have everything ready">
                                                Yes - I have everything ready
                                            </option>
                                            <option value="Not yet but it's being created now">
                                                Not yet but it&apos;s being
                                                created now
                                            </option>
                                            <option value="No, We are still working on it">
                                                No, We are still working on it
                                            </option>
                                            <option value="No, We need your help">
                                                No, We need your help
                                            </option>
                                        </CustomInput>
                                        <FormFeedback>
                                            {errors.contentReady}
                                        </FormFeedback>
                                        <FormText>
                                            <strong>Note:</strong> Content
                                            includes a list of the pages you
                                            need, well-written text for each
                                            section as well as high-quality
                                            photos. If you need help with this,
                                            please let us know.
                                        </FormText>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row form className="my-5">
                                <Col xs={12}>
                                    <h2>Project Goals and Focus</h2>
                                    <h3 className="my-4">
                                        What are your main reasons for needing
                                        this project?
                                    </h3>
                                </Col>
                                <Col xs={12} className="my-4">
                                    <p>
                                        To get from killer idea to successful
                                        project launch it’s imperative to set{" "}
                                        <a
                                            href="https://www.mindtools.com/pages/article/smart-goals.htm"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <strong className="text-alk-blue">
                                                SMART
                                            </strong>
                                        </a>{" "}
                                        goals. Clearly defined goals will ensure
                                        that we all stay on the same page and
                                        keep moving in the same direction. (
                                        <strong>SMART</strong> goals are:
                                        Specific, Measurable, Achievable,
                                        Relevant and Time-bound.)
                                        <br />
                                        <br />
                                        <strong>
                                            Some examples of SMART goals are:
                                        </strong>{" "}
                                        20% increase in traffic in 3 month, 15%
                                        increase in sales in 6 months, or 100
                                        new followers in 2 months
                                        <br />
                                        <br />
                                        With this in mind, what are the top 5
                                        key objectives of your new project?
                                    </p>
                                </Col>
                                <Col xs={12} sm={6} className="pr-sm-5">
                                    <FormGroup>
                                        <Label for="goal1">Goal #1</Label>
                                        <Input
                                            name="goal1"
                                            id="goal1"
                                            type="text"
                                            onChange={e => handleFieldChange(e)}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="goal2">Goal #2</Label>
                                        <Input
                                            name="goal2"
                                            id="goal2"
                                            type="text"
                                            onChange={e => handleFieldChange(e)}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="goal3">Goal #3</Label>
                                        <Input
                                            name="goal3"
                                            id="goal3"
                                            type="text"
                                            onChange={e => handleFieldChange(e)}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col xs={12} sm={6} className="pl-sm-5">
                                    <FormGroup>
                                        <Label for="goal4">Goal #4</Label>
                                        <Input
                                            name="goal4"
                                            id="goal4"
                                            type="text"
                                            onChange={e => handleFieldChange(e)}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="goal5">Goal #5</Label>
                                        <Input
                                            name="goal5"
                                            id="goal5"
                                            type="text"
                                            onChange={e => handleFieldChange(e)}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>

                            {formValues.projectType.toLowerCase() ===
                            "web design" ? (
                                <Row form className="my-5">
                                    <Col xs={12}>
                                        <h3>Website Designs</h3>
                                    </Col>

                                    <Col xs={12} sm={6} className="pr-sm-5">
                                        <FormGroup>
                                            <Label for="currentWebsiteWins">
                                                Is there anything about your
                                                current website that serves the
                                                business well and if so, why?
                                            </Label>
                                            <Input
                                                name="currentWebsiteWins"
                                                id="currentWebsiteWins"
                                                type="textarea"
                                                rows="4"
                                                onChange={e =>
                                                    handleFieldChange(e)
                                                }
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col xs={12} sm={6} className="pl-sm-5">
                                        <Row form tag="fieldset">
                                            <Col xs={12}>
                                                If you currently have a website,
                                                would you agree to switching to
                                                our preferred host?
                                            </Col>
                                            <Col xs={12}>
                                                <FormGroup check>
                                                    <Label check>
                                                        <Input
                                                            onChange={e =>
                                                                handleFieldChange(
                                                                    e
                                                                )
                                                            }
                                                            checked={
                                                                formValues.willSwitchHost ===
                                                                "yes"
                                                            }
                                                            type="radio"
                                                            name="willSwitchHost"
                                                            value="yes"
                                                        />{" "}
                                                        Yes
                                                    </Label>
                                                </FormGroup>
                                            </Col>
                                            <Col xs={12}>
                                                <FormGroup check>
                                                    <Label check>
                                                        <Input
                                                            onChange={e =>
                                                                handleFieldChange(
                                                                    e
                                                                )
                                                            }
                                                            checked={
                                                                formValues.willSwitchHost ===
                                                                "no"
                                                            }
                                                            type="radio"
                                                            name="willSwitchHost"
                                                            value="no"
                                                        />{" "}
                                                        No
                                                    </Label>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            ) : null}

                            <Row form className="my-5">
                                <Col xs={12}>
                                    <h2>Design Conceptualization</h2>
                                </Col>

                                <Col xs={12} sm={6} className="pr-sm-5">
                                    <FormGroup>
                                        <Label for="brandFeeling">
                                            How do you want people to feel when
                                            they interact with your brand?
                                        </Label>
                                        <Input
                                            name="brandFeeling"
                                            id="brandFeeling"
                                            type="textarea"
                                            rows="4"
                                            onChange={e => handleFieldChange(e)}
                                        />
                                        <FormText>
                                            <strong>Eg:</strong> Safe and
                                            secure, edgy and excited, exclusive
                                            and cool, like they belong
                                        </FormText>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="competitorWebsites">
                                            Do your competitors have websites?
                                        </Label>
                                        <Input
                                            name="competitorWebsites"
                                            id="competitorWebsites"
                                            type="textarea"
                                            rows="4"
                                            onChange={e => handleFieldChange(e)}
                                        />
                                        <FormText>
                                            If they do, please make sure to list
                                            them. This way we can ensure that
                                            yours is better!
                                        </FormText>
                                    </FormGroup>
                                </Col>
                                <Col xs={12} sm={6} className="pl-sm-5">
                                    <FormGroup>
                                        <Label for="top3Competitors">
                                            Who are your top 3 competitors?
                                        </Label>
                                        <Input
                                            name="top3Competitors"
                                            id="top3Competitors"
                                            type="textarea"
                                            rows="4"
                                            onChange={e => handleFieldChange(e)}
                                        />
                                        <FormText>
                                            Let us know who is competing for the
                                            attention of your ideal customer and
                                            what they are doing that you feel is
                                            working.
                                        </FormText>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="websitesForDesignAesthetic">
                                            Are there any other websites in
                                            particular that you like the design
                                            of? Why?
                                        </Label>
                                        <Input
                                            name="websitesForDesignAesthetic"
                                            id="websitesForDesignAesthetic"
                                            type="textarea"
                                            rows="4"
                                            onChange={e => handleFieldChange(e)}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row form className="my-5">
                                <Col xs={12}>
                                    <h2>
                                        And finally, what will success look
                                        like?
                                    </h2>
                                </Col>

                                <Col xs={12} sm={6} className="pr-sm-5">
                                    <FormGroup>
                                        <Label for="successLooksLike">
                                            If we were to be celebrating success
                                            in 12 months time, what would that
                                            have to look like?{" "}
                                            <span className="text-danger">
                                                *
                                            </span>
                                        </Label>
                                        <Input
                                            name="successLooksLike"
                                            id="successLooksLike"
                                            type="textarea"
                                            rows="4"
                                            required
                                            invalid={
                                                typeof errors.successLooksLike !==
                                                    "undefined" &&
                                                errors.successLooksLike.length >
                                                    0
                                            }
                                            onChange={e => handleFieldChange(e)}
                                        />
                                        <FormFeedback>
                                            {errors.successLooksLike}
                                        </FormFeedback>
                                        <FormText>
                                            How many website visitors? How many
                                            leads? How many sales? Be as
                                            descriptive as you possibly can.
                                        </FormText>
                                    </FormGroup>
                                </Col>
                                <Col xs={12} sm={6} className="pl-sm-5">
                                    <FormGroup>
                                        <Label for="additionalComments">
                                            Anything else you feel we should
                                            know?
                                        </Label>
                                        <Input
                                            name="additionalComments"
                                            id="additionalComments"
                                            type="textarea"
                                            rows="4"
                                            onChange={e => handleFieldChange(e)}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} className="my-2 py-0">
                                    <FormGroup>
                                        <Recaptcha handleChange={handleRecaptcha} />
                                        <FormText
                                            color="danger"
                                            className="text-center"
                                        >
                                            {errors.ReCAPTCHA}
                                        </FormText>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <input
                                type="hidden"
                                name="form-name"
                                value="project-enquiry-form"
                            />
                            <input
                                type="hidden"
                                name="bot-field"
                                className="hp"
                            />
                            <Button onClick={handleSubmit} color="primary">
                                Send Enquiry
                            </Button>
                        </Form>
                    </section>
                )}
            </Layout>
        </ScrollWrapper>
    );
};

const handleScroll = () => {};

export const query = graphql`
           {
               enquiryJson {
                   sections {
                       id
                       blocks {
                           heading
                           content
                       }
                   }
               }

               doMore: file(relativePath: { regex: "/do-more-desktop.jpg/" }) {
                   ...fluidImageLG
               }

               doMoreMobile: file(relativePath: { regex: "/do-more-mobile.jpg/" }) {
                   ...fluidImageSmall
               }
           }
       `;

export default ProjectEnquiry;
