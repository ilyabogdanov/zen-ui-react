import React from "react";
import Logger, { LEVEL } from "../../../src/Logger";
import { mount } from "enzyme";
import TimeField from "../../../src/components/form/TimeField";

Logger.level = LEVEL.TRACE;

class Container extends React.Component {
    constructor() {
        super();
        this.state = {
            disabled: false,
            error: false,
            value: new Date(1970,0,1,0,0)
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
            <TimeField stretch={false}
                       error={error}
                       disabled={disabled}
                       value={value}
                       onChange={_onChange}/>
        )
    }
};

const div = document.createElement("div");
document.body.appendChild(div);

describe("Time Field", () => {

    // noinspection JSCheckFunctionSignatures
    const logSpy = jest.spyOn(console, "log");

    test("should update disabled and error", () => {
        // object "document" is in use within the component, that's why without it the test will fail
        const component = mount(<Container/>, { attachTo: div });
        expect(div.childNodes).toHaveLength(1);

        expect(component.state().value).toBeInstanceOf(Date);
        expect(component.state().value.getHours()).toEqual(0);
        expect(component.state().value.getMinutes()).toEqual(0);

        expect(component.find(".zen_ui__time_field__container").prop("data-error")).toEqual(false);
        expect(component.find(".zen_ui__time_field__input__hours").prop("disabled")).toEqual(false);
        expect(component.find(".zen_ui__time_field__input__minutes").prop("disabled")).toEqual(false);

        component.setState({ error: true });
        component.setState({ disabled: true });
        expect(component.find(".zen_ui__time_field__container").prop("data-error")).toEqual(true);
        expect(component.find(".zen_ui__time_field__input__hours").prop("disabled")).toEqual(true);
        expect(component.find(".zen_ui__time_field__input__minutes").prop("disabled")).toEqual(true);
        component.find(".zen_ui__time_field__input__hours").simulate("change", {
            target: {
                value: 9,
                validity: {
                    valid: true
                }
            }
        });
        expect(logSpy).toHaveBeenCalledTimes(0);
        logSpy.mockReset();

        component.setState({ disabled: false });
        expect(component.find(".zen_ui__time_field__input__hours").prop("disabled")).toEqual(false);
        expect(component.find(".zen_ui__time_field__input__minutes").prop("disabled")).toEqual(false);

        component.find(".zen_ui__time_field__input__hours").simulate("change", {
            target: {
                value: null,
                validity: {
                    valid: true
                }
            }
        });
        expect(logSpy).toHaveBeenCalledTimes(1);
        expect(logSpy).toHaveBeenCalledWith(new Date(1970,0,1,0,0));
        logSpy.mockReset();

        component.find(".zen_ui__time_field__input__hours").simulate("change", {
            target: {
                value: 1,
                validity: {
                    valid: true
                }
            }
        });
        expect(logSpy).toHaveBeenCalledTimes(1);
        expect(logSpy).toHaveBeenCalledWith(new Date(1970,0,1,1,0));
        logSpy.mockReset();

        component.find(".zen_ui__time_field__input__hours").simulate("change", {
            target: {
                value: 10,
                validity: {
                    valid: true
                }
            }
        });
        expect(logSpy).toHaveBeenCalledTimes(1);
        expect(logSpy).toHaveBeenCalledWith(new Date(1970,0,1,10,0));
        logSpy.mockReset();

        component.find(".zen_ui__time_field__input__minutes").simulate("change", {
            target: {
                value: 20,
                validity: {
                    valid: true
                }
            }
        });
        expect(logSpy).toHaveBeenCalledTimes(1);
        expect(logSpy).toHaveBeenCalledWith(new Date(1970,0,1,10,20));
        logSpy.mockReset();

        component.detach();
        expect(div.childNodes).toHaveLength(0);

    });

    test("with null value should mount with time 00:00", () => {
        const wrapper = mount(
            <TimeField stretch={false}
                       error={false}
                       disabled={false}
                       value={null}
                       onChange={function(){}}/>
        );
        expect(wrapper.state().value).toBeInstanceOf(Date);
        expect(wrapper.state().value.getHours()).toEqual(0);
        expect(wrapper.state().value.getMinutes()).toEqual(0);
    });

    test("with hours/minutes less than ten, visible values should have preceding zero", () => {
        const wrapper = mount(
            <TimeField stretch={false}
                       error={false}
                       disabled={false}
                       value={new Date(1970,0,1,9,9)}
                       onChange={function(){}}/>
        );
        expect(wrapper.state().value).toBeInstanceOf(Date);
        expect(wrapper.state().hours).toEqual("09");
        expect(wrapper.state().minutes).toEqual("09");
    });

    test("with hours/minutes equal or greater than ten, visible values should be the same", () => {
        const wrapper = mount(
            <TimeField stretch={false}
                       error={false}
                       disabled={false}
                       value={new Date(1970,0,1,11,11)}
                       onChange={function(){}}/>
        );
        expect(wrapper.state().value).toBeInstanceOf(Date);
        expect(wrapper.state().hours).toEqual("11");
        expect(wrapper.state().minutes).toEqual("11");
    });
});