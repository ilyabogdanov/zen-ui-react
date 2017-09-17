import React from "react";

/**
 * @class
 * @classdesc Password Field
 * @author Ilya Bogdanov <public@ilyabogdanov.ru>
 * @license Apache-2.0
 *
 * @prop {boolean} props.disabled
 * @prop {boolean} props.error
 * @prop {boolean} props.stretch
 * @prop {string} props.value
 * @prop {string} props.placeholder
 *
 * @prop {*} props.children
 */
export default class PasswordField extends React.Component {
    constructor(props) {
        // noinspection JSCheckFunctionSignatures
        super(props);
        this.state = {
            value: this.props.value,
            error: this.props.error,
            disabled: this.props.disabled
        };
        this._onChange = this._onChange.bind(this);
    }
    _onChange(e) {
        const value = e.target.value;
        this.setState({
            value: value
        });
        this.props.onChange(value ? value : null);
    }
    // noinspection JSCheckFunctionSignatures
    /**
     * @param {object} props
     * @param {boolean} props.error
     * @param {boolean} props.disabled
     */
    componentWillReceiveProps(props) {
        var newState = {};
        if (this.state.error!==props.error) {
            newState.error = props.error
        }
        if (this.state.disabled!==props.disabled) {
            newState.disabled = props.disabled
        }
        this.setState(newState);
    }
    render() {
        const { _onChange } = this;
        const { stretch, placeholder } = this.props;
        const { error, disabled, value } = this.state;
        return (
            <div className="zen_ui__textfield_container" data-stretch={stretch===true}>
                <input type="password"
                       value={value ? value : ""}
                       data-error={error}
                       className="zen_ui__textfield__input"
                       placeholder={placeholder}
                       disabled={disabled}
                       onChange={_onChange}/>
            </div>
        );
    }
};