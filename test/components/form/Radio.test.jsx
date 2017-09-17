    jest.dontMock("jquery");
import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";
import $ from "jquery";
import Logger, { LEVEL } from "../../../src/Logger";
import { RADIO_MESSAGES } from "../../../src/Messages";
import Radio from "../../../src/components/form/Radio";
import Checkbox_Props from "../../../src/components/form/Checkbox_Props";

class RadioContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            value: null,
            disabled: false
        };
        this._onChange = this._onChange.bind(this);
    }
    _onChange(e) {
        console.log(e);
    }
    render() {
        const { _onChange } = this;
        const { value, disabled } = this.state;
        return (
            <Radio onChange={_onChange}
                   activeItemValue={value}
                   disabled={disabled}
                   readonly={false}
                   value={9}
                   alignment={Checkbox_Props.alignment.LEFT}/>
        )
    }
};

const div = document.createElement("div");
document.body.appendChild(div);

describe("Radio", () => {

    // noinspection JSCheckFunctionSignatures
    const spy = jest.spyOn(console, "warn");

    // noinspection JSCheckFunctionSignatures
    const log = jest.spyOn(console, "log");

    test("with parent should finish epic test", () => {

        const component = mount(
            <RadioContainer/>
        );

        component.find("input").simulate("change", {
            target: {
                value: 9
            }
        });
        expect(component.find("input").prop("disabled")).toEqual(false);
        expect(component.find("input").prop("value")).toEqual(9);
        expect(log).toHaveBeenCalledTimes(1);
        log.mockReset();

        // make it disabled
        component.setState({ disabled: true });
        expect(component.find("input").prop("disabled")).toEqual(true);

    });
    test("should output warning with disabled and readonly at the same time", () => {

        Logger.level = LEVEL.TRACE;

        renderer.create(
            <div>
                {[1,2].map((e,i) =>
                    <Radio onChange={function () {}}
                           activeItemValue={null}
                           disabled={false}
                           readonly={true}
                           value={e}
                           key={i}
                           alignment={Checkbox_Props.alignment.LEFT}/>
                )}
            </div>
        );
        expect(spy).toHaveBeenCalledTimes(2);
        expect(spy).toHaveBeenCalledWith(RADIO_MESSAGES.READONLY_IS_DISABLED);
        spy.mockReset();

        renderer.create(
            <div>
                {[1,2].map((e,i) =>
                    <Radio onChange={function () {}}
                           activeItemValue={null}
                           disabled={true}
                           readonly={true}
                           value={e}
                           key={i}
                           alignment={Checkbox_Props.alignment.LEFT}/>
                )}
            </div>
        );
        expect(spy).toHaveBeenCalledTimes(0);
        spy.mockReset();

    });
    test("should correctly disable and check input", () => {

        const wrapper = mount(

            <Radio onChange={function () {}}
                   activeItemValue={1}
                   disabled={true}
                   readonly={false}
                   value={1}
                   alignment={Checkbox_Props.alignment.LEFT}/>, { attachTo: div }
        );
        expect(div.childNodes).toHaveLength(1);
        expect($("input").attr("disabled")).toBeTruthy();
        expect($("input").prop("checked")).toBeTruthy();
        wrapper.detach();
        expect(div.childNodes).toHaveLength(0);
    });
});