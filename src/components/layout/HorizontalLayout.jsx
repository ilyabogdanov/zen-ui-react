import React from "react";
import Logger from "../../Logger";
import Utils from "../../Utils";
import { COMMON_MESSAGES, HORIZONTAL_LAYOUT_MESSAGES } from "../../Messages";
import HorizontalLayoutColumn from "./HorizontalLayoutColumn";

/**
 * @class
 * @classdesc Horizontal layout
 * @author Ilya Bogdanov <public@ilyabogdanov.ru>
 * @license Apache-2.0
 *
 * @prop {string} props.height
 * @prop {boolean} props.divider
 * @prop {object} props.style
 * @prop {*} props.children
 */
export default class HorizontalLayout extends React.Component {
    render() {
        const { children, height, divider, style } = this.props;
        const { name } = this.constructor;

        let columnWidth = {
            percent: 0,
            ratio: 0,
            none: 0
        };
        let percentage = {
            initial: 0,
            used: 0,
            remaining: 100
        };
        let referenceUnit = null;
        
        if (!children) {
            Logger.error(HORIZONTAL_LAYOUT_MESSAGES.NO_CHILDREN);
        }
        if (Utils.isDefined(height) && !Utils.isZero(height) && !Utils.isPixelValue(height) && !Utils.isRemValue(height) && height!=="100%") {
            Logger.error(HORIZONTAL_LAYOUT_MESSAGES.BAD_HEIGHT);
        }

        checkChildren(children);

        function checkChildren (e) {

            if (Utils.isArray(e)) {
                e.forEach(e => checkChildren(e));

            } else if (!e || !e.type || e.type !== HorizontalLayoutColumn) {
                Logger.error(HORIZONTAL_LAYOUT_MESSAGES.ILLEGAL_CHILD);

            } else {

                if (Utils.isDefined(e.props.padding) && !Utils.isValidPadding(e.props.padding)) {
                    Logger.error(COMMON_MESSAGES.BAD_PADDING);
                }
                if (Utils.isDefined(e.props.width)) {

                    if (typeof e.props.width === "boolean") {
                        Logger.error(HORIZONTAL_LAYOUT_MESSAGES.INVALID_WIDTH);

                    } else if (Utils.isPercentValue(e.props.width)) {
                        columnWidth.percent += Utils.getPercentValue(e.props.width);

                    } else if (Utils.isRatioValue(e.props.width)) {
                        columnWidth.ratio += parseInt(e.props.width);

                    } else if (Utils.isPixelValue(e.props.width) || Utils.isRemValue(e.props.width)) {
                        // NOP

                    } else {
                        Logger.error(HORIZONTAL_LAYOUT_MESSAGES.INVALID_WIDTH);
                    }
                } else {
                    columnWidth.none++;
                }
            }
        }

        percentage.initial = columnWidth.percent;
        percentage.remaining -= percentage.initial;
        Logger.trace(name, "percentage:", percentage);

        if (percentage.initial > 100) {
            Logger.error(HORIZONTAL_LAYOUT_MESSAGES.EXCESSIVE_WIDTH);
            
        } else if (percentage.initial >= 0 && percentage.initial < 100 && columnWidth.ratio === 0/* && columnWidth.none===0*/) {
            Logger.error(HORIZONTAL_LAYOUT_MESSAGES.INSUFFICIENT_WIDTH);
            
        } else if (percentage.initial === 100 && columnWidth.ratio > 0) {
            Logger.error(HORIZONTAL_LAYOUT_MESSAGES.NO_SPACE_FOR_RATIO);
            
        } /* else if ((percentage.initial === 100 && columnWidth.none > 0) || (columnWidth.ratio > 0 && columnWidth.none > 0)) {
            Logger.error(HORIZONTAL_LAYOUT_MESSAGES.NO_SPACE_FOR_NO_WIDTH);
            
        }*/ else if (percentage.initial < 100 && columnWidth.ratio > 0) {
            referenceUnit = Math.round((percentage.remaining / columnWidth.ratio) * 100) / 100;

        }/* else if (percentage.initial < 100 && columnWidth.none > 0) {
            referenceUnit = Math.round((percentage.remaining / columnWidth.none) * 100) / 100;
        }*/
        referenceUnit && Logger.trace(name, "reference unit:", referenceUnit+"%");

        const updatedChildren = !referenceUnit ? null : React.Children.map(children, (e) => {
            if (Utils.isRatioValue(e.props.width)) {
                let next;
                next = Math.round(referenceUnit * e.props.width * 100) / 100;
                Logger.trace(name, "used", percentage.used, "+", "next", next, "=", (Math.round((percentage.used + next) * 100) / 100));
                percentage.used = Math.round((percentage.used + next) * 100) / 100;
                return React.cloneElement(e, {width: next+"%"});
            } else {
                return React.cloneElement(e, {});
            }
        });

        if (percentage.initial !== 100) {
            if (percentage.used !== percentage.remaining) {
                Logger.warn(HORIZONTAL_LAYOUT_MESSAGES.TOTAL_WIDTH_LIMIT_EXCEEDED);
            } else {
                Logger.trace(name, "accurate result");
            }
        }

        let outerStyle = height ? { height: height } : {};
        Utils.setSafeStyle(style, outerStyle);

        return (
            <div className="zen_ui__horizontal_layout" style={outerStyle} data-divider={divider}>
                {referenceUnit ? updatedChildren : children}
            </div>
        );
    }
};
