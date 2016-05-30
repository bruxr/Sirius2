import React from 'react'
import moment from 'moment'

const Repo = (props) => {
    if (typeof props.repo === 'undefined') {
        return <noscript />
    }

    return (
        <section className="project-section project-section_repo">
            <h2>Repository</h2>
            {props.isEditing ? repoForm(props) : repoView(props)}
        </section>
    )
}

function repoForm(props) {
    let repos = []
    if (props.isFetchingHosted) {
        repos.push(<option key="norepos">Fetching list...</option>)
    } else {
        repos.push(<optgroup key="bitbucket" label="BitBucket" />)
        for (let index = 0; index < props.hosted.bitbucket.length; index++) {
            const repo = props.hosted.bitbucket[index]
            repos.push(<option key={`bitbucket-${index}`} value={repo.url}>{repo.name}</option>)
        }

        repos.push(<optgroup key="github" label="GitHub" />)
    }

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                const repo = document.getElementById('repo-url').value
                props.onSetRepo(repo)
            }}
        >
            <fieldset className="form-group">
                <label htmlFor="repo-url">Repository</label>
                <select id="repo-url" className="form-control" disabled={props.isFetchingHosted}>{repos}</select>
            </fieldset>
            <button className="btn btn-primary" disabled={props.isFetchingHosted}>Save Changes</button>
        </form>
    )
}

function repoView(props) {
    return (
        <dl>
            <dt>URL</dt>
            <dd><a href={props.repo.url}>{props.repo.url}</a></dd>
            <dt>Last Commit</dt>
            <dd><a href="#">COMMIT GOES HERE</a> COMMIT DATE GOES HERE</dd>
        </dl>
    )
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
    }),
    onSetRepo: React.PropTypes.func 
}

export default Repo