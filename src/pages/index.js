import React,{useEffect} from "react";
import { graphql, Link } from "gatsby";
import Img from "gatsby-image";
import { useWindowSize, fluidImageSmall, fluidImageLG } from "../utils/utils.js";
import { trunc } from "../utils/utils.js";
import {
    CardDeck,
    Card,
    CardText,
    CardImgOverlay,
    CardTitle,
    CardBody,
    CardFooter,
    Button,
    Col,
    Row,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Layout from "../components/layout.js";
import ScrollWrapper from "../components/scrollWrapper.jsx";
import BlogWidget from "../components/BlogWidget.jsx";
import ReactCounter from "../components/counter.jsx";
import EnquiryWidget from "../components/widgetEnquiry";
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

const HomePage = ({ data }) => {
    const firstNumber = data.homepageJson.sections[3].stats[0].value;
    const secondNumber = data.homepageJson.sections[3].stats[1].value;
    const thirdNumber = data.homepageJson.sections[3].stats[2].value;
    const fourthNumber = data.homepageJson.sections[3].stats[3].value;
    const pageTitle = {
        name: "Web Development, Design, eCommerce, and Marketing",
        url: "/",
    };
    const size = useWindowSize();

    const heroImg =
        size.width >= 768
            ? data.heroBg.childImageSharp.fluid
            : data.heroBgMobile.childImageSharp.fluid;

    return (
        <ScrollWrapper onWindowScroll={handleScroll}>
            <Layout headerTitle={[false, {}]} bodyClasses="home">
                <SEO title={pageTitle.name} />

                {/* Section 1 - Hero */}
                <section className="hero-wrapper">
                    <BackgroundImage
                        Tag="div"
                        className="homeHero d-flex flex-column align-items-center justify-content-lg-center h-100"
                        fluid={heroImg}
                        alt="view of tall skyscrapers while looking up from the ground"
                    >
                        <div className="container-fluid p-0 h-100 position-relative d-flex flex-column justify-content-lg-center">
                            <Row className="d-block d-lg-none">
                                {data.alkemyStack.childImageSharp && (
                                    <Img
                                        imgStyle={{
                                            objectFit: "contain",
                                            padding: "0 1rem",
                                        }}
                                        style={{
                                            maxWidth: "580px",
                                        }}
                                        className="mx-auto"
                                        objectFit="contain"
                                        fluid={
                                            data.alkemyStack.childImageSharp
                                                .fluid
                                        }
                                        alt="Logos of various programming languages and frameworks we use"
                                    />
                                )}
                            </Row>
                            <Row className="cover-text-row d-flex align-items-center w-100 no-gutters">
                                <Col xs={12} lg={7}>
                                    <div className="cover-text">
                                        <div className="mb-3 mb-lg-5">
                                            <h1 className="hero-heading animated bounceInLeft d-block mb-3">
                                                Unique Digital Experiences
                                            </h1>
                                            <p className="animated bounceInRight d-block h5 font-weight-normal">
                                                Expertly designed and crafted to
                                                wow your customers and increase
                                                sales.
                                            </p>
                                        </div>

                                        {/* Cover CTA */}
                                        <Button
                                            color="primary"
                                            size="lg"
                                            to="/about-alkemy"
                                            tag={Link}
                                            className="animated fadeInUp"
                                        >
                                            Start your project
                                        </Button>
                                    </div>
                                </Col>
                                <Col
                                    lg={5}
                                    className="d-none d-lg-block pl-md-4"
                                >
                                    {data.alkemyStack.childImageSharp && (
                                        <Img
                                            fluid={
                                                data.alkemyStack.childImageSharp
                                                    .fluid
                                            }
                                            alt="Logos of various programming languages and frameworks we use"
                                        />
                                    )}
                                </Col>
                            </Row>
                        </div>
                        {/* Caret */}
                        <FontAwesomeIcon
                            onClick={handleCaretClick}
                            icon="chevron-down"
                            size="3x"
                            color="white"
                            className="heroChevron animated pulse infinite"
                        />
                    </BackgroundImage>
                </section>
                <section
                    ref={introSection}
                    className="introHome my-4 py-4 alk-container"
                >
                    <h2 className="mb-4">
                        {data.homepageJson.sections[0].blocks[0].heading}
                    </h2>
                    <p>{data.homepageJson.sections[0].blocks[0].content}</p>
                </section>

                <EnquiryWidget />

                <section className="alk-container my-4 py-4">
                    <h2 className="mb-4">
                        {data.homepageJson.sections[0].blocks[1].heading}
                    </h2>
                    <p>{data.homepageJson.sections[0].blocks[1].content}</p>
                </section>

                <section className="alk-container servicesHome mt-auto mb-5">
                    <CardDeck className="my-auto">
                        <Row>
                            <Col xs={12} sm={6} lg={3}>
                                <Card className="border-0 p-0 p-lg-3 animated bounceInUp cardOne h-100">
                                    {data.webDesign.childImageSharp && (
                                        <Img
                                            imgStyle={{
                                                maxHeight: "200px",
                                                maxWidth: "auto",
                                                objectFit: "contain",
                                            }}
                                            fluid={
                                                data.webDesign.childImageSharp
                                                    .fluid
                                            }
                                            className="card-img-top image-services mx-auto my-auto"
                                            alt="Responsive Web Design Services"
                                        />
                                    )}
                                    <CardFooter>
                                        <CardTitle
                                            tag="h3"
                                            className="text-center"
                                        >
                                            {
                                                data.homepageJson.sections[1]
                                                    .blocks[0].heading
                                            }
                                        </CardTitle>
                                    </CardFooter>
                                    <CardImgOverlay className="h-100">
                                        <CardBody className="d-flex align-items-end justify-content-center">
                                            <CardText>
                                                {
                                                    data.homepageJson
                                                        .sections[1].blocks[0]
                                                        .content
                                                }
                                            </CardText>
                                        </CardBody>
                                        <CardFooter>
                                            <Button
                                                color="primary"
                                                size="md"
                                                to="/responsive-web-design"
                                                tag={Link}
                                                block
                                            >
                                                Web Design Service
                                            </Button>
                                        </CardFooter>
                                    </CardImgOverlay>
                                </Card>
                            </Col>
                            <Col xs={12} sm={6} lg={3}>
                                <Card className="border-0 p-0 p-lg-3 animated bounceInUp cardTwo h-100">
                                    {data.webDevelopment.childImageSharp && (
                                        <Img
                                            imgStyle={{
                                                maxHeight: "200px",
                                                maxWidth: "auto",
                                                objectFit: "contain",
                                            }}
                                            className="card-img-top image-services mx-auto my-auto"
                                            fluid={
                                                data.webDevelopment
                                                    .childImageSharp.fluid
                                            }
                                            alt="Quality Web Development Services"
                                        />
                                    )}
                                    <CardFooter className="d-flex align-items-end justify-content-center">
                                        <CardTitle
                                            tag="h3"
                                            className="text-center"
                                        >
                                            {
                                                data.homepageJson.sections[1]
                                                    .blocks[1].heading
                                            }
                                        </CardTitle>
                                    </CardFooter>
                                    <CardImgOverlay className="h-100">
                                        <CardBody>
                                            <CardText>
                                                {
                                                    data.homepageJson
                                                        .sections[1].blocks[1]
                                                        .content
                                                }
                                            </CardText>
                                        </CardBody>
                                        <CardFooter>
                                            <Button
                                                color="primary"
                                                size="md"
                                                to="/web-development"
                                                tag={Link}
                                                block
                                            >
                                                Web Development Service
                                            </Button>
                                        </CardFooter>
                                    </CardImgOverlay>
                                </Card>
                            </Col>
                            <Col xs={12} sm={6} lg={3}>
                                <Card className="border-0 p-0 p-lg-3 animated bounceInUp cardThree h-100">
                                    {data.eCommerce.childImageSharp && (
                                        <Img
                                            imgStyle={{
                                                maxHeight: "200px",
                                                maxWidth: "auto",
                                                objectFit: "contain",
                                            }}
                                            className="card-img-top image-services mx-auto my-auto"
                                            fluid={
                                                data.eCommerce.childImageSharp
                                                    .fluid
                                            }
                                            alt="Ecommerce Design Services"
                                        />
                                    )}
                                    <CardFooter className="d-flex align-items-end justify-content-center">
                                        <CardTitle
                                            tag="h3"
                                            className="text-center"
                                        >
                                            {
                                                data.homepageJson.sections[1]
                                                    .blocks[2].heading
                                            }
                                        </CardTitle>
                                    </CardFooter>
                                    <CardImgOverlay className="h-100">
                                        <CardBody>
                                            <CardText>
                                                {
                                                    data.homepageJson
                                                        .sections[1].blocks[2]
                                                        .content
                                                }
                                            </CardText>
                                        </CardBody>
                                        <CardFooter>
                                            <Button
                                                color="primary"
                                                size="md"
                                                tag={Link}
                                                to="/ecommerce-design"
                                                block
                                            >
                                                eCommerce Design Service
                                            </Button>
                                        </CardFooter>
                                    </CardImgOverlay>
                                </Card>
                            </Col>
                            <Col xs={12} sm={6} lg={3}>
                                <Card className="border-0 p-0 p-lg-3 animated bounceInUp cardFour">
                                    {data.digitalMarketing.childImageSharp && (
                                        <Img
                                            imgStyle={{
                                                maxHeight: "200px",
                                                maxWidth: "auto",
                                                objectFit: "contain",
                                            }}
                                            className="card-img-top image-services mx-auto my-auto"
                                            fluid={
                                                data.digitalMarketing
                                                    .childImageSharp.fluid
                                            }
                                            alt="Digital Marketing Services"
                                        />
                                    )}
                                    <CardFooter className="d-flex align-items-end justify-content-center">
                                        <CardTitle
                                            tag="h3"
                                            className="text-center"
                                        >
                                            {
                                                data.homepageJson.sections[1]
                                                    .blocks[3].heading
                                            }
                                        </CardTitle>
                                    </CardFooter>
                                    <CardImgOverlay className="h-100">
                                        <CardBody>
                                            <CardText>
                                                {
                                                    data.homepageJson
                                                        .sections[1].blocks[3]
                                                        .content
                                                }
                                            </CardText>
                                        </CardBody>
                                        <CardFooter>
                                            <Button
                                                color="primary"
                                                size="md"
                                                tag={Link}
                                                to="/digital-marketing"
                                                block
                                            >
                                                Digital Marketing Service
                                            </Button>
                                        </CardFooter>
                                    </CardImgOverlay>
                                </Card>
                            </Col>
                        </Row>
                    </CardDeck>
                </section>
                <section className="alk-container statsCounter mb-4 text-center py-4">
                    <h2>{data.homepageJson.sections[3].heading}</h2>
                    <Row className="pt-4">
                        <Col xs={12} sm={6} md={3}>
                            <ReactCounter theNumber={firstNumber} />
                            <p className="text-muted">
                                {data.homepageJson.sections[3].stats[0].title}
                            </p>
                        </Col>

                        <Col xs={12} sm={6} md={3}>
                            <ReactCounter theNumber={secondNumber} />
                            <p className="text-muted">
                                {data.homepageJson.sections[3].stats[1].title}
                            </p>
                        </Col>

                        <Col xs={12} sm={6} md={3}>
                            <ReactCounter theNumber={thirdNumber} />
                            <p className="text-muted">
                                {data.homepageJson.sections[3].stats[2].title}
                            </p>
                        </Col>

                        <Col xs={12} sm={6} md={3}>
                            <ReactCounter theNumber={fourthNumber} />
                            <p className="text-muted">
                                {data.homepageJson.sections[3].stats[3].title}
                            </p>
                        </Col>
                    </Row>
                </section>
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
                                        className="ourPassionImg animated slideInLeft mb-5 mb-lg-0"
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
                    <BlogWidget posts={data.allMdx.edges} />
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
                top: introSection.current.offsetTop - 100,
                behavior: "smooth",
            });
    });
};

