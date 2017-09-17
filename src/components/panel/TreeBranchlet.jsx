import React from "react";
import TreeLeaf from "./TreeLeaf";
import TreeBranch from "./TreeBranch";
import Utils from "../../Utils";
import Logger from "../../Logger";
import { TREE_MESSAGES } from "../../Messages";

/**
 * @class
 * @classdesc Tree branchlet
 * @author Ilya Bogdanov <public@ilyabogdanov.ru>
 * @license Apache-2.0
 *
 * @prop {*} props.children
 * @prop {boolean} props.divider
 * @prop {boolean} props.open
 * @prop {function} props.setParentLevel
 *
 * @prop {*} props.children
 */
export default class TreeBranchlet extends React.Component {
    constructor(props) {
        // noinspection JSCheckFunctionSignatures
        super(props);
        this.id = Utils.generateId();
        this.aggregative = false;
        this.state = {
            open: this.props.open
        };
        this._onChange = this._onChange.bind(this);
    }
    _onChange(e) {
        const open = e.target.checked;
        this.setState({
            open: open
        });
    }
    componentDidMount() {
        if (!this.aggregative) {
            this.props.setParentLevel(this.props.getBranchLevel() + 1);
        }
    }
    render() {
        const me = this;
        const { id, _onChange } = this;
        const { divider, setParentLevel } = this.props;
        const { open } = this.state;
        React.Children.map(me.props.children, (e) => {
            if (e.type===TreeBranch) {
                me.aggregative = true;
            }
        });
        const children = React.Children.map(me.props.children, (e) => {
            if (e.type===TreeLeaf) {
                return React.cloneElement(e, {
                    branchletId: id,
                    divider: divider
                });
            } else if (e.type===TreeBranch) {
                return React.cloneElement(e, {
                    divider: divider,
                    setParentLevel: setParentLevel
                });
            } else {
                Logger.error(TREE_MESSAGES.ILLEGAL_CHILD);
            }
        });
        return (
            <div className="zen_ui__tree_leaf" data-aggregative={me.aggregative}>
                <input type="checkbox"
                       className="zen_ui__checkbox_for_tree_branch"
                       id={id}
                       checked={me.aggregative && open}
                       value={me.aggregative && open}
                       onChange={_onChange}/>
                <div>
                    {children}
                </div>
            </div>
        )
    }
};