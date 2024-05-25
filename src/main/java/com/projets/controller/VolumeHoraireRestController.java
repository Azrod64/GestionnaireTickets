package com.projets.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.projets.model.Personne;
import com.projets.model.Ticket;
import com.projets.model.VolumeHoraire;
import com.projets.repository.PersonneRepository;
import com.projets.repository.TicketRepository;
import com.projets.repository.VolumeHoraireRepository;

@RestController
public class VolumeHoraireRestController {
	@Autowired VolumeHoraireRepository volumeHoraireRepository;
	
    @Autowired TicketRepository ticketRepository;

    @Autowired PersonneRepository personneRepository;

    @PostMapping("/volHoraire")
    public ResponseEntity<VolumeHoraire> addVolHoraire(@RequestBody VolumeHoraire volHoraire) {

        // Récupérer le ticket et la personne associés depuis la base de données
        Ticket ticket = ticketRepository.findById(volHoraire.getId().getIdTicket()).orElseThrow(() -> 
            new RuntimeException("Ticket not found"));
        Personne personne = personneRepository.findById(volHoraire.getId().getIdPersonne()).orElseThrow(() -> 
            new RuntimeException("Person not found"));

        // Associer le ticket et la personne récupérés au VolumeHoraire
        volHoraire.setTicket(ticket);
        volHoraire.setPersonne(personne);

        // Sauvegarder VolumeHoraire
        VolumeHoraire savedVolHoraire = volumeHoraireRepository.save(volHoraire);
        return ResponseEntity.ok(savedVolHoraire);
    }
}
