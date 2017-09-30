jest.dontMock("jquery");
import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";
import $ from "jquery";
import NumberField from "../../../src/components/form/NumberField";

class Container extends React.Component {
    constructor() {
        super();
        this.state = {
            disabled: false,
            error: false,
            value: 1
        };
        this._onChange = this._onChange.bind(this);
    }
    _onChange(e) {
        console.log(e);
    }
    render() {
        const { _onChange } = this;
        const { disabled, error, value } = this.state;
        return (
            <NumberField value={value} disabled={disabled} error={error} onChange={_onChange}/>
        )
    }
};

const div = document.createElement("div");
document.body.appendChild(div);

describe("Number Field", () => {

    // noinspection JSCheckFunctionSignatures
    const logSpy = jest.spyOn(console, "log");

    test("with parent should finish epic test", () => {

        const component = mount(
            <Container/>
        );
        expect(component.find(".zen_ui__number_field").prop("data-error")).toEqual(false);
        expect(component.find("input").prop("disabled")).toEqual(false);

        component.setState({ error: true });
        component.setState({ disabled: true });
        expect(component.find(".zen_ui__number_field").prop("data-error")).toEqual(true);
        expect(component.find("input").prop("disabled")).toEqual(true);

        component.setState({ disabled: false });
        component.find("input").simulate("change", {
            target: {
                value: 123,
                validity: {
                    valid: true
                }
            }
        });
        expect(component.find("input").prop("value")).toEqual(123);
        expect(logSpy).toHaveBeenCalledTimes(1);
        logSpy.mockReset();

        component.find("input").simulate("change", {
            target: {
                value: "xxx",
                validity: {
                    valid: true
                }
            }
        });
        expect(component.find("input").prop("value")).toEqual("");
        expect(logSpy).toHaveBeenCalledTimes(1);
        logSpy.mockReset();

        component.find("input").simulate("change", {
            target: {
                value: 666,
                validity: {
                    valid: false
                }
            }
        });
        expect(component.find("input").prop("value")).toEqual("");
        expect(logSpy).toHaveBeenCalledTimes(0);
        logSpy.mockReset();

        component.setState({ disabled: true });
        component.find("input").simulate("change", {
            target: {
                value: 456,
                validity: {
                    valid: true
                }
            }
        });
        expect(component.find("input").prop("value")).toEqual("");
        expect(logSpy).toHaveBeenCalledTimes(0);
        logSpy.mockReset();

        component.setState({ disabled: false });
        component.find("input").simulate("keyPress", {
            key: "+"
        });
        expect(component.find("input").prop("value")).toEqual(1);
        component.find("input").simulate("keyPress", {
            key: "+"
        });
        expect(component.find("input").prop("value")).toEqual(2);
        component.find("input").simulate("keyPress", {
            key: "-"
        });
        expect(component.find("input").prop("value")).toEqual(1);
        expect(logSpy).toHaveBeenCalledTimes(3);
        logSpy.mockReset();

        component.find("input").simulate("keyPress", {
            key: "k"
        });

    });
    test("should render correctly", () => {

        const e = renderer.create(
            <NumberField
                value={1}
                disabled={false}
                error={false}
                stretch={true}
                onChange={function () {}}/>
        ).toJSON();
        expect(e).toMatchSnapshot();

    });
    test("should change value with plus and minus buttons", () => {

        const wrapper = mount(
            <NumberField
                value={null}
                disabled={false}
                error={false}
                stretch={true}
                suffix="DD"
                placeholder="PLACEHOLDER"
                onChange={function () {}}/>,
            { attachTo: div }
        );
        expect(div.childNodes).toHaveLength(1);

        expect($("input")).toHaveLength(1);
        expect(wrapper.find("input").prop("value")).toEqual("");
        $(".zen_ui__number_field__button__increase_number").click();
        expect(wrapper.find("input").prop("value")).toEqual(1);
        $(".zen_ui__number_field__button__increase_number").click();
        expect(wrapper.find("input").prop("value")).toEqual(2);
        $(".zen_ui__number_field__button__decrease_number").click();
        expect(wrapper.find("input").prop("value")).toEqual(1);

        wrapper.setState({ disabled: true });
        $(".zen_ui__number_field__button__increase_number").click();
        expect(wrapper.find("input").prop("value")).toEqual(1);

        wrapper.setState({ disabled: false });
        $(".zen_ui__number_field__button__decrease_number").click();
        expect(wrapper.find("input").prop("value")).toEqual(0);
        $(".zen_ui__number_field__button__decrease_number").click();
        $(".zen_ui__number_field__button__increase_number").click().click();
        expect(wrapper.find("input").prop("value")).toEqual(2);

        wrapper.detach();
        expect(div.childNodes).toHaveLength(0);

    });
});