const handleScroll = () => {
    // header opacity
    const topBoundary = window.innerHeight - 100;
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
               allMdx(sort: { order: DESC, fields: [frontmatter___date] }) {
                   edges {
                       node {
                           id
                           excerpt(pruneLength: 100)
                           frontmatter {
                               title
                               path
                               excerpt
                               date(formatString: "MMMM DD, YYYY")
                               cover {
                                   ...fluidImageSmall
                               }
                           }
                       }
                   }
               }
               heroBg: file(relativePath: { regex: "/hero-bg.jpg/" }) {
                   ...fluidImageLG
               }
               heroBgMobile: file(
                   relativePath: { regex: "/hero-bg.jpg/" }
               ) {
                   ...fluidImageSmall
               }
               alkemyStack: file(
                   relativePath: { regex: "/alkemy-stack.png/" }
               ) {
                   ...fluidImageSmall
               }
               webDesign: file(relativePath: { regex: "/responsive.png/" }) {
                   ...fluidImageSmall
               }
               webDevelopment: file(
                   relativePath: { regex: "/development.png/" }
               ) {
                   ...fluidImageSmall
               }
               eCommerce: file(relativePath: { regex: "/ecommerce.png/" }) {
                   ...fluidImageSmall
               }
               digitalMarketing: file(
                   relativePath: { regex: "/marketing.png/" }
               ) {
                   ...fluidImageSmall
               }
               ourPassion: file(relativePath: { regex: "/our-passion.jpg/" }) {
                   ...fluidImageSmall
               }
           }
       `;

export default HomePage;
