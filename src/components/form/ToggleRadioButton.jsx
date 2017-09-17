import React from "react";
import classNames from "classnames/bind";
import Utils from "../../Utils";
import Button_Props from "./Button_Props";

/**
 * @class
 * @classdesc Toggle radio
 * @author Ilya Bogdanov <public@ilyabogdanov.ru>
 * @license Apache-2.0
 *
 * @prop {string}  props.palette
 * @prop {boolean} props.disabled
 * @prop {boolean} props.stretch
 * @prop {boolean} props.stretchX
 * @prop {boolean} props.stretchY
 * @prop {boolean} props.conjoined
 * @prop {function} props.onChange
 * @prop {string} props.name
 * @prop {*} props.value
 *
 * @prop {*} props.children
 */
export default class ToggleRadioButton extends React.Component {
    constructor(props) {
        // noinspection JSCheckFunctionSignatures
        super(props);
        this.state = {
            activeItemValue: this.props.activeItemValue,
            disabled: this.props.disabled
        };
        this.id = Utils.generateId();
        this._onChange = this._onChange.bind(this);
    }
    // noinspection JSCheckFunctionSignatures
    /**
     * @param {object} props
     * @param {boolean} props.disabled
     * @param {*} props.activeItemValue
     */
    componentWillReceiveProps(props) {
        var newState = {};
        newState.disabled = props.disabled;
        if (this.state.activeItemValue!==props["activeItemValue"]) {
            newState.activeItemValue = props.activeItemValue
        }
        this.setState(newState);
    }
    _onChange(e) {
        const value = e.target.value;
        this.setState({
            activeItemValue: value
        });
        this.props.onChange(value);
    }
    render() {
        const { _onChange, id } = this;
        const { name, value, conjoined, children, palette, stretch, stretchX, stretchY } = this.props;
        const { activeItemValue, disabled } = this.state;
        return (
            <div className={classNames("zen_ui__button_container", {
                zen_ui__first_conjoined_button_container: conjoined && conjoined===Button_Props.conjoined.FIRST,
                zen_ui__last_conjoined_button_container: conjoined && conjoined===Button_Props.conjoined.LAST,
                zen_ui__conjoined_button_container: conjoined && conjoined===Button_Props.conjoined.MIDDLE
            })}
                 data-stretch={stretch ? "true" : (stretchX ? "only_x" : (stretchY ? "only_y" : "false"))}>

                <input className="toggle_button_input"
                       type="radio"
                       disabled={disabled}
                       id={id}
                       checked={activeItemValue==value}
                       value={value}
                       name={name}
                       onChange={_onChange}/>

                <label className={classNames("zen_ui__button", {disabled: disabled})}
                       data-palette={palette}
                       htmlFor={id}>

                    <span>
                        <span>
                            <span className="zen_ui__button_text">
                                {children}
                            </span>
                        </span>
                    </span>
                </label>
                <div></div>
            </div>
        );
    }
};