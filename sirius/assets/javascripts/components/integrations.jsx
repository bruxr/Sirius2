import React from 'react';
import { fetchIntegrations } from '../actions/integrations';

import Basecamp from './integrations/basecamp';
import SFTP from './integrations/sftp';
import Wordpress from './integrations/wordpress';

export default React.createClass({
  kindToComponents: {
    basecamp: Basecamp,
    sftp: SFTP,
    wordpress: Wordpress
  },

  contextTypes: {
    store: React.PropTypes.object
  },
  
  getInitialState: function() {
    var state = this.context.store.getState();
    return {
      isFetching: true,
      integrations: []
    }
  },
  
  componentDidMount: function() {
    this.context.store.subscribe(function() {
      var state = this.context.store.getState();
      this.setState({
        isFetching: state.integrations.isFetching,
        integrations: state.integrations.items
      });
    }.bind(this));
    
    this.context.store.dispatch(fetchIntegrations());
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
        <div className="project-overview">
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
        </div>
      );
    }
  },

  addIntegration(e) {
    e.preventDefault();
    let kind = document.getElementById('add-integration-kind').value;
    console.log(kind);
  }
});
