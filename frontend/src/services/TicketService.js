const TICKET_URL = 'http://localhost:8080/ticket'; 


const getTickets = async () => {
    try {
        const response = await fetch(TICKET_URL);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return await response.json();
    } catch (error) {
        console.error("There was an error fetching the tickets!", error);
        throw error;
    }
};

const createTicket = async (ticket) => {
    try {
        const response = await fetch(TICKET_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ticket),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return await response.json();
    } catch (error) {
        console.error("There was an error creating the ticket!", error);
        throw error;
    }
};

const updateTicket = async (id, updatedTicket) => {
    try {
        const response = await fetch(`${AFFICHER_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedTicket),
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

const deleteTicket = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    } catch (error) {
        console.error("There was an error deleting the ticket!", error);
        throw error;
    }
};

export default {
    getTickets,
    createTicket,
    updateTicket,
    deleteTicket,
};