import React from 'react';

export default class Overview extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            description: ''
        }
    }

    componentDidMount() {
        const state = this.context.store.getState();
        this.setState({
            description: state.project.get('description'),
            updatedAt: state.project.get('updatedAt')
        });
    }

    render() {
        const updatedAt = this.state.updatedAt ? this.state.updatedAt.fromNow() : '';
        return (
            <div className="project-overview">
                <header className="page-header">
                    <h2 className="page-header">Overview</h2>
                </header>
                <div className="project-desc">
                    {this.state.description}
                    <p className="project-desc-meta">Last Updated {updatedAt} &middot; <a href="#">Edit</a></p>
                </div>
            </div>
        );
    }

}

Overview.contextTypes = {
    store: React.PropTypes.object
}