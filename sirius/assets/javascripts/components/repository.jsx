import React from 'react';

export default class Repository extends React.Component {

    render() {
        return (
            <section className="project-section project-section_repo">
                <h2>Repository</h2>
                <dl>
                    <dt>URL</dt>
                    <dd><a href="#">bitbucket.com/bruxr/Sirius</a></dd>
                    <dt>Last Commit</dt>
                    <dd><a href="#">5ac32a</a> 30 minutes ago</dd>
                </dl>
            </section>
        );
    }
    
}