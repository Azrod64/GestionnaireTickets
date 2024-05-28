import React, { useState, useEffect } from 'react';
import ticketService from '../services/TicketService';
import personneService from '../services/PersonneService';
import Popup from './popupComponent';
import './TicketComponent.css';

const TicketComponent = () => {
    const [tickets, setTickets] = useState([]);
    const [newTicket, setNewTicket] = useState({ description: '', genreProblem: '', nomClient: '', serviceDedie: '', statut: 0, volHoraire: [] });
    const [additionalInputs, setAdditionalInputs] = useState([{ volHoraire: null, idPersonne: null }]);
    const [menuOpen, setMenuOpen] = useState(false);
    const [error, setError] = useState(null);
    const [editingTicketId, setEditingTicketId] = useState(null);
    const [draftTicket, setDraftTicket] = useState({});
    const [personnes, setPersonnes] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [fetchedTickets, fetchedPersonnes] = await Promise.all([
                    ticketService.getTickets(),
                    personneService.getPersonnes()
                ]);
                setTickets(fetchedTickets);
                setPersonnes(fetchedPersonnes);
            } catch (err) {
                setError("Erreur lors du chargement des données: " + err.message);
            }
        };

        fetchData();
    }, []);
    
    const onUpdate = async (idTicket, volHoraire) => {
        const ticketToUpdate = {
            volHoraire: volHoraire.map(vh => ({
                idPersonne: vh.id.idPersonne,
                volHoraire: vh.volHoraire
            }))
        };
    
        try {
            const response = await ticketService.updateTicket(idTicket, ticketToUpdate);
            console.log("Ticket mis à jour avec succès:", response);
            // Mettre à jour l'état local si nécessaire, par exemple, rafraîchir la liste des tickets
        } catch (error) {
            console.error("Erreur lors de la mise à jour du ticket:", error);
        }
    };

    const handleCreateTicket = async (e) => {
        e.preventDefault();
        try {
            const ticketToCreate = {
                ...newTicket,
                volHoraire: additionalInputs
            };
            const updatedTicket = await ticketService.createTicket(ticketToCreate);
            const fetchedPersonnes = await personneService.getPersonnes(); 
            setTickets(prevTickets => Array.isArray(prevTickets) ? prevTickets.concat(updatedTicket) : [updatedTicket]);
            setPersonnes(fetchedPersonnes); 
            setNewTicket({ description: '', genreProblem: '', nomClient: '', serviceDedie: '', statut: 0, volHoraire: [] });
            setAdditionalInputs([{ volHoraire: null, idPersonne: null }]);
        } catch (err) {
            setError(err.message);
        }        
    };

    const handleAddInputs = () => {
        setAdditionalInputs([...additionalInputs, { volHoraire: null, idPersonne: null }]);
    };

    const handleAdditionalInputChange = (e, index, key) => {
        const newInputs = [...additionalInputs];
        newInputs[index][key] = e.target.value;
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
        setDraftTicket({ ...ticket });
    };

    const saveChanges = async (id) => {
        try {
            await ticketService.updateTicket(id, draftTicket);
            setTickets(tickets.map(ticket => ticket.idTicket === id ? { ...ticket, ...draftTicket } : ticket));
            setEditingTicketId(null);
        } catch (error) {
            console.error("There was an error updating the ticket!", error);
        }
    };

    const openPopup = (e, ticket) => {
        if (e.target.tagName === 'IMG' || e.target.tagName === 'BUTTON' || editingTicketId !== null) {
            return; 
        }
        setSelectedTicket(ticket);
    };

    const handleClosePopup = () => {
        setSelectedTicket(null);
    };

    return (
        <div>
            <div className={`burger-menu ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
                <div className="burger-menu-line"></div>
                <div className="burger-menu-line"></div>
                <div className="burger-menu-line"></div>
            </div>

            <h1>Gestionnaire de Tickets</h1>

            <div className={`menu-links ${menuOpen ? 'open' : ''}`}>
                <a href='/'>Gestionnaire de Ticket</a>
                <a href="/Personnes">Gestionnaire de Personnes</a>
            </div>

            <form id="TicketCreation" onSubmit={handleCreateTicket}>
                <h2>Créer un Ticket</h2>
                <label htmlFor="description">Description:</label>
                <input
                    type="text"
                    id="description"
                    placeholder="Description"
                    value={newTicket.description}
                    onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                    required
                />
                <label htmlFor="serviceDedie">Service concerné:</label>
                <input
                    type="text"
                    id="serviceDedie"
                    placeholder="Service concerné"
                    value={newTicket.serviceDedie}
                    onChange={(e) => setNewTicket({ ...newTicket, serviceDedie: e.target.value })}
                    required
                />
                <label htmlFor="nomClient">Nom du client:</label>
                <input
                    type="text"
                    id="nomClient"
                    placeholder="Nom du client"
                    value={newTicket.nomClient}
                    onChange={(e) => setNewTicket({ ...newTicket, nomClient: e.target.value })}
                    required
                />
                <label htmlFor="genreProblem">Genre:</label>
                <select
                    id="genreProblem"
                    placeholder="Genre"
                    value={newTicket.genreProblem}
                    onChange={(e) => setNewTicket({ ...newTicket, genreProblem: e.target.value })}
                    required
                >
                    <option value="">Select your option</option>
                    <option value="Hardware">Hardware</option>
                    <option value="Software">Software</option>
                </select>
                {additionalInputs.map((input, index) => (
                    <div id="AddedInputs" key={index}>
                        <label htmlFor={`idPersonne${index}`}>Personne Associée:</label>
                        <select
                            id={`idPersonne${index}`}
                            onChange={(e) => handleAdditionalInputChange(e, index, 'idPersonne')}
                            required
                        >
                            <option value="">Select your option</option>
                            {personnes.map(personne => (
                                <option key={personne.idPersonne} value={personne.idPersonne}>
                                    {personne.prenom} {personne.nom}
                                </option>
                            ))}
                        </select>
                        <label htmlFor={`volHoraire${index}`}>Volume horaire:</label>
                        <input
                            type="text"
                            id={`volHoraire${index}`}
                            placeholder="Volume horaire"
                            value={input.volHoraire}
                            onChange={(e) => handleAdditionalInputChange(e, index, 'volHoraire')}
                            required
                        />
                        <button id="remove" type="button" onClick={() => handleRemoveInput(index)}>-</button>
                    </div>
                ))}
                <button type="button" id="add" onClick={handleAddInputs}> + </button>
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
                            <th id="icons">Statut</th>
                        </tr>
                    </thead>
                    <tbody id="tickets">
                        {tickets.map((ticket) => (
                            <tr key={ticket.idTicket} onClick={(e) => openPopup(e, ticket)}>
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
                                        <img style={{ width: '1.3em', margin: '0 5px 0 0' }}
                                            src={`${process.env.PUBLIC_URL}/images/validate.png`}
                                            alt="modify" onClick={() => saveChanges(ticket.idTicket)} />
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
            {selectedTicket && (
            <Popup key={selectedTicket.idTicket} ticket={selectedTicket} personnes={personnes} onClose={handleClosePopup} onUpdate={onUpdate}/>
        )}

        </div>
    );
};

export default TicketComponent;