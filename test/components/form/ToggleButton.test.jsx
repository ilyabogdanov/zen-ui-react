jest.dontMock("jquery");
import React from "react";
import { mount } from "enzyme";
import $ from "jquery";
import ToggleButton from "../../../src/components/form/ToggleButton";
import Button_Props from "../../../src/components/form/Button_Props";

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
            <ToggleButton init={false} disabled={disabled} palette={Button_Props.palette.ORDINARY} onChange={_onChange}>Toggle</ToggleButton>
        )
    }
};

const div = document.createElement("div");
document.body.appendChild(div);

describe("Toggle Button", () => {

    // noinspection JSCheckFunctionSignatures
    const logSpy = jest.spyOn(console, "log");

    test("should execute callback on change", () => {

        const component = mount(
            <Container/>,
            { attachTo: div }
        );
        expect(div.childNodes).toHaveLength(1);

        $("label").click();
        expect(logSpy).toHaveBeenCalledTimes(1);
        logSpy.mockReset();

        component.detach();
        expect(div.childNodes).toHaveLength(0);
    });
    test("should update disabled", () => {

        const component = mount(
            <Container/>,
            { attachTo: div }
        );
        expect(div.childNodes).toHaveLength(1);

        expect(component.find("input").prop("disabled")).toEqual(false);
        component.setState({ disabled: true });
        expect(component.find("input").prop("disabled")).toEqual(true);

        component.detach();
        expect(div.childNodes).toHaveLength(0);

    });
    test("should set conjoined classes", () => {

        const component = mount(
            <div>
                <ToggleButton init={false} onChange={function () {}} conjoined={Button_Props.conjoined.FIRST}>Toggle</ToggleButton>
                <ToggleButton init={false} onChange={function () {}} conjoined={Button_Props.conjoined.MIDDLE}>Toggle</ToggleButton>
                <ToggleButton init={false} onChange={function () {}} conjoined={Button_Props.conjoined.LAST}>Toggle</ToggleButton>
            </div>,
            { attachTo: div }
        );
        expect(div.childNodes).toHaveLength(1);

        expect(component.find(".zen_ui__button_container").length).toBe(3);
        expect($(".zen_ui__button_container:nth-child(1)").hasClass("zen_ui__first_conjoined_button_container")).toBeTruthy();
        expect($(".zen_ui__button_container:nth-child(2)").hasClass("zen_ui__conjoined_button_container")).toBeTruthy();
        expect($(".zen_ui__button_container:nth-child(3)").hasClass("zen_ui__last_conjoined_button_container")).toBeTruthy();

        component.detach();
        expect(div.childNodes).toHaveLength(0);

    });
    test("should set stretch type", () => {

        const component = mount(
            <div>
                <ToggleButton init={false} onChange={function () {}} stretch>Toggle</ToggleButton>
                <ToggleButton init={false} onChange={function () {}} stretchX>Toggle</ToggleButton>
                <ToggleButton init={false} onChange={function () {}} stretchY>Toggle</ToggleButton>
            </div>,
            { attachTo: div }
        );
        expect(div.childNodes).toHaveLength(1);

        expect(component.find(".zen_ui__button_container").length).toBe(3);
        expect($(".zen_ui__button_container:nth-child(1)").attr("data-stretch")).toEqual("true");
        expect($(".zen_ui__button_container:nth-child(2)").attr("data-stretch")).toEqual("only_x");
        expect($(".zen_ui__button_container:nth-child(3)").attr("data-stretch")).toEqual("only_y");

        component.detach();
        expect(div.childNodes).toHaveLength(0);

    });
});