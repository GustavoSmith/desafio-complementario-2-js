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

const sendEmail = async () => {

  const clientData = JSON.parse(localStorage.getItem('informacionCliente'));
  clientData['cotizacionPrecio'] = Number(localStorage.getItem('precioCotizacion'));
  const EMAILJS_KEY = '7QxeKxJ4CF4UpwsHP';

  const reqData = {
    service_id: 'contact_service',
    template_id: 'contact_form',
    user_id: EMAILJS_KEY,
    template_params: clientData,
  };

  const reqConfig = {
    method: 'POST',
    body: JSON.stringify(reqData),
    headers: {
      'Content-type': 'application/json',
    },
  };

  const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', reqConfig);
  if (response.ok) {
    Swal.fire({
      title: 'Cotización exitosa',
      text: 'Se ha enviado a tu correo electrónico los datos de la cotización.',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    });
  } else {
    Swal.fire({
      title: 'Error en la cotización',
      text: 'Tu cotización no pudo ser procesada. Intentalo nuevamente más tarde.',
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
  }
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
    sendEmail();
  }
  formValidated = false;
});