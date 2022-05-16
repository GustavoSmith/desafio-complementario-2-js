const coveredVehicles = [];
class Vehicle {
  constructor(name, basicPrice) {
    this.name = name;
    this.basicPrice = basicPrice;
    this.pushToCoveredVehicles();
  }

  pushToCoveredVehicles() {
    coveredVehicles.push(this);
  }
}
class Insurance {
  constructor(vehicle, model = 2000) {
    this.vehicle = vehicle;
    this.model = model;
    this.basicPrice = vehicle.basicPrice;
    this.formulaPrice = 50 * Math.max(0, 2015 - this.model); // Si el modelo es menor a 2015, se aplica un recargo de $50 por cada año
  }

  calculatePrice = () => this.basicPrice + this.formulaPrice;
}

const getPrice = (clientData) => {
  const vehicle = coveredVehicles.find((vehicle) => vehicle.name === clientData.cotizacionVehicle);
  const year = clientData.cotizacionVehicleYear;
  const insurance = new Insurance(vehicle, year);
  const price = insurance.calculatePrice();
  return price;
};

const getClientData = (inputs) => {

  const clientData = {};

  inputs.forEach((input) => {
    clientData[input.id] = input.value;
  });

  const dataType = {
    cotizacionName: 'Nombre:',
    cotizacionMail: 'Correo:',
    cotizacionVehicle: 'Vehículo:',
    cotizacionVehicleYear: 'Año:',
    cotizadorButton: '',
  };
  let msg = '<p>';

  Object.keys(clientData).forEach((input) => {
    msg += `<br>${dataType[input]} ${clientData[input]}`;
  });

  const price = getPrice(clientData);

  msg += `El precio de su seguro es de: $${price} por mes.</p>`;

  localStorage.setItem('precioCotizacion', price);
  localStorage.setItem('informacionCliente', JSON.stringify(clientData));

  return msg;
};

const bike = new Vehicle('bicicleta', 500);
const scooter = new Vehicle('monopatín', 1000);

const cotizadorForm = document.getElementById('cotizadorForm');

cotizadorForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const inputArray = [...cotizadorForm.elements];
  const msg = getClientData(inputArray);
  const cotizacion = document.getElementById('cotizacion');
  cotizacion.innerHTML = msg;
});