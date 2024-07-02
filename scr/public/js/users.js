async function selectUser() {
    const userId = document.getElementById('userSelect').value;
    if (userId) {
        document.getElementById('userForm').style.display = 'block';
        document.getElementById('userId').value = userId;

        // Obtener los detalles del usuario seleccionado (simulación)
        /* const selectedUser = users.find(user => user._id === userId);
        document.getElementById('role').value = selectedUser.role; */
    } else {
        document.getElementById('userForm').style.display = 'none';
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

