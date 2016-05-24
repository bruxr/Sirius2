import React from 'react';

const Details = (props) =>
    <section className="project-section project-section_main">
        <div className="project-header">
            <div className="project-header__info">
                <h1 className="project-header__name">{props.project.name}</h1>
                <a href={props.project.url} className="project-url" target="_blank" rel="noopener noreferrer">{props.project.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}</a>
            </div>
            <div className="project-header__actions">
                <button className="btn_primary" disabled>Deploy</button>
                <button disabled>Snapshot</button>
                <select defaultValue="">
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
    project: React.PropTypes.object
}

export default Details