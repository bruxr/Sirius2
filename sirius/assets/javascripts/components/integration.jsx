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
            { label: 'Password', key: 'user', type: 'text' },
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

        let isNew = this.props.id.charAt(0) === '?';
        let state = { isEditing: isNew }

        integrationTypes[this.props.kind].attributes.map(attr => {
            state[attr.key] = this.props.data[attr.key];
        });

        return state;
    },

    updateInput(e) {
        debugger;
    },

    onEdit(e) {
        e.preventDefault();
        this.setState({ isEditing: true });
    },

    onCancelEdit(e) {
        e.preventDefault();
        this.setState({ isEditing: false });
    },

    onDelete(e) {
        e.preventDefault();
        if (confirm('Are you sure you want to remove this integration?')) {
          this.props.delete(this.props.id);
        }
    },

    saveChanges(e) {
        e.preventDefault();
        // TODO: finish me
        debugger;
    },

    render() {
        let integration = integrationTypes[this.props.kind];
        var formClass, actions;
        if (this.state.isEditing) {
            formClass = 'integration-form editing';
            actions = <ul className="integration-actions">
                <li><button>Save Changes</button></li>
                <li><a href="#" onClick={this.onCancelEdit}>Cancel</a></li>
                <li><a href="#" onClick={this.onDelete}>Delete</a></li>
            </ul>
        } else {
            formClass = 'integration-form';
            actions = <ul className="integration-actions">
                <li><a href="#" onClick={this.onEdit}>Edit</a></li>
            </ul>
        }

        return <div className="integration">
            <h4 className="integration-title">{integration.label}</h4>
            <form className={formClass} onSubmit={this.saveChanges}>
                {integration.attributes.map(attr => {
                    return <label key={attr.key} className="integration-form-group">
                        {attr.label}
                        <input
                            type={attr.type}
                            data-key={attr.key}
                            value={this.state[attr.key]}
                            className="integration-form-control"
                            readOnly={!this.state.isEditing}
                            onChange={this.updateInput}
                            required />
                    </label>
                })}
                {actions}
            </form>
        </div>
    }

});