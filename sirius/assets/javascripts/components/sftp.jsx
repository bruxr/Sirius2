import React from 'react'

function Sftp(props) {
    if (typeof props.sftp === 'undefined') {
        return <noscript />
    }

    console.log(props.isEditing)
    return (
        <section className="project-section project-section_sftp">
            <h2>SFTP</h2>
            {props.isEditing ? sftpForm(props) : sftpView(props)}
        </section>
    )
}

function sftpForm(props) {
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

function sftpView(props) {
    return (
        <dl>
            <dt>URL</dt>
            <dd><a href={props.repo.url}>{props.repo.url}</a></dd>
            <dt>Last Commit</dt>
            <dd><a href="#">COMMIT GOES HERE</a> COMMIT DATE GOES HERE</dd>
        </dl>
    )
}

Sftp.propTypes = {
    isEditing: React.PropTypes.bool
}

export default Sftp