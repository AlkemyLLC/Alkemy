import React from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import "../utils/utils.js";
import {
    fluidImage,
    fluidImageSmall,
    useWindowSize,
} from "../utils/utils.js";
import { Col, Row } from "reactstrap";
import Layout from "../components/layout";
import ScrollWrapper from "../components/scrollWrapper.jsx";
import SEO from "../components/seo";
import EnquiryWidget from "../components/widgetEnquiry";
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

const AboutAlkemy = ({ data }) => {
    // pageTitle: SEO friendly title for the title bar
    const pageTitle = { name: "About Alkemy", url: "/about-alkemy" };
    const size = useWindowSize();

    const heroImg =
        size.width >= 768
            ? size.width <= 960
                ? [
                      data.uiDesign.childImageSharp.fluid,
                      `linear-gradient(to left,black,transparent 55%)`,
                  ].reverse()
                : [
                      data.uiDesign.childImageSharp.fluid,
                      `linear-gradient(to left,black,transparent 45%)`,
                  ].reverse()
            : [
                  data.uiDesign.childImageSharp.fluid,
                  `linear-gradient(rgba(0,0,0,0.25),rgba(0,0,0,0.25))`,
              ].reverse();

    return (
        <ScrollWrapper onWindowScroll={handleScroll}>
            <Layout
                renderHeaderSolid={true}
                headerTitle={[true, pageTitle]}
                bodyClasses="about-page"
            >
                <SEO title={pageTitle.name} />

                <BackgroundImage
                    Tag="section"
                    className="section--hero h-100 d-flex flex-column justify-content-center"
                    style={{
                        backgroundPosition: "center 28%",
                    }}
                    fluid={heroImg}
                    alt="woman interacting with holographic user interface"
                >
                    <Row className="alk-container hero-text">
                        <Col xs={12}>
                            <h2 className="text-left text-sm-right">
                                {data.aboutJson &&
                                    data.aboutJson.sections[0].blocks[0]
                                        .heading}
                                <br />
                                {data.aboutJson &&
                                    data.aboutJson.sections[0].blocks[1]
                                        .heading}
                                <br />
                                {data.aboutJson &&
                                    data.aboutJson.sections[0].blocks[2]
                                        .heading}
                            </h2>
                        </Col>
                    </Row>
                </BackgroundImage>

                <section className="section--beginnings pt-5 pt-sm-0">
                    <Row>
                        <Col
                            xs={12}
                            sm={6}
                            md={5}
                            className="order-2 order-sm-1 align-items-center"
                        >
                            <BackgroundImage
                                className="h-100 headshot"
                                style={{
                                    backgroundSize: "auto 100%",
                                    backgroundPosition: "bottom center",
                                }}
                                fluid={
                                    data.jonathanHeadshot.childImageSharp.fluid
                                }
                                alt="headshot of Jonathan Ferragut"
                            >
                                <p className="sub-text text-white">
                                    Jonathan Ferragut, President/CEO
                                </p>
                            </BackgroundImage>
                        </Col>
                        <Col
                            xs={12}
                            sm={6}
                            md={7}
                            className="text alk-container order-1 order-sm-2 justify-content-center d-flex flex-column"
                        >
                            <h2 className="font-weight-normal mb-4">
                                {data.aboutJson &&
                                    data.aboutJson.sections[1].blocks[0]
                                        .heading}
                            </h2>
                            <p className="">
                                {data.aboutJson &&
                                    data.aboutJson.sections[1].blocks[0]
                                        .content}
                            </p>
                            <p className="mb-0">
                                {data.aboutJson &&
                                    data.aboutJson.sections[1].blocks[1]
                                        .content}
                            </p>
                        </Col>
                    </Row>
                </section>

                <EnquiryWidget />

                <BackgroundImage
                    Tag="section"
                    className="section--taste h-100 bg alk-container py-5"
                    fluid={[
                        data.planningSession.childImageSharp.fluid,
                        `linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35))`,
                    ].reverse()}
                    alt="Planning session on a large table with laptops, coffee, and papers"
                >
                    <div className=" h-100 w-100 callout d-flex flex-column align-items-center justify-content-center">
                        <h2 className="font-weight-normal mb-4 text-center">
                            {data.aboutJson &&
                                data.aboutJson.sections[2].blocks[0].heading}
                        </h2>
                        <p className="">
                            {data.aboutJson &&
                                data.aboutJson.sections[2].blocks[0].content}
                        </p>
                        <p className="mb-0">
                            {data.aboutJson &&
                                data.aboutJson.sections[2].blocks[1].content}
                        </p>
                    </div>
                </BackgroundImage>

                <section className="section--idea alk-container d-flex flex-column align-items-center justify-content-center py-4">
                    <h2 className="font-weight-normal mb-4 text-center">
                        {data.aboutJson &&
                            data.aboutJson.sections[3].blocks[0].heading}
                    </h2>
                    <p className="mb-0">
                        {data.aboutJson &&
                            data.aboutJson.sections[3].blocks[0].content}
                    </p>
                </section>

                <section className="section--promise py-5 alk-container">
                    <Row>
                        <Col xs={12} lg={5} className="mb-5">
                            <Img
                                className="mx-auto"
                                style={{
                                    maxWidth: "625px",
                                    width: "100%",
                                }}
                                fluid={data.alkemyLogo.childImageSharp.fluid}
                                alt="Alkemy Logo"
                            />
                        </Col>
                        <Col xs={12} lg={7}>
                            <div>
                                {data.aboutJson &&
                                    data.aboutJson.sections[4].blocks.map(
                                        (block, index) =>
                                            index < 4 && (
                                                <p className="" key={index}>
                                                    {block.content}
                                                </p>
                                            )
                                    )}
                            </div>

                            <h2 className="h4 text-center text-sm-right mt-5 mb-0">
                                {data.aboutJson &&
                                    data.aboutJson.sections[4].blocks[4]
                                        .heading}
                            </h2>
                            <p className="text-center text-sm-right">
                                {data.aboutJson &&
                                    data.aboutJson.sections[4].blocks[4]
                                        .content}
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
