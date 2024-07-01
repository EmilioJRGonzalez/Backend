async function purchase(cartId) {
    try {
        const response = await fetch(`/api/cart/${cartId}/purchase`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error('Error al realizar la compra');
        }
        alert(data.message)
        window.location.href = `/cart/${cartId}`;
    } catch (error) {
        console.error(error);
        alert('Hubo un error al intentar realizar la compra.');
    }
}