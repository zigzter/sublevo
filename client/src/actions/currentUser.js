import { DESTROY_SESSION, FETCH_CURRENT_USER, SET_CURRENT_USER } from './types';
import { apiAction } from './api';

export const destroySession = () => {
    return apiAction({
        url: '/api/session',
        method: 'DELETE',
        onSuccess: removeCurrentUser,
        onFailure: () => { console.log('Error logging user out') },
        label: DESTROY_SESSION,
    })
}

export const fetchCurrentUser = () => {
    return apiAction({
        url: '/api/currentuser',
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

const removeCurrentUser = () => {
    return {
        type: DESTROY_SESSION,
    }
};
