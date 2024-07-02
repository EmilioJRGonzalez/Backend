async function selectUser() {
    const userId = document.getElementById('userSelect').value;
    if (userId) {
        document.getElementById('userForm').style.display = 'block';
        document.getElementById('userId').value = userId;

        const selectedUser = await this.findUser(userId);

        document.getElementById('role').value = selectedUser.role;
        document.getElementById('userEmail').textContent  = `Email: ${selectedUser.email}`;
        document.getElementById('userName').textContent  = `Nombre: ${selectedUser.first_name}`;
    } else {
        document.getElementById('userForm').style.display = 'none';
    }
}

async function findUser(userId) {
    try {
        const response = await fetch(`/api/users/${userId}`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error('Error al buscar los datos del usuario');
        }
        return data.data;
    } catch (error) {
        console.error(error);
        alert('Hubo un error al intentar realizar la compra.');
    }
}

async function updateUser() {
    const userId = document.getElementById('userId').value;
    const newRole = document.getElementById('role').value;

    try {
        const response = await fetch(`/api/users/premium/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ role: newRole })
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        }

        alert(data.message);
        window.location.href = '/view/admin-users';
    } catch (error) {
        alert(`No fue posible actualizar el rol del usuario\n\n ${error}`);
    }
}

async function deleteUser() {
    const userId = document.getElementById('userId').value;

    try {
        const response = await fetch(`/api/users/${userId}`, {
            method: 'DELETE',
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        }

        alert(data.message);
        window.location.href = '/view/admin-users';
    } catch (error) {
        alert(`No fue posible eliminar el usuario\n\n${error}`);
    }
}

