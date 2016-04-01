import React from 'react';
import { fetchIntegrations } from '../actions/integrations';

export default React.createClass({
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
          </header>
        </div>
      );
    }
  }
});
