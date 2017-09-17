import React from "react";
import WindowCloseButton from "./WindowCloseButton";
import Logger from "../../Logger";
import { WINDOW_HEAD_MESSAGES } from "../../Messages";

/**
 * @class
 * @classdesc Window head
 * @author Ilya Bogdanov <public@ilyabogdanov.ru>
 * @license Apache-2.0
 *
 * @prop {object} props
 * @prop {string} props.title
 * @prop {string} props.palette
 *
 * @prop {*} props.children
 */
export default class WindowHead extends React.Component {
    render() {
        const { title, palette, children } = this.props;

        const __children__ = React.Children.map(children, (e) => {
            if (e.type===WindowCloseButton) {
                return React.cloneElement(e, {palette: palette});
            } else {
                Logger.error(WINDOW_HEAD_MESSAGES.ILLEGAL_CHILD);
            }
        });
        return (
            <div className="zen_ui__window_head">
                <div className="zen_ui__stretch_margin">
                    <div className="zen_ui__horizontal_layout" style={{height:"100%"}}>
                        <div className="zen_ui__horizontal_layout_column" style={{width:"100%"}}>
                            <div>
                                <div>
                                    <span className="zen_ui__clipped_text">
                                        <span style={{ padding: "0 0.7rem" }}>{title}</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                        {__children__}
                    </div>
                </div>
            </div>
        );
    }
};