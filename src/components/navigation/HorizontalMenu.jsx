import React from "react";

/**
 * @class
 * @classdesc Horizontal menu
 * @author Ilya Bogdanov <public@ilyabogdanov.ru>
 * @license Apache-2.0
 *
 * @prop {*} props.children
 */
export default class HorizontalMenu extends React.Component {
    render() {
        return (
            <div className="zen_ui__horizontal_menu">
                <div className="zen_ui__horizontal_layout" style={{height: "100%"}}>
                    {this.props.children}
                </div>
            </div>
        );
    }
};