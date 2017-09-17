import React from "react";
import Logger from "../../Logger";
import Utils from "../../Utils";
import TreeLeafColumn from "./TreeLeafColumn";
import { COMMON_MESSAGES, HORIZONTAL_LAYOUT_MESSAGES } from "../../Messages";

/**
 * @class
 * @classdesc Tree leaf
 * @author Ilya Bogdanov <public@ilyabogdanov.ru>
 * @license Apache-2.0
 *
 * @prop {string} props.branchletId
 * @prop {boolean} props.divider
 * @prop {object} props.style
 *
 * @prop {*} props.children
 */
export default class TreeLeaf extends React.Component {
    render() {
        const { branchletId, divider, style, children } = this.props;

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

        checkChildren(children);

        function checkChildren (e) {

            if (Utils.isArray(e)) {
                e.forEach(e => checkChildren(e));

            } else if (!e || !e.type || e.type !== TreeLeafColumn) {
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

        if (percentage.initial > 100) {
            Logger.error(HORIZONTAL_LAYOUT_MESSAGES.EXCESSIVE_WIDTH);

        } else if (percentage.initial >= 0 && percentage.initial < 100 && columnWidth.ratio === 0/* && columnWidth.none===0*/) {
            Logger.error(HORIZONTAL_LAYOUT_MESSAGES.INSUFFICIENT_WIDTH);

        } else if (percentage.initial === 100 && columnWidth.ratio > 0) {
            Logger.error(HORIZONTAL_LAYOUT_MESSAGES.NO_SPACE_FOR_RATIO);

        }/* else if ((percentage.initial === 100 && columnWidth.none > 0) || (columnWidth.ratio > 0 && columnWidth.none > 0)) {
            Logger.error(HORIZONTAL_LAYOUT_MESSAGES.NO_SPACE_FOR_NO_WIDTH);

        }*/ else if (percentage.initial < 100 && columnWidth.ratio > 0) {
            referenceUnit = Math.round((percentage.remaining / columnWidth.ratio) * 100) / 100;

        }/* else if (percentage.initial < 100 && columnWidth.none > 0) {
            referenceUnit = Math.round((percentage.remaining / columnWidth.none) * 100) / 100;
        }*/

        const updatedChildren = !referenceUnit ? null : React.Children.map(children, (e) => {
            if (Utils.isRatioValue(e.props.width)) {
                let next;
                next = Math.round(referenceUnit * e.props.width * 100) / 100;
                percentage.used = Math.round((percentage.used + next) * 100) / 100;
                return React.cloneElement(e, {width: next+"%"});
            } else {
                return React.cloneElement(e, {});
            }
        });

        if (percentage.initial !== 100) {
            if (percentage.used !== percentage.remaining) {
                Logger.warn(HORIZONTAL_LAYOUT_MESSAGES.TOTAL_WIDTH_LIMIT_EXCEEDED);
            }
        }

        let outerStyle = {};
        Utils.setSafeStyle(style, outerStyle);

        return (
            <div>
                <div className="zen_ui__tree_branch_toggle">
                    <label className="zen_ui__tree_branch_toggle__triangle" htmlFor={branchletId}></label>
                </div>
                <div className="zen_ui__tree_leaf_toggle"><div>
                    <div className="zen_ui__horizontal_layout"
                         style={{height: "100%"}}
                         data-divider={divider}>
                        {updatedChildren ? updatedChildren : children}
                    </div>
                </div></div>
            </div>
        )
    }
};