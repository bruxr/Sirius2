import _ from 'underscore'
import React from 'react'
import moment from 'moment'

const Repo = (props) => {
    console.log(props)
    if (_.isUndefined(props.repo)) {
        return <noscript />
    }

    if (props.isEditing) {
        let repos = []
        if (props.isFetchingHosted) {
            repos.push(<option key="norepos">Fetching list...</option>)
        } else {
            repos.push(<optgroup key="bitbucket" label="BitBucket" />)
            _.each(props.hosted.bitbucket, (repo, index) => {
                repos.push(<option key={`bitbucket-${index}`} value={repo.url}>{repo.name}</option>)
            });

            repos.push(<optgroup key="github" label="GitHub" />)
        }

        return (
            <section className="project-section project-section_repo">
                <h2>Repository</h2>
                <form>
                    <fieldset className="form-group">
                        <label htmlFor="repo-url">Repository</label>
                        <select className="form-control" disabled={props.isFetchingHosted}>{repos}</select>
                    </fieldset>
                    <button className="btn btn-primary" disabled={props.isFetchingHosted}>Save Changes</button>
                </form>
            </section>
        )
    } else {
        return (
            <section className="project-section project-section_repo">
                <h2>Repository</h2>
                <dl>
                    <dt>URL</dt>
                    <dd><a href="#">URL GOES HERE</a></dd>
                    <dt>Last Commit</dt>
                    <dd><a href="#">COMMIT GOES HERE</a> COMMIT DATE GOES HERE</dd>
                </dl>
            </section>
        )
    }
}

Repo.propTypes = {
    isEditing: React.PropTypes.bool,
    isFetchingHosted: React.PropTypes.bool,
    hosted: React.PropTypes.shape({
        bitbucket: React.PropTypes.arrayOf(React.PropTypes.shape({
            name: React.PropTypes.string,
            url: React.PropTypes.string
        })),
        github: React.PropTypes.arrayOf(React.PropTypes.shape({
            name: React.PropTypes.string,
            url: React.PropTypes.string
        }))
    }),
    repo: React.PropTypes.shape({
        url: React.PropTypes.string,
        isDeploying: React.PropTypes.bool,
        lastCommit: React.PropTypes.string,
        lastCommitDate: React.PropTypes.instanceOf(moment)
    })
}

export default Repo