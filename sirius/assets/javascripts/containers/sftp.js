import { connect } from 'react-redux';
import { fetchAddons } from '../actions/addons';
import Sftp from '../components/sftp.jsx';
import { exitEditSftp, saveSftp } from '../actions/sftp'

const mapStateToProps = (state) => {
    const sftp = typeof state.sftp.get('object') !== 'undefined' ? state.sftp.get('object').toJS() : undefined
    return {
        isEditing: state.sftp.get('isEditing'),
        sftp
    }
}

const mapDispatchToProps = (dispatch) => {
    dispatch(fetchAddons());
    return {
        saveSftp: data => {
            dispatch(saveSftp(data))
        },
        exitEditSftp: () => {
            dispatch(exitEditSftp())
        }
    }
}

const SftpContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Sftp)

export default SftpContainer