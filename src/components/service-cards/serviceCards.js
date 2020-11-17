import React from "react";
import { Link } from "gatsby";
import { motion } from "framer-motion";
import { CardDeck, CardTitle, CardBody, Button, Col, Row } from "reactstrap";
import Img from "gatsby-image";

const ServiceCards = (props)=>{
    const {data} = props;

    const card = {
        rest: { scale: 1 },
        hover: { scale: 1.1 },
        pressed: { scale: 0.95 },
    };

    return (
        <CardDeck className="my-auto">
            <Row>
                <Col xs={12} sm={6} lg={3} className="mb-5">
                    <Link to="/responsive-web-design">
                        <motion.div
                            className="card p-4 h-100"
                            variants={card}
                            initial="rest"
                            whileHover="hover"
                            whileTap="pressed"
                        >
                            {data.webDesign.childImageSharp && (
                                <Img
                                    imgStyle={{
                                        maxHeight: "200px",
                                        maxWidth: "auto",
                                        objectFit: "contain",
                                    }}
                                    fluid={data.webDesign.childImageSharp.fluid}
                                    className="card-img-top image-services mx-auto my-auto"
                                    alt="Responsive Web Design Services"
                                />
                            )}

                            <CardBody className="p-0 d-flex align-items-end justify-content-center flex-grow-1">
                                <CardTitle tag="h3" className="text-center m-0">
                                    {
                                        data.homepageJson.sections[1].blocks[0]
                                            .heading
                                    }
                                </CardTitle>
                            </CardBody>
                        </motion.div>
                    </Link>
                </Col>
                <Col xs={12} sm={6} lg={3} className="mb-5">
                    <Link to="/web-development">
                        <motion.div
                            className="card p-4 h-100"
                            variants={card}
                            initial="rest"
                            whileHover="hover"
                            whileTap="pressed"
                        >
                            {data.webDevelopment.childImageSharp && (
                                <Img
                                    imgStyle={{
                                        maxHeight: "200px",
                                        maxWidth: "auto",
                                        objectFit: "contain",
                                    }}
                                    className="card-img-top image-services mx-auto"
                                    fluid={
                                        data.webDevelopment.childImageSharp
                                            .fluid
                                    }
                                    alt="Quality Web Development Services"
                                />
                            )}
                            <CardBody className="p-0 d-flex align-items-end justify-content-center flex-grow-1">
                                <CardTitle tag="h3" className="text-center m-0">
                                    {
                                        data.homepageJson.sections[1].blocks[1]
                                            .heading
                                    }
                                </CardTitle>
                            </CardBody>
                        </motion.div>
                    </Link>
                </Col>
                <Col xs={12} sm={6} lg={3} className="mb-5">
                    <Link to="/ecommerce-design">
                        <motion.div
                            className="card p-4 h-100"
                            variants={card}
                            initial="rest"
                            whileHover="hover"
                            whileTap="pressed"
                        >
                            {data.eCommerce.childImageSharp && (
                                <Img
                                    imgStyle={{
                                        maxHeight: "200px",
                                        maxWidth: "auto",
                                        objectFit: "contain",
                                    }}
                                    className="card-img-top image-services mx-auto"
                                    fluid={data.eCommerce.childImageSharp.fluid}
                                    alt="Ecommerce Design Services"
                                />
                            )}
                            <CardBody className="p-0 d-flex align-items-end justify-content-center flex-grow-1">
                                <CardTitle tag="h3" className="text-center m-0">
                                    {
                                        data.homepageJson.sections[1].blocks[2]
                                            .heading
                                    }
                                </CardTitle>
                            </CardBody>
                        </motion.div>
                    </Link>
                </Col>
                <Col xs={12} sm={6} lg={3} className="mb-5">
                    <Link to="/digital-marketing">
                        <motion.div
                            className="card p-4 h-100"
                            variants={card}
                            initial="rest"
                            whileHover="hover"
                            whileTap="pressed"
                        >
                            {data.digitalMarketing.childImageSharp && (
                                <Img
                                    imgStyle={{
                                        maxHeight: "200px",
                                        maxWidth: "auto",
                                        objectFit: "contain",
                                    }}
                                    className="card-img-top image-services mx-auto"
                                    fluid={
                                        data.digitalMarketing.childImageSharp
                                            .fluid
                                    }
                                    alt="Digital Marketing Services"
                                />
                            )}
                            <CardBody className="p-0 d-flex align-items-end justify-content-center flex-grow-1">
                                <CardTitle tag="h3" className="text-center m-0">
                                    {
                                        data.homepageJson.sections[1].blocks[3]
                                            .heading
                                    }
                                </CardTitle>
                            </CardBody>
                        </motion.div>
                    </Link>
                </Col>
            </Row>
        </CardDeck>
    );
}

export default ServiceCards;