import React from "react";

/**
 * button
 */
import Button_Props           from "./components/form/Button_Props";
import Combobox               from "./components/form/Combobox";
import ConjoinedButtons       from "./components/form/ConjoinedButtons";
import LinkButton             from "./components/form/LinkButton";
import PushButton             from "./components/form/PushButton";
import ToggleButton           from "./components/form/ToggleButton";
import ToggleRadioButton            from "./components/form/ToggleRadioButton";

/**
 * content
 */
import Text                   from "./components/content/Text";
import Text_Props             from "./components/content/Text_Props";

/**
 * input
 */
import Checkbox               from "./components/form/Checkbox";
import Checkbox_Props         from "./components/form/Checkbox_Props";
import NumberField            from "./components/form/NumberField";
import PasswordField          from "./components/form/PasswordField";
import Radio                  from "./components/form/Radio";
import TextField              from "./components/form/TextField";
import TimeField              from "./components/form/TimeField";

/**
 * layout
 */
import HorizontalLayout       from "./components/layout/HorizontalLayout";
import HorizontalLayoutColumn from "./components/layout/HorizontalLayoutColumn";
import VerticalLayout         from "./components/layout/VerticalLayout";
import VerticalLayoutRow      from "./components/layout/VerticalLayoutRow";

/**
 * navigation
 */
import HorizontalMenu         from "./components/navigation/HorizontalMenu";
import HorizontalMenuImage    from "./components/navigation/HorizontalMenuImage";
import HorizontalMenuLink     from "./components/navigation/HorizontalMenuLink";
import HorizontalMenuColumn   from "./components/navigation/HorizontalMenuColumn";
import Path                   from "./components/navigation/Path";
import PathItem               from "./components/navigation/PathItem";

/**
 * panel
 */
import LoadingMask            from "./components/panel/LoadingMask";
import Tree                   from "./components/panel/Tree";
import TreeBranch             from "./components/panel/TreeBranch";
import TreeBranchlet          from "./components/panel/TreeBranchlet";
import TreeLeaf               from "./components/panel/TreeLeaf";
import TreeLeafColumn         from "./components/panel/TreeLeafColumn";
import TreeLinkButton         from "./components/panel/TreeLinkButton";
import TreePushButton         from "./components/panel/TreePushButton";

/**
 * window
 */
import Modal                  from "./components/window/Modal";
import Window                 from "./components/window/Window";
import Window_Props           from "./components/window/Window_Props";
import WindowBody             from "./components/window/WindowBody";
import WindowCloseButton      from "./components/window/WindowCloseButton";
import WindowHead             from "./components/window/WindowHead";

/**
 * Container
 */
import ScrollArea                  from "./components/container/ScrollArea";

const Zen = {
    Button_Props: Button_Props,
    Combobox: Combobox,
    ConjoinedButtons: ConjoinedButtons,
    LinkButton: LinkButton,
    PushButton: PushButton,
    ToggleButton: ToggleButton,
    ToggleRadioButton: ToggleRadioButton,
    Text: Text,
    Text_Props: Text_Props,
    Checkbox: Checkbox,
    Checkbox_Props: Checkbox_Props,
    NumberField: NumberField,
    PasswordField: PasswordField,
    Radio: Radio,
    TextField: TextField,
    TimeField: TimeField,
    HorizontalLayout: HorizontalLayout,
    HorizontalLayoutColumn: HorizontalLayoutColumn,
    VerticalLayout: VerticalLayout,
    VerticalLayoutRow: VerticalLayoutRow,
    HorizontalMenu: HorizontalMenu,
    HorizontalMenuImage: HorizontalMenuImage,
    HorizontalMenuLink: HorizontalMenuLink,
    HorizontalMenuColumn: HorizontalMenuColumn,
    Path: Path,
    PathItem: PathItem,
    LoadingMask: LoadingMask,
    Tree: Tree,
    TreeBranch: TreeBranch,
    TreeBranchlet: TreeBranchlet,
    TreeLeaf: TreeLeaf,
    TreeLeafColumn: TreeLeafColumn,
    TreeLinkButton: TreeLinkButton,
    TreePushButton: TreePushButton,
    Modal: Modal,
    Window: Window,
    Window_Props: Window_Props,
    WindowBody: WindowBody,
    WindowCloseButton: WindowCloseButton,
    WindowHead: WindowHead,
    ScrollArea: ScrollArea
};

export {

    // bundle of all components
    Zen,

    // button
    Button_Props,
    Combobox,
    ConjoinedButtons,
    LinkButton,
    PushButton,
    ToggleButton,
    ToggleRadioButton,
    
    // content
    Text,
    Text_Props,

    // input
    Checkbox,
    Checkbox_Props,
    NumberField,
    PasswordField,
    Radio,
    TextField,
    TimeField,

    // layout
    HorizontalLayout,
    HorizontalLayoutColumn,
    VerticalLayout,
    VerticalLayoutRow,

    // navigation
    HorizontalMenu,
    HorizontalMenuImage,
    HorizontalMenuLink,
    HorizontalMenuColumn,
    Path,
    PathItem,

    // panel
    LoadingMask,
    Tree,
    TreeBranch,
    TreeBranchlet,
    TreeLeaf,
    TreeLeafColumn,
    TreeLinkButton,
    TreePushButton,

    // window
    Modal,
    Window,
    Window_Props,
    WindowBody,
    WindowCloseButton,
    WindowHead,

    // container
    ScrollArea
}
