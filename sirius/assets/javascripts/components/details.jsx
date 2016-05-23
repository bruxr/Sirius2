import React from 'react';
import moment from 'moment';

export default class Details extends React.Component {

    render() {
        return (
            <section className="project-section project-section_main">
                <div className="row">
                    <div className="col-md-8">
                        <h1>{this.props.name}</h1>
                        <a href={this.props.url} className="project-url" target="_blank" rel="noopener noreferrer">{this.cleanUrl(this.props.url)}</a>
                    </div>
                    <div className="col-md-4">
                        <a href="#" className="btn btn-primary">Deploy</a>
                        <a href="#" className="btn btn-secondary">Snapshot</a>
                        <div className="dropdown">
                            <a href="#" className="btn btn-secondary dropdown-toggle">Project</a>
                            <div className="dropdown-menu">
                                <a href="#" className="dropdown-item">Edit SFTP</a>
                                <a href="#" className="dropdown-item">Edit Repository</a>
                                <a href="#" className="dropdown-item">Archive Project</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="project-desc">
                    A very sirius project
                </div>

                <div className="project-meta">
                    <small className="text-muted">
                        Last updated 2 hours ago &middot; 
                        Created 1 week ago
                    </small>
                </div>
            </section>
        );
    }

    cleanUrl(url) {
        url = url.replace(/^https?:\/\//, '');
        url = url.replace(/\/$/, '');
        return url;
    }
    
}

Details.propTypes = {
    name: React.PropTypes.string,
    desc: React.PropTypes.string,
    url: React.PropTypes.string,
    updated: React.PropTypes.instanceOf(moment),
    created: React.PropTypes.instanceOf(moment)
}