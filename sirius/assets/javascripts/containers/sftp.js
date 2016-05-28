import { connect } from 'react-redux';
import { fetchAddons } from '../actions/addons';
import Sftp from '../components/sftp.jsx';

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
        
    }
}

const SftpContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Sftp)

export default SftpContainer