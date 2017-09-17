import React from "react";
import img from "zen-ui-core-dev/dist/img/loading.gif";

/**
 * @class
 * @classdesc Loading mask
 * @author Ilya Bogdanov <public@ilyabogdanov.ru>
 * @license Apache-2.0
 *
 * @prop {*} props.children
 */
export default class LoadingMask extends React.Component {
    render() {
        return (
            <div className="zen_ui__loading_mask">
                <div>
                    <div>
                        <span className="zen_ui__loading_mask__text">{this.props.children}</span>
                        <div className="zen_ui__loading_mask__animation">
                            <img src={img} alt=""/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};