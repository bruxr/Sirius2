import _ from 'underscore'
import React from 'react'
import moment from 'moment'

const Repo = (props) => {
    if (_.isUndefined(props.repo)) {
        return <noscript />
    }

    if (props.isEditing) {
        return (
            <section className="project-section project-section_repo">
                <h2>Repository</h2>
                <form>
                    <fieldset>
                        <label htmlFor="repo-url">Repository</label>
                        <select disabled>
                            <option>Fetching list...</option>
                        </select>
                    </fieldset>
                    <button>Save Changes</button>
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
    repo: React.PropTypes.shape({
        url: React.PropTypes.string,
        isDeploying: React.PropTypes.bool,
        lastCommit: React.PropTypes.string,
        lastCommitDate: React.PropTypes.instanceOf(moment)
    })
}

export default Repo