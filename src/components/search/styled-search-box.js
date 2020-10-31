import styled, { css } from "styled-components";
import SearchBox from "./search-box";

const open = css`
    bottom: -1.6em;
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
        border-radius: 1rem !important;
        position: absolute;
        right: 0;
        width: 450px;

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

    .SearchIcon {
        width: 1em;
        margin: 0.3em;
        color: ${({ theme, hasFocus }) =>
            hasFocus ? theme.foreground : theme.background};
        pointer-events: none;
    }
`;
