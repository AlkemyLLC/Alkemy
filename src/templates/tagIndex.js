import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Link from "gatsby-link";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { Button } from "reactstrap";
import {replace} from "lodash";

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

const Tags = ({ pageContext, data }) => {
    const { tags } = pageContext;
    const siteTitle = data.site.siteMetadata.title;
    const tagCount = tags.length;
    const tagHeader = `${tagCount} tag${tagCount === 1 ? "" : "s"} found.`;
    const pageTitle = "Tag Index";
    return (
        <Layout
            title={siteTitle}
            headerTitle={[true, pageTitle]}
            search={false}
            bodyClasses="tags"
            renderHeaderSolid={true}
        >
            <SEO
                title={pageTitle}
                description="Index of all Blog Tags on the Alkemy Site"
            />
            <div className="alk-container my-5">
                <h3>{tagHeader}</h3>
                <ul className="my-4">
                    {tags.map(slug => {
                        let sanitizedSlug = "";
                        console.log(slug, slug.includes("&"));
                        if (slug.includes("&")) {
                            sanitizedSlug = replace(slug, " & ", "-");
                        } else if (slug.includes(" ")) {
                            sanitizedSlug = replace(slug, " ", "-");
                        } else {
                            sanitizedSlug = slug;
                        }
                        return (
                            <li key={sanitizedSlug}>
                                <Link to={"/tags/" + sanitizedSlug}>
                                    {slug}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
                <Button tag={Link} to="/alkemy-blog" color="primary">
                    Visit the Alkemy Blog
                </Button>
            </div>
        </Layout>
    );
};

Tags.propTypes = {
    pageContext: PropTypes.shape({
        tags: PropTypes.string.isRequired,
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
    query TagIndexQuery($tag: String) {
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
