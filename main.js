const coveredVehicles = [];

// Clases
class Vehicle { // Clase del vehículo
  constructor(name, basicPrice) {
    this.name = name;
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

// Funciones

const getPrice = (clientData) => {
  const vehicle = coveredVehicles.find((vehicle) => vehicle.name === clientData.cotizacionVehicle);
  const year = clientData.cotizacionVehicleYear;
  const insurance = new Insurance(vehicle, year);
  console.log(insurance);
  const price = insurance.calculatePrice();
  console.log(price);
  return price;
};

const getClientData = (inputs) => {

  const clientData = {};

  inputs.forEach((input) => {
    clientData[input.id] = input.value; //Armo el objeto client data
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

  return msg;
};

// Vehículos cubiertos
const bike = new Vehicle('bicicleta', 500);
const scooter = new Vehicle('monopatín', 1000);

const cotizadorForm = document.getElementById('cotizadorForm');

cotizadorForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const inputArray = [...cotizadorForm.elements]; // Obtengo todos los input del formulario
  const msg = getClientData(inputArray);
  const cotizacion = document.getElementById('cotizacion');
  cotizacion.innerHTML = msg;
});