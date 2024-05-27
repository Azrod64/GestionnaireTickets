import React, { useState, useEffect } from 'react';
import personnesService from '../services/PersonneService';
import './PersonnesComponent.css';

const PersonnesComponent = () => {
    const [people, setPeople] = useState([]);
    const [menuOpen, setMenuOpen] = useState(false);
    const [error, setError] = useState(null);
    const [editingPersonId, setEditingPersonId] = useState(null);
    const [draftPerson, setDraftPerson] = useState({});
    const [formData, setFormData] = useState({
        email: '',
        mdp: '',
        nom: '',
        prenom: '',
        role: 'ingenieur',
        qualifications: '',
        nbProjet: '',
        competences: ''
    });

    useEffect(() => {
        const fetchPeople = async () => {
            try {
                const fetchedPeople = await personnesService.getPersonnes();
                setPeople(fetchedPeople);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchPeople();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      let newPerson = {
          email: formData.email,
          nom: formData.nom,
          prenom: formData.prenom,
          role: formData.role, 
          qualifications: formData.qualifications,
          nbProjet: formData.nbProjet,
          competences: formData.competences,
          mdp: formData.mdp
      };
  
      if (formData.role === 'ingenieur') {
          newPerson = {
              ...newPerson,
              qualifications: formData.qualifications,
              nbProjet: formData.nbProjet
          };
      } else if (formData.role === 'technicien') {
          newPerson = {
              ...newPerson,
              competences: formData.competences
          };
      }
  
      const trueRole = formData.role;
      const { role, ...personToSend } = newPerson;
  
      try {
          const createdPerson = await personnesService.createUser(personToSend, trueRole);
          setPeople([...people, createdPerson]);
          setFormData({
              email: '',
              mdp: '',
              nom: '',
              prenom: '',
              role: 'ingenieur',
              qualifications: '',
              nbProjet: '',
              competences: ''
          });
      } catch (err) {
          setError(err.message);
      }
  };
  

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const editPerson = (personId) => {
    };

    const saveChanges = async (personId) => {
    };

    const handleDeletePerson = async (personId) => {
      try {
        await personnesService.deleteUser(personId);
        setPeople(people.filter(personne => personne.idPersonne !== personId));
      } catch (err) {
          setError(err.message);
      }
    };

    const handleDraftChange = (e) => {
        const { name, value } = e.target;
        setDraftPerson({
            ...draftPerson,
            [name]: value
        });
    };

    return (
        <div>
            <div className={`burger-menu ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
                <div className="burger-menu-line"></div>
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

                {formData.role === 'ingenieur' && (
                    <>
                        <label htmlFor="qualifications">Qualifications:</label>
                        <input
                            type="text"
                            id="qualifications"
                            name="qualifications"
                            value={formData.qualifications}
                            onChange={handleChange}
                        />
                        <label htmlFor="nbProjet">Nombre de nbProjet à réaliser:</label>
                        <input
                            type="number"
                            id="nbProjet"
                            name="nbProjet"
                            value={formData.nbProjet}
                            onChange={handleChange}
                        />
                    </>
                )}

                {formData.role === 'technicien' && (
                    <>
                        <label htmlFor="competences">Compétences:</label>
                        <input
                            type="text"
                            id="competences"
                            name="competences"
                            value={formData.competences}
                            onChange={handleChange}
                        />
                    </>
                )}

                <button id="submit" type="submit">Soumettre</button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div id='table'>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Email</th>
                            <th>Nom</th>
                            <th>Prénom</th>
                            <th id="icons">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {people.map((people) => (
                            <tr key={people.idPersonne}>
                                <td>{people.idPersonne}</td>
                                <td>{editingPersonId === people.idPersonne ? (
                                    <input
                                        type="email"
                                        name="email"
                                        value={draftPerson.email}
                                        onChange={handleDraftChange}
                                    />
                                ) : (
                                    people.email
                                )}</td>
                                <td>{editingPersonId === people.idPersonne ? (
                                    <input
                                        type="text"
                                        name="nom"
                                        value={draftPerson.nom}
                                        onChange={handleDraftChange}
                                    />
                                ) : (
                                    people.nom
                                )}</td>
                                <td>{editingPersonId === people.idPersonne ? (
                                    <input
                                        type="text"
                                        name="prenom"
                                        value={draftPerson.prenom}
                                        onChange={handleDraftChange}
                                    />
                                ) : (
                                    people.prenom
                                )}</td>
                                
                                <td>
                                    {editingPersonId === people.idPersonne ? (
                                        <img
                                            style={{ width: '1.3em', margin: '0 5px 0 0' }}
                                            src={`${process.env.PUBLIC_URL}/images/validate.png`}
                                            alt="modify"
                                            onClick={() => saveChanges(people.idPersonne)}
                                        />
                                    ) : (
                                        <img
                                            style={{ width: '1.3em', margin: '0 5px 0 0' }}
                                            src={`${process.env.PUBLIC_URL}/images/modify.png`}
                                            alt="modify"
                                            onClick={() => editPerson(people.idPersonne)}
                                        />
                                    )}
                                    <img
                                        style={{ width: '1.3em' }}
                                        src={`${process.env.PUBLIC_URL}/images/trash.png`}
                                        alt="remove"
                                        onClick={() => handleDeletePerson(people.idPersonne)}
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

export default PersonnesComponent;
