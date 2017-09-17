import React from "react";

/**
 * @class
 * @classdesc Window close button
 * @author Ilya Bogdanov <public@ilyabogdanov.ru>
 * @license Apache-2.0
 *
 * @prop {object} props
 * @prop {string} props.palette
 * @prop {function} props.onClick
 *
 * @extends React.Component
 */
export default class WindowCloseButton extends React.Component {
    constructor() {
        super();
        this._onClick = this._onClick.bind(this);
    }
    _onClick() {
        this.props.onClick();
    }
    render() {
        const { _onClick } = this;
        const { palette } = this.props;
        return (
            <div className="zen_ui__horizontal_layout_column">
                <div style={{width: "2.3rem", padding: "0.08rem 0.08rem 0.16rem 0.08rem"}}>
                    <div>
                        <div className="zen_ui__button_container" data-stretch="true">
                            <button className="zen_ui__button" data-palette={palette} onClick={_onClick}>
                                <div className="zen_ui__vector_icon__close"></div>
                            </button>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};
