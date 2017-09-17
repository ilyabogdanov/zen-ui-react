import React from "react";
import { mount } from "enzyme";
import PasswordField from "../../../src/components/form/PasswordField";

class Container extends React.Component {
    constructor() {
        super();
        this.state = {
            disabled: false,
            error: false,
            value: null
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
            <PasswordField value={value} disabled={disabled} error={error} onChange={_onChange}/>
        )
    }
};

describe("Text Field", () => {

    // noinspection JSCheckFunctionSignatures
    const spy = jest.spyOn(console, "log");

    test("with parent should finish epic test", () => {

        const component = mount(
            <Container/>
        );
        expect(component.find("input").prop("data-error")).toEqual(false);
        expect(component.find("input").prop("disabled")).toEqual(false);

        component.setState({ error: true });
        component.setState({ disabled: true });
        expect(component.find("input").prop("data-error")).toEqual(true);
        expect(component.find("input").prop("disabled")).toEqual(true);

        component.find("input").simulate("change", {target: {value: "changed"}});
        expect(component.find("input").prop("value")).toEqual("changed");
        component.find("input").simulate("change", {target: {value: null}});
        expect(spy).toHaveBeenCalledTimes(2);
    });
    test("should correctly set value", () => {

        const component = mount(
            <PasswordField value={"VALUE"}
                       disabled={false}
                       error={false}
                       stretch={true}
                       placeholder="PLACEHOLDER"
                       onChange={function () {}}/>
        );
        expect(component.find("input").prop("value")).toEqual("VALUE");
        expect(component.find("input").prop("placeholder")).toEqual("PLACEHOLDER");
    });
    test("should correctly update state", () => {

        const component = mount(
            <PasswordField value={null}
                       disabled={false}
                       error={false}
                       stretch={true}
                       placeholder=""
                       onChange={function () {}}/>
        );
        expect(component.find("input").length).toBe(1);
        expect(component.find("input").prop("data-error")).toEqual(false);
        expect(component.find("input").prop("disabled")).toEqual(false);
        component.setState({ error: true });
        component.setState({ disabled: true });
        expect(component.find("input").prop("data-error")).toEqual(true);
        expect(component.find("input").prop("disabled")).toEqual(true);

    });
});