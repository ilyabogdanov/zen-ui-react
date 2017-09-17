import React from "react";
import renderer from "react-test-renderer";
import VerticalLayout from "../../../src/components/layout/VerticalLayout";
import VerticalLayoutRow from "../../../src/components/layout/VerticalLayoutRow";
import { COMMON_MESSAGES, VERTICAL_LAYOUT_MESSAGES } from "../../../src/Messages";

describe("Vertical Layout", () => {
    test("without children should throw error", () => {
        expect(() => {
            renderer.create(
                <VerticalLayout/>
            );
        }).toThrowError(VERTICAL_LAYOUT_MESSAGES.NO_CHILDREN);
    });
    test("with illegal children should throw error", () => {
        expect(() => {
            renderer.create(
                <VerticalLayout>
                    <div/>
                </VerticalLayout>
            );
        }).toThrowError(VERTICAL_LAYOUT_MESSAGES.ILLEGAL_CHILD);
    });
    test("with multiple stretch rows should throw error", () => {
        expect(() => {
            renderer.create(
                <VerticalLayout>
                    <VerticalLayoutRow height="100%"/>
                    <VerticalLayoutRow height="100%"/>
                </VerticalLayout>
            );
        }).toThrowError(VERTICAL_LAYOUT_MESSAGES.MULTIPLE_STRETCH_ROWS);
    });
    test("should render correctly with and without stretch row", () => {
        const e1 = renderer.create(
            <VerticalLayout>
                <VerticalLayoutRow height="40px"/>
                <VerticalLayoutRow height="100%"/>
                <VerticalLayoutRow height="20px"/>
            </VerticalLayout>
        ).toJSON();
        const e2 = renderer.create(
            <VerticalLayout>
                <VerticalLayoutRow height="40px"/>
            </VerticalLayout>
        ).toJSON();
        expect(e1).toMatchSnapshot();
        expect(e2).toMatchSnapshot();
    });
});
describe("Vertical Layout row", () => {
    test("should render correctly with and without padding, with and without height", () => {
        const e1 = renderer.create(
            <VerticalLayout>
                <VerticalLayoutRow height="40px" padding="10px"/>
                <VerticalLayoutRow height="100%" padding="10px"/>
                <VerticalLayoutRow padding="10px"/>
                <VerticalLayoutRow/>
            </VerticalLayout>
        ).toJSON();
        expect(e1).toMatchSnapshot();
    });
    test("with empty height should throw error", () => {
        expect(() => {
            renderer.create(
                <VerticalLayout>
                    <VerticalLayoutRow height/>
                </VerticalLayout>
            );
        }).toThrowError(VERTICAL_LAYOUT_MESSAGES.BAD_HEIGHT);
    });
    test("with invalid height should throw error", () => {
        ["","1","10%","1.23px"].forEach(e => {
            expect(() => {
                renderer.create(
                    <VerticalLayout>
                        <VerticalLayoutRow height={e}/>
                    </VerticalLayout>
                );
            }).toThrowError(VERTICAL_LAYOUT_MESSAGES.BAD_HEIGHT);
        });
    });
    test("with empty padding should throw error", () => {
        expect(() => {
            renderer.create(
                <VerticalLayout>
                    <VerticalLayoutRow padding/>
                </VerticalLayout>
            );
        }).toThrowError(COMMON_MESSAGES.BAD_PADDING);
    });
    test("with invalid padding should throw error", () => {
        ["","1","123%","1.23px"].forEach(e => {
            expect(() => {
                renderer.create(
                    <VerticalLayout>
                        <VerticalLayoutRow padding={e}/>
                    </VerticalLayout>
                );
            }).toThrowError(COMMON_MESSAGES.BAD_PADDING);
        });
    });
});
