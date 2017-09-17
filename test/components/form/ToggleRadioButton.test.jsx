jest.dontMock("jquery");
import React from "react";
import { mount } from "enzyme";
import $ from "jquery";
import ToggleRadioButton from "../../../src/components/form/ToggleRadioButton";
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
        let activeItemValue = 1;
        return (
            <div>
                {[1,2,3,4].map(function (e) {
                    return <ToggleRadioButton activeItemValue={activeItemValue}
                                              onChange={_onChange}
                                              palette={Button_Props.palette.ORDINARY}
                                              disabled={disabled}
                                              value={e}
                                              key={e}>{e}</ToggleRadioButton>
                })}
            </div>
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

        $(".zen_ui__button_container:nth-child(2)").find("label").click();
        expect(logSpy).toHaveBeenCalledTimes(1);
        expect(logSpy).toHaveBeenCalledWith("2");
        logSpy.mockReset();

        $(".zen_ui__button_container:nth-child(3)").find("label").click();
        expect(logSpy).toHaveBeenCalledTimes(1);
        expect(logSpy).toHaveBeenCalledWith("3");
        logSpy.mockReset();


        expect($(".zen_ui__button_container:nth-child(1)").find("input").prop("disabled")).toBeFalsy();
        component.setState({disabled:true});
        expect($(".zen_ui__button_container:nth-child(1)").find("input").prop("disabled")).toBeTruthy();

        component.detach();
        expect(div.childNodes).toHaveLength(0);
    });
    test("should set conjoined classes", () => {

        const component = mount(
            <div>
                <ToggleRadioButton activeItemValue={null} onChange={function () {}} value={1} conjoined={Button_Props.conjoined.FIRST}>Toggle</ToggleRadioButton>
                <ToggleRadioButton activeItemValue={null} onChange={function () {}} value={2} conjoined={Button_Props.conjoined.MIDDLE}>Toggle</ToggleRadioButton>
                <ToggleRadioButton activeItemValue={null} onChange={function () {}} value={3} conjoined={Button_Props.conjoined.LAST}>Toggle</ToggleRadioButton>
            </div>,
            { attachTo: div }
        );
        expect(document.body.childNodes).toHaveLength(1);

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
                <ToggleRadioButton activeItemValue={null} onChange={function () {}} value={1} stretch>Toggle</ToggleRadioButton>
                <ToggleRadioButton activeItemValue={null} onChange={function () {}} value={2} stretchX>Toggle</ToggleRadioButton>
                <ToggleRadioButton activeItemValue={null} onChange={function () {}} value={3} stretchY>Toggle</ToggleRadioButton>
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