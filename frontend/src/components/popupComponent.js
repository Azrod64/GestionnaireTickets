import React, { useState } from 'react';
import './Popup.css';

const Popup = ({ ticket, personnes, onClose, onUpdate }) => {
    const [editIndex, setEditIndex] = useState(-1);
    const [newPerson, setNewPerson] = useState({ idPersonne: '', volHoraire: '' });

    const handleEdit = (index) => {
        setEditIndex(index);
    };

    const handleSave = (index) => {
        onUpdate(ticket.idTicket, ticket.volHoraire);
        setEditIndex(-1);
    };

    const handleDelete = (index) => {
        ticket.volHoraire.splice(index, 1);
        onUpdate(ticket.idTicket, ticket.volHoraire);
    };

    const handleAddPerson = () => {
        ticket.volHoraire.push({ id: { idPersonne: newPerson.idPersonne }, volHoraire: newPerson.volHoraire });
        onUpdate(ticket.idTicket, ticket.volHoraire);
        setNewPerson({ idPersonne: '', volHoraire: '' }); // Reset new person form
    };

    return (
        <div className="popup">
            <div className="popup-inner">
                <button className="close-btn" onClick={onClose}>X</button>
                <h2>Détails du Ticket {ticket.idTicket}</h2>
                <h3>Personnes Associées:</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Volume horaire</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ticket.volHoraire.map((item, index) => {
                            const personne = personnes.find(p => p.idPersonne === item.id.idPersonne);
                            return (
                                <tr key={index}>
                                    <td>{editIndex !== index ? (personne ? `${personne.prenom} ${personne.nom}` : 'N/A') :
                                        // Dropdown to select person
                                        <select value={item.id.idPersonne} onChange={e => item.id.idPersonne = parseInt(e.target.value)}>
                                            {personnes.map(p => (
                                                <option key={p.idPersonne} value={p.idPersonne}>{p.prenom} {p.nom}</option>
                                            ))}
                                        </select>
                                    }</td>
                                    <td>{editIndex !== index ? item.volHoraire :
                                        <input type="number" value={item.volHoraire} onChange={e => item.volHoraire = parseInt(e.target.value)} />
                                    }</td>
                                    <td>
                                        {editIndex !== index ? (
                                            <>
                                                <button onClick={() => handleEdit(index)}>Edit</button>
                                                <button onClick={() => handleDelete(index)}>Delete</button>
                                            </>
                                        ) : (
                                            <button onClick={() => handleSave(index)}>Save</button>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                        <tr>
                            <td>
                                <select value={newPerson.idPersonne} onChange={e => setNewPerson({...newPerson, idPersonne: parseInt(e.target.value)})}>
                                    <option value="">Select Person</option>
                                    {personnes.map(p => (
                                        <option key={p.idPersonne} value={p.idPersonne}>{p.prenom} {p.nom}</option>
                                    ))}
                                </select>
                            </td>
                            <td>
                                <input type="number" value={newPerson.volHoraire} onChange={e => setNewPerson({...newPerson, volHoraire: parseInt(e.target.value)})} />
                            </td>
                            <td>
                                <button onClick={handleAddPerson}>Add</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Popup;
