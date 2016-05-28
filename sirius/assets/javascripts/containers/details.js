import { connect } from 'react-redux';
import { editSftp } from '../actions/sftp'
import { fetchAddons } from '../actions/addons';
import { changeRepo } from '../actions/repo';
import Details from '../components/details.jsx';

const mapStateToProps = (state) => {
    return {
        project: state.project.toJS()
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeRepo: () => {
            dispatch(changeRepo())
        },
        onEditSftp() {
            dispatch(editSftp())
        }
    }
}

const DetailsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Details)

export default DetailsContainer