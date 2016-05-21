import React from 'react';
import Details from './details.jsx';
import Repository from './repository.jsx';
import Snapshots from './snapshots.jsx';

export default class App extends React.Component {
    
    constructor(props) {
        super(props)
    }

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