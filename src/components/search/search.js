import algoliasearch from "algoliasearch/lite";
import { createRef, default as React, useState,useEffect } from "react";
import { InstantSearch } from "react-instantsearch-dom";
import { ThemeProvider } from "styled-components";
import StyledSearchBox from "./styled-search-box";
import StyledSearchResult from "./styled-search-result";
import StyledSearchRoot from "./styled-search-root";
import useClickOutside from "./use-click-outside";

const theme = {
    foreground: "#050505",
    background: "white",
    faded: "#888",
};

export default function Search({ indices,hasFocus,setFocus }) {
    const rootRef = createRef();
    const [query, setQuery] = useState("");
    const searchClient = algoliasearch(
        process.env.GATSBY_ALGOLIA_APP_ID,
        process.env.GATSBY_ALGOLIA_SEARCH_KEY
    );

    useClickOutside(rootRef, hasFocus, setFocus);

    useEffect(()=>{
        if (typeof window !== "undefined" && hasFocus)
            document.getElementById("search-box").focus();
    },[hasFocus])

    return (
        <ThemeProvider theme={theme}>
            <StyledSearchRoot ref={rootRef}>
                <InstantSearch
                    searchClient={searchClient}
                    indexName={indices[0].name}
                    onSearchStateChange={({ query }) => setQuery(query)}
                >
                    <StyledSearchBox
                        onFocus={setFocus}
                        hasFocus={hasFocus}
                    />
                    <StyledSearchResult
                        show={query && query.length > 0 && hasFocus}
                        indices={indices}
                    />
                </InstantSearch>
            </StyledSearchRoot>
        </ThemeProvider>
    );
}
