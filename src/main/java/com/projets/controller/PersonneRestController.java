package com.projets.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.projets.model.Ingenieur;
import com.projets.model.Personne;
import com.projets.model.Technicien;
import com.projets.repository.PersonneProjection;
import com.projets.repository.PersonneRepository;
import com.projets.service.PersonneService;

@RestController
public class PersonneRestController {
	@Autowired PersonneRepository personneRepository;
	@Autowired PersonneService personneService;

	@CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/personne")
    public List<PersonneProjection> getPersonnes() {
        return personneRepository.findAllPersonneData();
    }
	
	@CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/createUser/{id}")
    public String createUser(@PathVariable int id,@RequestBody Personne personne) {
        if (id == 1) {
            Technicien technicien = new Technicien();
            technicien.setNom(personne.getNom());
            technicien.setPrenom(personne.getPrenom());
            technicien.setEmail(personne.getEmail());
            technicien.setMdp(personne.getMdp());
            technicien.setCompetences("Default Competences"); // Vous pouvez remplacer ceci par des données réelles
            personneService.createTechnicien(technicien);
            return "Technicien created successfully";
            
        } else if (id == 0) {
            Ingenieur ingenieur = new Ingenieur();
            ingenieur.setNom(personne.getNom());
            ingenieur.setPrenom(personne.getPrenom());
            ingenieur.setEmail(personne.getEmail());
            ingenieur.setMdp(personne.getMdp());
            ingenieur.setQualifications("Default Qualifications"); // Vous pouvez remplacer ceci par des données réelles
            ingenieur.setNbProjet(0); // Initialiser nbProjet
            personneService.createIngenieur(ingenieur);
            return "Ingenieur created successfully";
        } else {
            return "Invalid ID";
        }
    }
	
}
