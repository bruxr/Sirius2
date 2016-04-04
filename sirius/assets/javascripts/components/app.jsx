import React from 'react';
import _ from 'underscore';
import Overview from './overview.jsx';
import Integrations from './integrations.jsx';
import _i from 'underscore.inflection';

export default React.createClass({
  propTypes: {
    project: React.PropTypes.object
  },
  
  contextTypes: {
    store: React.PropTypes.object
  },
  
  getInitialState: function() {
    return {
      currentSection: 'overview'
    }
  },
  
  render: function() {
    var section = this.elementBySection(this.state.currentSection);
    
    return (
      <div className="project-app">
        <header className="main-header">
          <nav className="navbar">
            <h3 className="navbar-brand">{this.props.project.get('name')}</h3>
            <ul className="navbar-nav">
              <li className="active"><a href="#/overview" onClick={this.handleNavigate}>Overview</a></li>
              <li><a href="#/integrations" onClick={this.handleNavigate}>Integrations</a></li>
              <li><a href="#/contracts" onClick={this.handleNavigate}>Contracts</a></li>
              <li><a href="#/files" onClick={this.handleNavigate}>Files</a></li>
              <li><a href="#/settings" onClick={this.handleNavigate}>Settings</a></li>
            </ul>
          </nav>
        </header>
        <section className="content">{section}</section>
      </div>
    );
  },

  elementBySection(section) {
    var component = null;
    switch(section) {
      case 'overview':
        component = Overview;
        break;
      case 'integrations':
        component = Integrations;
        break;
      default:
        console.error(`Unknown section ${section}`);
    }

    if (component !== null) {
      return React.createElement(component);
    }
  },
  
  handleNavigate: function(e) {
    e.preventDefault();
    var el = e.target;
    var href = el.attributes.getNamedItem('href').value;
    
    var menuItems = el.parentNode.parentNode.childNodes;
    for (var i = 0; i < menuItems.length; i++) {
      menuItems[i].classList.remove('active');
    }
    el.parentNode.classList.add('active');
    
    this.setState({ currentSection: href.slice(2) });
  }
});
