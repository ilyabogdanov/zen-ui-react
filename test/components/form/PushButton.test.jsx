jest.dontMock("jquery");
import React from "react";
import { mount } from "enzyme";
import $ from "jquery";
import PushButton from "../../../src/components/form/PushButton";
import Button_Props from "../../../src/components/form/Button_Props";

class Container extends React.Component {
    constructor() {
        super();
        this.state = {
            disabled: false
        };
        this._onClick = this._onClick.bind(this);
    }
    _onClick(e) {
        console.log(e);
    }
    render() {
        const { _onClick } = this;
        const { disabled } = this.state;
        return (
            <PushButton onClick={_onClick} disabled={disabled} palette={Button_Props.palette.ORDINARY}>Push Button</PushButton>
        )
    }
};

const div = document.createElement("div");
document.body.appendChild(div);

describe("Push Button", () => {

    // noinspection JSCheckFunctionSignatures
    const logSpy = jest.spyOn(console, "log");

    test("should execute callback on click", () => {

        const component = mount(
            <Container/>,
            { attachTo: div }
        );
        expect(div.childNodes).toHaveLength(1);

        $("button").click();
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

        expect(component.find("button").prop("disabled")).toEqual(false);
        component.setState({ disabled: true });
        expect(component.find("button").prop("disabled")).toEqual(true);

        component.detach();
        expect(div.childNodes).toHaveLength(0);

    });
    test("without palette should set ordinary palette", () => {

        const component = mount(
            <PushButton onClick={function () {}}>Push Button</PushButton>,
            { attachTo: div }
        );
        expect(div.childNodes).toHaveLength(1);

        expect($("button").attr("data-palette")).toEqual(Button_Props.palette.ORDINARY);

        component.detach();
        expect(div.childNodes).toHaveLength(0);

    });
    test("should set conjoined classes", () => {

        const component = mount(
            <div>
                <PushButton onClick={function () {}} conjoined={Button_Props.conjoined.FIRST}>Push Button</PushButton>
                <PushButton onClick={function () {}} conjoined={Button_Props.conjoined.MIDDLE}>Push Button</PushButton>
                <PushButton onClick={function () {}} conjoined={Button_Props.conjoined.LAST}>Push Button</PushButton>
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
                <PushButton onClick={function () {}} stretch>Push Button</PushButton>
                <PushButton onClick={function () {}} stretchX>Push Button</PushButton>
                <PushButton onClick={function () {}} stretchY>Push Button</PushButton>
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