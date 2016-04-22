import React from 'react';
import Integration from './integration.jsx';
import { deleteIntegration, newIntegration, fetchIntegrations, saveIntegration } from '../actions/integrations';

export default React.createClass({

  contextTypes: {
    store: React.PropTypes.object
  },
  
  getInitialState: function() {
    return {
      isFetching: true,
      items: []
    }
  },
  
  componentDidMount: function() {
    this.context.store.subscribe(() => {
      let state = this.context.store.getState().integrations;
      this.setState({
        isFetching: state.get('isFetching'),
        items: state.get('items')
      });
    });

    this.context.store.dispatch(fetchIntegrations());
  },

  saveIntegration(id, kind, data) {
    this.context.store.dispatch(saveIntegration(id, kind, data));
  },

  deleteIntegration(id) {
    this.context.store.dispatch(deleteIntegration(id));
  },

    render: function() {
        if (this.state.isFetching) {
          return (
            <div className="project-integrations">
              <header className="page-header">
                <h3>Integrations</h3>
              </header>
              <div className="preloader">Loading Integrations&hellip;</div>
            </div>
          );
        } else {
          return (
            <div className="project-integrations">
              <header className="page-header">
                <h3>Integrations</h3>
                <form className="form-h" onSubmit={this.addIntegration}>
                  <select id="add-integration-kind" defaultValue="">
                    <option value="">Select Integration&hellip;</option>
                    <option value="basecamp">Basecamp</option>
                    <option value="sftp">SFTP</option>
                    <option value="wordpress">Wordpress</option>
                  </select>
                  <button onClick={this.addIntegration}>Add Integration</button>
                </form>
              </header>
              {this.state.items.map(item => {
                return <Integration
                    key={item.get('id')}
                    id={item.get('id')}
                    kind={item.get('kind')}
                    data={item.get('data')}
                    save={this.saveIntegration}
                    delete={this.deleteIntegration} />
              })}
            </div>
          );
        }
    },

  addIntegration(e) {
    e.preventDefault();
    let kind = document.getElementById('add-integration-kind').value;
    this.context.store.dispatch(newIntegration(kind));
  }
});