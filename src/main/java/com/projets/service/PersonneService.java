package com.projets.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projets.model.Ingenieur;
import com.projets.model.Personne;
import com.projets.model.Technicien;
import com.projets.repository.IngenieurRepository;
import com.projets.repository.PersonneRepository;
import com.projets.repository.TechnicienRepository;

@Service
public class PersonneService {
	@Autowired IngenieurRepository ingenieurRepository;

    @Autowired TechnicienRepository technicienRepository;
 
    @Autowired PersonneRepository personneRepository;

    public Ingenieur createIngenieur(Ingenieur ingenieur) {
        return ingenieurRepository.save(ingenieur);
    }

    public Technicien createTechnicien(Technicien technicien) {
        return technicienRepository.save(technicien);
    }
    
    public void deletePersonne(int id) {
    	personneRepository.deleteById(id);
	}
	
    public List<Personne> findAllPersonnes() {
        return personneRepository.findAll();
    }
}
