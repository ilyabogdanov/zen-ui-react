import React from "react";
import Logger from "../../Logger";
import Utils from "../../Utils";
import { COMMON_MESSAGES, TEXT_MESSAGES } from "../../Messages";

/**
 * @class
 * @classdesc Text
 * @author Ilya Bogdanov <public@ilyabogdanov.ru>
 * @license Apache-2.0
 *
 * @prop {boolean} props.clipped
 * @prop {string} props.padding
 * @prop {string} props.x
 * @prop {string} props.y
 * @prop {object} props.style
 *
 * @prop {*} props.children
 */
export default class Text extends React.Component {
    render() {
        const { clipped, x, y, padding, children, style } = this.props;

        if (clipped && typeof clipped !== "boolean") {
            Logger.error(TEXT_MESSAGES.BAD_CLIPPED);
        }
        if (padding && !Utils.isValidPadding(padding)) {
            Logger.error(COMMON_MESSAGES.BAD_PADDING);
        }
        var __style__ = {
            padding: padding ? padding : null,
            textAlign: x ? x : null,
            verticalAlign: y ? y : null
        };
        Utils.setSafeStyle(style, __style__);
        Logger.trace(__style__);
        return (
            <div className={clipped ? "zen_ui__clipped_text" : "zen_ui__text"}>
                <div style={__style__}>
                    {children}
                </div>
            </div>
        );
    }
};
