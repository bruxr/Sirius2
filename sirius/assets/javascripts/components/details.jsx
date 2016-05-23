import React from 'react';
import moment from 'moment';

export default class Details extends React.Component {

    render() {
        return (
            <section className="project-section project-section_main">
                <div className="project-header">
                    <div className="project-header__info">
                        <h1 className="project-header__name">{this.props.name}</h1>
                        <a href={this.props.url} className="project-url" target="_blank" rel="noopener noreferrer">{this.cleanUrl(this.props.url)}</a>
                    </div>
                    <div className="project-header__actions">
                        <button className="btn_primary">Deploy</button>
                        <button>Snapshot</button>
                        <select defaultValue="">
                            <option value="">Actions...</option>
                            <option value="sftp">SFTP Details</option>
                            <option value="repo">Repository Details</option>
                            <option value="archive">Archive Project</option>
                        </select>
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