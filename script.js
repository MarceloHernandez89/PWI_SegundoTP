var data = [];
var sortOrder = [];

function addDataToTable() {
  var table = document.getElementById('dataTable');
  var tbody = document.getElementById('dataBody');

  // Clear the table body
  tbody.innerHTML = '';

  // Add data rows to the table
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

    // Limpiar los campos
    document.getElementById('nombre').value = '';
    document.getElementById('email').value = '';
    document.getElementById('telefono').value = '';
    document.getElementById('comentario').value = '';
    montoInput.value = '';

    // Mostrar el mensaje de confirmación
    confirmationMessage.style.display = 'block';
      // Obtener la referencia del elemento de alerta
    const alertElement = document.getElementById('confirmationMessage');

    // Ocultar o eliminar la alerta después de 3 segundos (3000 milisegundos)
    setTimeout(function() {
      alertElement.remove(); // Eliminar la alerta
    // Opcionalmente, puedes ocultar la alerta en lugar de eliminarla
    // alertElement.style.display = 'none';
    }, 3000);

    if (montoARS < 100) {
      // Si el monto es menor a 100, no se agrega a la tabla
      return false;
    }

    var montoUSD = montoARS / 100; // Conversión simple a dólares (1 USD = 100 ARS)
    var montoEUR = montoUSD * 0.92; // Conversión aproximada a euros (1 EUR ≈ 0.92 USD)

    var rowData = [nombre, email, telefono, comentario, montoARS, montoUSD, montoEUR];
    data.push(rowData);

    addDataToTable();

    return false;
  });
});
