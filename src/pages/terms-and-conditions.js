import React,{useEffect} from "react";
import Layout from "../components/layout";
import ScrollWrapper from "../components/scrollWrapper.jsx";
import EnquiryWidget from "../components/widgetEnquiry";
import SEO from "../components/seo";

/*
Layout props:
  pageTitle: SEO friendly title for the title bar
  headerTitle: array that defines subheader props
      [
        boolean (is there a subheader),
        {
            name: string (subheader text),
            url: string (link for subheader text)
        }
      ]
  bodyClasses: additional classes to add to body tag
*/

const TermsAndConditions = ({ data }) => {
    // pageTitle: SEO friendly title for the title bar
    const pageTitle = { name: "Terms & Conditions", url: "/terms-and-conditions" };

    useEffect( () => {
        fetch(
            "https://app.termageddon.com/api/policy/ZFdwUE1IVmlTMFpKY1ZwNGJVRTlQUT09?no-title=true"
        )
            .then(res => res.text())
            .then(res => (terms.current.innerHTML = res));
    }, []);

    // useEffect(() => {
    //     if (typeof window !== "undefined" ) {
    //         terms.current.innerHTML = state
    //     }
    // });

    return (
        <ScrollWrapper>
            <Layout
                renderHeaderSolid={true}
                headerTitle={[true, pageTitle]}
                bodyClasses="terms"
            >
                <SEO title={pageTitle.name} />

                {/* Section 1 */}
                <section
                    className="wrap alk-container my-5"
                    ref={terms}
                    data-policy-key="ZFdwUE1IVmlTMFpKY1ZwNGJVRTlQUT09"
                />

                <EnquiryWidget/>
            </Layout>
        </ScrollWrapper>
    );
};
const terms = React.createRef();

export default TermsAndConditions;
