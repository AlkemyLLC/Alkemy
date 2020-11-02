import React from "react";
import { connectSearchBox } from "react-instantsearch-dom";
import {
    InputGroup,
    Input,
    InputGroupAddon,
    Button,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default connectSearchBox(
    ({ refine, currentRefinement, className, onFocus }) => (
        <InputGroup className={className}>
            <Input
                className="SearchInput"
                type="text"
                placeholder="Search"
                aria-label="Search"
                onChange={e => refine(e.target.value)}
                value={currentRefinement}
                id="search-box"
            />
            <InputGroupAddon addonType="append" className="SearchInputClose">
                <Button
                    onClick={onFocus}
                    className="SearchButton"
                    color="link"
                    style={{
                        zIndex: 100,
                    }}
                >
                    <FontAwesomeIcon icon="times" size="x" color="black" />
                </Button>
            </InputGroupAddon>
        </InputGroup>
    )
);

{/* <form className={className} noValidate action="" role="search">
    <input
        className="SearchInput"
        type="text"
        placeholder="Search"
        aria-label="Search"
        onChange={e => refine(e.target.value)}
        value={currentRefinement}
        id="search-box"
    />
</form>; */}
