import React from "react";
import Utils from "../../Utils";
import Button_Props from "./Button_Props";
import PropTypes from "prop-types";

const searchArray = function (array, keyField, key) {
    for(var i = 0;i<array.length;i++) {
        if(array[i][keyField]===key) {
            return array[i];
        }
    }
}

/**
 * @class
 * @classdesc Combobox
 * @author Ilya Bogdanov <public@ilyabogdanov.ru>
 * @license Apache-2.0
 *
 * @prop {boolean}  props.disabled
 * @prop {boolean}  props.stretch
 * @prop {Object[]} props.items
 * @prop {string}   props.textParameter
 * @prop {string}   props.valueParameter
 * @prop {*}        props.activeItemValue
 * @prop {function} props.onChange
 *
 * @prop {*} props.children
 */
export default class Combobox extends React.Component {
    constructor(props) {
        // noinspection JSCheckFunctionSignatures
        super(props);
        this.id = Utils.generateId();
        this.name = Utils.generateId();
        this.searchId = Utils.generateId();
        this.activeItemText = null;
        this.state = {
            disabled: this.props.disabled,
            filter: "",
            activeItemValue: this.props.activeItemValue,
            activeItemText: searchArray(this.props.items, this.props.valueParameter, this.props.activeItemValue)[this.props.textParameter]
        };
        this._onChange = this._onChange.bind(this);
        this._onFilterChange = this._onFilterChange.bind(this);
    }
    // noinspection JSCheckFunctionSignatures
    /**
     * @param {object} props
     * @param {boolean} props.disabled
     */
    componentWillReceiveProps(props) {
        var newState = {};
        newState.disabled = props.disabled
        this.setState(newState);
    }
    _onChange(value, text) {
        this.setState({
            activeItemValue: value,
            activeItemText: text
        });
        this.props.onChange(value);
    }
    _onFilterChange(e) {
        this.setState({
            filter: e
        });
    }
    render() {
        const { id, name, searchId, _onChange } = this;
        const { textParameter, valueParameter, stretch } = this.props;
        const { disabled, activeItemValue, activeItemText, filter } = this.state;
        const filterOnce = function (text) {
            return text.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
        }
        const filterAll = function (array, textParameter) {
            let e = {};
            try {
                array.forEach(function(element) {
                    if (element[textParameter].toLowerCase().indexOf(filter.toLowerCase()) !== -1) throw e;
                });
                return false;
            } catch (_e_) {
                return true;
            }
        }
        return (
            <div className="zen_ui__combobox__container" data-stretch={stretch}>
                <div>
                    <ComboboxInput id={id} searchId={searchId} disabled={disabled}/>
                    <label className="zen_ui__button" data-palette={Button_Props.palette.ORDINARY} htmlFor={id}>
                        <span className="zen_ui__button_text">
                            <span>
                                {activeItemText}
                            </span>
                        </span>
                        <span className="zen_ui__combobox__triangle"></span>
                    </label>
                    <div className="zen_ui__combobox__dropbox">
                        <ComboboxFilter
                            value={filter}
                            searchId={searchId}
                            onChange={this._onFilterChange}/>
                        <div className="zen_ui__combobox__option_group">
                            {
                                this.props.items.map((e,i) =>
                                    filterOnce(e[textParameter]) ?
                                        <ComboboxOption key={i}
                                                        i={i}
                                                        id={id}
                                                        name={name}
                                                        text={e[textParameter]}
                                                        value={e[valueParameter]}
                                                        activeItemValue={activeItemValue}
                                                        onClick={_onChange}/> : null
                                )
                            }
                        </div>
                        {
                            filterAll(this.props.items, textParameter) ? null :
                                <div className="zen_ui__combobox__no_options">
                                    <div>No such options</div>
                                </div>
                        }
                    </div>
                    <label className="zen_ui__combobox__dropbox_hide" htmlFor={id}></label>
                    <div></div>
                </div>
            </div>
        );
    }
};

