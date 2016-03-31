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
  
  navigateTo: function(route) {
    var section = route.slice(1); // section is route without leading /
    
    document.title = this.props.project.name + ' - ' + _.titleize(section);
    history.pushState({ route: route }, '', '#' + route);
    this.setState({ currentSection: section });
  },
  
  render: function() {
    var section = this.elementBySection(this.state.currentSection);
    
    return (
      <div className="project container">
        <header className="main-header">
          <nav className="navbar navbar-default">
            <div className="container-fluid">
              <div className="navbar-header">
                <a className="navbar-brand" href="#/overview">{this.props.project.name}</a>
              </div>
              <ul className="nav navbar-nav">
                <li className="active"><a href="#/overview" onClick={this.handleNavigate}>Overview</a></li>
                <li><a href="#/integrations" onClick={this.handleNavigate}>Integrations</a></li>
                <li><a href="#/contracts" onClick={this.handleNavigate}>Contracts</a></li>
                <li><a href="#/files" onClick={this.handleNavigate}>Files</a></li>
                <li><a href="#/settings" onClick={this.handleNavigate}>Settings</a></li>
              </ul>
            </div>
          </nav>
        </header>
        <section id="content">
          {section}
        </section>
      </div>
    );
  },

  elementBySection(section) {
    var component;
    switch(section) {
      case 'overview':
        component = Overview;
        break;
      case 'integrations':
        component = Integrations;
        break;
    }
    return React.createElement(component);
  },
  
  handleNavigate: function(e) {
    e.preventDefault();
    var el = e.target;
    var route = el.attributes.getNamedItem('href').value.slice('1'); // Remove leading #
    
    var menuItems = el.parentNode.parentNode.childNodes;
    for (var i = 0; i < menuItems.length; i++) {
      menuItems[i].classList.remove('active');
    }
    el.parentNode.classList.add('active');
    
    this.navigateTo(route);
  }
});
