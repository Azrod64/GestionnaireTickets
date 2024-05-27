import React, { useEffect, useState } from 'react';
import './Popup.css';
import personneService from '../services/PersonneService';

const Popup = ({ ticket, onClose }) => {
    const [personnes, setPersonnes] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPersonnes = async () => {
            try {
                const personnesData = await personneService.getPersonnes();
                setPersonnes(personnesData);
            } catch (err) {
                setError("Erreur lors du chargement des données des personnes: " + err.message);
            }
        };

        fetchPersonnes();
    }, []);

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
                        </tr>
                    </thead>
                    <tbody>
                        {ticket.volHoraire.map((item, index) => {
                            const personne = personnes.find(p => p.idPersonne === item.id.idPersonne);
                            return (
                                <tr key={index}>
                                    <td>{personne ? `${personne.prenom} ${personne.nom}` : 'N/A'}</td>
                                    <td>{item.volHoraire}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        </div>
    );
};

export default Popup;
