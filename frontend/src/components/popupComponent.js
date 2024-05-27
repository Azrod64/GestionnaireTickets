import React from 'react';
import './Popup.css';

const Popup = ({ ticket, personnes, onClose }) => {
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
            </div>
        </div>
    );
};

export default Popup;
