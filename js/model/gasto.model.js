export class GastoCombustible {
  /**
   * @param {number} id
   * @param {string} vehicleType
   * @param {string|Date} date  Cadena (del JSON) o Date; se guarda siempre como Date
   * @param {number} kilometers
   * @param {number} precioViaje
   */
  constructor(id, vehicleType, date, kilometers, precioViaje) {
    this.id = parseInt(id, 10);
    this.vehicleType = String(vehicleType);
    this.date = new Date(date);
    this.kilometers = parseFloat(kilometers);
    this.precioViaje = parseFloat(precioViaje);
  }
}
