import React,{useState,useEffect} from "react";
import PropTypes from "prop-types";
import {
    EmailShareButton,
    FacebookShareButton,
    InstapaperShareButton,
    LineShareButton,
    LinkedinShareButton,
    RedditShareButton,
    TumblrShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    WorkplaceShareButton,
    EmailIcon,
    FacebookIcon,
    InstapaperIcon,
    LineIcon,
    LinkedinIcon,
    RedditIcon,
    TumblrIcon,
    TwitterIcon,
    WhatsappIcon,
    WorkplaceIcon,
} from "react-share";


const BlogSharing = (props,location) => {
    const url = window && window.location.href;

    return (
        <div className={props.className + " my-4 mx-0 text-center text-md-left"}>
            <FacebookShareButton url={url}>
                <FacebookIcon size={38} round={true} />
            </FacebookShareButton>

            <TwitterShareButton url={url}>
                <TwitterIcon size={38} round={true} />
            </TwitterShareButton>

            <LinkedinShareButton url={url}>
                <LinkedinIcon size={38} round={true} />
            </LinkedinShareButton>

            <RedditShareButton url={url}>
                <RedditIcon size={38} round={true} />
            </RedditShareButton>

            <WhatsappShareButton url={url}>
                <WhatsappIcon size={38} round={true} />
            </WhatsappShareButton>

            <LineShareButton url={url}>
                <LineIcon size={38} round={true} />
            </LineShareButton>

            <EmailShareButton url={url}>
                <EmailIcon size={38} round={true} />
            </EmailShareButton>
        </div>
    );
};

BlogSharing.propTypes = {
    
};

export default BlogSharing;