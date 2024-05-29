import React, { useState, useEffect } from 'react';
import personnesService from '../services/PersonneService';
import './PersonnesComponent.css';

const PersonnesComponent = () => {
    const [people, setPeople] = useState([]);
    const [menuOpen, setMenuOpen] = useState(false);
    const [error, setError] = useState(null);
    const [editingPersonId, setEditingPersonId] = useState(null);
    const [draftPerson, setDraftPerson] = useState({});
    const [filter, setFilter] = useState('all');
    
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

    const determinePersonType = (person) => {
        if ( person.competences===null) {
            return 'Ingénieur';
        } else if (person.qualifications===null) {
            return 'Technicien';
        }
    };

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
      setEditingPersonId(personId);
      const person = people.find(t => t.idPersonne === personId);
      setDraftPerson({ ...person });
  };

  const saveChanges = async (id) => {
      try {
          await personnesService.updateUser(id, draftPerson);
          setPeople(people.map(personne => personne.idPersonne === id ? { ...personne, ...draftPerson } : personne));
          setEditingPersonId(null);
      } catch (error) {
          console.error("There was an error updating the ticket!", error);
      }
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
    
    const filteredPeople = people.filter(person => {
        if (filter === 'all') return true;
        if (filter === 'technicien') return person.competences && !person.qualifications;
        if (filter === 'ingenieur') return person.qualifications && !person.competences;
    });
    

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
                        <label htmlFor="nbProjet">Nombre de projets à réaliser:</label>
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
                
                <label htmlFor="filter">Filtre : </label>
                <select id="filter" value={filter} onChange={e => setFilter(e.target.value)}>
                    <option value="all">Aucun</option>
                    <option value="technicien">Techniciens</option>
                    <option value="ingenieur">Ingénieurs</option>
                </select>

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
                        <th>Type</th>
                        {filter === 'ingenieur' && <>
                            <th>Qualifications</th>
                            <th>Nombre de projets</th>
                        </>}
                        {filter === 'technicien' && <th>Compétences</th>}
                        <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="personnesCompo">
                    {filteredPeople.map((person) => (
                        <tr key={person.idPersonne}>
                                <td>{person.idPersonne}</td>
                                <td>{editingPersonId === person.idPersonne ? (
                                    <input
                                        type="email"
                                        name="email"
                                        value={draftPerson.email}
                                        onChange={handleDraftChange}
                                    />
                                ) : (
                                    person.email
                                )}</td>
                                <td>{editingPersonId === person.idPersonne ? (
                                    <input
                                        type="text"
                                        name="nom"
                                        value={draftPerson.nom}
                                        onChange={handleDraftChange}
                                    />
                                ) : (
                                    person.nom
                                )}</td>
                                <td>{editingPersonId === person.idPersonne ? (
                                    <input
                                        type="text"
                                        name="prenom"
                                        value={draftPerson.prenom}
                                        onChange={handleDraftChange}
                                    />
                                ) : (
                                    person.prenom
                                )}</td>
                                <td>{determinePersonType(person)}</td>
        {filter === 'ingenieur' && (
            <>
                <td>{editingPersonId === person.idPersonne ? (
                    <input type="text" name="qualifications" value={draftPerson.qualifications} onChange={handleDraftChange} />
                ) : (
                    person.qualifications
                )}</td>
                <td>{editingPersonId === person.idPersonne ? (
                    <input type="number" name="nbProjet" value={draftPerson.nbProjet} onChange={handleDraftChange} />
                ) : (
                    person.nbProjet
                )}</td>
            </>
        )}
        {filter === 'technicien' && (
            <td>{editingPersonId === person.idPersonne ? (
                <input type="text" name="competences" value={draftPerson.competences} onChange={handleDraftChange} />
            ) : (
                person.competences
            )}</td>
        )}
                                <td>
                                {editingPersonId === person.idPersonne ? (
                                        <img
                                            style={{ width: '1.3em', margin: '0 5px 0 0' }}
                                            src={`${process.env.PUBLIC_URL}/images/validate.png`}
                                            alt="modify"
                                            onClick={() => saveChanges(person.idPersonne)}
                                        />
                                    ) : (
                                        <img
                                            style={{ width: '1.3em', margin: '0 5px 0 0' }}
                                            src={`${process.env.PUBLIC_URL}/images/modify.png`}
                                            alt="modify"
                                            onClick={() => editPerson(person.idPersonne)}
                                        />
                                    )}
                                    <img
                                        style={{ width: '1.3em' }}
                                        src={`${process.env.PUBLIC_URL}/images/trash.png`}
                                        alt="remove"
                                        onClick={() => handleDeletePerson(person.idPersonne)}
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

