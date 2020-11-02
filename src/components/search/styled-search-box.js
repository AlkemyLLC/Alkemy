import styled, { css } from "styled-components";
import SearchBox from "./search-box";

const open = css`
    width: 100vw;
    @media screen and (min-width: 1080px) {
        max-width: 450px;
    }
    opacity: 1;
    background: ${({ theme }) => theme.background};
    cursor: text;
    margin-bottom: -1.6em;
    padding-bottom: 1.6em;
`;

const closed = css`
    width: 0;
    opacity: 0;
    background: transparent;
    cursor: pointer;
    margin-bottom: -1em;
    padding-bottom: 1em;
`;

export default styled(SearchBox)`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 0;

    .SearchInput {
        position: absolute;
        right: 0;
        bottom: -1.6em;

        outline: none;
        border: ${({ hasFocus }) => (hasFocus ? "auto" : "none")};
        font-size: 1em;
        transition: 100ms;
        border-radius: 2px;
        color: ${({ theme }) => theme.foreground};
        ::placeholder {
            color: ${({ theme }) => theme.faded};
        }
        ${({ hasFocus }) => (hasFocus ? open : closed)}
    }

    .SearchInputClose {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        margin-top: 15px;
        opacity: ${({ hasFocus }) => (hasFocus ? 1 : 0)};
    }
`;
