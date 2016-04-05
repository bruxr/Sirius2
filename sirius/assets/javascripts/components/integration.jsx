import React from 'react';
import _ from 'underscore';

const Basecamp = React.createClass({
    propTypes: {
        integration: React.PropTypes.object,
        save: React.PropTypes.func,
        delete: React.PropTypes.func
    },

    getInitialState() {
        let isNew = this.props.integration.get('id').charAt(0) === '?';
        return {
            isEditing: isNew,
            url: this.props.integration.get('data').url
        }
    },

  doEdit(e) {
    e.preventDefault();
    this.setState({ isEditing: true });
  },

  cancelEdit(e) {
    e.preventDefault();
    this.setState({ isEditing: false });
  },

  saveChanges(e) {
    e.preventDefault()
    if (this.state.url !== '') {
      this.props.doSave(this.props.id, this.props.kind, {
        url: this.state.url
      });
    } else {
      alert('URL is required');
    }
  },

  updateUrl(e) {
    this.setState({ url: e.target.value });
  },

  onDelete(e) {
    e.preventDefault();
    if (confirm('Are you sure you want to remove this integration?')) {
      this.props.delete(this.props.id);
    }
  },

  render() {
    let url, actions;
    if (this.state.isEditing) {
      url = <input type="url" value={this.state.url} autoFocus={this.state.isEditing} onChange={this.updateUrl} />
      actions = <ul className="integration-actions">
        <li><button>Save Changes</button></li>
        <li><a href="#" onClick={this.cancelEdit}>Cancel</a></li>
        <li><a href="#" onClick={this.onDelete}>Delete</a></li>
      </ul>
    } else {
      url = <a href={this.state.url} target="_blank" rel="noreferrer noopener">{this.state.url}</a>
      actions = <ul className="integration-actions">
        <li><a href="#" onClick={this.doEdit}>Edit</a></li>
      </ul>
    }

    return <div className="integration">
      <form onSubmit={this.saveChanges}>
        <strong className="integration-title">Basecamp</strong>
        <dl>
          <dt>URL</dt>
          <dd>{url}</dd>
        </dl>
        {actions}
      </form>
    </div>
  }
});

const Wordpress = React.createClass({
    propTypes: {
        integration: React.PropTypes.object,
        save: React.PropTypes.func,
        delete: React.PropTypes.func
      },

    getInitialState() {
        let isNew = this.props.integration.get('id').charAt(0) === '?';
        return {
          isEditing: isNew,
          user: this.props.integration.get('data').user,
          password: this.props.integration.get('data').password,
          url: this.props.integration.get('data').url
        }
    },

  doEdit(e) {
    e.preventDefault();
    this.setState({ isEditing: true });
  },

  cancelEdit(e) {
    e.preventDefault();
    this.setState({ isEditing: false });
  },

  saveChanges(e) {
    e.preventDefault()
    this.props.doSave(this.props.id, this.props.kind, {
      user: this.state.user,
      password: this.state.password,
      url: this.state.url
    });
  },

  updateStateFromInput(e) {
    let state = {}
    state[e.target.dataset.key] = e.target.value;
    this.setState(state);
  },

  render() {
    let isEditing = this.state.isEditing;
    let url;
    let actions;

    if (isEditing) {
      url = <input type="url" data-key="url" value={this.state.url} onChange={this.updateStateFromInput} required />
      actions = <ul className="integration-actions">
        <li><button>Save Changes</button></li>
        <li><a href="#" onClick={this.cancelEdit}>Cancel</a></li>
        <li><a href="#">Delete</a></li>
      </ul>
    } else {
      url = <a href={this.state.url} target="_blank" rel="noreferrer noopener">{this.state.url}</a>
      actions = <ul className="integration-actions">
        <li><button type="button">Admin</button></li>
        <li><a href="#" onClick={this.doEdit}>Edit</a></li>
      </ul>
    }

    return (
      <div className="integration">
        <form onSubmit={this.saveChanges}>
          <strong className="integration-title">Wordpress</strong>
          <dl className="integration-credentials">
            <dt>User:</dt>
            <dd>
              <input type="text" data-key="user" value={this.state.user} readOnly={!isEditing} autoFocus={isEditing} onChange={this.updateStateFromInput} required />
            </dd>
            <dt>Password:</dt>
            <dd>
              <input type="text" data-key="password" value={this.state.password} readOnly={!isEditing} onChange={this.updateStateFromInput} required />
            </dd>
            <dt>URL:</dt>
            <dd>
              {url}
            </dd>
          </dl>
          {actions}
        </form>
      </div>
    )
  }
});

export default {
  Basecamp,
  Wordpress: Wordpress
}