import { SET_CURRENT_USER, DESTROY_SESSION } from '../actions/types';

export default (state = null, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...action.payload,
            }
        case DESTROY_SESSION:
            return null;
        default:
            return state;
    }
}
