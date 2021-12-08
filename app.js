const archivos = require('./lecturaEscritura');

// let autos = archivos.leerJson("autos"); (linea 7)
// console.table(autos);

let carrera = {
    autos: archivos.leerJson("autos"),
    autosPorTanda: 6,
    autosHabilitados: function () {
        return this.autos.filter((auto) => auto.sancionado === false);
    },
    buscarPorPatente: function (patente) {
        return this.autos.find((auto) => auto.patente === patente);
    },
    filtrarPorCilindrada: function (cilindrada) {
        return this.autosHabilitados().filter((auto) => auto.cilindrada <= cilindrada);
    },
    ordenarPorVelocidad: function() {
        return this.autos.sort((autoA, autoB) => autoA.velocidad - autoB.velocidad);
    },
    habilitarVehiculo: function (patente) {
        let auto = this.buscarPorPatente(patente);
        if (auto) {
            auto.sancionado = false;
            archivos.escribirJson('autos', this.autos);
            return auto;
        }
    },
    generarTanda: function (cilindrada, peso) {
        return this.filtrarPorCilindrada(cilindrada).filter((auto) => auto.peso <= peso).slice(0, 6);
    },
    pesoPromedio: function () {
        let suma = this.generarTanda(3000, 1800).reduce((acumulador, auto) => acumulador + auto.peso, 0);
        return "El peso promedio es: " + (suma / this.generarTanda(3000, 1800).length).toFixed(2);
    },
    listarPodio: function(arrayAutos) {
        arrayAutos.sort((autoA, autoB) => autoB.puntaje - autoA.puntaje);
        console.log(`El ganador es: ${arrayAutos[0].piloto}, con un puntaje de ${arrayAutos[0].puntaje}.
            El segundo puesto es para ${arrayAutos[1].piloto}, con un puntaje de ${arrayAutos[1].puntaje}.
            El tercer puesto es para ${arrayAutos[2].piloto}, con un puntaje de ${arrayAutos[2].puntaje}.`);
    },
};

let tandaPodio = carrera.generarTanda(5000, 3000);
console.table(tandaPodio);
carrera.listarPodio(tandaPodio);


