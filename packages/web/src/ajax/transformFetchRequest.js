const transform = (opts) => {
    if (opts.headers && opts.headers['Content-Type']) {
        const ct = opts.headers['Content-Type'];
        if (ct.indexOf('application/json') > -1) {
            opts.body = JSON.stringify(opts.body);
        }
    }

    return opts;
};

export default transform;
