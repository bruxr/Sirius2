import React from 'react';

const Details = (props) =>
    <section className="project-section project-section_main">
        <div className="project-header row">
            <div className="col-md-6">
                <h1 className="project-header__name">{props.project.name}</h1>
                <a href={props.project.url} className="project-url" target="_blank" rel="noopener noreferrer">{props.project.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}</a>
            </div>
            <div className="project-actions col-md-6">
                <button className="btn btn-primary" disabled>Deploy</button>
                <button className="btn btn-secondary" disabled>Snapshot</button>
                <select
                    className="form-input"
                    defaultValue=""
                    onChange={(e) => {
                        switch (e.target.value) {
                            case 'repo':
                                props.changeRepo()
                                break
                        }
                        e.target.value = ''
                    }}
                >
                    <option value="">Actions...</option>
                    <option value="sftp">SFTP Details</option>
                    <option value="repo">Repository Details</option>
                    <option value="archive">Archive Project</option>
                </select>
            </div>
        </div>
        <div className="project-desc">
            {props.desc}
        </div>
        <div className="project-meta">
            <small className="text-muted">
                Last updated {props.project.updatedAt.fromNow()} &middot; 
                Created {props.project.createdAt.fromNow()}
            </small>
        </div>
    </section>

Details.propTypes = {
    project: React.PropTypes.object,
    changeRepo: React.PropTypes.func
}

export default Details