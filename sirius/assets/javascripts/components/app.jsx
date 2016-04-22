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
                    <nav className="pure-menu pure-menu-horizontal">
                        <h3 className="pure-menu-heading pure-menu-link">{this.state.name}</h3>
                        <ul className="pure-menu-list">
                            <li className="pure-menu-item"><Link to={`/a/${this.state.id}`} className="pure-menu-link">Overview</Link></li>
                            <li className="pure-menu-item"><Link to={`/a/${this.state.id}/integrations`} className="pure-menu-link">Integrations</Link></li>
                            <li className="pure-menu-item"><Link to={`/a/${this.state.id}/contracts`} className="pure-menu-link">Contracts</Link></li>
                            <li className="pure-menu-item"><Link to={`/a/${this.state.id}/files`} className="pure-menu-link">Files</Link></li>
                            <li className="pure-menu-item"><Link to={`/a/${this.state.id}/settings`} className="pure-menu-link">Settings</Link></li>
                        </ul>
                    </nav>
                </header>
                {this.props.children}
            </div>
        );
    }
});
