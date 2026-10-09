import { GASTOS_DB } from "../data/gasto.data.js";
import { GastoCombustible } from "../model/gasto.model.js";

var gastoAnual = {
  2020 : 0,
  2019 : 0,
  2018 : 0,
  2017 : 0,
  2016 : 0,
  2015 : 0
};

// Evita errores de coma flotante (p. ej. 0.1 + 0.2) al sumar importes
function redondear(valor) {
  return Math.round(valor * 100) / 100;
}

function almacenarGastos(){
  GASTOS_DB.forEach((gasto) => {
    // localStorage: clave = id, valor = objeto completo en JSON
    localStorage.setItem(gasto.id, JSON.stringify(gasto));

    // Acumula el gasto en el año correspondiente
    const anio = gasto.date.getFullYear();
    gastoAnual[anio] = redondear((gastoAnual[anio] || 0) + gasto.precioViaje);
  });

  // sessionStorage: clave = año, valor = gasto total de ese año
  for (const anio in gastoAnual) {
    sessionStorage.setItem(anio, gastoAnual[anio]);
  }
}

function procesarGasto(jsonNuevoGasto){
  const datos = JSON.parse(jsonNuevoGasto);
  const gasto = new GastoCombustible(
    datos.id,
    datos.vehicleType,
    datos.date,
    datos.kilometers,
    datos.precioViaje
  );

  // Recupera el total del año del gasto, suma el importe y actualiza
  const anio = gasto.date.getFullYear();
  const totalActual = parseFloat(sessionStorage.getItem(anio)) || 0;
  sessionStorage.setItem(anio, redondear(totalActual + gasto.precioViaje));
}

export const GastoService = {
  almacenarGastos,
  procesarGasto
};
