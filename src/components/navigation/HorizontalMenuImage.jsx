import React from "react";
import Utils from "../../Utils";

/**
 * @class
 * @classdesc Horizontal menu image
 * @author Ilya Bogdanov <public@ilyabogdanov.ru>
 * @license Apache-2.0
 *
 * @prop {string} props.padding
 * @prop {string} props.width
 *
 * @prop {*} props.children
 */
export default class HorizontalMenuImage extends React.Component {
    render() {
        const { width, padding, children } = this.props;

        const percentWidth = Utils.isDefined(width) && Utils.isPercentValue(width);
        const fixedWidth = Utils.isDefined(width) && (Utils.isPixelValue(width) || Utils.isRemValue(width));

        let outerStyle = percentWidth ? { width: width } : {};

        return (
            <div className="zen_ui__horizontal_layout_column zen_ui__horizontal_menu_image" style={outerStyle}>
                <div style={{ padding: padding ? padding : null, width: fixedWidth ? width : null }}>
                    <div>
                        <div className="zen_ui__alignment">
                            <div style={{ verticalAlign : "middle", textAlign: "center" }}>
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};