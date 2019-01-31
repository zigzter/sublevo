import axios from 'axios';
import { API } from '../actions/types';
import { apiError, apiStart, apiEnd } from "../actions/api";

export default ({ dispatch }) => (next) => (action) => {
    if (action.type !== API) return next(action);
    const {
        url,
        method,
        data,
        onSuccess,
        onFailure,
        label,
        headers,
    } = action.payload;
    const dataOrParams = ["GET", "DELETE"].includes(method) ? "params" : "data";
    axios.defaults.headers.common["Content-Type"] = "application/json";
    if (label) dispatch(apiStart(label));
    axios
        .request({
            url,
            method,
            headers,
            [dataOrParams]: data,
        })
        .then(({ data }) => dispatch(onSuccess(data)))
        .catch((error) => {
            dispatch(apiError(error));
            onFailure(error);
        })
        .finally(() => {
            if (label) dispatch(apiEnd(label));
        });
};
