import { useState } from 'react';
import React from 'react';
import './Popup.css'; // Assurez-vous de créer un fichier CSS pour le style du popup

const Popup = ({ ticket, onClose }) => {
    const [editingTicketId, setEditingTicketId] = useState(null);

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
                        {ticket.volHoraire.map((item, index) => (
                            <tr key={index}>
                                <td>{item.nomPersonne}</td>
                                <td>{item.volHoraire}</td>
                                <td>
                                    {editingTicketId === ticket.idTicket ? (
                                        <img style={{ width: '1.3em', margin: '0 5px 0 0' }}
                                            src={`${process.env.PUBLIC_URL}/images/validate.png`}
                                            alt="modify" onClick={() => ("")} />
                                    ) : (
                                        <img
                                            style={{ width: '1.3em', margin: '0 5px 0 0' }}
                                            src={`${process.env.PUBLIC_URL}/images/modify.png`}
                                            alt="modify"
                                            onClick={() => ("")}
                                        />
                                    )}
                                    <img
                                        style={{ width: '1.3em' }}
                                        src={`${process.env.PUBLIC_URL}/images/trash.png`}
                                        alt="remove"
                                        onClick={() => ("")}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Popup;
