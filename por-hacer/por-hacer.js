const fs = require('fs');

let listadoPorHacer = [];

// Guardamos en la BBDD que será un JSON
const guardarDB = () => {

    // Convertimos el array a JSON
    let data = JSON.stringify(listadoPorHacer);

    // Escribimos en el achivo JSON que será nuestra BBDD
    fs.writeFile('./db/data.json', data, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
}

// Cargamos la BBDD
const cargarDB = () => {

    try {
        // Si hay algo en el JSOn, lo metemos en el array
        listadoPorHacer = require('../db/data.json');

    }catch (error){
        // Si el JSON está vacío, ponemos el array a 0
        listadoPorHacer = [];
    }
}

// Función para crear una nueva tarea
const crear = (descripcion) => {

    // Cargamos primero la BBDD para no sobreescribir los datos
    cargarDB();


    // Creamos una nueva tarea con la descripción pasada y el estado de completado a falso
    let porHacer = {
        descripcion,
        completado: false
    };

    // Metemos la tarea en el array
    listadoPorHacer.push(porHacer);

    // Actualizamos en la BBDD
    guardarDB();

    return porHacer;
}

// Obtenemos la lista de tareas de la BBDD
const getListado = () =>{

    cargarDB();
    return listadoPorHacer;
}

// Actualizamos en la BBDD
const actualizar = (descripcion, completado = true) => {

    cargarDB();

    //Buscamos dentro del array, la tarea que tiene la descripcion igual a la que estamos buscando
    let index = listadoPorHacer.findIndex(tarea =>  tarea.descripcion === descripcion);

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else{
        return false;
    }
}

const borrarTarea = (descripcion) => {
    cargarDB();

    let index = listadoPorHacer.findIndex( tarea => tarea.descripcion === descripcion);

    if(index >= 0) {
        listadoPorHacer.splice(index, 1);
        guardarDB();
        return true;
    } else {
        return false;
    }
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrarTarea
}
