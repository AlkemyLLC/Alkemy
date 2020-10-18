import React from "react";
import PropTypes from "prop-types";
import { Row, Col,Badge } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BlogInfoBar = props => {
    const { ...other } = props;

    const renderHorizontal = () => {
        return (
            <>
                <Col xs={6} sm={props.author ? 3 : "auto"}>
                    <Badge
                        color="primary"
                        className="mb-md-0 blog-info-category"
                    >
                        {props.category}
                    </Badge>
                </Col>
                <Col
                    xs={6}
                    sm={props.author ? 4 : "auto"}
                    className="d-flex align-items-center blog-info-time mb-md-0"
                >
                    <FontAwesomeIcon
                        icon={["far", "clock"]}
                        size="sm"
                        color={props.iconColor || "black"}
                        className="mr-2 mb-md-0"
                    />
                    {props.time} Read
                </Col>
                {props.author && props.author.length > 0 ? (
                    <Col
                        xs={6}
                        sm={props.author ? 5 : null}
                        className="d-flex align-items-center justify-content-lg-end mb-md-0"
                    >
                        <FontAwesomeIcon
                            icon={["far", "user"]}
                            size="sm"
                            color={props.iconColor || "black"}
                            className="mr-2 mb-md-0"
                        />

                        {props.author && props.author.length > 0
                            ? props.author
                            : null}
                    </Col>
                ) : null}
            </>
        );
    };

    const renderVertical = () => {
        return (
            <>
                <Col xs={12}>
                    <Badge
                        color="primary"
                        className="mb-0"
                    >
                        {props.category}
                    </Badge>
                </Col>
                <Col xs={12}>
                    <p className="d-flex align-items-center mb-0">
                        <FontAwesomeIcon
                            icon={["far", "clock"]}
                            size="sm"
                            color={props.iconColor || "black"}
                            className="mr-2"
                        />
                        {props.time} Read
                    </p>
                </Col>
            </>
        );
    };

    return (
        // eslint-disable-next-line react/prop-types
        <Row {...other} className={props.className + " align-items-center"}>
            {props.layout.toLowerCase() === "horizontal"
                ? renderHorizontal()
                : renderVertical()}
        </Row>
    );
};

BlogInfoBar.propTypes = {
    category: PropTypes.string, // Category of the post
    time: PropTypes.string, // Reading time
    author: PropTypes.string, // Who Wrote the Post
    layout: PropTypes.string, // Horizontal or Vertical
    iconColor: PropTypes.string,
};

export default BlogInfoBar;
