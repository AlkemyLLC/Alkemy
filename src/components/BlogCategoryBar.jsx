import React,{useState,useEffect} from "react";
import PropTypes from "prop-types";
import { Nav, NavItem, NavLink } from "reactstrap";

const BlogCategoryBar = (props) => {
    const { categories, onSelectCategory, defaultSelected } = props;
    const [selection, setSelection] = useState(defaultSelected);

    useEffect(() => {
        setSelection(defaultSelected);
    }, [defaultSelected]);

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
                <NavLink href={"#"+item.value.replace(' ','-')} active={item.value === selection}>
                    {item.label}
                </NavLink>
            </NavItem>
        ));

    return (
        <Nav pills className="blog-category-bar mx-0">
            {getPills}
        </Nav>
    );
};

BlogCategoryBar.propTypes = {
    onSelectCategory: PropTypes.func,
    categories: PropTypes.array,
    defaultSelected: PropTypes.string
};

export default BlogCategoryBar;