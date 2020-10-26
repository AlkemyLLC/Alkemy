/* eslint-disable no-console */
import React from "react";
import ReCAPTCHA from "react-google-recaptcha";

// eslint-disable-next-line no-undef
const RECAPTCHA_KEY = process.env.SITE_RECAPTCHA_KEY;
if (typeof window !== "undefined") {
    // eslint-disable-next-line no-undef
    window.recaptchaOptions = {
        useRecaptchaNet: false,
        removeOnUnmount: false,
    };
}

const LoadableRecaptcha = (props)=>{

    return (
        <ReCAPTCHA
            className="recaptcha"
            sitekey={RECAPTCHA_KEY}
            onChange={props.onChange}
        />
    );
}

export default LoadableRecaptcha;