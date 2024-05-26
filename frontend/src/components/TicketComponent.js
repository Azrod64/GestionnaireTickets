    import React, { useState, useEffect } from 'react';
    import ticketService from '../services/TicketService';
    import './TicketComponent.css';
    import { useNavigate } from "react-router-dom";

    const TicketComponent = () => {
        const [tickets, setTickets] = useState([]);
        const [newTicket, setNewTicket] = useState({ description: '', genreProblem: '', nomClient: '', serviceDedie: '', statut: 0, volHoraire:[]});
        const [additionalInputs, setAdditionalInputs] = useState([{ volHoraire: '', idPersonne: '' }]);
        const [menuOpen, setMenuOpen] = useState(false);
        const [error, setError] = useState(null);
        const [editingTicketId, setEditingTicketId] = useState(null);
        const [draftTicket, setDraftTicket] = useState({});

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

        const handleCreateTicket = async (e) => {
            e.preventDefault();
            try {
                const ticketToCreate = {
                    ...newTicket,
                    volHoraire: additionalInputs
                };
                const updatedTicket = await ticketService.createTicket(ticketToCreate);
                setTickets(prevTickets => Array.isArray(prevTickets) ? prevTickets.concat(updatedTicket) : [updatedTicket]);
                setNewTicket({ description: '', genreProblem: '', nomClient: '', serviceDedie: '', statut: 0, volHoraire:[]});
                setAdditionalInputs([{ volHoraire: '', idPersonne: '' }]);
            } catch (err) {
                setError(err.message); 
            }
        };

        const handleAddInputs  =() =>{
            setAdditionalInputs([...additionalInputs, { volHoraire: '', idPersonne: '' }]);
        }

        const handleAdditionalInputChange = (e, index, key) => {
            const newInputs = [...additionalInputs];
            const value = e.target.value;
            newInputs[index][key] = (key === 'volHoraire' || key === 'idPersonne') ? parseInt(value, 10) : value;
            setAdditionalInputs(newInputs);
        };
        
        const handleRemoveInput = (index) => {
            const newInputs = [...additionalInputs];
            newInputs.splice(index, 1);
            setAdditionalInputs(newInputs);
        };

        const handleDeleteTicket = async (id) => {
            try {
                await ticketService.deleteTicket(id);
                setTickets(tickets.filter(ticket => ticket.idTicket !== id));
            } catch (err) {
                setError(err.message);
            }
        };

        const toggleMenu = () => {
            setMenuOpen(!menuOpen);
        };

        const editTicket = (id) => {
            setEditingTicketId(id);
            const ticket = tickets.find(t => t.idTicket === id);
            setDraftTicket({...ticket});
        };
        
        const saveChanges = async (id) => {
            try {
                await ticketService.updateTicket(id, draftTicket);
                console.log(draftTicket);
                setTickets(tickets.map(ticket => ticket.idTicket === id ? {...ticket, ...draftTicket} : ticket));
                setEditingTicketId(null); 
            } catch (error) {
                console.error("There was an error updating the ticket!", error);
            }
        };
        

        return (
            <div>
                <div className={`burger-menu ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
                    <div className="burger-menu-line"> </div>
                    <div className="burger-menu-line"></div>
                    <div className="burger-menu-line"></div>
                    
                </div>

                <h1>Gestionnaire de Tickets</h1>

                <div className={`menu-links ${menuOpen ? 'open' : ''}`}>
                    <a>Gestionnaire de Ticket</a>
                    <a href="/Personnes">Gestionnaire de Personnes</a>
                    
                    
                </div>

                <form id="TicketCreation" onSubmit={handleCreateTicket}>
                    <h2>Créer un Ticket</h2>
                    <input
                        type="text"
                        placeholder="Description"
                        value={newTicket.description}
                        onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                        required="required"
                    />
                    <input
                        type="text"
                        placeholder="Service concerné"
                        value={newTicket.serviceDedie}
                        onChange={(e) => setNewTicket({ ...newTicket, serviceDedie: e.target.value })}
                        required="required"
                    />
                    <input
                        type="text"
                        placeholder="Nom du client"
                        value={newTicket.nomClient}
                        onChange={(e) => setNewTicket({ ...newTicket, nomClient: e.target.value })}
                        required="required"
                    />
                    <input
                        type="text"
                        placeholder="Genre"
                        value={newTicket.genreProblem}
                        onChange={(e) => setNewTicket({ ...newTicket, genreProblem: e.target.value })}
                        required="required"
                    />
                    {additionalInputs.map((input, index) => (
        <div id ="AddedInputs" key={index}>
            <input
                type="text"
                placeholder="Personne Associée"
                value={input.idPersonne}
                onChange={(e) => handleAdditionalInputChange(e, index, 'idPersonne')}
                required="required"
            />
            <input
                type="text"
                placeholder="Volume horaire"
                value={input.volHoraire}
                onChange={(e) => handleAdditionalInputChange(e, index, 'volHoraire')}
                required="required"
            />
            <button id="remove" type="button" onClick={() => handleRemoveInput(index)}>-</button>
        </div>
    ))}
                    <button type="button" id="add"  onClick={handleAddInputs}> + </button>
                    <button type="submit" id="submit">Créer</button>
                </form>

                <div id="table">
                    <table>
                        <thead>
                            <tr>
                                <th>Identifiant ticket</th>
                                <th>Description</th>
                                <th>Service concerné</th>
                                <th>Nom du client</th>
                                <th>Type de problème</th>
                                <th id="icons">Actions</th>
                            </tr>
                        </thead>
                        <tbody id="tickets">
    {tickets.map((ticket) => (
        <tr key={ticket.idTicket}>
            <td>{ticket.idTicket}</td>
            <td>
                {editingTicketId === ticket.idTicket ? (
                    <input
                        type="text"
                        value={draftTicket.description}
                        onChange={(e) => setDraftTicket({ ...draftTicket, description: e.target.value })}
                    />
                ) : (
                    ticket.description
                )}
            </td>
            <td>
                {editingTicketId === ticket.idTicket ? (
                    <input
                        type="text"
                        value={draftTicket.serviceDedie}
                        onChange={(e) => setDraftTicket({ ...draftTicket, serviceDedie: e.target.value })}
                    />
                ) : (
                    ticket.serviceDedie
                )}
            </td>
            <td>
                {editingTicketId === ticket.idTicket ? (
                    <input
                        type="text"
                        value={draftTicket.nomClient}
                        onChange={(e) => setDraftTicket({ ...draftTicket, nomClient: e.target.value })}
                    />
                ) : (
                    ticket.nomClient
                )}
            </td>
            <td>
                {editingTicketId === ticket.idTicket ? (
                    <input
                        type="text"
                        value={draftTicket.genreProblem}
                        onChange={(e) => setDraftTicket({ ...draftTicket, genreProblem: e.target.value })}
                    />
                ) : (
                    ticket.genreProblem
                )}
            </td>
            <td>
                {editingTicketId === ticket.idTicket ? (
                    <select
                        value={draftTicket.statut}
                        onChange={(e) => setDraftTicket({ ...draftTicket, statut: e.target.value })}
                    >
                        <option value={0}>Ouvert</option>
                        <option value={1}>Fermé</option>
                    </select>
                ) : (
                    ticket.statut === 0 ? "Ouvert" : "Fermé"
                )}
            </td>
            <td>
                {editingTicketId === ticket.idTicket ? (
                    <button onClick={() => saveChanges(ticket.idTicket)}>Save</button>
                ) : (
                    <img
                        style={{ width: '1.3em', margin: '0 5px 0 0' }}
                        src={`${process.env.PUBLIC_URL}/images/modify.png`}
                        alt="modify"
                        onClick={() => editTicket(ticket.idTicket)}
                    />
                )}
                <img
                    style={{ width: '1.3em' }}
                    src={`${process.env.PUBLIC_URL}/images/trash.png`}
                    alt="remove"
                    onClick={() => handleDeleteTicket(ticket.idTicket)}
                />
            </td>
        </tr>
    ))}
</tbody>

                    </table>
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        );
    };

    export default TicketComponent;
