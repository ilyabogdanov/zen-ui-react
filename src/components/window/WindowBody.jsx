import React from "react";

/**
 * @class
 * @classdesc Window body
 * @author Ilya Bogdanov <public@ilyabogdanov.ru>
 * @license Apache-2.0
 *
 * @prop {string} props.padding
 * @prop {boolean} props.stretch
 *
 * @prop {*} props.children
 */
export default class WindowBody extends React.Component {
    render() {
        const { stretch, padding, children } = this.props;
        return (
            <div className="zen_ui__window_body" style={stretch!==true ? { padding: padding } : {}}>
                <div style={stretch===true ? { margin: padding } : {}}>
                    {children}
                </div>
            </div>
        );
    }
};