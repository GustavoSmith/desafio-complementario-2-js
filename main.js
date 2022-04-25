const calculatePrice = (vehicle, model) => {
  let basicPrice = vehicle == 1 ? 500 : 1000;
  formulaPrice = model < 2015 ? 50 * (2015 - model) : 0;
  const finalPrice = basicPrice + formulaPrice;
  alert(`El precio total del seguro es de ${finalPrice} pesos argentinos por mes.`);
};

const userName = prompt("Por favor, ingrese su nombre: ");
const validateInput = false;
alert(`Hola ${userName}, bienvenido al cotizador de bicicletas y monopatines de Seguros Smith.`);
while (!validateInput) {
  const userVehicle = Number(prompt("Si desea cotizar una bicicleta, ingrese 1. Si desea cotizar un monopatín, ingrese 2: "));
  if (userVehicle == 1 || userVehicle == 2) {
    const vehicleModel = Number(prompt("Por favor, ingrese el año en el que usted compró el vehículo: "));
    if (vehicleModel >= 2000 && vehicleModel <= 2022) {
      calculatePrice(userVehicle, vehicleModel);
      validateInput = true;
    } else {
      alert("No aseguramos un vehículo con ese año. Por favor, ingrese un año válido.");
    }
  } else {
    alert("Elija un vehículo válido.");
  }
}