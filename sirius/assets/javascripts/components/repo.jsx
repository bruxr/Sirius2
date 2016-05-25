import _ from 'underscore'
import React from 'react'
import moment from 'moment'

const Repo = (props) => {
    if (_.isUndefined(props.repo)) {
        return <noscript />
    }

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
    )
}

Repo.propTypes = {
    isEditing: React.PropTypes.bool,
    repo: React.PropTypes.shape({
        url: React.PropTypes.string,
        isDeploying: React.PropTypes.bool,
        lastCommit: React.PropTypes.string,
        lastCommitDate: React.PropTypes.instanceOf(moment)
    })
}

export default Repo