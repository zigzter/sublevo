import { API_START, API_END, API_ERROR, API } from './types';

export const apiStart = (label) => ({
    type: API_START,
    payload: label,
});

export const apiEnd = (label) => ({
    type: API_END,
    payload: label,
});

export const apiError = (label) => ({
    type: API_ERROR,
    payload: label,
});

export const apiAction = ({
    url = '',
    method = 'GET',
    data = null,
    onSuccess = () => { },
    onFailure = () => { },
    label = '',
    headersOverride = null,
}) => {
    return {
        type: API,
        payload: {
            url,
            method,
            data,
            onSuccess,
            onFailure,
            label,
            headersOverride,
        }
    };
}
