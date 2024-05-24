import React, { useState, useEffect } from 'react';
import ticketService from '../services/TicketService'; 
import './TicketComponent.css';

const TicketComponent = () => {
    const [tickets, setTickets] = useState([]);
    const [newTicket, setNewTicket] = useState({$description: '' , $serviceConcerne: '', $nomClient: '', $genre:'', $personneAssocie:'', $volumeHoraire:''});
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const fetchedTickets = await ticketService.getTickets();
                setTickets(fetchedTickets);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchTickets();
    }, []);

    const handleCreateTicket = async () => {
        try {
            const createdTicket = await ticketService.createTicket(newTicket);
            setTickets([...tickets, createdTicket]);
            setNewTicket({$description: '' , $serviceConcerne: '', $nomClient: '', $genre:'', $personneAssocie:'', $volumeHoraire:''});
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDeleteTicket = async (id) => {
        try {
            await ticketService.deleteTicket(id);
            setTickets(tickets.filter(ticket => ticket.id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h1>Gestionnaire de Tickets</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {tickets.map(ticket => (
                    <li key={ticket.id}>
                        {ticket.title} - {ticket.description}
                        <button onClick={() => handleDeleteTicket(ticket.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <div id="TicketCreation">
                <h2>Créer un Ticket</h2>
                <input
                    type="text"
                    placeholder="Description"
                    value={newTicket.$description}
                    onChange={(e) => setNewTicket({ ...newTicket, $description: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Service concerné"
                    value={newTicket.$serviceConcerne}
                    onChange={(e) => setNewTicket({ ...newTicket, $serviceConcerne: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Nom du client"
                    value={newTicket.$nomClient}
                    onChange={(e) => setNewTicket({ ...newTicket, nomClient: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Genre"
                    value={newTicket.$genre}
                    onChange={(e) => setNewTicket({ ...newTicket, $genre: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Personne Associée"
                    value={newTicket.$personneAssocie}
                    onChange={(e) => setNewTicket({ ...newTicket, $personneAssocie: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Volume horaire"
                    value={newTicket.$volumeHoraire}
                    onChange={(e) => setNewTicket({ ...newTicket, $volumeHoraire: e.target.value })}
                />
                <button onClick={handleCreateTicket}>Créer</button>

                
            </div>
            <div id="table">
                <table>
                    <thead>
                        <tr>
                            <th>Identifiant ticket</th>
                            <th>description</th>
                            <th>service concerné</th>
                            <th>nom du client</th>
                            <th>Type de problème</th>
                        </tr>
                    </thead>
                    <tbody id="tickets"></tbody>
                </table>
            </div>
            
        </div>
    );
};

export default TicketComponent;
