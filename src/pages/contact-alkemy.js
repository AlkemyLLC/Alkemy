import React from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import { Button, Col, Row } from "reactstrap";
import Layout from "../components/layout";
import ScrollWrapper from "../components/scrollWrapper.jsx";
import CompanyInfo from "../components/CompanyInfo.jsx";
import ContactForm from "../components/ContactForm.jsx";
import ContactMap from "../components/Map.jsx";
import EnquiryWidget from "../components/widgetEnquiry";
import SEO from "../components/seo";
import "../utils/utils.js";

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

const ContactAlkemy = ({ data }) => {
    // pageTitle: SEO friendly title for the title bar
    const pageTitle = { name: "Contact Alkemy", url: "/contact-alkemy" };

    return (
        <ScrollWrapper onWindowScroll={handleScroll}>
            <Layout
                renderHeaderSolid={true}
                headerTitle={[true, pageTitle]}
                bodyClasses="contactAlkemy"
            >
                <SEO title={pageTitle.name} />

                {/* Section 1 */}
                <section className="contactIntro py-5">
                    <Row className="align-items-center px-5">
                        <Col xs={12} lg={6} className="mb-5">
                            <div className="mr-4">
                                <h2>
                                    {data.contactJson &&
                                        data.contactJson.sections[0].blocks[0]
                                            .heading}
                                </h2>
                                <p className="my-4">
                                    {data.contactJson &&
                                        data.contactJson.sections[0].blocks[0]
                                            .content}
                                </p>
                                <ul className="contactTopics">
                                    <li>
                                        <strong>
                                            {data.contactJson &&
                                                data.contactJson.sections[1]
                                                    .blocks[0].heading}
                                        </strong>{" "}
                                        {data.contactJson &&
                                            data.contactJson.sections[1]
                                                .blocks[0].content}
                                    </li>
                                    <li>
                                        <strong>
                                            {data.contactJson &&
                                                data.contactJson.sections[1]
                                                    .blocks[1].heading}
                                        </strong>{" "}
                                        {data.contactJson &&
                                            data.contactJson.sections[1]
                                                .blocks[1].content}
                                    </li>
                                    <li>
                                        <strong>
                                            {data.contactJson &&
                                                data.contactJson.sections[1]
                                                    .blocks[2].heading}
                                        </strong>{" "}
                                        {data.contactJson &&
                                            data.contactJson.sections[1]
                                                .blocks[2].content}
                                    </li>
                                </ul>
                            </div>
                        </Col>
                        <Col xs={12} lg={6}>
                            {data.contactImg.childImageSharp && (
                                <Img
                                    fluid={
                                        data.contactImg.childImageSharp.fluid
                                    }
                                    alt="Wait till you experience our best in class Customer Service!"
                                />
                            )}
                        </Col>
                    </Row>
                </section>


                <EnquiryWidget />

                {/* Section 2 */}
                <section className="contactDetails py-4">
                    <Row className="justify-content-center">
                        <Col xs={12} lg={6} className="mb-5">
                            <ContactForm />
                        </Col>
                        <Col xs={12} lg={5}>
                            <CompanyInfo />
                            <Row className="h-50 mt-5">
                                <Col xs={12}>
                                    <ContactMap />
                                </Col>
                            </Row>
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
        contactJson {
            sections {
                id
                blocks {
                    heading
                    content
                }
            }
        }
        contactImg: file(relativePath: { regex: "/contact.jpg/" }) {
            ...fluidImageSmall
        }
    }
`;

export default ContactAlkemy;
