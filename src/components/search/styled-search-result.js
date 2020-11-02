import styled, { css } from "styled-components";
import SearchResult from "./search-result";

const Popover = css`
    width: 100vw;
    max-height: calc(
        100vh -
            ${() => typeof window !== "undefined" &&
                document.querySelector("header") &&
                document.querySelector("header").offsetHeight + 54}px
    );
    @media screen and (min-width: 1080px) {
        max-width: 30em;
        max-height: 80vh;
        position: absolute;
        z-index: 2;
        right: 0;
        top: 54px;
    }

    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    position: relative;
    z-index: 2;
    right: 0;
    top: 54px;
    margin-top: 0.5em;

    box-shadow: 0 0 5px 0;
    padding: 1em;
    border-radius: 2px;
    background: ${({ theme }) => theme.background};
`;

export default styled(SearchResult)`
    display: ${props => (props.show ? `block` : `none`)};
    ${Popover}

    .HitCount {
        display: flex;
        justify-content: flex-end;
    }

    .Hits {
        ul {
            list-style: none;
            margin-left: 0;
        }

        li.ais-Hits-item {
            margin-bottom: 1em;

            a {
                h4 {
                    margin-bottom: 0.2em;
                }
            }
        }
    }

    .ais-PoweredBy {
        display: flex;
        justify-content: flex-end;
        font-size: 80%;

        svg {
            width: 70px;
        }
    }
`;
