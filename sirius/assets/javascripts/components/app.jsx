import React from 'react';
import { Link } from 'react-router';

export default React.createClass({
    contextTypes: {
        store: React.PropTypes.object
    },
  
    getInitialState: function() {
        return sirius_project;
    },
  
    render: function() {
        return (
            <div className="project-app">
                <header className="main-header">
                    <nav className="navbar">
                        <h3 className="navbar-brand">{this.state.name}</h3>
                        <ul className="navbar-nav">
                            <li><Link to={`/a/${this.state.id}`}>Overview</Link></li>
                            <li><Link to={`/a/${this.state.id}/integrations`}>Integrations</Link></li>
                            <li><Link to={`/a/${this.state.id}/contracts`}>Contracts</Link></li>
                            <li><Link to={`/a/${this.state.id}/files`}>Files</Link></li>
                            <li><Link to={`/a/${this.state.id}/settings`}>Settings</Link></li>
                        </ul>
                    </nav>
                </header>
                {this.props.children}
            </div>
        );
    }
});
