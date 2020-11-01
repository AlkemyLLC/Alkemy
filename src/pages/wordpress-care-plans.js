import React, {useState, useEffect} from "react";
import { graphql, Link } from "gatsby";
import Img from "gatsby-image";
import "../utils/utils.js";
import {
    Card,
    Button,
    Col,
    Row,
    CardHeader,
    CardFooter,
    CardBody,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Layout from "../components/layout";
import ScrollWrapper from "../components/scrollWrapper.jsx";
import CarePlanEnrollment from "../components/carePlanEnrollment.jsx";
import SEO from "../components/seo";

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

const WordpressCarePlans = ({ data }) => {
    const [careModal, setCareModal] = useState(false);
    const [plan, setPlan] = useState(null);

    // function for creating a list of Plan features
    const planFeatures = plan => {
        return (
            <ul className="fa-ul w-75 w-lg-100 mx-auto my-3">
                {plan.features.map((feature, index) => {
                    return (
                        <li key={index}>
                            <span className="fa-li">
                                <FontAwesomeIcon
                                    icon="check"
                                    className="planFeatureIcon"
                                />
                            </span>
                            {feature}
                        </li>
                    );
                })}
            </ul>
        );
    };

    const handleShowEnrollment = plan => {
        setPlan(plan);
        setCareModal(!careModal);
    }

    const planCards = plans => {
        let orderClasses = [
            "order-1 order-lg-0 ",
            "order-0 order-lg-1 ",
            "order-2 ",
        ];
        return plans.map((plan, index) => {
            return (
                <Col key={index} xs={12} lg={4} className={orderClasses[index] +"my-auto plan"}>
                    <Card
                        className={
                            orderClasses[index] +
                            "my-4 px-2 py-auto p-md-4 planCard"
                        }
                    >
                        <CardHeader>
                            <h2 className="text-center my-4">{plan.name}</h2>
                            <p className="text-center">
                                Only ${plan.price} per month *
                            </p>
                        </CardHeader>
                        <CardBody>{planFeatures(plan)}</CardBody>
                        <CardFooter>
                            <Button
                                block
                                onClick={e => handleShowEnrollment(plan)}
                                color="secondary"
                            >
                                Enroll Now
                            </Button>
                        </CardFooter>
                    </Card>
                </Col>
            );
        });
    };

    const disclaimers = block => {
        return block.disclaimers.map((note, index) => {
            return (
                <p key={index}>
                    <small>{note}</small>
                </p>
            );
        });
    };

    const getFeatures = () => {
        return data.websiteCarePlansJson.sections[2].blocks.map((data, index) => {
                return index !== 0 ? (
                    <Col
                        key={index}
                        xs={12}
                        md={6}
                        className={index % 2 ? "pr-lg-5" : "pl-lg-5"}
                    >
                        <Row className="align-items-center">
                            <Col xs={2} className="pr-md-0">
                                <FontAwesomeIcon
                                    icon={data.icon}
                                    className="careplanFeatureIcon"
                                />
                            </Col>
                            <Col xs={10} className="pl-md-2">
                                <h3 className="mb-4 my-auto">{data.heading}</h3>
                            </Col>
                        </Row>
                        <p
                            className="mt-3 mb-5"
                            dangerouslySetInnerHTML={{
                                __html: data.content,
                            }}
                        ></p>
                    </Col>
                ) : null;
        });
    }

    const getContentEdits = ()=>{
        return data.websiteCarePlansJson.sections[5].blocks.map((item, index) => {
            
            if(index>0 && index < 4 && index !== 3){
                return (
                    <Col
                        key={index}
                        xs={12}
                        md={4}
                        className="feature text-center my-5"
                    >
                        <h3 className="mb-4">{item.heading}</h3>
                        <p className="mx-auto">{item.content}</p>
                    </Col>
                );
            }

            if(index === 3){
                return (
                    <Col
                        xs={12}
                        md={4}
                        className="feature text-center my-auto"
                        key={index}
                    >
                        <h3 className="mb-4">{item.heading}</h3>
                        <p className="mx-auto">
                            {item.content}
                            <br />
                            {
                                data.websiteCarePlansJson.sections[5].blocks[4]
                                    .content
                            }
                        </p>
                    </Col>
                );
            }
        });
    }

    const pageTitle = {
        name: "Wordpress Care Plans",
        url: "/wordpress-care-plans",
    };

    return (
        <ScrollWrapper>
            <Layout
                renderHeaderSolid={true}
                headerTitle={[true, pageTitle]}
                bodyClasses="wordpressCarePlans"
            >
                <SEO title={pageTitle.name} />

                {/* Hero Section */}
                <section className="hero">
                    <Row className="alk-container mx-0 align-items-center">
                        <Col xs={12} lg={6}>
                            <p className="mb-5">
                                Let us keep your site running at it&apos;s best,
                                with first class hosting and website support.
                            </p>
                            <Button
                                block
                                onClick={handleViewPlansClick}
                                color="primary"
                            >
                                See Our Care Plans
                            </Button>
                        </Col>
                    </Row>
                </section>

                {/* Section 1 */}
                <section className="alk-container my-5">
                    <Row>
                        <Col xs={12} lg={6}>
                            <h2 className="mb-4">
                                {
                                    data.websiteCarePlansJson.sections[0]
                                        .blocks[0].heading
                                }
                            </h2>
                            <p className="mb-5">
                                {
                                    data.websiteCarePlansJson.sections[0]
                                        .blocks[0].content
                                }
                            </p>
                            <p className="mb-5">
                                {
                                    data.websiteCarePlansJson.sections[0]
                                        .blocks[1].content
                                }
                            </p>
                            <p className="mb-5">
                                {
                                    data.websiteCarePlansJson.sections[0]
                                        .blocks[2].content
                                }
                            </p>
                        </Col>
                        <Col xs={12} lg={6}>
                            {data.wordpressDashboard.childImageSharp && (
                                <Img
                                    className="my-5 my-lg-0"
                                    fluid={
                                        data.wordpressDashboard.childImageSharp
                                            .fluid
                                    }
                                    alt="Wordpress plugins updated by professionals"
                                />
                            )}
                        </Col>
                    </Row>
                </section>

                {/* Section 2 */}
                <section className="imagineCallout mb-lg-4 py-5">
                    <Row className="alk-container text-center my-auto">
                        <Col xs={12}>
                            <h2 className="mb-4">
                                {
                                    data.websiteCarePlansJson.sections[1]
                                        .blocks[0].heading
                                }
                            </h2>
                            <p className="mx-auto">
                                {
                                    data.websiteCarePlansJson.sections[1]
                                        .blocks[0].content
                                }
                            </p>
                        </Col>
                    </Row>
                </section>

                {/* Section 3 */}
                <section className="alk-container planFeatures mb-4 pb-4 py-lg-4">
                    <h2 className="">
                        {
                            data.websiteCarePlansJson.sections[2].blocks[0]
                                .heading
                        }
                    </h2>
                    <Row className="pt-lg-4">{getFeatures()}</Row>
                </section>

                {/* Section 4 */}
                <section
                    ref={plansSection}
                    className="alk-container carePlanDetails mb-4 py-4"
                >
                    <h2 className="text-center mb-4">
                        {
                            data.websiteCarePlansJson.sections[3].blocks[0]
                                .heading
                        }
                    </h2>
                    <Row className="my-4" noGutters>
                        {planCards(data.websiteCarePlansJson.sections[4].plans)}
                    </Row>
                    <Row className="my-5" noGutters>
                        {disclaimers(
                            data.websiteCarePlansJson.sections[3].blocks[0]
                        )}
                    </Row>
                </section>

                {/* Section 5 */}
                <section className="contentEditsCallout mb-0 alk-container">
                    <Row className="text-center my-auto">
                        <Col xs={12} className="sectionDesc mb-4">
                            <h2>
                                {
                                    data.websiteCarePlansJson.sections[5]
                                        .blocks[0].heading
                                }
                            </h2>
                            <p className="mx-auto w-100 mb-5">
                                {
                                    data.websiteCarePlansJson.sections[5]
                                        .blocks[0].content
                                }
                            </p>
                        </Col>
                    </Row>
                    <Row>{getContentEdits()}</Row>
                </section>
                <CarePlanEnrollment
                    isOpen={careModal}
                    toggle={() => setCareModal(!careModal)}
                    plan={plan}
                />
            </Layout>
        </ScrollWrapper>
    );
};


const plansSection = React.createRef();

const handleViewPlansClick = () => {
    window.scrollTo({
        top: plansSection.current.offsetTop - 80,
        behavior: "smooth",
    });
};

export const query = graphql`
    {
        websiteCarePlansJson {
            sections {
                id
                blocks {
                    icon
                    heading
                    content
                    disclaimers
                }
                plans {
                    name
                    price
                    features
                }
            }
        }
        wordpressDashboard: file(relativePath: { regex: "/wordpress-dashboard.jpg/" }) {
            ...fluidImageXS
        }
    }
`;

export default WordpressCarePlans;
