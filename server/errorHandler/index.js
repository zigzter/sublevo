const asyncErrorHandler = (fn) => {
    return (req, res, next) => {
        console.log(fn);
        fn(req, res, next).catch(next);
    };
};

const asyncCatch = (controller) => {
    for (let [key, val] of Object.entries(controller)) {
        if (typeof val === 'function') {
            controller[key] = asyncErrorHandler(val);
        }
    }
};

module.exports = asyncCatch;
