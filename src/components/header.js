import React from "react";
import { graphql, Link, StaticQuery } from "gatsby";
import ReactNavbar from "./Navbar.jsx";
import { Col, Row } from "reactstrap";
import PropTypes from "prop-types";
import { useWindowSize,fluidImageSmall } from "../utils/utils.js";

/*
_menuArray object details:
  name:  the title of the menu item (link text)
  id: id used for unique key. top level is numbered, submenu adds letters.
  drop: true/false, specifies if it is a dropdown menu
  url: the url for Link
  submenu: a nested array for dropdown menu items
*/

var _menuArray = [
    {
        name: "Solutions",
        id: "1",
        drop: true,
        title: true,
        submenu: [
            {
                name: "Responsive Web Design",
                id: "1a",
                url: "/responsive-web-design",
            },
            { name: "Web Development", id: "1b", url: "/web-development" },
            { name: "eCommerce Design", id: "1c", url: "/ecommerce-design" },
            { name: "Digital Marketing", id: "1d", url: "/digital-marketing" },
            { name: "Wordpress Care Plans", id: "1e", url: "/wordpress-care-plans" },
        ],
    },
    {
        name: "Blog",
        title: true,
        id: "2",
        drop: false,
        url: "/alkemy-blog",
    },
    {
        name: "About",
        title: true,
        id: "3",
        drop: false,
        url: "/about-alkemy",
    },
    {
        name: "Contact",
        title: true,
        id: "4",
        drop: false,
        url: "/contact-alkemy",
    },
];

const Header = ({ pageTitle, hideHeader, renderHeaderSolid }) => {
    const size = useWindowSize();

    
    return (
        <StaticQuery
            query={graphql`
                query HeaderBlogQuery {
                    logo: file(relativePath: { regex: "/alkemy_logo.png/" }) {
                        ...fluidImageSmall
                    }
                }
            `}
            render={data => (
                <>
                    <header
                        className={
                            renderHeaderSolid
                                ? "header solid position-fixed"
                                : size.width >= 768
                                    ? "header position-fixed"
                                    : "header solid position-fixed"
                        }
                    >
                        {data.logo.childImageSharp && (
                            <ReactNavbar
                                menuArray={_menuArray}
                                brand={data.logo.childImageSharp.fluid}
                            />
                        )}
                    </header>
                    {hideHeader === true ? (
                        <Row className="subHeader mx-0 alk-container py-2">
                            <Col xs={12} md={8} className="px-0">
                                <Link to={pageTitle.url} className="m-0 text-white">
                                    <h1 className="m-0 font-weight-normal">
                                        {pageTitle.name}
                                    </h1>
                                </Link>
                            </Col>
                        </Row>
                    ) : null}
                </>
            )}
        />
    )
};

Header.propTypes = {
    pageTitle: PropTypes.object,
    hideHeader: PropTypes.bool,
    renderHeaderSolid: PropTypes.bool,
};
export default Header;
