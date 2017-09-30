import React from "react";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

/**
 * @class
 * @classdesc Tree link button
 * @author Ilya Bogdanov <public@ilyabogdanov.ru>
 * @license Apache-2.0
 *
 * @prop {boolean} props.selected
 *
 * @prop {object|string} props.to
 * @prop {boolean} props.replace
 * @prop {function} props.innerRef
 * @prop {*} props.children
 */
export default class TreeLinkButton extends React.Component {
    render() {
        const { selected, children, to, replace, innerRef } = this.props;
        return (
            <Link className={classNames("zen_ui__tree__tree_button", { selected: selected })}
                  data-stretch="true"
                  data-style="tree_button"
                  to={to}
                  replace={replace}
                  innerRef={innerRef}>
                    <span className="zen_ui__clipped_text">
                        <span>
                            {children}
                        </span>
                    </span>
            </Link>
        );
    }
};
