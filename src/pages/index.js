import React from "react";
import { graphql, Link } from "gatsby";
import Img from "gatsby-image";
import { fluidImageSmall, fluidImage, fluidImageLG } from "../utils/utils.js";
import {
    Button,
    Col,
    Row,
} from "reactstrap";
import BackgroundImage from "gatsby-background-image";
import Layout from "../components/layout.js";
import ScrollWrapper from "../components/scrollWrapper.jsx";
import SEO from "../components/seo";
import loadable from "@loadable/component";

const HomeHero = loadable(() => import("../components/home/homeHero"));
const StatsCounters = loadable(() => import("../components/home/statsCounter"));
const Services = loadable(() => import("../components/service-cards/serviceCards"));
const EnquiryWidget = loadable(() => import("../components/widgetEnquiry"));
const BlogWidget = loadable(() => import("../components/BlogWidget"));


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

const HomePage = ({ data }) => {
    const pageTitle = {
        name: "Web Development, Design, eCommerce, and Marketing",
        url: "/",
    };

    return (
        <ScrollWrapper onWindowScroll={handleScroll}>
            <Layout headerTitle={[false, {}]} bodyClasses="home">
                <SEO title={pageTitle.name} />
                {/* Section 1 - Hero */}
                <HomeHero data={data} handleCaretClick={handleCaretClick} />

                {/* Section 2 - Intro */}
                <section
                    ref={introSection}
                    className="introHome my-4 py-4 alk-container"
                >
                    <h2 className="mb-4">
                        {data.homepageJson.sections[0].blocks[0].heading}
                    </h2>
                    <p>{data.homepageJson.sections[0].blocks[0].content}</p>
                </section>

                {/* Project Enquiry Widget */}
                <EnquiryWidget />

                <section className="alk-container my-4 py-4">
                    <h2 className="mb-4">
                        {data.homepageJson.sections[0].blocks[1].heading}
                    </h2>
                    <p>{data.homepageJson.sections[0].blocks[1].content}</p>
                </section>

                {/* Section 3 - Services */}
                <section className="alk-container servicesHome mt-auto mb-5">
                    <Services data={data} />
                </section>

                {/* Section 4 - Counters */}
                <StatsCounters data={data} />

                {/* Section 5 - Our Passion */}
                <section className="ourPassion my-5">
                    <div className="alk-container container-fluid">
                        <Row className="align-items-center">
                            <Col
                                xs={12}
                                lg={5}
                                className="align-items-center px-0 px-lg-5"
                            >
                                {data.ourPassion.childImageSharp && (
                                    <Img
                                        className="ourPassionImg mb-5 mb-lg-0"
                                        fluid={
                                            data.ourPassion.childImageSharp
                                                .fluid
                                        }
                                        alt="Discover our passion."
                                    />
                                )}
                            </Col>
                            <Col
                                xs={12}
                                lg={7}
                                className="align-items-center px-0 px-lg-5"
                            >
                                <h2>
                                    {
                                        data.homepageJson.sections[2].blocks[0]
                                            .heading
                                    }
                                </h2>
                                <p>
                                    {
                                        data.homepageJson.sections[2].blocks[0]
                                            .content
                                    }
                                </p>
                                <Button
                                    color="primary"
                                    size="lg"
                                    tag={Link}
                                    to="/about-alkemy"
                                >
                                    Discover Our Passion
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </section>
                <section className="recentBlogPosts">
                    <BlogWidget />
                </section>
            </Layout>
        </ScrollWrapper>
    );
};

const introSection = React.createRef();

const handleCaretClick = () => {
    requestAnimationFrame(() => {
        window &&
            window.scrollTo({
                top: introSection.current.offsetTop - 95,
                behavior: "smooth",
            });
    });
};

const handleScroll = () => {
    // header opacity
    const topBoundary = window.innerHeight - 130;
    if (window.pageYOffset >= topBoundary) {
        document.body.classList.add("solid");
    } else {
        document.body.classList.remove("solid");
    }
};

export const query = graphql`
           {
               homepageJson {
                   sections {
                       id
                       blocks {
                           heading
                           content
                       }
                       heading
                       stats {
                           title
                           value
                       }
                   }
               }

               heroBg: file(relativePath: { regex: "/hero-bg.jpg/" }) {
                   ...fluidImageLG
               }

               heroBgMobile: file(relativePath: { regex: "/hero-bg.jpg/" }) {
                   ...fluidImageSmall
               }

               alkemyStack: file(
                   relativePath: { regex: "/alkemy-stack.png/" }
               ) {
                   ...fluidImageSmall
               }

               ourPassion: file(relativePath: { regex: "/our-passion.jpg/" }) {
                   ...fluidImageSmall
               }
           }
       `;

export default HomePage;
