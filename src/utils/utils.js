import { graphql } from "gatsby";
import React,{useEffect,useState} from "react";

export const fluidImageLG = graphql`
    fragment fluidImageLG on File {
        childImageSharp {
            fluid(maxWidth: 1920) {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
        }
    }
`;
export const fluidImage = graphql`
    fragment fluidImage on File {
        childImageSharp {
            fluid(maxWidth: 1200) {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
        }
    }
`;

export const trunc = data => {
    return data.substring(0, 50) + "...";
};

export const fluidImageSmall = graphql`
    fragment fluidImageSmall on File {
        childImageSharp {
            fluid(maxWidth: 600) {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
        }
    }
`;

export const fluidImageXS = graphql`
    fragment fluidImageXS on File {
        childImageSharp {
            fluid(maxWidth: 400) {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
        }
    }
`;

export function addJS(position = `head`, jsCode, source) {
    if (typeof window !== `undefined`) {
        let el = document.getElementsByTagName(position);
        let s = document.createElement(`script`);
        s.src = source;
        s.type = `text/javascript`;
        if (jsCode) s.innerText = jsCode;
        el[0].appendChild(s);
    }
}

export function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

export function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        // Handler to call on window resize
        function handleResize() {
            // Set window width/height to state
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        // Add event listener
        window.addEventListener("resize", handleResize);

        // Call handler right away so state gets updated with initial window size
        handleResize();

        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount

    return windowSize;
}