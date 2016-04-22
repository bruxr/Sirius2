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
    sftp: {
        label: 'SFTP',
        attributes: [
            { label: 'Host', key: 'host', type: 'url' },
            { label: 'User', key: 'user', type: 'text' },
            { label: 'Password', key: 'pass', type: 'text' },
            { label: 'Path', key: 'path', type: 'text' }
        ]
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
            actions.push(<li key="save" className="pure-menu-item"><button className="pure-button">Save Changes</button></li>);
            actions.push(<li key="cancel" className="pure-menu-item"><a href="#" onClick={this.onCancelEdit} className="pure-menu-link">Cancel</a></li>)
        } else if (this.state.isEditing) {
            formClass = 'integration-form editing';
            actions.push(<li key="save" className="pure-menu-item"><button className="pure-button">Save Changes</button></li>);
            actions.push(<li key="cancel" className="pure-menu-item"><a href="#" onClick={this.onCancelEdit} className="pure-menu-link">Cancel</a></li>);
            actions.push(<li key="delete" className="pure-menu-item"><a href="#" onClick={this.onDelete} className="pure-menu-link">Delete</a></li>);
        } else {
            formClass = 'integration-form';
            actions.push(<li key="edit" className="pure-menu-item"><a href="#" onClick={this.onEdit} className="pure-menu-link">Edit</a></li>);
        }

        return <div className="integration">
            <h4 className="integration-title">{integration.label}</h4>
            <form className={formClass} onSubmit={this.saveChanges} ref="form">
                {integration.attributes.map(attr => {
                    return <label key={attr.key} className="pure-form pure-form-stacked integration-form-group">
                        {attr.label}
                        <input
                            type={attr.type}
                            data-key={attr.key}
                            defaultValue={this.state[attr.key]}
                            readOnly={!this.state.isEditing}
                            required />
                    </label>
                })}
                <ul className="integration-actions pure-menu pure-menu-horizontal">{actions}</ul>
            </form>
        </div>
    },
    
    // Collect all data field values and then invoke the save callback.
    saveChanges(e) {
        e.preventDefault();
        
        let data = {};
        let fields = this.refs.form.querySelectorAll('[data-key]');
        for (let i = 0; i < fields.length; i++) {
            data[fields[i].dataset.key] = fields[i].value;
        }
        
        this.props.save(this.props.id, this.props.kind, data);
        
        data['isEditing'] = false;
        this.setState(data);
    },
    
    // Automatically focuses the very first form field.
    _autofocus() {
        if (!this.state.isEditing) return;
        this.refs.form.getElementsByTagName('input')[0].focus();
    },
    
    _isNew() {
        return this.props.id.charAt(0) === '?';
    }

});