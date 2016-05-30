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
                e.preventDefault()
                const inputs = e.target.querySelectorAll('[data-key]')
                const data = {}
                for (let i = 0; i < inputs.length; i++) {
                    const input = inputs[i]
                    let value = input.value
                    if (input.type === 'number') {
                        value = parseInt(value)
                    }
                    data[input.dataset.key] = value
                }
                props.saveSftp(data)
                props.exitEditSftp()
            }}
        >
            <fieldset className="form-group">
                <label htmlFor="repo-host">Host</label>
                <input type="text" className="form-control" data-key="host" defaultValue={props.sftp.host} />
            </fieldset>
            <fieldset className="form-group">
                <label htmlFor="repo-user">Username</label>
                <input type="text" className="form-control" data-key="user" defaultValue={props.sftp.user} />
            </fieldset>
            <fieldset className="form-group">
                <label htmlFor="repo-password">Password</label>
                <input type="text" className="form-control" data-key="password" defaultValue={props.sftp.password} />
            </fieldset>
            <fieldset className="form-group">
                <label htmlFor="repo-port">Port</label>
                <input type="number" className="form-control" data-key="port" defaultValue={props.sftp.port} />
            </fieldset>
            <fieldset className="form-group">
                <label htmlFor="repo-path">Path</label>
                <input type="text" className="form-control" data-key="path" defaultValue={props.sftp.path} />
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
    }),
    saveSftp: React.PropTypes.func,
    exitEditSftp: React.PropTypes.func
}

export default Sftp