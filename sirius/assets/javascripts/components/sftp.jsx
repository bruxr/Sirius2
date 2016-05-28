import React from 'react'

function Sftp(props) {
    if (typeof props.sftp === 'undefined') {
        return <noscript />
    }

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
                <label htmlFor="repo-host">Host</label>
                <input type="text" className="form-control" data-key="host" value={props.sftp.host} />
            </fieldset>
            <fieldset className="form-group">
                <label htmlFor="repo-user">Username</label>
                <input type="text" className="form-control" data-key="user" value={props.sftp.user} />
            </fieldset>
            <fieldset className="form-group">
                <label htmlFor="repo-password">Password</label>
                <input type="text" className="form-control" data-key="password" value={props.sftp.password} />
            </fieldset>
            <fieldset className="form-group">
                <label htmlFor="repo-port">Port</label>
                <input type="number" className="form-control" data-key="port" value={props.sftp.port} />
            </fieldset>
            <fieldset className="form-group">
                <label htmlFor="repo-path">Path</label>
                <input type="text" className="form-control" data-key="path" value={props.sftp.path} />
            </fieldset>
            <button className="btn btn-primary">Save Changes</button>
        </form>
    )
}

function sftpView(props) {
    return (
        <dl>
            <dt>Host</dt>
            <dd>{props.sftp.host}</dd>
            <dt>Username</dt>
            <dd>{props.sftp.user}</dd>
            <dt>Password</dt>
            <dd>{props.sftp.password}</dd>
            <dt>Port</dt>
            <dd>{props.sftp.port}</dd>
            <dt>Path</dt>
            <dd>{props.sftp.path}</dd>
        </dl>
    )
}

Sftp.propTypes = {
    isEditing: React.PropTypes.bool,
    sftp: React.PropTypes.shape({
        host: React.PropTypes.string,
        user: React.PropTypes.string,
        password: React.PropTypes.string,
        port: React.PropTypes.number,
        path: React.PropTypes.string,
    })
}

export default Sftp