jest.dontMock("jquery");
import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";
import $ from "jquery";
import Window from "../../../src/components/window/Window";
import WindowHead from "../../../src/components/window/WindowHead";
import WindowCloseButton from "../../../src/components/window/WindowCloseButton";
import WindowBody from "../../../src/components/window/WindowBody";
import Window_Props from "../../../src/components/window/Window_Props";
import { WINDOW_MESSAGES, WINDOW_HEAD_MESSAGES } from "../../../src/Messages";

class Container extends React.Component {
    constructor() {
        super();
        this._onClick = this._onClick.bind(this);
    }
    _onClick(e) {
        console.log(e);
    }
    render() {
        const { _onClick } = this;
        return (
            <Window>
                <WindowHead>
                    <WindowCloseButton onClick={_onClick}/>
                </WindowHead>
                <WindowBody/>
            </Window>
        )
    }
};

const div = document.createElement("div");
document.body.appendChild(div);

describe("Window", () => {

    // noinspection JSCheckFunctionSignatures
    const logSpy = jest.spyOn(console, "log");

    test("without children should throw error", () => {
        expect(() => {
            renderer.create(
                <Window/>
            );
        }).toThrowError(WINDOW_MESSAGES.NO_CHILDREN);
        expect(() => {
            renderer.create(
                <Window>
                    <WindowHead/>
                </Window>
            );
        }).toThrowError(WINDOW_MESSAGES.NO_CHILDREN);
        expect(() => {
            renderer.create(
                <Window>
                    <WindowBody/>
                </Window>
            );
        }).toThrowError(WINDOW_MESSAGES.NO_CHILDREN);
    });
    test("with illegal child should throw error", () => {
        expect(() => {
            renderer.create(
                <Window>
                    <div/>
                </Window>
            );
        }).toThrowError(WINDOW_MESSAGES.ILLEGAL_CHILD);
        expect(() => {
            renderer.create(
                <Window>
                    <WindowHead>
                        <div/>
                    </WindowHead>
                    <WindowBody/>
                </Window>
            );
        }).toThrowError(WINDOW_HEAD_MESSAGES.ILLEGAL_CHILD);
    });
    test("without palette should set ordinary palette", () => {

        const wrapper = mount(
            <Window>
                <WindowHead>
                    <WindowCloseButton onClick={function () {}}/>
                </WindowHead>
                <WindowBody/>
            </Window>, { attachTo: div }
        );
        expect(div.childNodes).toHaveLength(1);

        expect($(".zen_ui__window").attr("data-palette")).toEqual(Window_Props.palette.ORDINARY);
        expect($(".zen_ui__button").attr("data-palette")).toEqual(Window_Props.palette.ORDINARY);

        wrapper.detach();
        expect(div.childNodes).toHaveLength(0);

    });
    test("with palette, width and maxWidth should set them accordingly", () => {

        const wrapper = mount(
            <Window palette={Window_Props.palette.BRANDED} width="100%" maxWidth="620px">
                <WindowHead>
                    <WindowCloseButton onClick={function () {}}/>
                </WindowHead>
                <WindowBody/>
            </Window>, { attachTo: div }
        );
        expect(div.childNodes).toHaveLength(1);

        expect($(".zen_ui__window").attr("data-palette")).toEqual(Window_Props.palette.BRANDED);
        expect($(".zen_ui__window").css("width")).toEqual("100%");
        expect($(".zen_ui__window").css("max-width")).toEqual("620px");
        expect($(".zen_ui__button").attr("data-palette")).toEqual(Window_Props.palette.BRANDED);

        wrapper.detach();
        expect(div.childNodes).toHaveLength(0);

    });
    test("should execute callback when pushed on close button", () => {

        const component = mount(
            <Container/>,
            { attachTo: div }
        );
        expect(div.childNodes).toHaveLength(1);

        $(".zen_ui__button").click();
        expect(logSpy).toHaveBeenCalledTimes(1);

        component.detach();
        expect(div.childNodes).toHaveLength(0);
    });

    test("should render", () => {
        const e1 = renderer.create(
            <Window stretch={true}>
                <WindowHead>
                    <WindowCloseButton onClick={function () {}}/>
                </WindowHead>
                <WindowBody padding="1rem"/>
            </Window>
        ).toJSON();
        const e2 = renderer.create(
            <Window stretch={false}>
                <WindowHead>
                    <WindowCloseButton onClick={function () {}}/>
                </WindowHead>
                <WindowBody padding="1rem"/>
            </Window>
        ).toJSON();
        expect(e1).toMatchSnapshot();
        expect(e2).toMatchSnapshot();
    });
});
