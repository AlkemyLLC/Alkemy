/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
import { Location } from "@reach/router";
import { motion, AnimatePresence } from "framer-motion";
import Header from "./header";
import Footer from "./footer";


const Modernizr = typeof window!=='undefined' && require("../utils/modernizr-custom");

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
    faChevronDown,
    faSpinner,
    faMobileAlt,
    faArrowDown,
    faArrowUp,
    faCheck,
    faChartPie,
    faChartLine,
    faRocket,
    faMoneyBillAlt,
    faGem,
    faStar,
    faSearch,
    faGlobe,
    faFlask,
    faChevronRight,
    faLifeRing,
    faShieldAlt,
    faCogs,
    faServer,
    faTachometerAlt,
    faDatabase,
    faTimesCircle,
    faTimes
} from "@fortawesome/free-solid-svg-icons";
import {
    faCalendarAlt,
    faCalendarPlus,
    faCheckCircle,
    faListAlt,
    faClock,
    faUser
} from "@fortawesome/free-regular-svg-icons";

library.add(
    fab,
    faArrowDown,
    faArrowUp,
    faChevronDown,
    faCalendarAlt,
    faCalendarPlus,
    faSpinner,
    faMobileAlt,
    faCheck,
    faCheckCircle,
    faChartPie,
    faChartLine,
    faClock,
    faListAlt,
    faRocket,
    faMoneyBillAlt,
    faGem,
    faGlobe,
    faStar,
    faSearch,
    faUser,
    faFlask,
    faChevronRight,
    faLifeRing,
    faShieldAlt,
    faCogs,
    faServer,
    faTachometerAlt,
    faTimes,
    faDatabase,
    faTimesCircle,
    faSearch
);


const variants = {
    initial: {
        opacity: 0,
    },
    enter: {
        opacity: 1,
        transition: {
            ease: "linear",
            duration: 0.5,
            when: "beforeChildren",
        },
    },
    exit: {
        opacity: 0,
        transition: { duration: 0.5 },
    },
};

const Layout = ({
    location,
    children,
    renderHeaderSolid,
    headerTitle,
    headerType,
    bodyClasses,
    search,
}) => {
    useEffect(() => {
        if (typeof window !== "undefined") {
            let overflowControl = bodyClasses.includes(`blog-single-page`)?``:` body-wrap`;
            document.body.classList = bodyClasses + overflowControl;
            if (document.documentElement.classList.contains("overflow-hidden"))
                document.documentElement.classList.remove("overflow-hidden");
        }
    }, []);


    return (
        <StaticQuery
            query={graphql`
                query SiteTitleQuery {
                    site {
                        siteMetadata {
                            title
                        }
                    }
                }
            `}
            render={data => (
                <div key={`body`} id="bodyWrap">
                    <Header
                        hideHeader={headerTitle ? headerTitle[0] : null}
                        pageTitle={headerTitle ? headerTitle[1] : {}}
                        renderHeaderSolid={renderHeaderSolid}
                    />
                    <AnimatePresence>
                        <motion.main
                            key={Location.pathname}
                            variants={variants}
                            initial="initial"
                            animate="enter"
                            exit="exit"
                        >
                            <div id="main">{children}</div>
                            <div className="callNow d-lg-none">
                                <a href="tel:8774255369" title="Call Now!">
                                    <FontAwesomeIcon
                                        icon="mobile-alt"
                                        size="2x"
                                        color="white"
                                        className="callNowButton"
                                    />
                                </a>
                            </div>
                        </motion.main>
                    </AnimatePresence>
                    <Footer />
                </div>
            )}
        />
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
    headerTitle: PropTypes.array,
    renderHeaderSolid: PropTypes.bool,
    search: PropTypes.bool,
};

export default Layout;
