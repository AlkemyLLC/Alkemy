import React from "react";
import { Link } from "gatsby";

const EnquiryWidget = (props) => {
    
    return (
        <div className="widget--enquiry">
            <p className="d-inline h3 font-weight-normal text-white">
                Ready to get started with your project? 
                <Link className="btn btn-primary ml-md-5" to="/project-enquiry/">
                    Tell us more about your idea
                </Link>
            </p>
        </div>
    );
};

export default EnquiryWidget;