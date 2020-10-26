import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ThankYou = () => {
    return (
        <section className="thankYou py-5 px-3">
            <span className="d-flex flex-row align-items-center justify-content-center text-success mb-5">
                <FontAwesomeIcon
                    icon={["far", "check-circle"]}
                    size="2x"
                    color="success"
                />
                <h1 className="ml-2 text-center my-auto">Success!</h1>
            </span>

            <div className="container">
                <p>
                    Thank you for choosing Alkemy! We have successfully received
                    your request. As soon as one of our team members has
                    reviewed your request, we will contact you to discuss the
                    next steps.
                </p>
                <p>
                    If for any reason you don&apos;t hear back from our team in
                    2 business days, please feel free to give us a call at{" "}
                    <a href="tel:8774255369">877-4ALKEMY</a> (425-5369).
                </p>
            </div>
        </section>
    );
};

export default ThankYou;
