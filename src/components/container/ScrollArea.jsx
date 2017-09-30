import React from "react";
import Utils from "../../Utils";

/**
 * @class
 * @classdesc Scroll area
 * @author Ilya Bogdanov <public@ilyabogdanov.ru>
 * @license Apache-2.0
 *
 * @prop {boolean} props.style
 *
 * @prop {*} props.children
 */
export default class ScrollArea extends React.Component {
    render() {
        const { children, style } = this.props;
        let outerStyle = {};
        outerStyle.overflowY = "auto";
        Utils.setSafeStyle(style, outerStyle);
        return (
            <div className="zen_ui__stretch_margin" style={outerStyle}>
                {children}
            </div>
        );
    }
};
