import React from "react";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import Utils from "../../Utils";

/**
 * @class
 * @classdesc Horizontal menu link
 * @author Ilya Bogdanov <public@ilyabogdanov.ru>
 * @license Apache-2.0
 *
 * @prop {boolean} props.active
 * @prop {string} props.width
 * @prop {string} props.padding
 *
 * @prop {object|string} props.to
 * @prop {boolean} props.replace
 * @prop {function} props.innerRef
 * @prop {*} props.children
 */
export default class HorizontalMenuLink extends React.Component {
    constructor(props) {
        // noinspection JSCheckFunctionSignatures
        super(props);
        this.state = {
            active: this.props.active
        };
    }
    // noinspection JSCheckFunctionSignatures
    /**
     * @param {object} props
     * @param {boolean} props.active
     */
    componentWillReceiveProps(props) {
        var newState = {};
        if (this.state.active!==props.active) {
            newState.active = props.active
        }
        this.setState(newState);
    }
    render() {
        const { to, replace, innerRef, active, width, padding, children } = this.props;

        const percentWidth = Utils.isDefined(width) && Utils.isPercentValue(width);
        const fixedWidth = Utils.isDefined(width) && (Utils.isPixelValue(width) || Utils.isRemValue(width));

        let outerStyle = percentWidth ? { width: width } : {};

        return (
            <div className="zen_ui__horizontal_layout_column" style={outerStyle}>
                <div style={{ padding: padding ? padding : null, width: fixedWidth ? width : null }}>
                    <div>
                        <div className={classNames("zen_ui__horizontal_menu__button_container", { selected: active })}>
                            <Link className="zen_ui__horizontal_menu__button" to={to} replace={replace} innerRef={innerRef}>
                                <span>
                                    <span>
                                        {children}
                                    </span>
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};