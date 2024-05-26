package com.projets.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.projets.model.Ingenieur;
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
    @PostMapping("/createUser/1")
    public String createUser(@RequestBody Technicien bodyTechnicien) {

        Technicien technicien = new Technicien();
        technicien.setNom(bodyTechnicien.getNom());
        technicien.setPrenom(bodyTechnicien.getPrenom());
        technicien.setEmail(bodyTechnicien.getEmail());
        technicien.setMdp(bodyTechnicien.getMdp());
        technicien.setCompetences(bodyTechnicien.getCompetences()); 
        personneService.createTechnicien(technicien);
        return "Technicien created successfully";
             
    }
	
	@CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/createUser/0")
    public String createUser(@RequestBody Ingenieur bodyIngenieur) {

		Ingenieur ingenieur = new Ingenieur();
		ingenieur.setNom(bodyIngenieur.getNom());
		ingenieur.setPrenom(bodyIngenieur.getPrenom());
		ingenieur.setEmail(bodyIngenieur.getEmail());
		ingenieur.setMdp(bodyIngenieur.getMdp());
		ingenieur.setQualifications(bodyIngenieur.getQualifications());
		ingenieur.setNbProjet(bodyIngenieur.getNbProjet());
        personneService.createIngenieur(ingenieur);
        return "Ingenieur created successfully";
             
    }
	
}
