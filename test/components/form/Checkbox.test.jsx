jest.dontMock("jquery");
import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";
import $ from "jquery";
import Logger, { LEVEL } from "../../../src/Logger";
import { CHECKBOX_MESSAGES } from "../../../src/Messages";
import Checkbox from "../../../src/components/form/Checkbox";
import Checkbox_Props from "../../../src/components/form/Checkbox_Props";

class Container extends React.Component {
    constructor() {
        super();
        this.state = {
            disabled: false
        };
        this._onChange = this._onChange.bind(this);
    }
    _onChange(e) {
        console.log(e);
    }
    render() {
        const { _onChange } = this;
        const { disabled } = this.state;
        return (
            <Checkbox onChange={_onChange}
                      checked={true}
                      disabled={disabled}
                      readonly={false}
                      alignment={Checkbox_Props.alignment.LEFT}>
            </Checkbox>
        )
    }
};

const div = document.createElement("div");
document.body.appendChild(div);

describe("Checkbox", () => {

    // noinspection JSCheckFunctionSignatures
    const spy = jest.spyOn(console, "warn");

    // noinspection JSCheckFunctionSignatures
    const log = jest.spyOn(console, "log");

    test("with parent should finish epic test", () => {

        const component = mount(
            <Container/>
        );

        // start with enabled unchecked
        expect(component.find("input").prop("disabled")).toEqual(false);
        expect(component.find("input").prop("value")).toEqual(true);

        // make it checked, expect callback execution
        component.find("input").simulate("change", {target: {checked: true}});
        expect(component.find("input").prop("value")).toEqual(true);
        expect(log).toHaveBeenCalledTimes(1);
        log.mockReset();

        // make it disabled, expect inability to change value
        component.setState({ disabled: true });
        expect(component.find("input").prop("disabled")).toEqual(true);
        component.find("input").simulate("change", {target: {checked: false}});
        expect(component.find("input").prop("value")).toEqual(true);
        expect(log).toHaveBeenCalledTimes(0);
        log.mockReset();
    });
    test("should output warning with disabled and readonly at the same time", () => {

        Logger.level = LEVEL.TRACE;

        renderer.create(
            <Checkbox onChange={function () {}}
                      checked={false}
                      disabled={false}
                      readonly={true}
                      alignment={Checkbox_Props.alignment.LEFT}>
            </Checkbox>
        );
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(CHECKBOX_MESSAGES.READONLY_IS_DISABLED);
        spy.mockReset();

        renderer.create(
            <Checkbox onChange={function () {}}
                      checked={false}
                      disabled={true}
                      readonly={true}
                      alignment={Checkbox_Props.alignment.LEFT}>
            </Checkbox>
        );
        expect(spy).toHaveBeenCalledTimes(0);
        spy.mockReset();

    });
    test("should correctly disable and check input", () => {

        const wrapper = mount(
            <Checkbox onChange={function () {}}
                      checked={true}
                      disabled={true}
                      readonly={false}
                      alignment={Checkbox_Props.alignment.LEFT}>
            </Checkbox>, { attachTo: div }
        );
        expect(div.childNodes).toHaveLength(1);
        expect($("input")).toHaveLength(1);
        expect($("input").attr("disabled")).toBeTruthy();
        expect($("input").prop("checked")).toBeTruthy();
        wrapper.detach();
        expect(div.childNodes).toHaveLength(0);

    });
    test("should correctly update checked", () => {

        const wrapper = mount(
            <Checkbox onChange={function () {}}
                      checked={false}
                      disabled={false}
                      readonly={false}
                      alignment={Checkbox_Props.alignment.LEFT}>
            </Checkbox>, { attachTo: div }
        );
        expect(div.childNodes).toHaveLength(1);
        expect($("input")).toHaveLength(1);
        expect($("label")).toHaveLength(1);
        expect($("input").attr("disabled")).toBeFalsy();
        expect($("input:checked")).toHaveLength(0);
        expect($("input").prop("checked")).toBeFalsy();
        $("label").click();
        expect($("input:checked")).toHaveLength(1);
        expect($("input").prop("checked")).toBeTruthy();
        wrapper.detach();
        expect(div.childNodes).toHaveLength(0);

    });
});