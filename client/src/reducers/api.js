import { API_START, API_END } from '../actions/types';

export default (state = { isLoadingData: false }, action) => {
    switch (action.type) {
        case API_START:
            return {
                isLoadingData: true,
            }
        case API_END:
            return {
                isLoadingData: false,
            }
        default:
            return state;
    }
}
