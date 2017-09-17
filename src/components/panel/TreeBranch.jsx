import React from "react";
import TreeBranchlet from "./TreeBranchlet";
import Logger from "../../Logger";
import { TREE_MESSAGES } from "../../Messages";

/**
 * @class
 * @classdesc Tree branch
 * @author Ilya Bogdanov <public@ilyabogdanov.ru>
 * @license Apache-2.0
 *
 * @prop {boolean} props.divider
 * @prop {function} props.setParentLevel
 *
 * @prop {*} props.children
 */
export default class TreeBranch extends React.Component {
    constructor(props) {
        // noinspection JSCheckFunctionSignatures
        super(props);
        this.state = {
            level: -1
        };
    }
    render() {
        const me = this;
        const { setParentLevel, divider, children } = this.props;
        const { level } = this.state;

        const __children__ = React.Children.map(children, (e) => {
            if (e.type===TreeBranchlet) {
                return React.cloneElement(e, {
                    divider: divider,
                    getBranchLevel: function () {
                        return level
                    },
                    setParentLevel: function (e) {
                        me.setState({level:e});
                        if (setParentLevel) {
                            setParentLevel(e+1);
                        }
                    }
                });
            } else {
                Logger.error(TREE_MESSAGES.ILLEGAL_CHILD);
            }
        });
        return (
            <div className="zen_ui__tree_branch" data-column-indent={level}>
                {__children__}
            </div>
        )
    }
};