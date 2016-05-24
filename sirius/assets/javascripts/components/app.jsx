import React from 'react';
import Details from '../containers/details';
import Repository from './repository.jsx';
import Snapshots from './snapshots.jsx';

export default class App extends React.Component {

    render() {
        return (
            <div className="project">
                <Details />
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