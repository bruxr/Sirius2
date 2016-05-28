import { connect } from 'react-redux';
import { fetchAddons } from '../actions/addons';
import Sftp from '../components/sftp.jsx';

const mapStateToProps = (state) => {
    return {
        isEditing: state.sftp.get('isEditing')
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