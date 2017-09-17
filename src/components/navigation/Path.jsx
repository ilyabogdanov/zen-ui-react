import React from "react";

/**
 * @class
 * @classdesc Path
 * @author Ilya Bogdanov <public@ilyabogdanov.ru>
 * @license Apache-2.0
 *
 * @prop {*} props.children
 */
export default class Path extends React.Component {
    render() {
        const { children } = this.props;
        return (
            <div className="zen_ui__path">
                <div>
                    <div>
                        {children}
                    </div>
                </div>
            </div>
        );
    }
};