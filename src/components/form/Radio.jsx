import React from "react";;
import Logger from "../../Logger";
import { RADIO_MESSAGES } from "../../Messages";
import Utils from "../../Utils";

/**
 * @class
 * @classdesc Radio
 * @author Ilya Bogdanov <public@ilyabogdanov.ru>
 * @license Apache-2.0
 *
 * @prop {*} props.activeItemValue
 * @prop {boolean} props.disabled
 * @prop {boolean} props.readonly
 * @prop {function} props.onChange
 * @prop {string} props.name
 * @prop {string} props.alignment
 * @prop {*} props.value
 *
 * @prop {*} props.children
 */
export default class Radio extends React.Component {
    constructor(props) {
        // noinspection JSCheckFunctionSignatures
        super(props);
        this.state = {
            activeItemValue: this.props.activeItemValue,
            disabled: this.props.disabled,
            readonly: this.props.readonly
        };
        this.id = Utils.generateId();
        this._onChange = this._onChange.bind(this);
    }
    _onChange(e) {
        const value = e.target.value;
        this.setState({
            activeItemValue: value
        });
        this.props.onChange(value);
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
        const { alignment, name, activeItemValue, value, children } = this.props;
        const { disabled, readonly } = this.state;

        if (readonly===true && disabled===false) {
            Logger.warn(RADIO_MESSAGES.READONLY_IS_DISABLED);
        }
        return (
            <div className="zen_ui__checkbox_container" data-align={alignment}>
                <div>
                    <input type="radio"
                           className="zen_ui__checkbox_input"
                           id={id}
                           data-readable-only={readonly}
                           disabled={readonly || disabled}
                           checked={activeItemValue==value}
                           value={value}
                           name={name}
                           onChange={_onChange}/>

                    <label className="zen_ui__radio" htmlFor={id}>
                        {children}
                    </label>
                </div>
            </div>
        );
    }
};