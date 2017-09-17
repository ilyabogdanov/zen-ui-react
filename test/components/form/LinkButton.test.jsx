jest.dontMock("jquery");
import React from "react";
import { BrowserRouter, StaticRouter } from "react-router-dom";
import { mount } from "enzyme";
import $ from "jquery";
import LinkButton from "../../../src/components/form/LinkButton";
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
        const { disabled } = this.state;
        return (
            <BrowserRouter>
                <StaticRouter context={{}}>
                    <LinkButton to="/" disabled={disabled} palette={Button_Props.palette.ORDINARY}>Link Button</LinkButton>
                </StaticRouter>
            </BrowserRouter>
        )
    }
};

const div = document.createElement("div");
document.body.appendChild(div);

describe("Link Button", () => {

    test("with update disabled", () => {
        const component = mount(<Container/>, { attachTo: div });
        expect(div.childNodes).toHaveLength(1);

        expect($("a").hasClass("disabled")).toBeFalsy();
        component.setState({ disabled: true });
        expect($("a").hasClass("disabled")).toBeTruthy();

        component.detach();
        expect(div.childNodes).toHaveLength(0);
    });
    test("should set conjoined classes", () => {

        const component = mount(
            <BrowserRouter>
                <StaticRouter context={{}}>
                    <div>
                        <LinkButton to="" conjoined={Button_Props.conjoined.FIRST}>Push Button</LinkButton>
                        <LinkButton to="" conjoined={Button_Props.conjoined.MIDDLE}>Push Button</LinkButton>
                        <LinkButton to="" conjoined={Button_Props.conjoined.LAST}>Push Button</LinkButton>
                    </div>
                </StaticRouter>
            </BrowserRouter>,
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
            <BrowserRouter>
                <StaticRouter context={{}}>
                    <div>
                        <LinkButton to="" stretch>Push Button</LinkButton>
                        <LinkButton to="" stretchX>Push Button</LinkButton>
                        <LinkButton to="" stretchY>Push Button</LinkButton>
                    </div>
                </StaticRouter>
            </BrowserRouter>,
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