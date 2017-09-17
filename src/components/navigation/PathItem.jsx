import React from "react";
import { Link } from "react-router-dom";

/**
 * @class
 * @classdesc Path item
 * @author Ilya Bogdanov <public@ilyabogdanov.ru>
 * @license Apache-2.0
 *
 * @prop {object|string} props.to
 * @prop {boolean} props.replace
 * @prop {function} props.innerRef
 *
 * @prop {*} props.children
 */
export default class PathItem extends React.Component {
    render() {
        const { to, replace, innerRef, children } = this.props;
        return (
            <span className="zen_ui__path_item">
                {to ? <Link to={to} replace={replace} innerRef={innerRef}>{children}</Link> : <span>{children}</span>}
            </span>
        );
    }
};