import React from "react";
import { graphql,Link } from "gatsby";
import Img from "gatsby-image";
import "../utils/utils.js";
import { Button, Col, Row } from "reactstrap";
import Layout from "../components/layout";
import ScrollWrapper from "../components/scrollWrapper.jsx";
import EnquiryWidget from "../components/widgetEnquiry";
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

const WebDevelopment = ({ data }) => {
    const pageTitle = {name: "Custom Web Development",url:'/web-development'};

    return (
        <ScrollWrapper>
            <Layout
                renderHeaderSolid={true}
                headerTitle={[true, pageTitle]}
                bodyClasses="webDesign"
            >
                <SEO title={pageTitle.name} />

                {/* Section 1 */}
                <section className=" alk-container mt-5">
                    <Row className="mb-5">
                        <Col xs={12}>
                            <h2 className="mb-4">
                                {
                                    data.webDevelopmentJson.sections[0]
                                        .blocks[0].heading
                                }
                            </h2>
                            <p className="lead">
                                {
                                    data.webDevelopmentJson.sections[0]
                                        .blocks[0].content
                                }
                            </p>
                            <p className="lead">
                                {
                                    data.webDevelopmentJson.sections[0]
                                        .blocks[1].content
                                }
                            </p>
                        </Col>
                    </Row>
                </section>

                <EnquiryWidget />

                <section className=" alk-container my-5">
                    <Row className="flex-column-reverse flex-lg-row align-items-center">
                        <Col xs={12} lg={6}>
                            <h2 className="mb-4">
                                {
                                    data.webDevelopmentJson.sections[0]
                                        .blocks[2].heading
                                }
                            </h2>
                            <p className="lead">
                                {
                                    data.webDevelopmentJson.sections[0]
                                        .blocks[2].content
                                }
                            </p>
                        </Col>
                        <Col xs={12} lg={6} className="text-center mb-5">
                            {data.webDevFlasks.childImageSharp && (
                                <Img
                                    className="mx-auto"
                                    imgStyle={{ objectFit: "contain" }}
                                    style={{ maxWidth: "500px" }}
                                    fluid={
                                        data.webDevFlasks.childImageSharp.fluid
                                    }
                                    alt="Alkemy knows the right languages and framworks to get the job done correctly."
                                />
                            )}
                        </Col>
                    </Row>
                </section>

                {/* Section 2 */}
                <section className="deliverYourMessage alk-container">
                    <Row className="align-items-center flex-column flex-lg-row">
                        <Col xs={12} lg={6} className="mt-5 mb-4">
                            {data.webDevGraphic.childImageSharp && (
                                <Img
                                    imgStyle={{ objectFit: "contain" }}
                                    style={{ maxWidth: "500px" }}
                                    className="mx-auto"
                                    fluid={
                                        data.webDevGraphic.childImageSharp.fluid
                                    }
                                    alt="Alkemy builds and crafts your application to specification."
                                />
                            )}
                        </Col>

                        <Col xs={12} lg={6}>
                            <h2 className="mt-5 mb-4">
                                {
                                    data.webDevelopmentJson.sections[1]
                                        .blocks[0].heading
                                }
                            </h2>
                            <p className="text-white lead my-4">
                                {
                                    data.webDevelopmentJson.sections[1]
                                        .blocks[0].content
                                }
                            </p>
                            <Row className="my-5">
                                <Col xs={12}>
                                    <Button
                                        tag={Link}
                                        to="/project-enquiry"
                                        color="primary"
                                        block
                                    >
                                        Let&apos;s get started
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </section>
            </Layout>
        </ScrollWrapper>
    );
};


export const query = graphql`
    {
        webDevelopmentJson {
            sections {
                id
                blocks {
                    heading
                    content
                }
            }
        }
        webDevFlasks: file(relativePath: { regex: "/web-dev.png/" }) {
            ...fluidImageSmall
        }
        webDevGraphic: file(relativePath: { regex: "/developmentbtn.png/" }) {
            ...fluidImageSmall
        }
    }
`;

export default WebDevelopment;
