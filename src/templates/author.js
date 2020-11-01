import React,{useState} from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import { useWindowSize, fluidImageSmall } from "../utils/utils.js";
import Layout from "../components/layout";
import {uniq} from "lodash";
import SEO from "../components/seo";
import SkillGraph from "../components/SkillGraph.jsx";
import { Col, Row } from "reactstrap";
import FreeWebsiteAnalysis from "../components/freeWebsiteAnalysis.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import BlogCategoryBar from "../components/BlogCategoryBar.jsx";

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

const AuthorProfile = (props)=> {
        const size = useWindowSize();
        const { data, location } = props;
        const pageTitle = {url:`/alkemy-blog`,name:`Alkemy Blog`};
        const edges = data.allMdx.edges;
        const author = data.allAuthorsJson.edges[0].node;
        const [category, setCategory] = useState("all");

        const blogCategories = () => {
            // create a categories array
            let categories =
                edges &&
                edges.map(e => {
                    return e.node.frontmatter.category;
                });
            categories = uniq(categories).sort((a, b) => a.localeCompare(b));

            // aux array
            let categoryArray = [];

            // if it's the Jump to menu, push in a home case
            categoryArray.push({ label: "All", value: "all" });

            // loop the category array and push in pairs to aux
            for (let i in categories) {
                categoryArray.push({
                    label: categories[i],
                    value: categories[i].toLowerCase(),
                });
            }

            return categoryArray;
        };

        return (
            <Layout
                location={location}
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
                    <Row
                        className={
                            size.width > 760
                                ? "py-4 my-3"
                                : "pr-0 py-4 my-3"
                        }
                        noGutters
                    >
                        <Col xs={12}>
                            <BlogCategoryBar
                                defaultSelected={category}
                                categories={blogCategories()}
                                onSelectCategory={e =>
                                    handleCategorySelect(e)
                                }
                            />
                        </Col>
                    </Row>
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
