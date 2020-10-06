import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Link from "gatsby-link";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { Button } from "reactstrap";
import {startCase} from "lodash";

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

const Tags = ({ pageContext, data }, location) => {
    const { tag } = pageContext;
    const siteTitle = data.site.siteMetadata.title;
    const { edges, totalCount } = data.allMdx;
    const tagHeader = `Found ${totalCount} article${
        totalCount === 1 ? "" : "s"
    } tagged with "${tag}"`;
    const pageTitle = `Blog Tag: "${startCase(tag)}"`;
    return (
        <Layout
            location={location}
            title={siteTitle}
            headerTitle={[true, pageTitle]}
            search={false}
            bodyClasses="tags"
            renderHeaderSolid={true}
        >
            <SEO
                title={pageTitle}
                description={`List of all articles tagged with ${startCase(
                    tag
                )}`}
            />
            <div className="alk-container my-5">
                <h3>{tagHeader}</h3>
                <ul className="my-4">
                    {edges.map(({ node }) => {
                        const { title } = node.frontmatter;
                        const { slug } = node.fields;
                        return (
                            <li key={slug}>
                                <Link to={slug}>{title}</Link>
                            </li>
                        );
                    })}
                </ul>
                <Button tag={Link} to="/tags" color="primary">
                    ← View All Tags
                </Button>
            </div>
        </Layout>
    );
};

Tags.propTypes = {
    pageContext: PropTypes.shape({
        tag: PropTypes.string.isRequired,
    }),
    data: PropTypes.shape({
        allMdx: PropTypes.shape({
            totalCount: PropTypes.number.isRequired,
            edges: PropTypes.arrayOf(
                PropTypes.shape({
                    node: PropTypes.shape({
                        frontmatter: PropTypes.shape({
                            path: PropTypes.string.isRequired,
                            title: PropTypes.string.isRequired,
                        }),
                    }),
                }).isRequired
            ),
        }),
    }),
};

export default Tags;

export const pageQuery = graphql`
    query($tag: String) {
        site {
            siteMetadata {
                title
            }
        }
        allMdx(
            limit: 2000
            sort: { fields: [frontmatter___date], order: DESC }
            filter: { frontmatter: { tags: { in: [$tag] } } }
        ) {
            totalCount
            edges {
                node {
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                    }
                }
            }
        }
    }
`;
