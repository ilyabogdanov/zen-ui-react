import React from "react";
import Logger from "../../Logger";
import { CHECKBOX_MESSAGES } from "../../Messages";
import Utils from "../../Utils";

/**
 * @class
 * @classdesc Checkbox
 * @author Ilya Bogdanov <public@ilyabogdanov.ru>
 * @license Apache-2.0
 *
 * @prop {boolean} props.checked
 * @prop {boolean} props.disabled
 * @prop {boolean} props.readonly
 * @prop {string} props.alignment
 * @prop {function} props.onChange
 *
 * @prop {*} props.children
 */
export default class Checkbox extends React.Component {
    constructor(props) {
        // noinspection JSCheckFunctionSignatures
        super(props);
        this.state = {
            checked: this.props.checked,
            disabled: this.props.disabled,
            readonly: this.props.readonly
        };
        this.id = Utils.generateId();
        this._onChange = this._onChange.bind(this);
    }
    _onChange(e) {
        if (!this.state.disabled) {
            const checked = e.target.checked;
            this.setState({
                checked: checked
            });
            this.props.onChange(checked);
        }
    }
    // noinspection JSCheckFunctionSignatures
    /**
     * @param {object} props
     * @param {boolean} props.disabled
     */
    componentWillReceiveProps(props) {
        var newState = {};
        newState.disabled = props.disabled
        this.setState(newState);
    }
    render() {
        const { id, _onChange } = this;
        const { alignment, children } = this.props;
        const { checked, disabled, readonly } = this.state;

        if (readonly===true && disabled===false) {
            Logger.warn(CHECKBOX_MESSAGES.READONLY_IS_DISABLED);
        }

        return (
            <div className="zen_ui__checkbox_container" data-align={alignment}>
                <div>
                    <input type="checkbox"
                           className="zen_ui__checkbox_input"
                           id={id}
                           data-readable-only={readonly}
                           disabled={readonly || disabled}
                           checked={checked}
                           value={checked}
                           onChange={_onChange}/>

                    <label className="zen_ui__checkbox" htmlFor={id}>
                        {children}
                    </label>
                </div>
            </div>
        );
    }
};