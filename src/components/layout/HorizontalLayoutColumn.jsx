import React from "react";
import Utils from "../../Utils";

/**
 * @class
 * @classdesc Horizontal layout column
 * @author Ilya Bogdanov <public@ilyabogdanov.ru>
 * @license Apache-2.0
 *
 * @prop {string} props.padding
 * @prop {string} props.width
 * @prop {object} props.style
 *
 * @prop {*} props.children
 */
export default class HorizontalLayoutColumn extends React.Component {
    render() {
        const { width, padding, children, style } = this.props;

        const percentWidth = Utils.isDefined(width) && Utils.isPercentValue(width);
        const fixedWidth = Utils.isDefined(width) && (Utils.isPixelValue(width) || Utils.isRemValue(width));

        let outerStyle = percentWidth ? { width: width } : {};
        Utils.setSafeStyle(style, outerStyle);

        return (
            <div className="zen_ui__horizontal_layout_column" style={outerStyle}>
                <div style={{ padding: padding ? padding : null, width: fixedWidth ? width : null }}>
                    <div>
                        {children}
                    </div>
                </div>
            </div>
        );
    }
};
