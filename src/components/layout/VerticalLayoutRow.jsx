import React from "react";
import Utils from "../../Utils";

/**
 * @class
 * @classdesc Vertical layout row
 * @author Ilya Bogdanov <public@ilyabogdanov.ru>
 * @license Apache-2.0
 *
 * @prop {string} props.height
 * @prop {string} props.padding
 * @prop {object} props.style
 * @prop {*} props.children
 */
export default class VerticalLayoutRow extends React.Component {
    render() {
        const { height, padding, children, style } = this.props;

        let outerStyle = {};
        Utils.setSafeStyle(style, outerStyle);

        return (
            <div className={height==="100%" ? "zen_ui__vertical_layout_row__stretch" : "zen_ui__vertical_layout_row__non_stretch"} style={outerStyle}>
                {height==="100%" ? (
                    <div>
                        <div>
                            <div className="zen_ui__stretch">
                                <div className="zen_ui__stretch_margin" style={padding ? {margin: padding} : {}}>
                                    {children}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : height ? (
                    <div>
                        <div style={{height: height}}>
                            <div className="zen_ui__stretch_margin" style={padding ? {margin: padding} : {}}>
                                {children}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div style={padding ? {padding: padding} : {}}>
                        <div>
                            {children}
                        </div>
                    </div>
                )}
            </div>
        );
    }
};
