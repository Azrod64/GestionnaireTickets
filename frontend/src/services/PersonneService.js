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
        return await response.json();  // Assuming the server returns the created user object
    } catch (error) {
        console.error("There was an error creating the user!", error);
        throw error;
    }
};

export default {
    createUser
};
