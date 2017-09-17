import React from "react";
import classNames from "classnames/bind";
import Button_Props from "./Button_Props";

/**
 * @class
 * @classdesc Push button
 * @author Ilya Bogdanov <public@ilyabogdanov.ru>
 * @license Apache-2.0
 *
 * @prop {string} props.palette
 * @prop {boolean} props.disabled
 * @prop {boolean} props.stretch
 * @prop {boolean} props.stretchX
 * @prop {boolean} props.stretchY
 * @prop {string} props.conjoined
 *
 * @prop {*} props.children
 */
export default class PushButton extends React.Component {
    constructor(props) {
        // noinspection JSCheckFunctionSignatures
        super(props);
        this.state = {
            disabled: this.props.disabled
        };
        this._onClick = this._onClick.bind(this);
    }
    _onClick() {
        this.props.onClick();
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
        const { _onClick } = this;
        const { conjoined, stretch, stretchX, stretchY, palette, children } = this.props;
        const { disabled } = this.state;
        return (
            <div className={classNames("zen_ui__button_container", {
                zen_ui__first_conjoined_button_container: conjoined && conjoined===Button_Props.conjoined.FIRST,
                zen_ui__last_conjoined_button_container: conjoined && conjoined===Button_Props.conjoined.LAST,
                zen_ui__conjoined_button_container: conjoined && conjoined===Button_Props.conjoined.MIDDLE
            })}
                 data-stretch={stretch ? "true" : (stretchX ? "only_x" : (stretchY ? "only_y" : "false"))}>

                <button className="zen_ui__button"
                        data-palette={palette ? palette : Button_Props.palette.ORDINARY}
                        disabled={disabled}
                        onClick={_onClick}>
                    <span className="zen_ui__button_text">
                        {children}
                    </span>
                </button>
                <div></div>
            </div>
        );
    }
};
