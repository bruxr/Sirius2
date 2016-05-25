import { connect } from 'react-redux';
import { fetchAddons } from '../actions/addons';
import Details from '../components/details.jsx';

const mapStateToProps = (state) => {
    return {
        project: state.project.toJS()
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        
    }
}

const DetailsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Details)

export default DetailsContainer