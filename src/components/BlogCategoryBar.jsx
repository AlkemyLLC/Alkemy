import React,{useState} from "react";
import { graphql } from "gatsby";
import PropTypes from "prop-types";
import { uniq } from "lodash";
import { Nav, NavItem, NavLink } from "reactstrap";

const BlogCategoryBar = (props) => {
    const { categories, onSelectCategory, defaultSelected } = props;
    const [selection, setSelection] = useState(defaultSelected);

    const getPills =
        categories &&
        categories.length > 0 &&
        categories.map(item => (
            <NavItem
                key={item.value}
                onClick={e => {
                    setSelection(item.value);
                    onSelectCategory(item.value)
                }}
            >
                <NavLink href="#" active={item.value === selection}>
                    {item.label}
                </NavLink>
            </NavItem>
        ));

    return <Nav pills className="mx-0">{getPills}</Nav>;
};

BlogCategoryBar.propTypes = {
    onSelectCategory: PropTypes.func,
    categories: PropTypes.array,
    defaultSelected: PropTypes.string
};

export default BlogCategoryBar;