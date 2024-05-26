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
	@Autowired TicketRepository ticketRepository;
	@Autowired TicketService ticketService;
	@Autowired PersonneRepository personneRepository;
	@Autowired VolumeHoraireRepository volumeHoraireRepository;
	
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/ticket")
	public List<Ticket> getTickets() {
		return ticketRepository.findAllTickets();
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping("/ticket")
    public ResponseEntity<Ticket> addTicket(@RequestBody TicketDTO ticketDTO) {
        return ResponseEntity.ok(saveOrUpdateTicket(null, ticketDTO));
    }
	
	@CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/ticket/{id}")
    public ResponseEntity<Ticket> updateTicket(@PathVariable int id, @RequestBody TicketDTO ticketDTO) {
        return ResponseEntity.ok(saveOrUpdateTicket(id, ticketDTO));
    }
	
	@CrossOrigin(origins = "http://localhost:3000")
	@DeleteMapping("/ticket/{id}")
	public ResponseEntity<Void> deleteTicket(@PathVariable("id") int id ) {
	  ticketService.deleteTicket(id);
	  return ResponseEntity.noContent().build();
	}
	
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
