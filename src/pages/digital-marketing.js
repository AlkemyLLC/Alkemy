import React from "react";
import { graphql,Link } from "gatsby";
import "../utils/utils.js";
import Img from "gatsby-image";
import { Button, Col, Row } from "reactstrap";
import Layout from "../components/layout";
import ScrollWrapper from "../components/scrollWrapper.jsx";
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

const DigitalMarketing = ({ data }) => {
    const pageTitle = {
        name: "Digital Marketing Services",
        url: "/digital-marketing",
    };

    return (
        <ScrollWrapper onWindowScroll={handleScroll}>
            <Layout
                renderHeaderSolid={true}
                headerTitle={[true, pageTitle]}
                bodyClasses="digitalMarketing"
            >
                <SEO title={pageTitle.name} />

                {/* Section 1 */}
                <section className="alk-container my-4">
                    <Row>
                        <Col>
                            <h2 className="mb-4">
                                {data.digitalMarketingJson &&
                                    data.digitalMarketingJson.sections[0]
                                        .blocks[0].heading}
                            </h2>
                            <p className="mb-5">
                                {data.digitalMarketingJson &&
                                    data.digitalMarketingJson.sections[0]
                                        .blocks[0].content}
                            </p>
                        </Col>
                    </Row>
                    <Row className="flex-column-reverse flex-lg-row">
                        <Col xs={12} lg={6}>
                            <h2 className="mb-4">
                                {data.digitalMarketingJson &&
                                    data.digitalMarketingJson.sections[0]
                                        .blocks[1].heading}
                            </h2>
                            <p className="mb-5">
                                {data.digitalMarketingJson &&
                                    data.digitalMarketingJson.sections[0]
                                        .blocks[1].content}
                            </p>
                            <Row className="mb-4">
                                <Col xs={12} lg={6}>
                                    <Button
                                        tag={Link}
                                        to="/project-enquiry"
                                        block
                                        className="btn btn-primary form-control"
                                    >
                                        Let’s Grow My Traffic
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={12} lg={6} className="mb-4">
                            {data.seoGraphic.childImageSharp && (
                                <Img
                                    imgStyle={{
                                        maxHeight: "350px",
                                        objectFit: "contain",
                                        left: "50%",
                                        transform: "translateX(-50%)",
                                        margin: "0",
                                    }}
                                    fluid={
                                        data.seoGraphic.childImageSharp.fluid
                                    }
                                    alt="Alkemy knows the right languages and framworks to get the job done correctly."
                                />
                            )}
                        </Col>
                    </Row>
                </section>

                {/* Section 2 */}
                <section className="marketingReinvented mb-4 py-4">
                    <Row className="alk-container py-4 d-flex justify-content-center align-items-center">
                        <Col xs={12} lg={6} className="mb-4">
                            {data.marketingImg.childImageSharp && (
                                <Img
                                    imgStyle={{ objectFit: "contain" }}
                                    style={{ maxWidth: "500px" }}
                                    className="mx-auto"
                                    fluid={
                                        data.marketingImg.childImageSharp.fluid
                                    }
                                    alt="Alkemy knows the right languages and framworks to get the job done correctly."
                                />
                            )}
                        </Col>

                        <Col xs={12} lg={6}>
                            <h2 className="mb-4">
                                {data.digitalMarketingJson &&
                                    data.digitalMarketingJson.sections[1]
                                        .blocks[0].heading}
                            </h2>
                            <p className="text-white">
                                {data.digitalMarketingJson &&
                                    data.digitalMarketingJson.sections[1]
                                        .blocks[0].content}
                            </p>
                            <p className="text-white">
                                {data.digitalMarketingJson &&
                                    data.digitalMarketingJson.sections[1]
                                        .blocks[1].content}
                            </p>
                            <p className="text-white">
                                {data.digitalMarketingJson &&
                                    data.digitalMarketingJson.sections[1]
                                        .blocks[2].content}
                            </p>
                            <Row className="mt-5">
                                <Col xs={12} lg={6}>
                                    <Button
                                        tag={Link}
                                        block
                                        to="/project-enquiry"
                                        className="btn btn-primary"
                                    >
                                        Let&apos;s Discuss My Project!
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </section>

                {/* Section 3 */}
                <section className="conversionPlanning mb-4 py-4 alk-container">
                    <h1>
                        {data.digitalMarketingJson &&
                            data.digitalMarketingJson.sections[1].heading}
                    </h1>
                    <Row className="pt-4 flex-column-reverse flex-lg-row">
                        <Col xs={12} lg={7}>
                            <h2 className="mb-4">
                                {data.digitalMarketingJson &&
                                    data.digitalMarketingJson.sections[2]
                                        .blocks[0].heading}
                            </h2>
                            <p className="">
                                {data.digitalMarketingJson &&
                                    data.digitalMarketingJson.sections[2]
                                        .blocks[0].content}
                            </p>
                            <p className="">
                                {data.digitalMarketingJson &&
                                    data.digitalMarketingJson.sections[2]
                                        .blocks[1].content}
                            </p>
                            <p className="">
                                {data.digitalMarketingJson &&
                                    data.digitalMarketingJson.sections[2]
                                        .blocks[2].content}
                            </p>
                        </Col>

                        <Col xs={12} lg={5} className="mb-4">
                            {data.growthCharts.childImageSharp && (
                                <Img
                                    imgStyle={{
                                        maxHeight: "auto",
                                        objectFit: "contain",
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        margin: "0",
                                    }}
                                    fluid={
                                        data.growthCharts.childImageSharp.fluid
                                    }
                                    alt="Alkemy knows the right languages and framworks to get the job done correctly."
                                />
                            )}
                        </Col>
                    </Row>
                </section>

                {/* Section 4 */}
                <section className="socialMediaMarketing mb-4 py-4">
                    <Row className="alk-container">
                        <Col xs={12} lg={5} className="mb-4">
                            {data.socialMedia.childImageSharp && (
                                <Img
                                    imgStyle={{
                                        maxHeight: "auto",
                                        objectFit: "contain",
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        margin: "0",
                                    }}
                                    fluid={
                                        data.socialMedia.childImageSharp.fluid
                                    }
                                    alt="Alkemy knows the right languages and framworks to get the job done correctly."
                                />
                            )}
                        </Col>
                        <Col xs={12} lg={7}>
                            <h2 className="text-left font-weight-normal">
                                {data.digitalMarketingJson &&
                                    data.digitalMarketingJson.sections[3]
                                        .blocks[0].heading}
                            </h2>
                            <h2 className="text-lg-right mb-4">
                                {data.digitalMarketingJson &&
                                    data.digitalMarketingJson.sections[3]
                                        .blocks[1].heading}
                            </h2>
                            <p>
                                {data.digitalMarketingJson &&
                                    data.digitalMarketingJson.sections[3]
                                        .blocks[2].content}
                            </p>
                            <p>
                                {data.digitalMarketingJson &&
                                    data.digitalMarketingJson.sections[3]
                                        .blocks[3].content}
                            </p>
                            <p>
                                {data.digitalMarketingJson &&
                                    data.digitalMarketingJson.sections[3]
                                        .blocks[4].content}
                            </p>
                        </Col>
                    </Row>
                </section>
            </Layout>
        </ScrollWrapper>
    );
};

const handleScroll = () => {};

export const query = graphql`
    {
        digitalMarketingJson {
            sections {
                id
                blocks {
                    heading
                    content
                }
            }
        }
        seoGraphic: file(relativePath: { regex: "/seo-marketing.png/" }) {
            ...fluidImageSmall
        }
        marketingImg: file(relativePath: { regex: "/marketingbtn.png/" }) {
            ...fluidImageSmall
        }
        growthCharts: file(relativePath: { regex: "/analytics-growth.jpg/" }) {
            ...fluidImageSmall
        }
        socialMedia: file(
            relativePath: { regex: "/social-media-marketing.jpg/" }
        ) {
            ...fluidImageSmall
        }
    }
`;

export default DigitalMarketing;
