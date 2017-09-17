import React from "react";
import Logger from "../../Logger";
import Utils from "../../Utils";
import { COMMON_MESSAGES, VERTICAL_LAYOUT_MESSAGES } from "../../Messages";
import VerticalLayoutRow from "./VerticalLayoutRow";

/**
 * @class
 * @classdesc Vertical layout
 * @author Ilya Bogdanov <public@ilyabogdanov.ru>
 * @license Apache-2.0
 *
 * @prop {boolean} props.divider
 * @prop {object} props.style
 * @prop {*} props.children
 */
export default class VerticalLayout extends React.Component {
    render() {
        const { divider, children, style } = this.props;

        if (!children) {
            Logger.error(VERTICAL_LAYOUT_MESSAGES.NO_CHILDREN);
        }

        let hasStretchRow = false;
        checkChildren(children);

        function checkChildren (e) {

            if (Utils.isArray(e)) {
                e.forEach(e => checkChildren(e));

            } else if (!e || !e.type || e.type !== VerticalLayoutRow) {
                Logger.error(VERTICAL_LAYOUT_MESSAGES.ILLEGAL_CHILD);

            } else {
                if (Utils.isDefined(e.props.height) && !Utils.isZero(e.props.height) && !Utils.isPixelValue(e.props.height) && !Utils.isRemValue(e.props.height) && e.props.height!=="100%") {
                    Logger.error(VERTICAL_LAYOUT_MESSAGES.BAD_HEIGHT);
                }
                if (e.props.height==="100%") {
                    !hasStretchRow ? hasStretchRow = true : Logger.error(VERTICAL_LAYOUT_MESSAGES.MULTIPLE_STRETCH_ROWS);
                }
                if (Utils.isDefined(e.props.padding) && !Utils.isValidPadding(e.props.padding)) {
                    Logger.error(COMMON_MESSAGES.BAD_PADDING);
                }
            }
        }

        let outerStyle = {};
        Utils.setSafeStyle(style, outerStyle);

        return (
            <div className={hasStretchRow ? "zen_ui__vertical_layout__stretch" : "zen_ui__vertical_layout__non_stretch"}
                 data-divider={divider}
                 style={outerStyle}>
                {children}
            </div>
        );
    }
};
