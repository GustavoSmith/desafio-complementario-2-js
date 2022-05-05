const coveredVehicles = [];

class Vehicle { // Clase del vehículo
  constructor(name, id, basicPrice) {
    this.name = name;
    this.id = id;
    this.basicPrice = basicPrice;
    this.pushToCoveredVehicles();
  }

  pushToCoveredVehicles() {
    coveredVehicles.push(this);
  }
}
class Insurance { // Clase que contiene los datos del seguro
  constructor(vehicle, model = 2000) {
    this.vehicle = vehicle;
    this.model = model;
    this.basicPrice = vehicle.basicPrice;
    this.formulaPrice = 50 * Math.max(0, 2015 - this.model); // Si el modelo es menor a 2015, se aplica un recargo de $50 por cada año
  }

  calculatePrice = () => this.basicPrice + this.formulaPrice;
}

// Vehículos cubiertos
const bike = new Vehicle('Bicicleta', 1, 500);
const scooter = new Vehicle('Monopatín', 2, 1000);

const userName = prompt('Por favor, ingrese su nombre: ');

alert(`Hola ${userName || 'Invitado'}, bienvenido al cotizador de bicicletas y monopatines de Seguros Smith.`);
const userVehicle = Number(prompt('Ingrese el ID del vehículo. 1 = Bicicleta, 2 = Monopatín. '));

if (coveredVehicles.some(vehicle => vehicle.id === userVehicle)) {
  const vehicleModel = Number(prompt('Por favor, ingrese el año en el que usted compró el vehículo: '));

  if (2000 <= vehicleModel && vehicleModel <= 2022) {
    const clientInsurance = new Insurance(coveredVehicles.find(vehicle => vehicle.id === userVehicle), vehicleModel);
    alert(`El precio total del seguro es de ${clientInsurance.calculatePrice()} pesos argentinos por mes.`);
  } else {

    alert('No aseguramos un vehículo con ese año. Por favor, ingrese un año válido.');
  }
} else {

  alert('Elija un vehículo válido.');
}