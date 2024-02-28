
// Función para mostrar un mensaje al usuario
function showMessage(message, isSuccess) {
  const messageContainer = document.getElementById('messageContainer');

  messageContainer.innerHTML = '';

  // Crea un elemento div para el mensaje
  const messageElement = document.createElement('div');
  messageElement.classList.add('alert', isSuccess ? 'alert-success' : 'alert-danger');
  messageElement.textContent = message;

  messageContainer.appendChild(messageElement);

  // Desvanece el mensaje después de 5 segundos
  setTimeout(() => {
      messageContainer.innerHTML = '';
  }, 5000);
}

// Función para enviar una solicitud POST al servidor
function addToCart(productId) {
  const requestData = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ productId: productId })
  };

  // Realiza una solicitud POST al endpoint del carrito (con el carrito harcodeado por ahora)
  fetch(`http://localhost:8080/api/cart/65deb56353dd8cc47f64744b/product/${productId}`, requestData)
  .then(response => {
      if (response.ok) {
          showMessage('Producto agregado al carrito', true);
      } else {
          showMessage('Error al agregar el producto al carrito', false);
      }
  })
  .catch(error => {
      showMessage('Error al procesar la solicitud', false);
  });
  return false
}
