const argv = require('./config/yargs').argv;
const colors = require('colors');


const porHacer = require('./por-hacer/por-hacer');
let comando = argv._[0];

switch ( comando ) {
    case 'crear':
        let tarea = porHacer.crear(argv.descripcion);
        console.log(tarea);
        break;
    case 'listar':
        let listado = porHacer.getListado();
        for (let tarea of listado) {
            console.log('======Por hacer========'.green);
            console.log(tarea.descripcion.red);
            console.log('Estado: ', tarea.completado.toString().rainbow);
            console.log('========================='.green);
        }
        break;
    case 'actualizar':
        let actualizado = porHacer.actualizar(argv.descripcion, argv.completado);
        console.log(actualizado);
        break;
    case 'borrar':
        let borrado = porHacer.borrarTarea(argv.descripcion);

        if(borrado){
            console.log('La tarea ha sido borrada con éxito'.green);

        }else {
            console.log('La tarea no se pudo borrar'.red);

        }
        break;
    default:
        console.log('Comando no reconocido');
}
