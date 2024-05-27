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
	@Autowired PersonneRepository personneRepository;
	@Autowired PersonneService personneService;
	@Autowired VolumeHoraireService volumeHoraireService;
	
	@CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/personne")
    public List<PersonneDTO> getPersonnes() {
        List<Personne> personnes = personneService.findAllPersonnes();
        return personnes.stream()
                        .map(this::convertToDTO)
                        .collect(Collectors.toList());
    }

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
	
	@CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/createUser/1")
    public ResponseEntity<PersonneDTO> createUser(@RequestBody Technicien bodyTechnicien) {

        Technicien technicien = new Technicien();
        technicien.setNom(bodyTechnicien.getNom());
        technicien.setPrenom(bodyTechnicien.getPrenom());
        technicien.setEmail(bodyTechnicien.getEmail());
        technicien.setMdp(bodyTechnicien.getMdp());
        technicien.setCompetences(bodyTechnicien.getCompetences()); 

        Technicien savedTechnicien = personneService.createTechnicien(technicien);
        return ResponseEntity.ok(convertToDTO(savedTechnicien));
             
    }
	
	@CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/createUser/0")
    public ResponseEntity<PersonneDTO> createUser(@RequestBody Ingenieur bodyIngenieur) {

		Ingenieur ingenieur = new Ingenieur();
		ingenieur.setNom(bodyIngenieur.getNom());
		ingenieur.setPrenom(bodyIngenieur.getPrenom());
		ingenieur.setEmail(bodyIngenieur.getEmail());
		ingenieur.setMdp(bodyIngenieur.getMdp());
		ingenieur.setQualifications(bodyIngenieur.getQualifications());
		ingenieur.setNbProjet(bodyIngenieur.getNbProjet());

		Ingenieur savedIngenieur = personneService.createIngenieur(ingenieur);
        return ResponseEntity.ok(convertToDTO(savedIngenieur));
             
    }
	
	@CrossOrigin(origins = "http://localhost:3000")
	@PutMapping("/personne/{id}")
	public ResponseEntity<PersonneDTO> updatePersonne(@PathVariable int id, @RequestBody PersonneDTO personneDTO) {
	    // Chercher la personne par ID
	    Optional<Personne> optionalPersonne = personneRepository.findById(id);

	    // Si l'optional est vide, retourner une réponse 404
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

	    // Si ni Ingenieur ni Technicien ne sont mises à jour
	    return ResponseEntity.status(400).body(null); // Retourner une réponse 400 Bad Request
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@DeleteMapping("/personne/{id}")
	public ResponseEntity<Void> deletePersonne(@PathVariable("id") int id ) {
		volumeHoraireService.deleteByPersonneId(id);
        personneService.deletePersonne(id);
        return ResponseEntity.noContent().build();
	}
	
}
