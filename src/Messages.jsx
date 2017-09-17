
const _VALID_BOOLEAN_VALUE_ = "either true, false, or empty attribute which equals true";
const _VALID_PIXEL_VALUE_ = "either (a) Natural number, starting with anything but zero, ending with \"px\", or (b) Zero, without \"px\"";
const _BAD_HEIGHT_ = "\"height\" must be either (1) undefined, (2) 100%, or (3) valid pixel value, which means "+_VALID_PIXEL_VALUE_+".";
const _READONLY_IS_DISABLED_ = "will be forced to disabled because it is readonly.";

const COMMON_MESSAGES = {
    BAD_PADDING: "Property \"padding\" must be either 1,2 or 4 values, each of which must be valid pixel value, which means "+_VALID_PIXEL_VALUE_+"."
};
const TEXT_MESSAGES = {
    BAD_CLIPPED: "Property \"clipped\" must be but is not valid boolean value, which means "+_VALID_BOOLEAN_VALUE_+"."
};
const CONJOINED_BUTTONS_MESSAGES = {
    INVALID_CHILD: "Conjoined buttons container may contain only these components: push button, link button, toggle button, toggle radio button.",
    NO_CHILDREN: "Conjoined buttons container must have children"
};
const CHECKBOX_MESSAGES = {
    READONLY_IS_DISABLED: "Checkbox "+_READONLY_IS_DISABLED_
};
const RADIO_MESSAGES = {
    READONLY_IS_DISABLED: "Radio "+_READONLY_IS_DISABLED_,
    INVALID_CHILD: "Radio group may contain only Radio component or arrays of them"
};
const HORIZONTAL_LAYOUT_MESSAGES = {
    BAD_HEIGHT: "Horizontal layout's "+_BAD_HEIGHT_,
    ILLEGAL_CHILD: "Horizontal layout may have only columns or arrays of them.",
    NO_CHILDREN: "Horizontal layout must have at least one column.",
    STRETCH_WITH_HEIGHT: "Horizontal layout must not have both \"stretch\" and \"height\" properties.",
    EXCESSIVE_WIDTH: "Total width of all columns must not be more than 100%;",
    INSUFFICIENT_WIDTH: "Either (a) total width of all columns must be 100%, or (b) if less, then ratio may be used to divide remaining space.",
    NO_SPACE_FOR_RATIO: "No free space to accommodate columns with ratio width.",
    INVALID_WIDTH: "Horizontal layout column \"width\" must be either (a) pixel value, (b) percent value, or (c) ratio, which means Natural number.",
    NO_WIDTH: "Horizontal layout column must have \"width\".",
    COLUMN_WIDTH_REQUIRED: "Column with must be set.",
    TOTAL_WIDTH_LIMIT_EXCEEDED: "Total width of all columns, percent and ration, does not equal precisely 100%. It should not cause trouble but be careful anyway.",
    NO_SPACE_FOR_NO_WIDTH: "No free space to accommodate columns with undefined width."
};
const VERTICAL_LAYOUT_MESSAGES = {
    BAD_HEIGHT: "Vertical layout's "+_BAD_HEIGHT_,
    ILLEGAL_CHILD: "Vertical layout may have only rows or arrays of them.",
    NO_CHILDREN: "Vertical layout must have at least one row.",
    MULTIPLE_STRETCH_ROWS: "Vertical layout may have only one stretch row."
};
const WINDOW_MESSAGES = {
    ILLEGAL_CHILD: "Window can't have illegal children",
    NO_CHILDREN: "Window must have head and body"
};
const WINDOW_HEAD_MESSAGES = {
    ILLEGAL_CHILD: "Window head can have only close button"
};
const UTILS_MESSAGES = {
    NO_STYLE_DEST: "style destination must be provided"
};
const TREE_MESSAGES = {
    ILLEGAL_CHILD: "Illegal child, see docs for more info."
};
export {
    COMMON_MESSAGES,
    CONJOINED_BUTTONS_MESSAGES,
    CHECKBOX_MESSAGES,
    RADIO_MESSAGES,
    TEXT_MESSAGES,
    HORIZONTAL_LAYOUT_MESSAGES,
    VERTICAL_LAYOUT_MESSAGES,
    WINDOW_MESSAGES,
    WINDOW_HEAD_MESSAGES,
    TREE_MESSAGES,
    UTILS_MESSAGES
};
