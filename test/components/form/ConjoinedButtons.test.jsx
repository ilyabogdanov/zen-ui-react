import React from "react";
import renderer from "react-test-renderer";
import { CONJOINED_BUTTONS_MESSAGES } from "../../../src/Messages";
import PushButton from "../../../src/components/form/PushButton";
import ConjoinedButtons from "../../../src/components/form/ConjoinedButtons";

describe("Conjoined Buttons container", () => {
    test("without children should throw error", () => {
        expect(() => {
            renderer.create(
                <ConjoinedButtons/>
            );
        }).toThrowError(CONJOINED_BUTTONS_MESSAGES.NO_CHILDREN);
    });
    test("with illegal children should throw error", () => {
        expect(() => {
            renderer.create(
                <ConjoinedButtons>
                    <div/>
                </ConjoinedButtons>
            );
        }).toThrowError(CONJOINED_BUTTONS_MESSAGES.ILLEGAL_CHILD);
    });
    test("with legal children should render correctly", () => {
        const e = renderer.create(
            <ConjoinedButtons height="100%">
                <PushButton onClick={function () {}}>Push Button</PushButton>
                {[1,2].map(e=>{

                    return <PushButton onClick={function () {}} key={e}>Push Button</PushButton>
                })}
            </ConjoinedButtons>
        ).toJSON();
        expect(e).toMatchSnapshot();
    });
});
