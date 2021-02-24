import React from "react";
import { Link } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { Button, Col, Row } from "reactstrap";
import Img from "gatsby-image";


const HomeHero = (props)=>{
    const {data} = props;

    const heroImg = [
        data.heroBgMobile.childImageSharp.fluid,
        {
            ...data.heroBg.childImageSharp.fluid,
            media: `(min-width: 769px)`,
        }
    ];

    const card = {
        rest: { scale: 1 },
        hover: { scale: 1.1 },
        pressed: { scale: 0.95 },
    };

    return (
        <section className="hero-wrapper bg-black">
            <Img
                style={{
                    position: "absolute",
                }}
                className="homeHero h-100"
                fluid={heroImg}
                alt="view of tall skyscrapers while looking up from the ground"
            />
            
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
                            fluid={data.alkemyStack.childImageSharp.fluid}
                            alt="Logos of various programming languages and frameworks we use"
                        />
                    )}
                </Row>
                <Row className="cover-text-row d-flex align-items-center w-100 no-gutters">
                    <Col xs={12} lg={7}>
                        <div className="cover-text">
                            <div className="mb-3 mb-lg-5">
                                <h1 className="hero-heading d-block mb-3">
                                    Unique Digital Experiences
                                </h1>
                                <p className="d-block h5 font-weight-normal">
                                    Expertly designed and crafted to wow your
                                    customers and increase sales.
                                </p>
                            </div>

                            {/* Cover CTA */}
                            <Button
                                color="primary"
                                size="lg"
                                to="/project-enquiry"
                                tag={Link}
                            >
                                Start your project
                            </Button>
                        </div>
                    </Col>
                    <Col lg={5} className="d-none d-lg-block pl-md-4">
                        {data.alkemyStack.childImageSharp && (
                            <Img
                                fluid={data.alkemyStack.childImageSharp.fluid}
                                alt="Logos of various programming languages and frameworks we use"
                            />
                        )}
                    </Col>
                </Row>
            </div>
            {/* Caret */}
            <motion.div
                variants={card}
                initial="rest"
                whileHover="hover"
                whileTap="pressed"
                className="heroChevron"
            >
                <FontAwesomeIcon
                    onClick={props.handleCaretClick}
                    icon="chevron-down"
                    size="3x"
                    color="white"
                />
            </motion.div>
        </section>
    );
}
export default HomeHero;