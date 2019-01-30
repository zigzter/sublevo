import { FETCH_CURRENT_USER, SET_CURRENT_USER } from './types';
import { apiAction } from './api';

const url = '/api/currentuser'

export default () => {
    return apiAction({
        url,
        onSuccess: setCurrentUser,
        onFailure: () => { console.log('Error getting user') },
        label: FETCH_CURRENT_USER,
    });
};

const setCurrentUser = (data) => {
    return {
        type: SET_CURRENT_USER,
        payload: data,
    }
};
