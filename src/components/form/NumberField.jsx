import React from "react";
import classNames from "classnames/bind";
import Utils from "../../Utils";

/**
 * @class
 * @classdesc Number Field
 * @author Ilya Bogdanov <public@ilyabogdanov.ru>
 * @license Apache-2.0
 *
 * @prop {boolean} props.disabled
 * @prop {boolean} props.error
 * @prop {boolean} props.stretch
 * @prop {number} props.value
 * @prop {string} props.placeholder
 * @prop {string} props.suffix
 *
 * @prop {*} props.children
 */
export default class NumberField extends React.Component {
    constructor(props) {
        // noinspection JSCheckFunctionSignatures
        super(props);
        this.state = {
            disabled: this.props.disabled,
            error: this.props.error,
            value: Number.isNaN(parseInt(this.props.value)) ? null : parseInt(this.props.value)
        };
        this.id = Utils.generateId();
        this._onClickPlus = this._onClick.bind(this, "+");
        this._onClickMinus = this._onClick.bind(this, "-");
        this._onChange = this._onChange.bind(this);
        this._onKeyPress = this._onKeyPress.bind(this);
    }
    _onKeyPress(e) {
        if (e.key==="+" || e.key==="-") {
            this._onClick(e.key);
        }
    }
    _onChange(e) {
        if (!this.state.disabled) {
            const value = Number.isNaN(parseInt(e.target.value)) ? null : parseInt(e.target.value);
            const valid = e.target.validity.valid;
            const onChange = this.props.onChange;
            if (valid && value !== this.state.value) {
                const result = value!==null ? parseInt(value) : null;
                this.setState({
                    value: result
                });
                onChange(result);
            }
        }
    }
    // noinspection JSCheckFunctionSignatures
    /**
     * @param {object} props
     * @param {boolean} props.error
     * @param {boolean} props.disabled
     */
    componentWillReceiveProps(props) {
        var newState = {};
        if (this.state.error!==props.error) {
            newState.error = props.error
        }
        if (this.state.disabled!==props.disabled) {
            newState.disabled = props.disabled
        }
        this.setState(newState);
    }
    _onClick(e) {
        if (!this.state.disabled) {
            const onChange = this.props.onChange;
            if (e==="+") {
                if (this.state.value===null) {
                    this.setState({
                        value: 1
                    });
                    onChange(1);
                } else {
                    const result = parseInt(this.state.value) + 1;
                    this.setState({
                        value: result
                    });
                    onChange(result);
                }
            } else if (this.state.value!==null && this.state.value!==0) {
                const result = parseInt(this.state.value) - 1;
                this.setState({
                    value: result
                });
                onChange(result);
            }
        }
    }
    render() {
        const { id, _onChange, _onKeyPress, _onClickPlus, _onClickMinus } = this;
        const { suffix, placeholder, stretch } = this.props;
        const { disabled, error, value } = this.state;
        return (
            <div className="zen_ui__number_field__container" data-stretch={stretch}>
                <div className="zen_ui__number_field" data-error={error}>
                    <div className="zen_ui__number_field__input_container">
                        <input pattern="[0-9]*"
                               onKeyPress={_onKeyPress}
                               onChange={_onChange}
                               disabled={disabled}
                               placeholder={placeholder}
                               id={id}
                               value={value || value===0 ? value : ""}/>
                        <div></div>
                    </div>
                    {
                        suffix ?
                            <div className="zen_ui__number_field__builtin_label">
                                <label htmlFor={id}>
                                    <div>{suffix}</div>
                                </label>
                            </div>
                        : null
                    }
                    <div className="zen_ui__number_field__buttons">
                        <div>
                            <div>
                                <div>
                                    <div>
                                        <label className={classNames("zen_ui__number_field__button__increase_number", {disabled: disabled})}
                                               htmlFor={id}
                                               onClick={_onClickPlus}></label>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <label className={classNames("zen_ui__number_field__button__decrease_number", {disabled: disabled})}
                                               htmlFor={id}
                                               onClick={_onClickMinus}></label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};