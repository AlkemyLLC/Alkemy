import styled from "styled-components";

export default styled.div`
    position: absolute;
    top: 55px;
    left: 0;
    right: 0;
    @media screen and (min-width: 1080px) {
        right: ${() =>
            typeof window !== "undefined" &&
            document.getElementById("search-button") &&
            window.innerWidth -
                document.getElementById("search-button").getBoundingClientRect()
                    .right}px;
    }
`;
