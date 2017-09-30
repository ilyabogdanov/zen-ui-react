import React from "react";
import Button_Props from "./Button_Props";
import classNames from "classnames/bind";
import {Link} from "react-router-dom";

/**
 * @class
 * @classdesc Link button
 * @author Ilya Bogdanov <public@ilyabogdanov.ru>
 * @license Apache-2.0
 *
 * @prop {string}  props.palette
 * @prop {boolean} props.disabled
 * @prop {boolean} props.stretch
 * @prop {boolean} props.stretchX
 * @prop {boolean} props.stretchY
 * @prop {string} props.conjoined
 *
 * @prop {object|string} props.to
 * @prop {boolean} props.replace
 * @prop {function} props.innerRef
 * @prop {*} props.children
 */
export default class LinkButton extends React.Component {
    constructor(props) {
        // noinspection JSCheckFunctionSignatures
        super(props);
        this.state = {
            disabled: this.props.disabled
        };
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
        const { conjoined, to, replace, innerRef, children, stretch, stretchX, stretchY, disabled, palette } = this.props;
        return (
            <div className={classNames("zen_ui__button_container", {
                zen_ui__first_conjoined_button_container: conjoined && conjoined===Button_Props.conjoined.FIRST,
                zen_ui__last_conjoined_button_container: conjoined && conjoined===Button_Props.conjoined.LAST,
                zen_ui__conjoined_button_container: conjoined && conjoined===Button_Props.conjoined.MIDDLE
            })}
                 data-stretch={stretch ? "true" : (stretchX ? "only_x" : (stretchY ? "only_y" : "false"))}>
                <Link className={classNames("zen_ui__button", {disabled: disabled})} data-palette={palette} to={to} replace={replace} innerRef={innerRef}>
                    <span className="zen_ui__button_text">
                        <span>
                            <span>
                                {children}
                            </span>
                        </span>
                    </span>
                </Link>
                <div></div>
            </div>
        );
    }
};
