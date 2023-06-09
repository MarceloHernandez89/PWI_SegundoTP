var data = [];
var sortOrder = [];

function addDataToTable() {
  var table = document.getElementById('dataTable');
  var tbody = document.getElementById('dataBody');

  // Limpia la tabla.
  tbody.innerHTML = '';

  // Agrega filas a la tabla.
  for (var i = 0; i < data.length; i++) {
    var row = document.createElement('tr');
    var rowData = data[i];

    row.innerHTML = '<td>' + rowData[0] + '</td>' +
      '<td>' + rowData[1] + '</td>' +
      '<td>' + rowData[2] + '</td>' +
      '<td>' + rowData[3] + '</td>' +
      '<td>' + rowData[4].toFixed(2) + '</td>' +
      '<td>' + rowData[5].toFixed(2) + '</td>' +
      '<td>' + rowData[6].toFixed(2) + '</td>';

    tbody.appendChild(row);
  }
}

// Ordena la tabla según el campo seleccionado.
function sortTable(column) {
  if (sortOrder[column] === 'asc') {
    sortOrder[column] = 'desc';
  } else {
    sortOrder[column] = 'asc';
  }

  data.sort(function(a, b) {
    var sortValue = 0;

    if (column === 0 || column === 1 || column === 2 || column === 3) {
      sortValue = a[column].localeCompare(b[column]);
    } else {
      sortValue = a[column] - b[column];
    }
    return sortOrder[column] === 'asc' ? sortValue : -sortValue;
  });

  addDataToTable();

  updateSortIndicator(column);
}

function updateSortIndicator(column) {
  var headers = document.getElementsByClassName('sortable');

  for (var i = 0; i < headers.length; i++) {
    headers[i].classList.remove('sort-asc');
    headers[i].classList.remove('sort-desc');
  }

  if (sortOrder[column] === 'asc') {
    headers[column].classList.add('sort-asc');
  } else {
    headers[column].classList.add('sort-desc');
  }
}

document.addEventListener('DOMContentLoaded', function() {
  var table = document.getElementById('dataTable');
  var tbody = document.getElementById('dataBody');
  var montoInput = document.getElementById('monto');
  var confirmationMessage = document.getElementById('confirmationMessage');

  document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var nombre = document.getElementById('nombre').value;
    var email = document.getElementById('email').value;
    var telefono = document.getElementById('telefono').value;
    var comentario = document.getElementById('comentario').value;
    var montoARS = parseFloat(montoInput.value);

    // Limpia los campos
    document.getElementById('nombre').value = '';
    document.getElementById('email').value = '';
    document.getElementById('telefono').value = '';
    document.getElementById('comentario').value = '';
    montoInput.value = '';

    // Muestra el mensaje de confirmación
    confirmationMessage.style.display = 'block';
    
    const alertElement = document.getElementById('confirmationMessage');

    // Eliminar la alerta después de 3 segundos
    setTimeout(function() {
      alertElement.remove();
    }, 3000);

    if (nombre === '') {
      alert('Por favor, ingrese un nombre.');
      return false;
    }

    if (email === '') {
      alert('Por favor, ingrese un correo electrónico.');
      return false;
    }

    if (!isValidEmail(email)) {
      alert('Por favor, ingrese un correo electrónico válido. Ejemplo: juan@perez.com');
      return false;
    }

    if (telefono === '') {
      alert('Por favor, ingrese un número de teléfono.');
      return false;
    }

    if (!isValidPhone(telefono)) {
      alert('Por favor, ingrese un número de teléfono válido (10 números). Ejemplo: 1123456789');
      return false;
    }

    if (comentario === '') {
      alert('Por favor, ingrese un comentario.');
      return false;
    }

    if (isNaN(montoARS) || montoARS < 150000) {
      alert('Por favor, ingrese un monto válido mayor o igual a 150000.');
      return false;
    }

    var montoUSD = montoARS / 245; // Conversión a dólares.
    var montoEUR = montoARS / 263.52; // Conversión a euros.

    var rowData = [nombre, email, telefono, comentario, montoARS, montoUSD, montoEUR];
    data.push(rowData);

    addDataToTable();

    return false;
  });
});

function isValidEmail(email) {
  // Validación email.
  var emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
}

function isValidPhone(phone) {
  // Validación teléfono.
  var phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phone);
}
