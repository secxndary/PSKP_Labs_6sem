const JsonRPCServer = require('jsonrpc-server-http-nats');

const server = new JsonRPCServer();
const PORT = 5000;



let bin_validator_sum_mul = param => {
    console.log('param:\t', param);
    if (!Array.isArray(param))
        param = Object.values(param);

    if (!Array.isArray(param))
        throw new Error('[ERROR] Not an array.');
    if (param.length < 2)
        throw new Error('[ERROR] Provide at least 2 parameters.');

    for (let i = 0; i < param.length; i++) {
        if (!isFinite(param[i]))
            throw new Error('[ERROR] Parameter should be a number.');
    }
    return param;
};


let bin_validator_div_proc = param => {
    console.log('param:\t', param);
    if (!Array.isArray(param))
        param = Object.values(param);

    if (!Array.isArray(param))
        throw new Error('[ERROR] Not an array.');
    if (param.length != 2)
        throw new Error('[ERROR] Provide 2 parameters.');
    if (!isFinite(param[0]) || !isFinite(param[1]))
        throw new Error('[ERROR] Parameter should be a number.');
    if (param[1] == 0)
        throw new Error('[ERROR] Parameter cannot be equal 0.');

    return param;
};


server.on('sum', bin_validator_sum_mul, (params, channel, res) => {
    let sum = 0;
    for (let i = 0; i < params.length; i++)
        sum += params[i];
    console.log('sum:\t', sum, '\n');
    res(null, sum);
});


server.on('mul', bin_validator_sum_mul, (params, channel, res) => {
    let mul = 1;
    for (let i = 0; i < params.length; i++)
        mul *= params[i];
    console.log('mul:\t', mul, '\n');
    res(null, mul);
});


server.on('div', bin_validator_div_proc, (params, channel, res) => {
    let div = params[0] / params[1];
    console.log('div:\t', div, '\n');
    res(null, div);
});


server.on('proc', bin_validator_div_proc, (params, channel, res) => {
    let proc = (params[0] / params[1]) * 100;
    console.log('proc:\t', proc, '\n');
    res(null, proc);
});



server.listenHttp(
    {
        host: '127.0.0.1',
        port: PORT
    },
    () => console.log(`[OK] Server running at localhost:${PORT}/\n`)
);