import React from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import "../utils/utils.js";
import { Card, Col, Row } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Layout from "../components/layout";
import ScrollWrapper from "../components/scrollWrapper.jsx";
import SEO from "../components/seo";
import EnquiryWidget from "../components/widgetEnquiry";

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

const EcommerceDesign = ({ data }) => {
    // function for creating a list of Plan features
    const planFeatures = plan => {
        return (
            <ul className="fa-ul w-50 w-lg-100 mx-auto my-3">
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

    const planCards = plans => {
        return plans.map((plan, index) => {
            return (
                <Col xs={12} lg={4} key={index} className="my-auto plan">
                    <Card className="my-4 p-4 planCard">
                        <h2 className="text-center mb-4">{plan.name}</h2>
                        <FontAwesomeIcon
                            icon={plan.icon}
                            size="3x"
                            className="planIcon mx-auto my-auto"
                        />
                        <p className="text-center my-4">{plan.priceFrom}</p>
                        {planFeatures(plan)}
                    </Card>
                </Col>
            );
        });
    };

    const moduleColumns = modules => {
        return modules.map((block, index) => {
            let column = block.map((item, i) => {
                return <li key={i}>{item}</li>;
            });
            return (
                <Col xs={12} sm={4} md={2} key={index}>
                    <ul className="list-unstyled m-0">{column}</ul>
                </Col>
            );
        });
    };

    const disclaimers = block => {
        return block.disclaimers.map((note, index) => {
            return (
                <li key={index}>
                    <small>{note}</small>
                </li>
            );
        });
    };

    const pageTitle = {
        name: "eCommerce Web Design",
        url: "/ecommerce-design",
    };

    return (
        <ScrollWrapper>
            <Layout
                renderHeaderSolid={true}
                headerTitle={[true, pageTitle]}
                bodyClasses="eCommerce"
            >
                <SEO title={pageTitle.name} />

                {/* Section 1 */}
                <section className="alk-container my-5">
                    <Row>
                        <Col>
                            <h2 className="mb-4">
                                {data.ecommDesignJson &&
                                    data.ecommDesignJson.sections[0].blocks[0]
                                        .heading}
                            </h2>
                            <p className="mb-4 lead">
                                {data.ecommDesignJson &&
                                    data.ecommDesignJson.sections[0].blocks[0]
                                        .content}
                            </p>
                        </Col>
                    </Row>
                </section>

                {/* Section 2 */}
                <EnquiryWidget />

                {/* Section 3 */}
                <section className="roadmap py-5">
                    <h2 className="my-4 text-center">
                        {data.ecommDesignJson &&
                            data.ecommDesignJson.sections[2].blocks[0].heading}
                    </h2>
                    <Row className="justify-content-around alk-container">
                        <Col xs={12} md={2} className="roadmapCol">
                            <>
                                {data.discoveryIcon.childImageSharp && (
                                    <Img
                                        className="platforms"
                                        imgStyle={{
                                            maxHeight: "auto",
                                            maxWidth: "125px",
                                            objectFit: "contain",
                                            left: "50%",
                                            transform: "translateX(-50%)",
                                        }}
                                        fluid={
                                            data.discoveryIcon.childImageSharp
                                                .fluid
                                        }
                                        alt="Step 1: Discovery"
                                    />
                                )}
                                <h3 className="my-4 text-center font-weight-normal">
                                    {data.ecommDesignJson &&
                                        data.ecommDesignJson.sections[2]
                                            .blocks[0].steps[0].heading}
                                </h3>
                            </>
                        </Col>

                        <Col xs={12} md={2} className="roadmapCol">
                            <>
                                {data.designIcon.childImageSharp && (
                                    <Img
                                        className="platforms"
                                        imgStyle={{
                                            maxHeight: "auto",
                                            maxWidth: "125px",
                                            objectFit: "contain",
                                            left: "50%",
                                            transform: "translateX(-50%)",
                                        }}
                                        fluid={
                                            data.designIcon.childImageSharp
                                                .fluid
                                        }
                                        alt="Step 2: Design"
                                    />
                                )}
                                <h3 className="my-4 text-center font-weight-normal">
                                    {data.ecommDesignJson &&
                                        data.ecommDesignJson.sections[2]
                                            .blocks[0].steps[1].heading}
                                </h3>
                            </>
                        </Col>

                        <Col xs={12} md={2} className="roadmapCol">
                            <>
                                {data.codeIcon.childImageSharp && (
                                    <Img
                                        className="platforms"
                                        imgStyle={{
                                            maxHeight: "auto",
                                            maxWidth: "125px",
                                            objectFit: "contain",
                                            left: "50%",
                                            transform: "translateX(-50%)",
                                        }}
                                        fluid={
                                            data.codeIcon.childImageSharp.fluid
                                        }
                                        alt="Step 3: Coding"
                                    />
                                )}
                                <h3 className="my-4 text-center font-weight-normal">
                                    {data.ecommDesignJson &&
                                        data.ecommDesignJson.sections[2]
                                            .blocks[0].steps[2].heading}
                                </h3>
                            </>
                        </Col>

                        <Col xs={12} md={2} className="roadmapCol">
                            <>
                                {data.testIcon.childImageSharp && (
                                    <Img
                                        className="platforms"
                                        imgStyle={{
                                            maxHeight: "auto",
                                            maxWidth: "125px",
                                            objectFit: "contain",
                                            left: "50%",
                                            transform: "translateX(-50%)",
                                        }}
                                        fluid={
                                            data.testIcon.childImageSharp.fluid
                                        }
                                        alt="Step 4: Testing"
                                    />
                                )}
                                <h3 className="my-4 text-center font-weight-normal">
                                    {data.ecommDesignJson &&
                                        data.ecommDesignJson.sections[2]
                                            .blocks[0].steps[3].heading}
                                </h3>
                            </>
                        </Col>

                        <Col xs={12} md={2}>
                            <>
                                {data.launchIcon.childImageSharp && (
                                    <Img
                                        className="platforms"
                                        imgStyle={{
                                            maxHeight: "auto",
                                            maxWidth: "125px",
                                            objectFit: "contain",
                                            left: "50%",
                                            transform: "translateX(-50%)",
                                        }}
                                        fluid={
                                            data.launchIcon.childImageSharp
                                                .fluid
                                        }
                                        alt="Step 5: Launch"
                                    />
                                )}
                                <h3 className="my-4 text-center font-weight-normal">
                                    {data.ecommDesignJson &&
                                        data.ecommDesignJson.sections[2]
                                            .blocks[0].steps[4].heading}
                                </h3>
                            </>
                        </Col>
                    </Row>
                </section>

                {/* Section 4 */}
                <section className="innovativeDesign mb-4 py-4">
                    <Row className="alk-container pt-4">
                        <Col xs={12} lg={5} className="mb-5">
                            {data.ecommWebDesign.childImageSharp && (
                                <Img
                                    imgStyle={{ objectFit: "contain" }}
                                    style={{ maxWidth: "500px" }}
                                    className="mx-auto"
                                    fluid={
                                        data.ecommWebDesign.childImageSharp
                                            .fluid
                                    }
                                    alt="Picture an iMac with a second monitor and a design prototype on the screens."
                                />
                            )}
                        </Col>
                        <Col xs={12} lg={7}>
                            <h2 className="mb-4">
                                {data.ecommDesignJson &&
                                    data.ecommDesignJson.sections[3].blocks[0]
                                        .heading}
                            </h2>
                            <p className="lead">
                                {data.ecommDesignJson &&
                                    data.ecommDesignJson.sections[3].blocks[0]
                                        .content}
                            </p>
                        </Col>
                    </Row>
                </section>

                {/* Section 5 */}
                <section className="partnerSection my-5 my-lg-2 py-0 alk-container">
                    <Row className="justify-content-around align-items-center no-gutters">
                        <Col xs={12} md={3}>
                            {data.dcartPartner.childImageSharp && (
                                <Img
                                    imgStyle={{
                                        maxHeight: "auto",
                                        maxWidth: "250px",
                                        objectFit: "contain",
                                        top: "50%",
                                        left: "50%",
                                        transform: "translate(-50%,-50%)",
                                    }}
                                    fluid={
                                        data.dcartPartner.childImageSharp.fluid
                                    }
                                    alt="Alkemy is a 3dcart Partner."
                                />
                            )}
                        </Col>
                        <Col xs={12} md={3}>
                            {data.dcartExpert.childImageSharp && (
                                <Img
                                    imgStyle={{
                                        maxHeight: "auto",
                                        maxWidth: "250px",
                                        objectFit: "contain",
                                        top: "50%",
                                        left: "50%",
                                        transform: "translate(-50%,-50%)",
                                    }}
                                    fluid={
                                        data.dcartExpert.childImageSharp.fluid
                                    }
                                    alt="Alkemy is a 3dcart Certified Expert."
                                />
                            )}
                        </Col>
                        <Col xs={12} md={3}>
                            {data.shopifyPartner.childImageSharp && (
                                <Img
                                    imgStyle={{
                                        maxHeight: "auto",
                                        maxWidth: "250px",
                                        objectFit: "contain",
                                        top: "50%",
                                        left: "50%",
                                        transform: "translate(-50%,-50%)",
                                    }}
                                    fluid={
                                        data.shopifyPartner.childImageSharp
                                            .fluid
                                    }
                                    alt="Alkemy is a Shopify Partner."
                                />
                            )}
                        </Col>
                        <Col xs={12} md={3}>
                            {data.bigcommercePartner.childImageSharp && (
                                <Img
                                    imgStyle={{
                                        maxHeight: "auto",
                                        maxWidth: "200px",
                                        objectFit: "contain",
                                        top: "50%",
                                        left: "50%",
                                        transform: "translate(-50%,-50%)",
                                    }}
                                    fluid={
                                        data.bigcommercePartner.childImageSharp
                                            .fluid
                                    }
                                    alt="Alkemy is a Big Commerce Partner."
                                />
                            )}
                        </Col>
                    </Row>
                </section>
            </Layout>
        </ScrollWrapper>
    );
};

export const query = graphql`
    {
        ecommDesignJson {
            sections {
                id
                blocks {
                    heading
                    content
                    disclaimers
                    steps {
                        heading
                        content
                    }
                }
                plans {
                    name
                    icon
                    priceFrom
                    features
                }
            }
        }
        dcartLogo: file(relativePath: { regex: "/3dcart-logo.png/" }) {
            ...fluidImageXS
        }
        bigcommerceLogo: file(
            relativePath: { regex: "/bigcommerce-logo.png/" }
        ) {
            ...fluidImageXS
        }
        shopifyLogo: file(relativePath: { regex: "/shopify-logo.png/" }) {
            ...fluidImageXS
        }
        wordpressLogo: file(
            relativePath: { regex: "/wordpress-logo-horiz.png/" }
        ) {
            ...fluidImageXS
        }
        discoveryIcon: file(relativePath: { regex: "/discovery-icon.png/" }) {
            ...fluidImageXS
        }
        designIcon: file(relativePath: { regex: "/design-icon.png/" }) {
            ...fluidImageXS
        }
        codeIcon: file(relativePath: { regex: "/code-icon.png/" }) {
            ...fluidImageXS
        }
        testIcon: file(relativePath: { regex: "/test-icon.png/" }) {
            ...fluidImageXS
        }
        launchIcon: file(relativePath: { regex: "/launch-icon.png/" }) {
            ...fluidImageXS
        }
        dcartPartner: file(
            relativePath: { regex: "/3dcart-certified-partner.png/" }
        ) {
            ...fluidImageXS
        }
        dcartExpert: file(
            relativePath: { regex: "/3dcart-certified-expert.png/" }
        ) {
            ...fluidImageXS
        }
        shopifyPartner: file(relativePath: { regex: "/shopify-partner.png/" }) {
            ...fluidImageXS
        }
        bigcommercePartner: file(
            relativePath: { regex: "/bigcommerce-partner.png/" }
        ) {
            ...fluidImageXS
        }
        ecommWebDesign: file(
            relativePath: { regex: "/ecommerce-website-design.jpg/" }
        ) {
            ...fluidImageSmall
        }
    }
`;

export default EcommerceDesign;
