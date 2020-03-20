const app = require ('../src/app');
const debug = require('debug')('balta:server');
const http = require('http');

const port =  normalizePort(process.env.PORT || '3000'); //process.env.PORT é uma função do Microsoft Azure
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
console.log ('API rodando na porta ' + port);

function normalizePort(val){
    const port = parseInt(val, 10);

    if (isNaN(port)){
        return val;
    }

    if (port >= 0){
        return port;
    }

    return false;

}


function onError(error){ //Verifica os erros do servidor
    if(error.syscall !== 'listen'){
        throw error;
    }

    const bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port;

    switch (error.code) {
        case 'EACCES' : //Erro de permissão
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE' : //Erro de endereço em uso
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

    function onListening() { //Usado para debug
        const addr = server.address();
        const bind = typeof addr === 'string'
            ? 'pipe' + addr 
            : 'port' + addr.port;
        debug('Listening on ' + bind);
    }