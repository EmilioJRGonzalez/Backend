
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
  const cartId = document.getElementById('cartButton').getAttribute('data-cart-id');
  const requestData = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ productId: productId })
  };

  // Realiza una solicitud POST al endpoint del carrito
  fetch(`http://localhost:8080/api/cart/${cartId}/product/${productId}`, requestData)
  .then(async response => {
      const data = await response.json();
      if (response.ok) {
          showMessage('Producto agregado al carrito', true);
      } else {
          console.log(data.message)
          showMessage('Error al agregar el producto al carrito. ' + data.message, false);
      }
  })
  .catch(error => {
      console.log(error)
      showMessage('Error al procesar la solicitud', false);
  });
  return false
}

function logout() {
    const requestData = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
  
    // Realiza una solicitud GET al endpoint de logout
    fetch('http://localhost:8080/auth/logout')
    .then(response => {
        if (response.ok) {
            alert('Sesión cerrada exitosamente');
            if (response.redirected){
                window.location.href = response.url;
            }
        } else {
            alert('Error al cerrar sesión');
        }
    })
    .catch(error => {
        console.log(error);
        alert('Error al procesar la solicitud');
    });
    //return false
  }
