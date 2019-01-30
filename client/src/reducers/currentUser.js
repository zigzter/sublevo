import { FETCH_CURRENT_USER, API_START, API_END } from '../actions/types';

export default (state = null, action) => {
    switch (action.type) {
        case FETCH_CURRENT_USER:
            return state;
        case API_START:
            if (action.payload === FETCH_CURRENT_USER) {
                return {
                    ...state,
                    isLoadingData: true,
                }
            }
            break;
        case API_END:
            if (action.payload === FETCH_CURRENT_USER) {
                return {
                    ...state,
                    isLoadingData: false,
                }
            }
            break;
        default:
            return state;
    }
}
