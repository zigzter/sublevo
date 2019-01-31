import { API_START, API_END, API_ERROR } from '../actions/types';

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
        case API_ERROR:
            console.log('api error:', action);
            break;
        default:
            return state;
    }
}
