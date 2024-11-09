//crear una funcion info SO

const os = require('os');

const infoSO = () => {
    const dataInfo = [
        {name: 'Plataforma', value: os.platform()},
        {name: 'CPUs', value: os.cpus()},
        {name: 'Free Memory', value: os.freemem()},
        {name: 'Hostname', value: os.hostname()},
    ];
    return dataInfo;
}

//Mostrar en app mediante clg las claves y valores del objeto como se pueda y con destructuring


module.exports = {infoSO};