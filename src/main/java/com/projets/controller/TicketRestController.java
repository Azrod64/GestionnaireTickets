package com.projets.controller;

import java.util.List;

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

import com.projets.dto.TicketDTO;
import com.projets.dto.VolumeHoraireDTO;
import com.projets.model.Personne;
import com.projets.model.Ticket;
import com.projets.model.VolumeHoraire;
import com.projets.model.VolumeHoraireKey;
import com.projets.repository.PersonneRepository;
import com.projets.repository.TicketRepository;
import com.projets.repository.VolumeHoraireRepository;
import com.projets.service.TicketService;

import jakarta.transaction.Transactional;

@RestController
public class TicketRestController {
	
	// Injection des dépendances nécessaires
	@Autowired TicketRepository ticketRepository;
	@Autowired TicketService ticketService;
	@Autowired PersonneRepository personneRepository;
	@Autowired VolumeHoraireRepository volumeHoraireRepository;
	
	/** 
     * Récupère tous les tickets de la base de données.
     * @return une liste de tous les tickets.
     */
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/ticket")
	public List<Ticket> getTickets() {
		return ticketRepository.findAllTickets();
	}
	
	/**
     * Crée un nouveau ticket depuis les données fournies dans le corps de la requête.
     * @param ticketDTO les données du ticket à créer.
     * @return l'entité Ticket créée.
     */
	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping("/ticket")
    public ResponseEntity<Ticket> addTicket(@RequestBody TicketDTO ticketDTO) {
        return ResponseEntity.ok(saveOrUpdateTicket(null, ticketDTO));
    }
	
	/**
     * Met à jour un ticket existant identifié par son ID avec les données fournies.
     * @param id l'identifiant du ticket à mettre à jour.
     * @param ticketDTO les nouvelles données du ticket.
     * @return l'entité Ticket mise à jour.
     */
	@CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/ticket/{id}")
    public ResponseEntity<Ticket> updateTicket(@PathVariable int id, @RequestBody TicketDTO ticketDTO) {
        return ResponseEntity.ok(saveOrUpdateTicket(id, ticketDTO));
    }
	
	/**
     * Supprime un ticket identifié par son ID.
     * @param id l'identifiant du ticket à supprimer.
     * @return une réponse vide avec un statut 204 No Content.
     */
	@CrossOrigin(origins = "http://localhost:3000")
	@DeleteMapping("/ticket/{id}")
	public ResponseEntity<Void> deleteTicket(@PathVariable("id") int id ) {
	  ticketService.deleteTicket(id);
	  return ResponseEntity.noContent().build();
	}
	
	/**
     * Sauvegarde ou met à jour un ticket en fonction de l'ID passé. Si l'ID est nul, un nouveau ticket est créé. Sinon, le ticket existant est mis à jour.
     * @param id l'identifiant du ticket (peut être null pour créer un nouveau ticket).
     * @param ticketDTO les données du ticket.
     * @return le ticket sauvegardé ou mis à jour.
     */
	@Transactional
	private Ticket saveOrUpdateTicket(Integer id, TicketDTO ticketDTO) {
	    Ticket ticket;
	    if (id == null) {  // New Ticket
	        ticket = new Ticket();
	    } else {  // Updating existing ticket
	        ticket = ticketRepository.findById(id).orElseThrow(() -> new RuntimeException("Ticket not found"));
	        ticket.getVolHoraire().clear();
	    }

	    ticket.setDescription(ticketDTO.getDescription());
	    ticket.setServiceDedie(ticketDTO.getServiceDedie());
	    ticket.setNomClient(ticketDTO.getNomClient());
	    ticket.setGenreProblem(ticketDTO.getGenreProblem());
	    ticket.setStatut(ticketDTO.getStatut());

	    Ticket savedTicket = ticketRepository.save(ticket); // Save the ticket first to get the id

	    for (VolumeHoraireDTO vhDTO : ticketDTO.getVolHoraire()) {
	        VolumeHoraireKey vhKey = new VolumeHoraireKey(savedTicket.getIdTicket(), vhDTO.getIdPersonne()); // Use savedTicket.getIdTicket()
	        VolumeHoraire vh = new VolumeHoraire();
	        vh.setId(vhKey);
	        vh.setVolHoraire(vhDTO.getVolHoraire());
	        Personne personne = personneRepository.findById(vhDTO.getIdPersonne()).orElseThrow(() -> new RuntimeException("Person not found"));
	        vh.setPersonne(personne);
	        vh.setTicket(savedTicket);
	        volumeHoraireRepository.save(vh); // Save each volume horaire
	    }
	    return savedTicket;
	}
}
