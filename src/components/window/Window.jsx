import React from "react";
import WindowHead from "./WindowHead";
import WindowBody from "./WindowBody";
import Window_Props from "./Window_Props";
import Logger from "../../Logger";
import { WINDOW_MESSAGES } from "../../Messages";

/**
 * @class
 * @classdesc Window
 * @author Ilya Bogdanov <public@ilyabogdanov.ru>
 * @license Apache-2.0
 *
 * @prop {object} props
 * @prop {boolean} props.stretch
 * @prop {string} props.palette
 * @prop {string} props.width
 * @prop {string} props.minWidth
 * @prop {string} props.maxWidth
 *
 * @prop {*} props.children
 */
export default class Window extends React.Component {
    render() {
        const { stretch, palette, width, maxWidth, minWidth, children } = this.props;

        let hasHead = false;
        let hasBody = false;
        const __children__ = React.Children.map(children, (e) => {
            if (e.type===WindowHead) {
                hasHead=true;
                return React.cloneElement(e, {palette: palette ? palette : Window_Props.palette.ORDINARY});
            } else if (e.type===WindowBody) {
                hasBody=true;
                return React.cloneElement(e, {stretch: stretch});
            } else {
                Logger.error(WINDOW_MESSAGES.ILLEGAL_CHILD);
            }
        });
        (!hasHead || !hasBody) && Logger.error(WINDOW_MESSAGES.NO_CHILDREN);

        return (
            <div className="zen_ui__window"
                 style={{
                     width: width ? width : null,
                     minWidth: minWidth ? minWidth : null,
                     maxWidth: maxWidth ? maxWidth : null
                 }}
                 data-stretch={stretch===true}
                 data-palette={palette ? palette : Window_Props.palette.ORDINARY}>
                {__children__}
            </div>
        );
    }
};