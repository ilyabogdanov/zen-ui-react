import React from "react";
import Utils from "../../Utils";

/**
 * @class
 * @classdesc Scroll area
 * @author Ilya Bogdanov <public@ilyabogdanov.ru>
 * @license Apache-2.0
 *
 * @prop {boolean} props.stretch
 * @prop {boolean} props.scroll
 * @prop {boolean} props.style
 *
 * @prop {*} props.children
 */
export default class ScrollArea extends React.Component {
    render() {
        const { stretch, children, scroll, style } = this.props;
        let outerStyle = {};
        outerStyle.overflowY = scroll ? "auto": null;
        Utils.setSafeStyle(style, outerStyle);
        return (
            <div className={stretch ? "zen_ui__stretch_margin" : null} style={outerStyle}>
                {children}
            </div>
        );
    }
};
