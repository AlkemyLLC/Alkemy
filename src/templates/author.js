import React from "react";
import { Link, graphql, navigate } from "gatsby";
import Img from "gatsby-image";
import { Context } from "../store/appContext.js";
import { addJS, fluidImageSmall } from "../utils/utils.js";
import Layout from "../components/layout";
import {uniq} from "lodash";
import SEO from "../components/seo";
import SkillGraph from "../components/SkillGraph.jsx";
import { FormGroup, Label, Col, Row, Container } from "reactstrap";
import FreeWebsiteAnalysis from "../components/freeWebsiteAnalysis.jsx";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

/*
Layout props:
  renderHeaderSolid: Whether the top navigation should be solid or start transparent
  headerTitle: array that defines subheader props
      [
        boolean (is there a subheader),
        string (subheader text)
      ]
  bodyClasses: additional classes to add to body tag
*/

class AuthorProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dropdown: "",
        };

        this.categorySelect = React.createRef();
    }

    handleDropdownChange = (value, actions) => {
        this.setState({ dropdown: value });

        // reset the search in store
        actions.search("");
        actions.searchTitle("");

        // redirect user to /alkemy-blog/ or /alkemy-blog/?cat=<:name> if other than home
        if (value.label.toLowerCase() === "blog home") {
            navigate("/alkemy-blog/");
        } else {
            // let category = value.label.replace(/\s/g, "+") // sanitize the name for use in url
            navigate(`/alkemy-blog/`, { state: { value } });
            // navigate(`/alkemy-blog/?cat=${category}`,{queryParam: category})
        }
    };

    render() {
        const pageTitle = {url:`/alkemy-blog`,name:`Alkemy Blog`};
        const edges = this.props.data.allMdx.edges;
        const author = this.props.data.allAuthorsJson.edges[0].node;

        let blogCategories = (jump = false) => {
            // create a categories array
            let categories =
                edges &&
                edges.map(e => {
                    return e.node.frontmatter.category;
                });
            categories = uniq(categories);

            // aux array
            let categoryArray = [];

            // if it's the Jump to menu, push in a home case
            jump &&
                categoryArray.push({ label: "Blog Home", value: "Blog Home" });

            // loop the category array and push in pairs to aux
            for (let i in categories) {
                categoryArray.push({
                    label: categories[i],
                    value: categories[i],
                });
            }

            return categoryArray;
        };

        // addJS(position,inner script,source) - adds JS to document dynamically for AddThis Toolbar
        addJS(
            `body`,
            null,
            `//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5ae21853f0b21631`
        );

        return (
            <Layout
                location={this.props.location}
                title={author.name}
                headerTitle={[true, pageTitle]}
                search={true}
                bodyClasses="blog-author"
                renderHeaderSolid={true}
            >
                <SEO
                    title={author.name}
                    description={author.name + "-" + author.bio}
                />
                <div className="alk-container blog-author pb-5">
                    <section className="blog-category-filter my-3">
                        <Row className="align-items-center h-100">
                            <Col
                                xs={12}
                                sm={{ size: 10, offset: 2 }}
                                md={{ size: 8, offset: 4 }}
                                lg={{ size: 6, offset: 6 }}
                                xl={{ size: 4, offset: 8 }}
                            >
                                {/* Category Dropdown */}
                                <FormGroup row className="align-items-center">
                                    <Label
                                        for="categories"
                                        xs={3}
                                        className="text-right text-muted"
                                    >
                                        Jump to:
                                    </Label>
                                    <Col xs={9}>
                                        <Context.Consumer>
                                            {({ actions }) => (
                                                <Select
                                                    className="category-select"
                                                    classNamePrefix="select"
                                                    placeholder="Select a value..."
                                                    name="categories"
                                                    options={blogCategories(
                                                        true
                                                    )}
                                                    ref={this.categorySelect}
                                                    value={this.state.dropdown}
                                                    onChange={value =>
                                                        this.handleDropdownChange(
                                                            value,
                                                            actions
                                                        )
                                                    }
                                                />
                                            )}
                                        </Context.Consumer>
                                    </Col>
                                </FormGroup>
                            </Col>
                        </Row>
                    </section>
                    <section className="blog-author-profile my-5">
                        <Row className="h-100">
                            <Col xs={12} lg={4} className="h-100 mb-4">
                                <Img
                                    className="h-100 author-photo"
                                    fluid={author.photo.childImageSharp.fluid}
                                    alt={
                                        "Photo of " +
                                        author.name +
                                        " from " +
                                        author.company
                                    }
                                />
                                <a href={author.website}>
                                    <FontAwesomeIcon
                                        icon="globe"
                                        className="authorWebsite mr-2 mt-3"
                                    />
                                    Visit My Website
                                </a>
                            </Col>
                            <Col xs={12} lg={8}>
                                <Row>
                                    <Col className="align-items-center">
                                        <h2>{author.name}</h2>
                                    </Col>
                                    <Col className="align-items-center">
                                        <p className="font-weight-bold text-lg-right mb-0">
                                            {author.position}
                                        </p>
                                        <p className="text-muted text-lg-right mb-0">
                                            {author.company}
                                        </p>
                                    </Col>
                                </Row>
                                <Row className="my-4">
                                    <Col>
                                        <p>{author.bio}</p>
                                    </Col>
                                </Row>
                                <SkillGraph skills={author.skills} />
                            </Col>
                        </Row>
                    </section>
                </div>
                <FreeWebsiteAnalysis />
            </Layout>
        );
    }
}

AuthorProfile.propTypes = {
    location: PropTypes.object,
};

export default AuthorProfile;

export const query = graphql`
    query AuthorQuery($author: String!) {
        allMdx {
            edges {
                node {
                    frontmatter {
                        category
                    }
                }
            }
        }
        allAuthorsJson(filter: { name: { regex: $author } }) {
            edges {
                node {
                    name
                    slug
                    bio
                    position
                    company
                    website
                    photo {
                        ...fluidImageSmall
                    }
                    skills {
                        name
                        level
                    }
                }
            }
        }
    }
`;
