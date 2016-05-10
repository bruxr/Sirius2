import React from 'react';
import moment from 'moment';
import { humanFileSize } from '../utils';

export default class File extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isUploading: this.props.id.charAt(0) === '?'
        }
    }

    render() {
        var cb = '';
        var name = '';
        var actions = '';
        if (this.state.isUploading) {
            name = <td className="file-name file-uploading">this.props.name</td>;
        } else {
            cb = <input type="checkbox" className="cb" date-file-id={this.props.id} />
            name = <td className="file-name"><a href="#">{this.props.name}</a></td>
            actions = <a href="#" data-file-id={this.props.id}>Delete</a>
        }

        return (
            <tr className="file">
                <td className="cb-col">{cb}</td>
                {name}
                <td>{humanFileSize(this.props.size)}</td>
                <td>{this.props.date.fromNow()}</td>
                <td>{actions}</td>
            </tr>
        )
    }

}

File.propTypes = {
    id: React.PropTypes.string,
    name: React.PropTypes.string,
    size: React.PropTypes.number,
    type: React.PropTypes.string,
    date: React.PropTypes.instanceOf(moment)
};