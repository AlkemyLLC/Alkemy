import React from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import "../utils/utils.js";
import { Col, Row } from "reactstrap";
import Layout from "../components/layout";
import ScrollWrapper from "../components/scrollWrapper.jsx";
import BuildYourDream from "../components/BuildYourDream.jsx";
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

const AboutAlkemy = ({ data }) => {
    // pageTitle: SEO friendly title for the title bar
    const pageTitle = { name: "About Alkemy", url: "/about-alkemy" };

    return (
        <ScrollWrapper onWindowScroll={handleScroll}>
            <Layout
                renderHeaderSolid={true}
                headerTitle={[true, pageTitle]}
                bodyClasses="about-page"
            >
                <SEO title={pageTitle.name} />

                <section className="section--hero position-relative">
                    <Img
                        className="h-100 hero-image"
                        imgStyle={{
                            objectPosition: "center 28%",
                        }}
                        objectFit="cover"
                        objectPosition="center 10%"
                        fluid={data.uiDesign.childImageSharp.fluid}
                        alt="woman interacting with holographic user interface"
                    />
                    <Row className="alk-container h-100 d-flex flex-column justify-content-center hero-text">
                        <Col xs={12} md={{ size: 6, offset: 6 }}>
                            <h2 className="text-right">
                                {JSON.parse(
                                    JSON.stringify(
                                        data.aboutJson &&
                                            data.aboutJson.sections[0].blocks[0]
                                                .heading
                                    ).replace(/\n/g, "<br/>")
                                )}
                            </h2>
                        </Col>
                    </Row>
                </section>
                <section className="section--beginnings alk-container">
                    <Row>
                        <Col
                            xs={12}
                            sm={5}
                            className="order-2 order-sm-1 align-items-center"
                        >
                            <Img
                                className="h-100 headshot"
                                fluid={
                                    data.jonathanHeadshot.childImageSharp.fluid
                                }
                                alt="woman interacting with holographic user interface"
                            />
                            <p className="sub-text text-white">Jonathan Ferragut, President/CEO</p>
                        </Col>
                        <Col xs={12} sm={7} className="order-1 order-sm-2 justify-content-center d-flex flex-column">
                            <h2 className="h1 font-weight-normal mb-4">
                                {data.aboutJson &&
                                    data.aboutJson.sections[1].blocks[0]
                                        .heading}
                            </h2>
                            <p className="">
                                {data.aboutJson &&
                                    data.aboutJson.sections[1].blocks[0]
                                        .content}
                            </p>
                            <p className="">
                                {data.aboutJson &&
                                    data.aboutJson.sections[1].blocks[1]
                                        .content}
                            </p>
                        </Col>
                    </Row>
                </section>
                <section className="section--enquiry"></section>
                <section className="section--taste"></section>
                <section className="section--idea"></section>
                <section className="section--promise"></section>

                <section ref={dreamForm}>
                    <BuildYourDream />
                </section>
            </Layout>
        </ScrollWrapper>
    );
};

const dreamForm = React.createRef();

const handleScroll = () => {};

export const query = graphql`
    {
        aboutJson {
            sections {
                id
                blocks {
                    heading
                    content
                }
            }
        }

        uiDesign: file(relativePath: { regex: "/ui-design.jpg/" }) {
            ...fluidImage
        }

        jonathanHeadshot: file(relativePath: { regex: "/jonathan-headshot.png/" }) {
            ...fluidImageSmall
        }

        planningSession: file(relativePath: { regex: "/planning-session.jpg/" }) {
            ...fluidImage
        }

        alkemyLogo: file(relativePath: { regex: "/alkemy-logo-vertical.png/" }) {
            ...fluidImageSmall
        }
    }
`;

export default AboutAlkemy;
