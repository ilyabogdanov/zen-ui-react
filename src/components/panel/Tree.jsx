import React from "react";
import TreeBranch from "./TreeBranch";
import Logger from "../../Logger";
import { TREE_MESSAGES } from "../../Messages";

/**
 * @class
 * @classdesc Tree
 * @author Ilya Bogdanov <public@ilyabogdanov.ru>
 * @license Apache-2.0
 *
 * @prop {object} props
 * @prop {boolean} props.stretch
 * @prop {boolean} props.divider
 * @prop {boolean} props.firstColumnAlignment
 *
 * @prop {*} props.children
 */
export default class Tree extends React.Component {
    render() {
        const { stretch, firstColumnAlignment, children, divider } = this.props;

        const __children__ = React.Children.map(children, (e) => {
            if (e.type===TreeBranch) {
                return React.cloneElement(e, {divider: divider});
            } else {
                Logger.error(TREE_MESSAGES.ILLEGAL_CHILD);
            }
        });
        return (
            <div className="zen_ui__tree_container" data-stretch={stretch} data-first-column-alignment={firstColumnAlignment}>
                <div className="zen_ui__tree">
                    {__children__}
                </div>
            </div>
        )
    }
};