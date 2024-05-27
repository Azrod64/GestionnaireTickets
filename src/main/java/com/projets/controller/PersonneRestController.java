package com.projets.controller;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.projets.dto.PersonneDTO;
import com.projets.model.Ingenieur;
import com.projets.model.Personne;
import com.projets.model.Technicien;
import com.projets.repository.PersonneRepository;
import com.projets.service.PersonneService;
import com.projets.service.VolumeHoraireService;

@RestController
public class PersonneRestController {
	// Injection des dépendances nécessaires
	@Autowired PersonneRepository personneRepository;
	@Autowired PersonneService personneService;
	@Autowired VolumeHoraireService volumeHoraireService;
	
	/**
     * Récupère toutes les personnes de la base de données.
     * @return une liste de PersonneDTO représentant toutes les personnes.
     */
	@CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/personne")
    public List<PersonneDTO> getPersonnes() {
        List<Personne> personnes = personneService.findAllPersonnes();
        return personnes.stream()
                        .map(this::convertToDTO)
                        .collect(Collectors.toList());
    }
	
    // Méthode privée pour convertir un objet Personne en PersonneDTO
    private PersonneDTO convertToDTO(Personne personne) {
        if (personne instanceof Ingenieur) {
            Ingenieur ingenieur = (Ingenieur) personne;
            return new PersonneDTO(ingenieur.getIdPersonne(), ingenieur.getNom(), ingenieur.getPrenom(),
                ingenieur.getEmail(), ingenieur.getQualifications(), ingenieur.getNbProjet(), null);
        } else if (personne instanceof Technicien) {
            Technicien technicien = (Technicien) personne;
            return new PersonneDTO(technicien.getIdPersonne(), technicien.getNom(), technicien.getPrenom(),
                technicien.getEmail(), null, 0, technicien.getCompetences());
        } else {
            return new PersonneDTO(personne.getIdPersonne(), personne.getNom(), personne.getPrenom(),
                personne.getEmail(), null, 0, null);
        }
    }
	
    /**
     * Crée un nouveau technicien à partir des données fournies dans le corps de la requête.
     * @param bodyTechnicien les données du technicien à créer.
     * @return l'entité PersonneDTO représentant le technicien créé.
     */
	@CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/createUser/1")
    public ResponseEntity<PersonneDTO> createUser(@RequestBody Technicien bodyTechnicien) {
		
        Technicien technicien = new Technicien();
        
        // Initialise les attributs du technicien avec les valeurs de bodyTechnicien
        technicien.setNom(bodyTechnicien.getNom());
        technicien.setPrenom(bodyTechnicien.getPrenom());
        technicien.setEmail(bodyTechnicien.getEmail());
        technicien.setMdp(bodyTechnicien.getMdp());
        technicien.setCompetences(bodyTechnicien.getCompetences()); 

        	// Sauvegarde le technicien dans la base de données et retourne le DTO correspondant
        Technicien savedTechnicien = personneService.createTechnicien(technicien);
        return ResponseEntity.ok(convertToDTO(savedTechnicien));
             
    }
	
	/**
     * Crée un nouvel ingénieur à partir des données fournies dans le corps de la requête.
     * @param bodyIngenieur les données de l'ingénieur à créer.
     * @return l'entité PersonneDTO représentant l'ingénieur créé.
     */
	@CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/createUser/0")
    public ResponseEntity<PersonneDTO> createUser(@RequestBody Ingenieur bodyIngenieur) {

		Ingenieur ingenieur = new Ingenieur();
		
		// Initialise les attributs de l'ingénieur avec les valeurs de bodyIngenieur
		ingenieur.setNom(bodyIngenieur.getNom());
		ingenieur.setPrenom(bodyIngenieur.getPrenom());
		ingenieur.setEmail(bodyIngenieur.getEmail());
		ingenieur.setMdp(bodyIngenieur.getMdp());
		ingenieur.setQualifications(bodyIngenieur.getQualifications());
		ingenieur.setNbProjet(bodyIngenieur.getNbProjet());

		// Sauvegarde l'ingénieur dans la base de données et retourne le DTO correspondant
		Ingenieur savedIngenieur = personneService.createIngenieur(ingenieur);
        return ResponseEntity.ok(convertToDTO(savedIngenieur));
             
    }
	
	/**
     * Met à jour les détails d'une personne identifiée par son ID avec les données fournies.
     * @param id l'identifiant de la personne à mettre à jour.
     * @param personneDTO les nouvelles données de la personne.
     * @return l'entité PersonneDTO mise à jour.
     */
	@CrossOrigin(origins = "http://localhost:3000")
	@PutMapping("/personne/{id}")
	public ResponseEntity<PersonneDTO> updatePersonne(@PathVariable int id, @RequestBody PersonneDTO personneDTO) {
	    
		// Chercher la personne par ID
	    Optional<Personne> optionalPersonne = personneRepository.findById(id);

	    // Si l'optional est vide, retourne une réponse 404
	    if (!optionalPersonne.isPresent()) {
	        return ResponseEntity.status(404).body(null);
	    }
	 
	    // Personne trouvée, mise à jour des attributs
	    Personne personne = optionalPersonne.get();

	    if (personne instanceof Ingenieur && personneDTO.getQualifications() != null) {
	        Ingenieur ingenieur = (Ingenieur) personne;
	        ingenieur.setNom(personneDTO.getNom());
	        ingenieur.setPrenom(personneDTO.getPrenom());
	        ingenieur.setEmail(personneDTO.getEmail());
	        ingenieur.setQualifications(personneDTO.getQualifications());
	        ingenieur.setNbProjet(personneDTO.getNbProjet());
	        Ingenieur updatedIngenieur = personneService.createIngenieur(ingenieur);
	        return ResponseEntity.ok(convertToDTO(updatedIngenieur));

	    } else if (personne instanceof Technicien && personneDTO.getCompetences() != null) {
	        Technicien technicien = (Technicien) personne;
	        technicien.setNom(personneDTO.getNom());
	        technicien.setPrenom(personneDTO.getPrenom());
	        technicien.setEmail(personneDTO.getEmail());
	        technicien.setCompetences(personneDTO.getCompetences());
	        Technicien updatedTechnicien = personneService.createTechnicien(technicien);
	        return ResponseEntity.ok(convertToDTO(updatedTechnicien));
	    }

	    // Si ni Ingenieur ni Technicien ne sont mises à jour, retourne une réponse 400 Bad Request
	    return ResponseEntity.status(400).body(null); 
	}
	
	/**
     * Supprime une personne identifiée par son ID.
     * @param id l'identifiant de la personne à supprimer.
     * @return une réponse vide avec un statut 204 No Content.
     */
	@CrossOrigin(origins = "http://localhost:3000")
	@DeleteMapping("/personne/{id}")
	public ResponseEntity<Void> deletePersonne(@PathVariable("id") int id ) {
		volumeHoraireService.deleteByPersonneId(id);
        personneService.deletePersonne(id);
        return ResponseEntity.noContent().build();
	}
	
}
