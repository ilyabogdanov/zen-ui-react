jest.dontMock("jquery");
import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";
import $ from "jquery";
import Tree from "../../../src/components/panel/Tree";
import TreeBranch from "../../../src/components/panel/TreeBranch";
import TreeBranchlet from "../../../src/components/panel/TreeBranchlet";
import TreeLeafColumn from "../../../src/components/panel/TreeLeafColumn";
import TreeLeaf from "../../../src/components/panel/TreeLeaf";
import TreePushButton from "../../../src/components/panel/TreePushButton";
import { TREE_MESSAGES } from "../../../src/Messages";

const div = document.createElement("div");
document.body.appendChild(div);

describe("Tree", () => {
    test("with illegal children should throw error", () => {
        expect(() => {
            renderer.create(
                <Tree>
                    <div/>
                </Tree>
            );
        }).toThrowError(TREE_MESSAGES.ILLEGAL_CHILD);
        expect(() => {
            renderer.create(
                <Tree>
                    <TreeBranch>
                        <div/>
                    </TreeBranch>
                </Tree>
            );
        }).toThrowError(TREE_MESSAGES.ILLEGAL_CHILD);
        expect(() => {
            renderer.create(
                <Tree>
                    <TreeBranch>
                        <TreeBranchlet>
                            <div/>
                        </TreeBranchlet>
                    </TreeBranch>
                </Tree>
            );
        }).toThrowError(TREE_MESSAGES.ILLEGAL_CHILD);
    });
    test("should render", () => {
        const component = mount(
            <Tree>
                <TreeBranch>
                    <TreeBranchlet>
                        <TreeLeaf>
                            <TreeLeafColumn width={1}>
                                <TreePushButton onClick={function () {}} stretch={true}>123</TreePushButton>
                            </TreeLeafColumn>
                            <TreeLeafColumn textAlign="right" verticalAlign="middle" width="110px" padding="0 5px">
                                123
                            </TreeLeafColumn>
                        </TreeLeaf>
                        <TreeBranch>
                            <TreeBranchlet>
                                <TreeLeaf>
                                    <TreeLeafColumn width={1}>
                                        <TreePushButton onClick={function () {}} stretch={true}>123</TreePushButton>
                                    </TreeLeafColumn>
                                </TreeLeaf>
                            </TreeBranchlet>
                        </TreeBranch>
                    </TreeBranchlet>
                </TreeBranch>
            </Tree>, { attachTo: div }
        );

        expect(div.childNodes).toHaveLength(1);

        component.detach();
        expect(div.childNodes).toHaveLength(0);
    });
    test("without sub-branch should not be aggregative", () => {

        const component = mount(
            <Tree>
                <TreeBranch>
                    <TreeBranchlet>
                        <TreeLeaf>
                            <TreeLeafColumn width={1}/>
                        </TreeLeaf>
                    </TreeBranchlet>
                </TreeBranch>
            </Tree>, { attachTo: div }
        );
        expect(div.childNodes).toHaveLength(1);

        expect(component.find(".zen_ui__checkbox_for_tree_branch")).toHaveLength(1);
        expect(component.find(".zen_ui__tree_branch_toggle__triangle")).toHaveLength(1);
        expect($(".zen_ui__tree_branch_toggle__triangle").attr("for")).toEqual($(".zen_ui__checkbox_for_tree_branch").attr("id"));
        expect($(".zen_ui__checkbox_for_tree_branch").prop("checked")).toBeFalsy();
        expect($(".zen_ui__tree_leaf").attr("data-aggregative")).toEqual("false");

        component.detach();
        expect(div.childNodes).toHaveLength(0);

    });
    test("with sub-branch should set aggregative", () => {

        const component = mount(
            <Tree>
                <TreeBranch>
                    <TreeBranchlet>
                        <TreeLeaf>
                            <TreeLeafColumn width={1}/>
                        </TreeLeaf>
                        <TreeBranch>
                            <TreeBranchlet>
                                <TreeLeaf>
                                    <TreeLeafColumn width={1}/>
                                </TreeLeaf>
                            </TreeBranchlet>
                        </TreeBranch>
                    </TreeBranchlet>
                </TreeBranch>
            </Tree>, { attachTo: div }
        );
        expect(div.childNodes).toHaveLength(1);

        expect($(".zen_ui__tree_leaf[data-aggregative='true']")).toHaveLength(1);
        expect($(".zen_ui__tree_leaf[data-aggregative='true']>.zen_ui__checkbox_for_tree_branch")).toHaveLength(1);
        expect($(".zen_ui__tree_leaf[data-aggregative='true']>.zen_ui__checkbox_for_tree_branch").prop("checked")).toBeFalsy();
        expect($(".zen_ui__tree_leaf[data-aggregative='true'] > div > div > .zen_ui__tree_branch_toggle > label")).toHaveLength(1);

        component.detach();
        expect(div.childNodes).toHaveLength(0);

    });
});
