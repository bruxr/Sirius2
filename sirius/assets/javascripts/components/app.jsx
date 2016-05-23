import React from 'react';
import Details from './details.jsx';
import Repository from './repository.jsx';
import Snapshots from './snapshots.jsx';

export default class App extends React.Component {

    render() {
        const project = this.props.project;
        return (
            <div className="project">
                <Details
                    name={project.name}
                    desc={project.desc}
                    url={project.url}
                    created={project.created}
                    updated={project.updated}
                />
                <Repository />
                <Snapshots />
            </div>
        )
    }

}

App.propTypes = {
    project: React.PropTypes.object
}

App.contextTypes = {
    store: React.PropTypes.object
}