import React from 'react';
import _ from 'underscore';

const integrationTypes = {
    basecamp: {
        label: 'Basecamp',
        attributes: [
            { label: 'Address', key: 'url', type: 'url' }
        ],
        commands: []
    },
    wordpress: {
        label: 'Wordpress',
        attributes: [
            { label: 'User', key: 'user', type: 'text' },
            { label: 'Password', key: 'password', type: 'text' },
            { label: 'Address', key: 'url', type: 'url' }
        ],
        commands: [
            { label: 'Admin', callback: function() { let a = window.open(); a.opener = null; a.location = this.state.url; } },

        ]
    }
};

export default React.createClass({

    propTypes: {
        id: React.PropTypes.string,
        kind: React.PropTypes.string,
        data: React.PropTypes.object,
        save: React.PropTypes.func,
        delete: React.PropTypes.func
    },

    getInitialState() {
        if (typeof integrationTypes[this.props.kind] === 'undefined') {
            throw new Error(`Cannot generate integration component for "${this.props.kind}" without a manifest.`);
        }

        let state = { isEditing: this._isNew() }

        integrationTypes[this.props.kind].attributes.map(attr => {
            state[attr.key] = this.props.data[attr.key];
        });

        return state;
    },

    onEdit(e) {
        e.preventDefault();
        this.setState({ isEditing: true });
    },

    onCancelEdit(e) {
        e.preventDefault();
        if (this._isNew()) {
            this.props.delete(this.props.id);
        } else {
            this.setState({ isEditing: false });
        }
    },

    onDelete(e) {
        e.preventDefault();
        if (confirm('Are you sure you want to remove this integration?')) {
            this.props.delete(this.props.id);
        }
    },
    
    componentDidMount() {
        this._autofocus();
    },
    
    componentDidUpdate() {
        this._autofocus();
    },

    render() {
        let integration = integrationTypes[this.props.kind];
        let actions = [];
        let formClass = '';
        
        if (this._isNew()) {
            formClass = 'integration-form editing';
            actions.push(<li key="save"><button>Save Changes</button></li>);
            actions.push(<li key="cancel"><a href="#" onClick={this.onCancelEdit}>Cancel</a></li>)
        } else if (this.state.isEditing) {
            formClass = 'integration-form editing';
            actions.push(<li key="save"><button>Save Changes</button></li>);
            actions.push(<li key="cancel"><a href="#" onClick={this.onCancelEdit}>Cancel</a></li>);
            actions.push(<li key="delete"><a href="#" onClick={this.onDelete}>Delete</a></li>);
        } else {
            formClass = 'integration-form';
            actions.push(<li key="edit"><a href="#" onClick={this.onEdit}>Edit</a></li>);
        }

        return <div className="integration">
            <h4 className="integration-title">{integration.label}</h4>
            <form className={formClass} onSubmit={this.saveChanges} ref="form">
                {integration.attributes.map(attr => {
                    return <label key={attr.key} className="integration-form-group">
                        {attr.label}
                        <input
                            type={attr.type}
                            data-key={attr.key}
                            defaultValue={this.state[attr.key]}
                            className="integration-form-control"
                            readOnly={!this.state.isEditing}
                            required />
                    </label>
                })}
                <ul className="integration-actions">{actions}</ul>
            </form>
        </div>
    },
    
    // Invoke save callback when the form is saved
    saveChanges(e) {
        e.preventDefault();
        this._commitFields();
        this.props.save(this.props.id, this.props.kind, this._fields());
    },
    
    // Automatically focuses the very first form field.
    _autofocus() {
        this.refs.form.getElementsByTagName('input')[0].focus();
    },
    
    // Updates the state with values from the data form fields
    _commitFields() {
        let state = {};
        let fields = this.refs.form.querySelectorAll('[data-key]');
        for (let i = 0; i < fields.length; i++) {
            state[fields[i].dataset.key] = fields[i].value;
        }
        debugger;
        this.setState(state);
    },
    
    _isNew() {
        return this.props.id.charAt(0) === '?';
    },
    
    // Returns an object containing all of this integration's custom fields. 
    _fields() {
        let fields = {};
        integrationTypes[this.props.kind].attributes.map(field => {
            fields[field.key] = this.state[field.key];
        });
        return fields;
    },

});