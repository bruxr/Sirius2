import { connect } from 'react-redux';
import { fetchAddons } from '../actions/addons';
import Repo from '../components/repo.jsx';

const mapStateToProps = (state) => {
    return {
        isEditing: state.repo.get('isEditing'),
        repo: state.repo.get('object')
    }
}

const mapDispatchToProps = (dispatch) => {
    dispatch(fetchAddons());
    return {
        
    }
}

const RepoContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Repo)

export default RepoContainer