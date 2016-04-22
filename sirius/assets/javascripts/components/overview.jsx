import React from 'react';

export default React.createClass({
  contextTypes: {
    store: React.PropTypes.object
  },
  
  getInitialState: function() {
    var state = this.context.store.getState();
    return {
      desc: state.project.desc
    }
  },
  
    render: function() {
        return (
            <div className="project-overview pure-g">
                <header className="page-header">
                    <h3 className="display-1">Overview</h3>
                </header>
                <div className="project-desc">
                    {this.state.desc}
                </div>
            </div>
        );
    }
});
