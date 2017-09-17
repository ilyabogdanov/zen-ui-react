jest.dontMock("jquery");
import React from "react";
import { mount } from "enzyme";
import $ from "jquery";
import Combobox from "../../../src/components/form/Combobox";

class Container extends React.Component {
    constructor() {
        super();
        this.state = {
            disabled: false
        };
        this.items = [{
            id: null,
            name: ""
        }, {
            id: 1,
            name: "item 1"
        }, {
            id: 2,
            name: "item 2"
        }, {
            id: 3,
            name: "item 3"
        }];
        this._onChange = this._onChange.bind(this);
    }
    _onChange(e) {
        console.log(e);
    }
    render() {
        const { items, _onChange } = this;
        const { disabled } = this.state;
        return (
            <Combobox onChange={_onChange}
                      items={items}
                      disabled={disabled}
                      textParameter="name"
                      valueParameter="id"
                      activeItemValue={3}/>
        )
    }
};

const div = document.createElement("div");
document.body.appendChild(div);

describe("Combobox", () => {

    // noinspection JSCheckFunctionSignatures
    const logSpy = jest.spyOn(console, "log");

    test("should execute callback on change", () => {

        const component = mount(
            <Container/>,
            { attachTo: div }
        );
        expect(div.childNodes).toHaveLength(1);

        expect($(".zen_ui__button_checkbox").attr("disabled")).toBeFalsy();
        expect($(".zen_ui__button_checkbox").prop("checked")).toBeFalsy();
        $(".zen_ui__button").click();
        expect($(".zen_ui__button_checkbox").prop("checked")).toBeTruthy();
        $(".zen_ui__checkbox_for_combobox_option[value='3']+label").click();
        expect(logSpy).toHaveBeenCalledTimes(1);
        expect(logSpy).toHaveBeenCalledWith(3);
        expect($(".zen_ui__button_checkbox").prop("checked")).toBeFalsy();
        logSpy.mockReset();

        $(".zen_ui__button").click();
        expect($(".zen_ui__button_checkbox").prop("checked")).toBeTruthy();
        expect($(".zen_ui__checkbox_for_combobox_option[value='']")).toHaveLength(1);
        $(".zen_ui__checkbox_for_combobox_option[value='']+label").click();
        expect(logSpy).toHaveBeenCalledTimes(1);
        expect(logSpy).toHaveBeenCalledWith(null);
        expect($(".zen_ui__button_checkbox").prop("checked")).toBeFalsy();
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

        expect(component.find(".zen_ui__button_checkbox").prop("disabled")).toEqual(false);
        component.setState({ disabled: true });
        expect(component.find(".zen_ui__button_checkbox").prop("disabled")).toEqual(true);

        component.detach();
        expect(div.childNodes).toHaveLength(0);
    });
});