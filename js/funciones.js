$(document).ready(function () {
  for (let index = 0; index < datos.length; index++) {
    let ciudad = datos[index].city;
    $(".form-select").append(`<option value= ${index}>${ciudad}</option>`);
  }

  $(".form-select").click(function (e) {
    let id = $(this, "option:selected value").val();
    if (id < 76) {
      $("#datos").html(
        `<div>Id : ${id}</div>  <div>Región : ${datos[id].admin_name}</div> <div>Ciudad : ${datos[id].city}</div>
        <div>Latitud : ${datos[id].lat}</div> <div>Longitud : ${datos[id].lng}</div>`
      );
      $.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${datos[id].lat}&lon=${datos[id].lng}&lang=sp&units=metric&appid=41ae359ed166c475a385d646a32e668c`,
        function (dato) {
          $.get(
            `https://openweathermap.org/img/wn/${dato.weather[0].icon}@4x.png`,
            function (imagen) {
              $(".picture").html(
                `<img src="https://openweathermap.org/img/wn/${dato.weather[0].icon}@4x.png" class="img-thumbnail"/> `
              );
              console.log(dato.weather[0].icon);
            }
          );
          $(".otros").html(`<div>Cielos : ${PrimeraMayuscula(
            dato.weather[0].description
          )}</div><div>Temperatura actual : ${dato.main.temp} ºC</div>
          <div>Temperatura mín. : ${
            dato.main.temp_min
          } ºC</div> <div>Temperatura max. : ${dato.main.temp_max} ºC</div>
          <div>Sensación térmica : ${
            dato.main.feels_like
          } ºC</div><div>Presión atmosferica : ${
            dato.main.pressure
          } hPa</div>`);
        }
      );
    }
  });

  function PrimeraMayuscula(string) {
    // Retorna el primer caracter del texto convertido en mayúsculas
    let mayuscula = string.charAt(0).toUpperCase() + string.slice(1);
    return mayuscula;
  }
});
