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
let formValidated = false;

const cotizadorForm = document.getElementById('cotizadorForm');

const validation = new window.JustValidate(cotizadorForm);
validation.addField(
  '#cotizacionName', [
  {
    rule: 'required',
    errorMessage: 'Ingrese un nombre.',
  },
  {
    rule: 'minLength',
    value: 2,
    errorMessage: 'Su nombre debe tener al menos 2 caracteres.',
  },
  {
    rule: 'maxLength',
    value: 30,
    errorMessage: 'Ingrese un nombre más corto.',
  },
  {
    rule: 'customRegexp',
    value: /^[a-z ,.'-]+$/i,
    errorMessage: 'Ingrese un nombre válido.',
  },
]).addField(
  '#cotizacionMail', [
  {
    rule: 'required',
    errorMessage: 'Ingrese un correo electrónico.',
  },
  {
    rule: 'email',
    errorMessage: 'Ingrese un correo válido.',
  },
]).addField(
  '#cotizacionVehicleYear', [
  {
    rule: 'required',
    errorMessage: 'Ingrese un año.',
  },
  {
    rule: 'minNumber',
    value: 1990,
    errorMessage: 'Solo se aceptan vehículos fabricados a partir de 1990.',
  },
  {
    rule: 'maxNumber',
    value: 2022,
    errorMessage: 'Solo se aceptan vehículos fabricados hasta 2022.',
  },
]).onSuccess((e) => {
  e.preventDefault();
  formValidated = true;
});

cotizadorForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (formValidated) {
    const inputArray = [...cotizadorForm.elements];
    const msg = getClientData(inputArray);
    const cotizacion = document.getElementById('cotizacion');
    cotizacion.innerHTML = msg;
  }
  formValidated = false;
});