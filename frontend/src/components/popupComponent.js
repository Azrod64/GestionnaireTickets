import React, { useState } from 'react';
import './Popup.css';

const Popup = ({ ticket, personnes, onClose, onUpdate }) => {
    const [editIndex, setEditIndex] = useState(-1);
    const [newPerson, setNewPerson] = useState({ idPersonne: '', volHoraire: '' });
    const [errorMessage, setErrorMessage] = useState('');
    console.log(personnes);
    console.log(ticket);

    
    const handleEdit = (index) => {
        setEditIndex(index);
    };

    const handleSave = (index) => {
        onUpdate(ticket.idTicket, ticket.volHoraire);
        setEditIndex(-1);
    };

    const handleDelete = (index) => {
        const newVolHoraire = [...ticket.volHoraire];
        newVolHoraire.splice(index, 1);
        onUpdate(ticket.idTicket, newVolHoraire);
    };
    
    const handleAddPerson = () => {
        if (!newPerson.idPersonne || newPerson.volHoraire === '' || isNaN(newPerson.volHoraire)) {
            setErrorMessage('Please fill all fields correctly.');
            return;
        }
        const newVolHoraire = [
            ...ticket.volHoraire,
            { id: { idPersonne: newPerson.idPersonne }, volHoraire: parseFloat(newPerson.volHoraire) }
        ];
        onUpdate(ticket.idTicket, newVolHoraire);
        setNewPerson({ idPersonne: '', volHoraire: '' });
        setErrorMessage('');
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
                                        
                                        <select value={item.id.idPersonne} onChange={e => item.id.idPersonne = parseInt(e.target.value)} required> 
                                            {personnes.map(p => (
                                                <option key={p.idPersonne} value={p.idPersonne}>{p.prenom} {p.nom}</option>
                                            ))}
                                        </select>
                                    }</td>
                                    <td>{editIndex !== index ? item.volHoraire :
                                        <input
                                            type="number"
                                            value={item.volHoraire}
                                            onChange={e => {
                                                const updatedVolHoraire = [...ticket.volHoraire];
                                                updatedVolHoraire[index].volHoraire = parseFloat(e.target.value);
                                                onUpdate(ticket.idTicket, updatedVolHoraire);
                                            }}
                                        />
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
                                <input type="text" value={newPerson.volHoraire} onChange={e => setNewPerson({...newPerson, volHoraire: parseInt(e.target.value)})} />
                            </td>
                            <td>
                                <button onClick={handleAddPerson}>Add</button>
                            </td>
                        </tr>
                        {errorMessage && <tr><td colSpan="3" style={{ color: 'red' }}>{errorMessage}</td></tr>}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Popup;
