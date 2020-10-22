import React from "react";
import { Link } from "gatsby";

const EnquiryWidget = (props) => {
    
    return (
        <section className="section--enquiry alk-container d-flex align-items-center justify-content-center py-4">
            <div className="widget--enquiry text-center">
                <p className="d-md-inline h3 font-weight-normal text-white">
                    Ready to get started with your project?
                    <Link
                        className="btn btn-primary ml-lg-5 mt-4 mt-sm-3 mt-lg-0"
                        to="/project-enquiry/"
                    >
                        Tell us more about your idea
                    </Link>
                </p>
            </div>
        </section>
    );
};

export default EnquiryWidget;