// TODO: add property "placeholder" to combobox filter

/**
 * @class
 * @classdesc Combobox
 * @author Ilya Bogdanov <public@ilyabogdanov.ru>
 * @license Apache-2.0
 *
 * @prop {object} props
 * @prop {string} props.value
 * @prop {string} props.searchId
 * @prop {function} props.onChange
 */
class ComboboxFilter extends React.Component {
    constructor(props) {
        // noinspection JSCheckFunctionSignatures
        super(props);
        this.state = {
            value: this.props.value
        };
        this._onChange = this._onChange.bind(this);
    }
    _onChange(e) {
        const value = e.target.value;
        this.setState({
            value: value
        });
        this.props.onChange(value);
    }
    render() {
        return (
            <div className="zen_ui__combobox__search_field" data-stretch="false">
                <input id={this.props.searchId} className="zen_ui__textfield__input" placeholder="" onChange={this._onChange}/>
            </div>
        );
    }
}
ComboboxFilter.propTypes = {
    searchId: PropTypes.string.isRequired
};

/**
 * @class
 * @classdesc Combobox input
 * @author Ilya Bogdanov <public@ilyabogdanov.ru>
 * @license Apache-2.0
 *
 * @prop {object} props
 * @prop {boolean} props.disabled
 */
class ComboboxInput extends React.Component {
    constructor(props) {
        // noinspection JSCheckFunctionSignatures
        super(props);
        this.state = {
            checked: false,
            disabled: this.props.disabled
        };
        this._onChange = this._onChange.bind(this);
    }
    // noinspection JSCheckFunctionSignatures
    /**
     * @param {object} props
     * @param {boolean} props.disabled
     */
    componentWillReceiveProps(props) {
        var newState = {};
        newState.disabled = props.disabled
        this.setState(newState);
    }
    _onChange(event) {
        const value = event.target.checked;
        this.setState({checked: value});
        document.getElementById(this.props.searchId).focus();
    }
    render() {
        const { _onChange } = this;
        const { id } = this.props;
        const { checked, disabled } = this.state;
        return (
            <input className="zen_ui__button_checkbox"
                   type="checkbox"
                   id={id}
                   checked={checked}
                   disabled={disabled}
                   value={checked}
                   onChange={_onChange}/>
        );
    }
};
ComboboxInput.propTypes = {
    id: PropTypes.string.isRequired,
    searchId: PropTypes.string.isRequired
};

/**
 * @class
 * @classdesc Combobox option
 * @author Ilya Bogdanov <public@ilyabogdanov.ru>
 * @license Apache-2.0
 *
 * @prop {string} props.id
 * @prop {string} props.text
 * @prop {*} props.value
 * @prop {*} props.activeItemValue
 * @prop {function} props.onClick
 */
class ComboboxOption extends React.Component {
    constructor(props) {
        // noinspection JSCheckFunctionSignatures
        super(props);
        this.id = this.props.id+"__"+this.props.i;
        this._onClick = this._onClick.bind(this);
        this._onChange = this._onChange.bind(this);
    }
    _onClick() {
        this.props.onClick(this.props.value ? this.props.value : null, this.props.text ? this.props.text : null);
    }
    _onChange() {
        // NOP
    }
    render() {
        const { _onChange, _onClick } = this;
        const { id, text, value, activeItemValue } = this.props;
        return (
            <div>
                <input type="radio"
                       value={value ? value : ""}
                       checked={activeItemValue===value}
                       onChange={_onChange}
                       className="zen_ui__checkbox_for_combobox_option"/>

                <label className="zen_ui__combobox__option"
                       htmlFor={id}
                       onClick={_onClick}>

                    <span>
                        {text}
                    </span>
                </label>
            </div>
        );
    }
};
ComboboxOption.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    text: PropTypes.any.isRequired
};
