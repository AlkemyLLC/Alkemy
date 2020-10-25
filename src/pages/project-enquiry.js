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

    const [errorText,setErrorText] = useState("")
    const [firstName,setFirstName] = useState("")
    const [lastName,setLastName] = useState("")
    const [email,setEmail] = useState("")

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
                  `linear-gradient(to bottom, rgba(255,255,255,.25) , white 25vh)`,
              ].reverse();

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

                <section className="section--beginnings alk-container my-4">
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

                    <hr />
                    <Form onSubmit={e => e.preventDefault()}>
                        <Row form className="my-5">
                            <Col xs={12}>
                                <h2>Business Snapshot</h2>
                                <p>
                                    First, let&apos;s get a general idea about
                                    you and your business.
                                </p>
                            </Col>
                            <Col xs={12} sm={6} className="pr-sm-5">
                                <Row form>
                                    <Col xs={12} sm={6}>
                                        <FormGroup>
                                            <Label for="firstName">
                                                First name{" "}
                                                <span className="text-red">
                                                    *
                                                </span>
                                            </Label>
                                            <Input
                                                name="firstName"
                                                id="firstName"
                                                type="text"
                                                required
                                                onChange={e =>
                                                    setFirstName(e.target.value)
                                                }
                                            />
                                            <FormFeedback>
                                                {errorText}
                                            </FormFeedback>
                                        </FormGroup>
                                    </Col>
                                    <Col xs={12} sm={6}>
                                        <FormGroup>
                                            <Label for="lastName">
                                                Last name{" "}
                                                <span className="text-red">
                                                    *
                                                </span>
                                            </Label>
                                            <Input
                                                name="lastName"
                                                id="lastName"
                                                type="text"
                                                required
                                                onChange={e =>
                                                    setLastName(e.target.value)
                                                }
                                            />
                                            <FormFeedback>
                                                {errorText}
                                            </FormFeedback>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <FormGroup>
                                    <Label for="contactNumber">
                                        Contact number{" "}
                                        <span className="text-red">*</span>
                                    </Label>
                                    <Input
                                        name="contactNumber"
                                        id="contactNumber"
                                        type="tel"
                                        required
                                        onChange={e =>
                                            setFirstName(e.target.value)
                                        }
                                    />
                                    <FormFeedback>{errorText}</FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="website">
                                        What&apos;s your current website
                                        address?
                                    </Label>
                                    <Input
                                        name="website"
                                        id="website"
                                        type="url"
                                        onChange={e =>
                                            setFirstName(e.target.value)
                                        }
                                    />
                                    <FormFeedback>{errorText}</FormFeedback>
                                </FormGroup>
                            </Col>
                            <Col xs={12} sm={6} className="pl-sm-5">
                                <FormGroup>
                                    <Label for="email">
                                        Email{" "}
                                        <span className="text-red">*</span>
                                    </Label>
                                    <Input
                                        name="email"
                                        id="email"
                                        type="email"
                                        required
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                    <FormFeedback>{errorText}</FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="companyName">
                                        What&apos;s the name of your company?{" "}
                                        <span className="text-red">*</span>
                                    </Label>
                                    <Input
                                        name="companyName"
                                        id="companyName"
                                        type="text"
                                        required
                                        onChange={e =>
                                            setFirstName(e.target.value)
                                        }
                                    />
                                    <FormFeedback>{errorText}</FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="companyIndustry">
                                        What does your company do?{" "}
                                        <span className="text-red">*</span>
                                    </Label>
                                    <Input
                                        name="companyIndustry"
                                        id="companyIndustry"
                                        type="textarea"
                                        required
                                        onChange={e =>
                                            setFirstName(e.target.value)
                                        }
                                    />
                                    <FormFeedback>{errorText}</FormFeedback>
                                    <FormText>
                                        What are the products and services you
                                        offer?
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
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                    <FormFeedback>{errorText}</FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="twitter">Twitter</Label>
                                    <Input
                                        name="twitter"
                                        id="twitter"
                                        type="url"
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                    <FormFeedback>{errorText}</FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="instagram">Instagram</Label>
                                    <Input
                                        name="instagram"
                                        id="instagram"
                                        type="url"
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                    <FormFeedback>{errorText}</FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="linkedin">Linkedin</Label>
                                    <Input
                                        name="linkedin"
                                        id="linkedin"
                                        type="url"
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                    <FormFeedback>{errorText}</FormFeedback>
                                </FormGroup>
                            </Col>
                            <Col xs={12} sm={6} className="pl-sm-5">
                                <FormGroup>
                                    <Label for="youtube">Youtube</Label>
                                    <Input
                                        name="youtube"
                                        id="youtube"
                                        type="url"
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                    <FormFeedback>{errorText}</FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="tiktok">TikTok</Label>
                                    <Input
                                        name="tiktok"
                                        id="tiktok"
                                        type="url"
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                    <FormFeedback>{errorText}</FormFeedback>
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
                                        onChange={e =>
                                            setFirstName(e.target.value)
                                        }
                                    >
                                        <option value="" selected disabled>
                                            Select your posting frequency
                                        </option>
                                        <option value="once or less per month">
                                            Once or fewer times per month
                                        </option>
                                        <option value="Once or twice per week">
                                            Once or twice per week
                                        </option>
                                        <option value="daily">Daily</option>
                                    </CustomInput>
                                    <FormFeedback>{errorText}</FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="socialMediaFollowing">
                                        How large would you say your following
                                        is?
                                    </Label>
                                    <CustomInput
                                        name="socialMediaFollowing"
                                        id="socialMediaFollowing"
                                        type="select"
                                        onChange={e =>
                                            setFirstName(e.target.value)
                                        }
                                    >
                                        <option value="" selected disabled>
                                            Select your social media following
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
                                    <FormFeedback>{errorText}</FormFeedback>
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
                                        <span className="text-red">*</span>
                                    </Label>
                                    <Input
                                        name="idealCustomer"
                                        id="idealCustomer"
                                        type="textarea"
                                        required
                                        onChange={e =>
                                            setFirstName(e.target.value)
                                        }
                                    />
                                    <FormFeedback>{errorText}</FormFeedback>
                                    <FormText>
                                        <strong>Eg:</strong> Who are they? How
                                        old are they? Do they identify as a
                                        specific gender, if so, which? What are
                                        their interests?
                                    </FormText>
                                </FormGroup>
                            </Col>
                            <Col xs={12} sm={6} className="pl-sm-5">
                                <FormGroup>
                                    <Label for="top5reasons">
                                        What are the top 5 reasons your ideal
                                        customer will visit your website?{" "}
                                        <span className="text-red">*</span>
                                    </Label>
                                    <Input
                                        name="top5reasons"
                                        id="top5reasons"
                                        type="textarea"
                                        required
                                        onChange={e =>
                                            setFirstName(e.target.value)
                                        }
                                    />
                                    <FormFeedback>{errorText}</FormFeedback>
                                    <FormText>
                                        <strong>Eg:</strong> make a purchase,
                                        get information about your product(s),
                                        ask questions about products/services,
                                        learn your pricing, schedule an
                                        appointment, or get your contact
                                        information
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
                                        <span className="text-red">*</span>
                                    </Label>
                                    <CustomInput
                                        type="select"
                                        name="projectType"
                                        id="projectType"
                                        required
                                        onChange={e =>
                                            setFirstName(e.target.value)
                                        }
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
                                    <FormFeedback>{errorText}</FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="projectBudget">
                                        What budget have you allocated for this
                                        project?{" "}
                                        <span className="text-red">*</span>
                                    </Label>
                                    <CustomInput
                                        type="select"
                                        name="projectBudget"
                                        id="projectBudget"
                                        required
                                        onChange={e =>
                                            setFirstName(e.target.value)
                                        }
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
                                    <FormFeedback>{errorText}</FormFeedback>
                                    <FormText>
                                        Be honest and we will tell you what we
                                        can and can&apos;t do.
                                    </FormText>
                                </FormGroup>

                                <FormGroup>
                                    <Label for="timeframe">
                                        What timeframe do you need this project
                                        delivered by?{" "}
                                        <span className="text-red">*</span>
                                    </Label>
                                    <Input
                                        name="timeframe"
                                        id="timeframe"
                                        type="text"
                                        required
                                        onChange={e =>
                                            setFirstName(e.target.value)
                                        }
                                    />
                                    <FormFeedback>{errorText}</FormFeedback>
                                    <FormText>
                                        <strong>Note:</strong> Websites
                                        typically take 1 to 3 months based on
                                        complexity and type.
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
                                        onChange={e =>
                                            setFirstName(e.target.value)
                                        }
                                    />
                                    <FormFeedback>{errorText}</FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="contentReady">
                                        Do you have high quality photos and
                                        content ready?{" "}
                                        <span className="text-red">*</span>
                                    </Label>
                                    <CustomInput
                                        name="contentReady"
                                        id="contentReady"
                                        type="select"
                                        required
                                        onChange={e =>
                                            setFirstName(e.target.value)
                                        }
                                    >
                                        <option value="Yes, I have everything ready">
                                            Yes - I have everything ready
                                        </option>
                                        <option value="Not yet but it's being created now">
                                            Not yet but it&apos;s being created
                                            now
                                        </option>
                                        <option value="No, We are still working on it">
                                            No, We are still working on it
                                        </option>
                                        <option value="No, We need your help">
                                            No, We need your help
                                        </option>
                                    </CustomInput>
                                    <FormFeedback>{errorText}</FormFeedback>
                                    <FormText>
                                        <strong>Note:</strong> Content includes
                                        a list of the pages you need,
                                        well-written text for each section as
                                        well as high-quality photos. If you need
                                        help with this, please let us know.
                                    </FormText>
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row form className="my-5">
                            <Col xs={12}>
                                <h2>Project Goals and Focus</h2>
                                <h3 className="my-4">
                                    What are your main reasons for needing this
                                    project?
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
                                    that we all stay on the same page and keep
                                    moving in the same direction. (
                                    <strong>SMART</strong> goals are: Specific,
                                    Measurable, Achievable, Relevant and
                                    Time-bound.)
                                    <br />
                                    <br />
                                    <strong>
                                        Some examples of SMART goals are:
                                    </strong>{" "}
                                    20% increase in traffic in 3 month, 15%
                                    increase in sales in 6 months, or 100 new
                                    followers in 2 months
                                    <br />
                                    <br />
                                    With this in mind, what are the top 5 key
                                    objectives of your new project?
                                </p>
                            </Col>
                            <Col xs={12} sm={6} className="pr-sm-5">
                                <FormGroup>
                                    <Label for="projectType">
                                        What type of project is this?{" "}
                                        <span className="text-red">*</span>
                                    </Label>
                                    <CustomInput
                                        type="select"
                                        name="projectType"
                                        id="projectType"
                                        required
                                        onChange={e =>
                                            setFirstName(e.target.value)
                                        }
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
                                    <FormFeedback>{errorText}</FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="projectBudget">
                                        What budget have you allocated for this
                                        project?{" "}
                                        <span className="text-red">*</span>
                                    </Label>
                                    <CustomInput
                                        type="select"
                                        name="projectBudget"
                                        id="projectBudget"
                                        required
                                        onChange={e =>
                                            setFirstName(e.target.value)
                                        }
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
                                    <FormFeedback>{errorText}</FormFeedback>
                                    <FormText>
                                        Be honest and we will tell you what we
                                        can and can&apos;t do.
                                    </FormText>
                                </FormGroup>

                                <FormGroup>
                                    <Label for="timeframe">
                                        What timeframe do you need this project
                                        delivered by?{" "}
                                        <span className="text-red">*</span>
                                    </Label>
                                    <Input
                                        name="timeframe"
                                        id="timeframe"
                                        type="text"
                                        required
                                        onChange={e =>
                                            setFirstName(e.target.value)
                                        }
                                    />
                                    <FormFeedback>{errorText}</FormFeedback>
                                    <FormText>
                                        <strong>Note:</strong> Websites
                                        typically take 1 to 3 months based on
                                        complexity and type.
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
                                        onChange={e =>
                                            setFirstName(e.target.value)
                                        }
                                    />
                                    <FormFeedback>{errorText}</FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="contentReady">
                                        Do you have high quality photos and
                                        content ready?{" "}
                                        <span className="text-red">*</span>
                                    </Label>
                                    <CustomInput
                                        name="contentReady"
                                        id="contentReady"
                                        type="select"
                                        required
                                        onChange={e =>
                                            setFirstName(e.target.value)
                                        }
                                    >
                                        <option value="Yes, I have everything ready">
                                            Yes - I have everything ready
                                        </option>
                                        <option value="Not yet but it's being created now">
                                            Not yet but it&apos;s being created
                                            now
                                        </option>
                                        <option value="No, We are still working on it">
                                            No, We are still working on it
                                        </option>
                                        <option value="No, We need your help">
                                            No, We need your help
                                        </option>
                                    </CustomInput>
                                    <FormFeedback>{errorText}</FormFeedback>
                                    <FormText>
                                        <strong>Note:</strong> Content includes
                                        a list of the pages you need,
                                        well-written text for each section as
                                        well as high-quality photos. If you need
                                        help with this, please let us know.
                                    </FormText>
                                </FormGroup>
                            </Col>
                        </Row>

                        <h2>What Are We Doing?</h2>
                        <h2>
                            What are your main reasons for needing this project?
                        </h2>
                        <p>
                            It&apos;s helpful to set SMART goals as it keeps all
                            of us on the same page and moving in the same
                            direction. IE: Goals that are specific, measurable,
                            achievable, relevant and time-bound.
                            <br />
                            <br />
                            With this in mind, what are the top 5 business needs
                            of your new website?
                            <br />
                            <br />
                            EG: 20% increase in sales in 6 months, 30% increase
                            in membership this year, reduce admin costs by 15%
                            in 3 months
                        </p>
                        <label>Goal #1</label>
                        <input
                            name="input_9"
                            id="input_12_9"
                            type="text"
                            value=""
                            className=""
                            aria-invalid="false"
                        />
                        <label>Goal #2</label>
                        <input
                            name="input_10"
                            id="input_12_10"
                            type="text"
                            value=""
                            className=""
                            aria-invalid="false"
                        />
                        <label>Goal #3</label>
                        <input
                            name="input_11"
                            id="input_12_11"
                            type="text"
                            value=""
                            className=""
                            aria-invalid="false"
                        />
                        <label>Goal #4</label>
                        <input
                            name="input_12"
                            id="input_12_12"
                            type="text"
                            value=""
                            className=""
                            aria-invalid="false"
                        />
                        <label>Goal #5</label>
                        <input
                            name="input_13"
                            id="input_12_13"
                            type="text"
                            value=""
                            className=""
                            aria-invalid="false"
                        />

                        <label>
                            For websites: is there anything about your current
                            site that serves the business well and if so, why?
                        </label>
                        <textarea
                            name="input_14"
                            id="input_12_14"
                            className=""
                            aria-invalid="false"
                            rows="10"
                            cols="50"
                        ></textarea>

                        <h2>Who Are We Doing This For?</h2>
                        <label>
                            Tell us about your ideal customer. Who are they? How
                            old are they? What gender are they? Where do they
                            hang out online? What are their interests? *
                        </label>
                        <textarea
                            name="input_16"
                            id="input_12_16"
                            className=""
                            rows="10"
                            cols="50"
                        ></textarea>

                        <label>
                            What are the top 5 reasons your ideal customer will
                            visit your website? *
                        </label>
                        <p>
                            EG: research product information, get contact
                            details, ask questions about services, pricing
                        </p>
                        <textarea
                            name="input_17"
                            id="input_12_17"
                            className=""
                            rows="10"
                            cols="50"
                        ></textarea>

                        <h2>Design Concept</h2>
                        <label>
                            How do you want people to feel when they interact
                            with your brand? Safe and secure, edgy and excited,
                            exclusive and cool, like they belong? *
                        </label>
                        <textarea
                            name="input_19"
                            id="input_12_19"
                            className=""
                            rows="10"
                            cols="50"
                        ></textarea>
                        <label>
                            Do your competitors have websites? If so, list them
                            here so we can make sure yours is better 🙂 *
                        </label>
                        <textarea
                            name="input_20"
                            id="input_12_20"
                            className=""
                            rows="10"
                            cols="50"
                        ></textarea>
                        <label>
                            Tell us about your competitors. Who else is
                            competing for the attention of your ideal customer
                            and what are they doing that you think is working? *
                        </label>
                        <textarea
                            name="input_21"
                            id="input_12_21"
                            className=""
                            rows="10"
                            cols="50"
                        ></textarea>
                        <label>
                            Are there any other websites in particular that you
                            like the design of? Why? *
                        </label>
                        <textarea
                            name="input_22"
                            id="input_12_22"
                            className=""
                            rows="10"
                            cols="50"
                        ></textarea>

                        <h2>What Does Success Look Like?</h2>
                        <label>
                            If we were to be celebrating success in 12 months
                            time, what would that have to look like? How many
                            website visitors? How many leads? How many sales? Be
                            as descriptive as you possibly can. *
                        </label>
                        <textarea
                            name="input_24"
                            id="input_12_24"
                            className=""
                            rows="10"
                            cols="50"
                        ></textarea>
                        <label>
                            Finally: anything else you want to let us know?
                        </label>
                        <textarea
                            name="input_25"
                            id="input_12_25"
                            className=""
                            rows="10"
                            cols="50"
                        ></textarea>

                        <input type="submit" value="Send Enquiry" />
                    </Form>
                </section>
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
