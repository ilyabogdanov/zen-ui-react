import React from "react";
import classNames from "classnames/bind";

/**
 * @class
 * @classdesc Tree push button
 * @author Ilya Bogdanov <public@ilyabogdanov.ru>
 * @license Apache-2.0
 *
 * @prop {boolean} props.selected
 *
 * @prop {*} props.children
 */
export default class TreePushButton extends React.Component {
    constructor() {
        // noinspection JSCheckFunctionSignatures
        super();
        this._onClick = this._onClick.bind(this);
    }
    _onClick() {
        this.props.onClick();
    }
    render() {
        const { _onClick } = this;
        const { selected, children } = this.props;
        return (
            <button className={classNames("zen_ui__tree__tree_button", { selected: selected })}
                    data-stretch="true"
                    data-style="tree_button"
                    onClick={_onClick}>
                    <span className="zen_ui__clipped_text">
                        <span>{children}</span>
                    </span>
            </button>
        );
    }
};
