import React from "react";
import renderer from "react-test-renderer";
import HorizontalLayout from "../../../src/components/layout/HorizontalLayout";
import HorizontalLayoutColumn from "../../../src/components/layout/HorizontalLayoutColumn";
import { COMMON_MESSAGES, HORIZONTAL_LAYOUT_MESSAGES } from "../../../src/Messages";
import Logger, { LEVEL } from "../../../src/Logger";

// Horizontal layout has log messages with level = TRACE.
// Probably you don't want to see them during test.
Logger.level = LEVEL.OFF;

describe("Horizontal Layout", () => {
    test("without children should throw error", () => {
        expect(() => {
            renderer.create(
                <HorizontalLayout/>
            );
        }).toThrowError(HORIZONTAL_LAYOUT_MESSAGES.NO_CHILDREN);
    });
    test("with illegal children should throw error", () => {
        expect(() => {
            renderer.create(
                <HorizontalLayout>
                    <div/>
                </HorizontalLayout>
            );
        }).toThrowError(HORIZONTAL_LAYOUT_MESSAGES.ILLEGAL_CHILD);
    });
    test("with empty attribute height should throw error", () => {
        expect(() => {
            renderer.create(
                <HorizontalLayout height>
                    <HorizontalLayoutColumn/>
                </HorizontalLayout>
            );
        }).toThrowError(HORIZONTAL_LAYOUT_MESSAGES.BAD_HEIGHT);
    });
    test("with invalid height should throw error", () => {
        ["","1","123%","1.23px"].forEach(e => {
            expect(() => {
                renderer.create(
                    <HorizontalLayout height={e}>
                        <HorizontalLayoutColumn/>
                    </HorizontalLayout>
                );
            }).toThrowError(HORIZONTAL_LAYOUT_MESSAGES.BAD_HEIGHT);
        });
    });
    test("should render correctly", () => {
        const e1 = renderer.create(
            <HorizontalLayout height="100%">
                <HorizontalLayoutColumn width="10px"/>
                <HorizontalLayoutColumn width="20px" padding="1px 2px 3px 4px"/>
                <HorizontalLayoutColumn width="10%"/>
                <HorizontalLayoutColumn width="20%"/>
                <HorizontalLayoutColumn width="1"/>
                <HorizontalLayoutColumn width="2"/>
            </HorizontalLayout>
        ).toJSON();
        const e2 = renderer.create(
            <HorizontalLayout height="100%">
                <HorizontalLayoutColumn width={1}/>
                <HorizontalLayoutColumn/>
            </HorizontalLayout>
        ).toJSON();
        const e3 = renderer.create(
            <HorizontalLayout height="100%">
                <HorizontalLayoutColumn width="100%"/>
            </HorizontalLayout>
        ).toJSON();
        const e4 = renderer.create(
            <HorizontalLayout>
                <HorizontalLayoutColumn width={1}/>
            </HorizontalLayout>
        ).toJSON();
        expect(e1).toMatchSnapshot();
        expect(e2).toMatchSnapshot();
        expect(e3).toMatchSnapshot();
        expect(e4).toMatchSnapshot();
    });
    test("with unused space should throw error", () => {
        expect(() => {
            renderer.create(
                <HorizontalLayout>
                    <HorizontalLayoutColumn width="50%"/>
                </HorizontalLayout>
            );
        }).toThrowError(HORIZONTAL_LAYOUT_MESSAGES.INSUFFICIENT_WIDTH);
    });
    test("without free space and with ratio-width columns should throw error", () => {
        expect(() => {
            renderer.create(
                <HorizontalLayout>
                    <HorizontalLayoutColumn width="100%"/>
                    <HorizontalLayoutColumn width="1"/>
                </HorizontalLayout>
            );
        }).toThrowError(HORIZONTAL_LAYOUT_MESSAGES.NO_SPACE_FOR_RATIO);
    });
});
describe("Horizontal Layout column", () => {
    test("with empty width should throw error", () => {
        expect(() => {
            renderer.create(
                <HorizontalLayout>
                    <HorizontalLayoutColumn width/>
                </HorizontalLayout>
            );
        }).toThrowError(HORIZONTAL_LAYOUT_MESSAGES.INVALID_WIDTH);
    });
    test("with invalid width should throw error", () => {
        ["","0"].forEach(e => {
            expect(() => {
                renderer.create(
                    <HorizontalLayout>
                        <HorizontalLayoutColumn width={e}/>
                    </HorizontalLayout>
                );
            }).toThrowError(HORIZONTAL_LAYOUT_MESSAGES.INVALID_WIDTH);
        });
    });
    test("with greater than 100% width should throw error", () => {
        expect(() => {
            renderer.create(
                <HorizontalLayout>
                    <HorizontalLayoutColumn width="123%"/>
                </HorizontalLayout>
            );
        }).toThrowError(HORIZONTAL_LAYOUT_MESSAGES.EXCESSIVE_WIDTH);
    });
    test("with empty padding should throw error", () => {
        expect(() => {
            renderer.create(
                <HorizontalLayout>
                    <HorizontalLayoutColumn padding/>
                </HorizontalLayout>
            );
        }).toThrowError(COMMON_MESSAGES.BAD_PADDING);
    });
    test("with invalid padding should throw error", () => {
        ["","1","123%","1.23px"].forEach(e => {
            expect(() => {
                renderer.create(
                    <HorizontalLayout>
                        <HorizontalLayoutColumn padding={e}/>
                    </HorizontalLayout>
                );
            }).toThrowError(COMMON_MESSAGES.BAD_PADDING);
        });
    });
});
