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

                <section className="section--beginnings alk-container">
                    <p>
                        {data.enquiryJson &&
                            data.enquiryJson.sections[0].blocks[0].content}
                    </p>

                    <h2>
                        {data.enquiryJson &&
                            data.enquiryJson.sections[1].blocks[0].heading}
                    </h2>
                    <p>
                        Too often, people don&apos;t ask enough questions and
                        this can lead to many unforseen circumstances and
                        problems. This form is an effort to make sure that we
                        lay the groundwork for something amazing to come. Below
                        you will find an your opportunity to explain why you
                        need a website and what key objectives the website
                        should achieve.
                        <br />
                        <br />
                        <strong>Remember:</strong> Our goal is your success so
                        the more information you give us here, the better the
                        solution we will be able to provide will be.
                    </p>

                    <Form className="container mx-auto">
                        <h2>Business Snapshot</h2>
                        <p>
                            First, let&apos;s get a general idea about you and
                            your business.
                        </p>

                        <FormGroup>
                            <Label for="firstName">First name</Label>
                            <Input
                                name="firstName"
                                id="firstName"
                                type="text"
                                required
                                onChange={e => setFirstName(e.target.value)}
                            />
                            <FormFeedback>{errorText}</FormFeedback>
                        </FormGroup>

                        <FormGroup>
                            <Label for="lastName">Last name</Label>
                            <Input
                                name="lastName"
                                id="lastName"
                                type="text"
                                required
                                onChange={e => setLastName(e.target.value)}
                            />
                            <FormFeedback>{errorText}</FormFeedback>
                        </FormGroup>

                        <FormGroup>
                            <Label for="email">Email</Label>
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
                            <Label for="contactNumber">Contact number</Label>
                            <Input
                                name="contactNumber"
                                id="contactNumber"
                                type="tel"
                                required
                                onChange={e => setFirstName(e.target.value)}
                            />
                            <FormFeedback>{errorText}</FormFeedback>
                        </FormGroup>

                        <FormGroup>
                            <Label for="companyName">
                                What’s the name of your company?
                            </Label>
                            <Input
                                name="companyName"
                                id="companyName"
                                type="text"
                                required
                                onChange={e => setFirstName(e.target.value)}
                            />
                            <FormFeedback>{errorText}</FormFeedback>
                        </FormGroup>

                        <FormGroup>
                            <Label for="companyIndustry">
                                What does your company do?
                            </Label>
                            <Input
                                name="companyIndustry"
                                id="companyIndustry"
                                type="textarea"
                                required
                                onChange={e => setFirstName(e.target.value)}
                            />
                            <FormFeedback>{errorText}</FormFeedback>
                            <FormText>
                                What are the products and services you offer?
                            </FormText>
                        </FormGroup>

                        <FormGroup>
                            <Label for="decisionMakers">
                                Who are the decision makers for this project?
                            </Label>
                            <Input
                                name="decisionMakers"
                                id="decisionMakers"
                                type="textarea"
                                required
                                onChange={e => setFirstName(e.target.value)}
                            />
                            <FormFeedback>{errorText}</FormFeedback>
                        </FormGroup>

                        <FormGroup>
                            <Label for="projectBudget">
                                What budget have you allocated for this project?
                            </Label>
                            <Input
                                type="select"
                                name="projectBudget"
                                id="projectBudget"
                                required
                                onChange={e => setFirstName(e.target.value)}
                            >
                                <option value="" selected>
                                    Select your budget range
                                </option>
                                <option value="Below $3,500">
                                    Less than $3,500
                                </option>
                                <option value="$3,500 - $5K">
                                    $3,500 - $5K
                                </option>
                                <option value="$5K - $10K">$5K - $10K</option>
                                <option value="$10K - $15K">$10K - $15K</option>
                                <option value="$15K - $20K">$15K - $20K</option>
                                <option value="$20K+">$20K+</option>
                                <option value="Not sure">Not sure</option>
                            </Input>
                            <FormFeedback>{errorText}</FormFeedback>
                            <FormText>
                                Be honest and we will tell you what we can and
                                can&apos;t do.
                            </FormText>
                        </FormGroup>

                        <FormGroup>
                            <Label for="timeframe">
                                What timeframe do you need this project
                                delivered by?
                            </Label>
                            <Input
                                name="timeframe"
                                id="timeframe"
                                type="text"
                                required
                                onChange={e => setFirstName(e.target.value)}
                            />
                            <FormFeedback>{errorText}</FormFeedback>
                            <FormText>
                                Note: Websites typically take 1 to 3 months
                                based on complexity and type.
                            </FormText>
                        </FormGroup>

                        <FormGroup>
                            <Label for="contentReady">
                                Do you have high quality photos and content
                                ready?
                            </Label>
                            <Input
                                name="contentReady"
                                id="contentReady"
                                type="select"
                                required
                                onChange={e => setFirstName(e.target.value)}
                            >
                                <option value="Yes, I have everything ready">
                                    Yes - I have everything ready
                                </option>
                                <option value="Not yet but it's being created now">
                                    Not yet but it&apos;s being created now
                                </option>
                                <option value="No, We are still working on it">
                                    No, We are still working on it
                                </option>
                                <option value="No, We need your help">
                                    No, We need your help
                                </option>
                            </Input>
                            <FormFeedback>{errorText}</FormFeedback>
                            <FormText>
                                Content includes a list of the pages you need,
                                well-written text for each section as well as
                                high-quality photos. If you need help with this,
                                please let us know.
                            </FormText>
                        </FormGroup>

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
