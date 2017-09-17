import React from "react";
import Utils from "../../Utils";
import PushButton from "./PushButton";
import LinkButton from "./LinkButton";
import ToggleButton from "./ToggleButton";
import ToggleRadioButton from "./ToggleRadioButton";
import Logger from "../../Logger";
import { CONJOINED_BUTTONS_MESSAGES } from "../../Messages";

/**
 * @class
 * @classdesc Conjoined buttons
 * @author Ilya Bogdanov <public@ilyabogdanov.ru>
 * @license Apache-2.0
 *
 * @prop {*} props.children
 */
export default class ConjoinedButtons extends React.Component {
    render() {
        const { children } = this.props;

        if (!children) {
            Logger.error(CONJOINED_BUTTONS_MESSAGES.NO_CHILDREN);
        }

        // noinspection JSUnresolvedVariable
        const allowedTypes = [PushButton.name, LinkButton.name, ToggleButton.name, ToggleRadioButton.name];

        function checkChildrenType(e) {

            if (Utils.isArray(e)) {
                e.forEach(e => checkChildrenType(e));

            } else if (!e || !e.type || allowedTypes.indexOf(e.type.name) === -1) {
                Logger.error(CONJOINED_BUTTONS_MESSAGES.NO_CHILDREN);
            }
        }

        checkChildrenType(children);

        return (
            <div className="zen_ui__conjoined_buttons">
                {children}
            </div>
        );
    }
};
