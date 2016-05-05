import React from 'react';
import File from './file.jsx';
import { fetchFiles, pushFile } from '../actions/files';

export default class Files extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            isFetching: true
        }
        
        this.uploadFiles = this.uploadFiles.bind(this);
    }
    
    // Watches for changes in the state and sends a request for fetching files
    componentDidMount() {
        this.context.store.subscribe(() => {
            let state = this.context.store.getState().files;
            this.setState({
                isFetching: state.isFetching,
                files: state.items
            });
        });
        this.context.store.dispatch(fetchFiles());
    }
    
    render() {
        let filesList = [];
        let totalFiles = 0;
        let totalSize = 0;
        if (this.state.isFetching) {
            filesList.push(<tr key="nf"><td colSpan="5">Please wait...</td></tr>)
        } else {
            totalFiles = this.state.files.length;
            for (let i = 0; i < totalFiles; i++) {
                let file = this.state.files[i];
                filesList.push(<File key={file.id} id={file.id + ''} name={file.name} size={file.size} type={file.type} date={file.date} />);
                totalSize += file.size;
            }
        }
        
        return (
            <div className="project-files">
                <header className="page-header">
                    <h2 className="page-header">Files</h2>
                    <p>Project files, media and other resources are listed below. Click the Upload Files button to upload additional files.</p>
                </header>
                
                <form className="upload-form">
                    <button className="upload-form-button pure-button pure-button-primary">Upload Files</button>
                    <input type="file" className="upload-form-input" onChange={this.uploadFiles} multiple />
                </form>
                
                <table className="pure-table files-table">
                    <thead>
                        <tr>
                            <th className="cb-col"><input type="checkbox" className="cb cb-select-all" /></th>
                            <th>Filename</th>
                            <th>Size</th>
                            <th>Uploaded On</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filesList}
                    </tbody>
                </table>
                
                <p>{totalFiles} files with the total size of  {this._humanifySize(totalSize)}</p>
            </div>
        )
    }
    
    uploadFiles(e) {
        let files = e.target.files;
        for (let i = 0; i < files.length; i++) {
            this.context.store.dispatch(pushFile(files[i]));
        }
    }
    
    // Thanks mpen!
    // stackoverflow.com/a/14919494
    _humanifySize(bytes) {
        let thresh = 1000;
        if (Math.abs(bytes) < thresh) {
            return bytes + ' B';
        }
        let units = ['KB', 'MB', 'GB', 'TB', 'PB']; // challenge accepted: download PB-sized files 
        let u = -1;
        do {
            bytes /= thresh;
            ++u;
        } while(Math.abs(bytes) >= thresh && u < units.length - 1);
        return bytes.toFixed(1) + ' ' + units[u];   
    }
    
}

Files.contextTypes = {
    store: React.PropTypes.object
}