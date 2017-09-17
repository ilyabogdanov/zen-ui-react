import React from "react";

/**
 * @class
 * @classdesc Modal
 * @author Ilya Bogdanov <public@ilyabogdanov.ru>
 * @license Apache-2.0
 *
 * @prop {object} props
 * @prop {*} props.children
 */
export default class Modal extends React.Component {
    render() {
        const { children } = this.props;
        return (
            <div className="zen_ui__modal">
                <div>
                    <div>
                        <div>{children}</div>
                    </div>
                </div>
            </div>
        );
    }
};