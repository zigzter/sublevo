import { SET_CURRENT_USER } from '../actions/types';

export default (state = null, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...action.payload,
            }
        default:
            return state;
    }
}
