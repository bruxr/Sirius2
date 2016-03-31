import React from 'react';

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
    
    this.context.store.dispatch(Sirius.fetchIntegrations());
  },
  
  render: function() {
    var loader = this.state.isFetching ? (<div className="preloader">Loading Integrations&hellip;</div>) : 'have integrations now :)';
    return (
      <div className="project-overview">
        <header className="page-header">
          <h3 className="display-1">Integrations</h3>
        </header>
        {loader}
      </div>
    );
  }
});
