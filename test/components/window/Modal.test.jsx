import React from "react";
import renderer from "react-test-renderer";
import Modal from "../../../src/components/window/Modal";

describe("Modal", () => {
    test("should render", () => {
        const e = renderer.create(
            <Modal/>
        ).toJSON();
        expect(e).toMatchSnapshot();
    });
});
