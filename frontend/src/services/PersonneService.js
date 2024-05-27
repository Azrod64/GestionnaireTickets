const BASE_URL = 'http://localhost:8080';

const createUser = async (user, type) => {
    const endpoint = `${BASE_URL}/createUser/${type === 'technician' ? 1 : 0}`;
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
    } catch (error) {
        console.error("There was an error creating the user!", error);
        throw error;
    }
};

const getPersonnes = async () => {
    try {
        const response = await fetch(`${BASE_URL}/personne`);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        console.log(response);
        return await response.json();
    } catch (error) {
        console.error("There was an error fetching the tickets!", error);
        throw error;
    }
};

const deleteUser = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/personne/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
    } catch (error) {
        console.error("There was an error deleting the person!", error);
        throw error;
    }
};

const updateUser = async (id, updatedUser) => {
    try {
        const response = await fetch(`${BASE_URL}/personne/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUser),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return await response.json();
    } catch (error) {
        console.error("There was an error updating the ticket!", error);
        throw error;
    }
};

export default {
    createUser,
    getPersonnes,
    deleteUser,
    updateUser
};
