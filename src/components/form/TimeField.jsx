import React from "react";
import Utils from "../../Utils";
// noinspection ES6UnusedImports
import Logger from "../../Logger";

/**
 * @class
 * @classdesc Time Field
 * @author Ilya Bogdanov <public@ilyabogdanov.ru>
 * @license Apache-2.0
 *
 * @prop {boolean} props.disabled
 * @prop {boolean} props.error
 * @prop {boolean} props.stretch
 * @prop {Date} props.value
 *
 * @prop {*} props.children
 */
export default class TimeField extends React.Component {
    constructor(props) {
        // noinspection JSCheckFunctionSignatures
        super(props);
        this.state = {
            disabled: this.props.disabled,
            error: this.props.error,
            value: this.props.value ? this.props.value : new Date(1970,0,1,0,0),
            hours: null,
            minutes: null
        };
        this.state.hours = this.state.value.getHours()===0 ? "00" : (this.state.value.getHours() < 10 ? "0"+this.state.value.getHours() : this.state.value.getHours().toString());
        this.state.minutes = this.state.value.getMinutes()===0 ? "00" : (this.state.value.getMinutes() < 10 ? "0"+this.state.value.getMinutes() : this.state.value.getMinutes().toString());
        this.idHours = Utils.generateId();
        this.idMinutes = Utils.generateId();
        this._onChangeHours = this._onChange.bind(this, 24);
        this._onChangeMinutes = this._onChange.bind(this, 60);
        this._onKeyPressHours = this._onKeyPress.bind(this, 24);
        this._onKeyPressMinutes = this._onKeyPress.bind(this, 60);
        this._onFocusHours = this._onFocus.bind(this, this.idHours);
        this._onFocusMinutes = this._onFocus.bind(this, this.idMinutes);
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
    _onChange(max, e) {
        if (!this.state.disabled) {
            const onChange = this.props.onChange;
            const value = Number.isNaN(parseInt(e.target.value)) ? "0" : e.target.value;
            const valid = e.target.validity.valid && value < max;
            const currentValue = max===24 ? this.state.hours : this.state.minutes;
            const maxFirstDigit = max===24 ? 2 : 5;
            if (valid && value !== currentValue) {
                // TODO: probably never null
                const result = value!==null ? parseInt(value).toString() : "0";
                if (result.length===1 && result > maxFirstDigit) {
                    this.setState(function (state) {
                        const date = max===24 ? new Date(1970,0,1,parseInt(result),state.value.getMinutes()) : new Date(1970,0,1,state.value.getHours(),parseInt(result));
                        onChange(date);
                        let __result__ = {
                            value: date
                        };
                        if (max===24) {
                            __result__.hours = "0"+result;
                        }
                        if (max===60) {
                            __result__.minutes = "0"+result;
                        }
                        return __result__;
                    });
                    if (max===24) {
                        this._onFocus(this.idMinutes);
                    } else {
                        document.getElementById(this.idMinutes).blur();
                    }
                } else {
                    this.setState(function (state) {
                        const date = max===24 ? new Date(1970,0,1,parseInt(result),state.value.getMinutes()) : new Date(1970,0,1,state.value.getHours(),parseInt(result));
                        onChange(date);
                        let __result__ = {
                            value: date
                        };
                        if (max===24) {
                            __result__.hours = parseInt(result).toString();
                        }
                        if (max===60) {
                            __result__.minutes = result;
                        }
                        return __result__;
                    });
                    if (result.length===2) {
                        if (max===24) {
                            this._onFocus(this.idMinutes);
                        } else {
                            document.getElementById(this.idMinutes).blur();
                        }
                    }
                }
            }
        }
    }
    _onFocus(id) {
        document.getElementById(id).select();
    }
    _onKeyPress(max, e) {
        if (!this.state.disabled) {
            const onChange = this.props.onChange;
            const currentValue = max === 24 ? this.state.hours : this.state.minutes;
            if (e.key==="+") {
                this.setState(function (state) {
                    var result;
                    if (Number.isNaN(parseInt(currentValue))) {
                        result = "01";
                    } else if (parseInt(currentValue) < 9) {
                        result = "0"+(parseInt(currentValue)+1);
                    } else if (parseInt(currentValue) < (max-1)) {
                        result = (parseInt(currentValue)+1).toString();
                    } else {
                        result = "00";
                    }
                    const date = max === 24 ? new Date(1970,0,1,parseInt(result),state.value.getMinutes()) : new Date(1970,0,1,state.value.getHours(),parseInt(result));
                    onChange(date);
                    return {
                        hours: max === 24 ? result : state.value.getHours(),
                        minutes: max === 60 ? result : state.value.getMinutes(),
                        value: date
                    };
                });
            } else if (e.key==="-") {
                this.setState(function (state) {
                    var result;
                    if (Number.isNaN(parseInt(currentValue)) || currentValue==0) {
                        result = (max-1).toString();
                    } else if (currentValue==="01") {
                        result = "00";
                    } else if (currentValue < 11) {
                        result = "0"+(parseInt(currentValue)-1);
                    } else if (currentValue <= max) {
                        result = (parseInt(currentValue)-1).toString();
                    }
                    const date = max === 24 ? new Date(1970,0,1,parseInt(result),state.value.getMinutes()) : new Date(1970,0,1,state.value.getHours(),parseInt(result));
                    onChange(date);
                    return {
                        hours: max === 24 ? result : state.value.getHours(),
                        minutes: max === 60 ? result : state.value.getMinutes(),
                        value: date
                    };
                });
            }
        }
    }
    render() {
        const { idHours, idMinutes, _onChangeHours, _onChangeMinutes, _onFocusHours, _onFocusMinutes, _onKeyPressHours, _onKeyPressMinutes } = this;
        const { stretch } = this.props;
        const { disabled, error, hours, minutes } = this.state;
        return (
            <div className="zen_ui__time_field__container" data-stretch={stretch} data-error={error}>
                <input type="time" className="zen_ui__hidden_input"/>
                <div>
                    <div className="zen_ui__time_field__input_container">
                        <input className="zen_ui__time_field__input zen_ui__time_field__input__hours"
                               onFocus={_onFocusHours}
                               maxLength="2"
                               onChange={_onChangeHours}
                               disabled={disabled}
                               id={idHours}
                               value={hours}
                               onKeyPress={_onKeyPressHours}
                               pattern="[0-9]{0,2}"/>
                        <div></div>
                    </div>
                    <div className="zen_ui__time_field__colon">:</div>
                    <div className="zen_ui__time_field__input_container">
                        <input className="zen_ui__time_field__input zen_ui__time_field__input__minutes"
                               onFocus={_onFocusMinutes}
                               maxLength="2"
                               onChange={_onChangeMinutes}
                               disabled={disabled}
                               value={minutes}
                               id={idMinutes}
                               onKeyPress={_onKeyPressMinutes}
                               pattern="[0-9]{0,2}"/>
                        <div></div>
                    </div>
                </div>
            </div>
        );
    }
};