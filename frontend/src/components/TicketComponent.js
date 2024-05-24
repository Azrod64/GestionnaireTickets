import React, { useState, useEffect } from 'react';
import ticketService from '../services/TicketService'; 
import './TicketComponent.css';

const TicketComponent = () => {
    const [tickets, setTickets] = useState([]);
    const [newTicket, setNewTicket] = useState({description: '' , genre_problem: '', nom_client: '', service_dedie:'', statut:0});
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
            console.log(newTicket);
            const createdTicket = await ticketService.createTicket(newTicket);
            setTickets([...tickets, createdTicket]);
            setNewTicket({description: '' , genre_problem: '', nom_client: '', service_dedie:'', statut:0});
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDeleteTicket = async (id) => {
        try {
            await ticketService.deleteTicket(id);
            setTickets(tickets.filter(ticket => ticket.idTicket !== id));
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
                    <li key={ticket.idTicket}>
                        {ticket.idTicket} - {ticket.description}-{ticket.serviceDedie} - {ticket.nomClient} - {ticket.genreProblem} - {ticket.statut} - {ticket.volHoraire}
                        <button onClick={() => handleDeleteTicket(ticket.idTicket)}>Delete</button>
                    </li>
                ))}
            </ul>
            <div id="TicketCreation">
                <h2>Créer un Ticket</h2>
                <input
                    type="text"
                    placeholder="Description"
                    value={newTicket.description}
                    onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Service concerné"
                    value={newTicket.service_dedie}
                    onChange={(e) => setNewTicket({ ...newTicket, service_dedie: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Nom du client"
                    value={newTicket.nom_client}
                    onChange={(e) => setNewTicket({ ...newTicket, nom_client: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Genre"
                    value={newTicket.genre_problem}
                    onChange={(e) => setNewTicket({ ...newTicket, genre_problem: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Personne Associée"
                    value={newTicket.$personneAssocie}
                    // onChange={(e) => setNewTicket({ ...newTicket, $personneAssocie: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Volume horaire"
                    value={newTicket.$volumeHoraire}
                   //  onChange={(e) => setNewTicket({ ...newTicket, $volumeHoraire: e.target.value })}
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
