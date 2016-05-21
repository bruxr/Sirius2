import React from 'react';

export default class Details extends React.Component {

    render() {
        return (
            <section className="project-section project-section_main">
                <div className="row">
                    <div className="col-md-8">
                        <h1>Sirius</h1>
                        <a href="#" className="project-url">sirius.com</a>
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
    
}