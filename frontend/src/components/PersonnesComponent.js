import React,  { useState, useEffect } from 'react';
import personnesService from '../services/PersonneService';
import './PersonnesComponent.css';

const PersonnesComponent = () => {
    const [people, setPeople] = useState([]);
    const [menuOpen, setMenuOpen] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        email: '',
        mdp: '',
        nom: '',
        prenom: '',
        role: 'ingenieur' // Valeur par défaut
      });

    //   useEffect(() => {
    //     const fetchPeople = async () => {
    //         try {
    //             const fetchedPeople = await personnesService.getPeople();
    //             setPeople(fetchedPeople);
    //         } catch (err) {
    //             setError(err.message);
    //         }
    //     };

    //     fetchPeople();
    // }, []);

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        const newPerson = {
            email: formData.email,
            nom: formData.nom,
            prenom: formData.prenom,
            role: formData.role
        };
        setPeople([...people, newPerson]);

        setFormData({
            email: '',
            mdp: '',
            nom: '',
            prenom: '',
            role: 'ingenieur'
        });
      };
      const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    return (
        <div>
        <div className={`burger-menu ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
                    <div className="burger-menu-line"> </div>
                    <div className="burger-menu-line"></div>
                    <div className="burger-menu-line"></div>
                    
                </div>

                <h1>Gestionnaire de Personnes</h1>

                <div className={`menu-links ${menuOpen ? 'open' : ''}`}>
                    <a href="/">Gestionnaire de Ticket</a>
                    <a href="/Personnes">Gestionnaire de Personnes</a>
                    
                    
                </div>
       
        <form id="formContainer" onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <label htmlFor="mdp">Mot de passe:</label>
        <input
          type="password"
          id="mdp"
          name="mdp"
          value={formData.mdp}
          onChange={handleChange}
        />

        <label htmlFor="nom">Nom:</label>
        <input
          type="text"
          id="nom"
          name="nom"
          value={formData.nom}
          onChange={handleChange}
        />
        <label htmlFor="prenom">Prénom:</label>
        <input
          type="text"
          id="prenom"
          name="prenom"
          value={formData.prenom}
          onChange={handleChange}
        />

        <label htmlFor="role">Rôle:</label>
        <select id="role" name="role" value={formData.role} onChange={handleChange}>
          <option value="ingenieur">Ingénieur</option>
          <option value="technicien">Technicien</option>
        </select>
      <button id="submit" type="submit">Soumettre</button>

    </form>
      <div id='table'>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Email</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Rôle</th>
            <th id="icons">Actions</th>
          </tr>
        </thead>
        <tbody>
          {people.map((person) => (
            <tr key={person.id_personne}>
              <td>{person.email}</td>
              <td>{person.nom}</td>
              <td>{person.prenom}</td>
              <td>{person.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
    
  );
};

export default PersonnesComponent;
