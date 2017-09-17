import React from "react";
import { BrowserRouter, StaticRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import Path from "../../../src/components/navigation/Path";
import PathItem from "../../../src/components/navigation/PathItem";

describe("Path", () => {
    test("should render correctly", () => {
        const e = renderer.create(
            <BrowserRouter>
            <StaticRouter>
            <Path>
                <PathItem to="/"/>
                <PathItem to="/"/>
                <PathItem to="/"/>
                <PathItem/>
            </Path>
            </StaticRouter>
            </BrowserRouter>
        ).toJSON();
        expect(e).toMatchSnapshot();
    });
});
