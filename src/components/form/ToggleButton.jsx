import React from "react";
import Button_Props from "./Button_Props";
import classNames from "classnames/bind";
import Utils from "../../Utils";

/**
 * @class
 * @classdesc Toggle button
 * @author Ilya Bogdanov <public@ilyabogdanov.ru>
 * @license Apache-2.0
 *
 * @prop {string}  props.palette
 * @prop {boolean}  props.init
 * @prop {boolean} props.disabled
 * @prop {boolean} props.stretch
 * @prop {boolean} props.stretchX
 * @prop {boolean} props.stretchY
 * @prop {string} props.conjoined
 * @prop {function} props.onChange
 *
 * @prop {*} props.children
 */
export default class ToggleButton extends React.Component {
    constructor(props) {
        // noinspection JSCheckFunctionSignatures
        super(props);
        this.state = {
            checked: this.props.init,
            disabled: this.props.disabled
        };
        this.id = Utils.generateId();
        this._onChange = this._onChange.bind(this);
    }
    _onChange(e) {
        const value = e.target.checked;
        this.setState({
            checked: value
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
        const { _onChange, id } = this;
        const { conjoined, children, palette, stretch, stretchX, stretchY } = this.props;
        const { checked, disabled } = this.state;
        return (
            <div className={classNames("zen_ui__button_container", {
                zen_ui__first_conjoined_button_container: conjoined && conjoined===Button_Props.conjoined.FIRST,
                zen_ui__last_conjoined_button_container: conjoined && conjoined===Button_Props.conjoined.LAST,
                zen_ui__conjoined_button_container: conjoined && conjoined===Button_Props.conjoined.MIDDLE
            })}
                 data-stretch={stretch ? "true" : (stretchX ? "only_x" : (stretchY ? "only_y" : "false"))}>

                <input className="toggle_button_input"
                       type="checkbox"
                       disabled={disabled}
                       id={id}
                       checked={checked}
                       value={checked}
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
