import React from 'react';

export default class App extends React.Component {
    
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="project">
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

                <section className="project-section project-section_repo">
                    <h2>Repository</h2>
                    <dl>
                        <dt>URL</dt>
                        <dd><a href="#">bitbucket.com/bruxr/Sirius</a></dd>
                        <dt>Last Commit</dt>
                        <dd><a href="#">5ac32a</a> 30 minutes ago</dd>
                    </dl>
                </section>

                <section className="project-section project-section_snapshots">
                    <h2>Snapshots</h2>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">Filename</th>
                                <th scope="col">Date</th>
                                <th scope="col">Size</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row"><a href="#">192835-050216-snapshot.zip</a></th>
                                <td>May 2 2016</td>
                                <td>1.2 MB</td>
                            </tr>
                            <tr>
                                <th scope="row"><a href="#">192835-050416-snapshot.zip</a></th>
                                <td>May 4 2016</td>
                                <td>1.3 MB</td>
                            </tr>
                            <tr>
                                <th scope="row"><a href="#">192835-050616-snapshot.zip</a></th>
                                <td>May 6 2016</td>
                                <td>1 MB</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        )
    }

}