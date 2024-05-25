package com.projets.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
import com.projets.service.TicketService;

@RestController
public class TicketRestController {
	@Autowired TicketRepository ticketRepository;
	@Autowired TicketService ticketService;
	@Autowired PersonneRepository personneRepository;
	
	@GetMapping("/ticket")
	public List<Ticket> getTickets() {
		return ticketRepository.findAllTickets();
	}
	
	
	@PostMapping("/ticket")
    public ResponseEntity<Ticket> addTicket(@RequestBody TicketDTO ticketDTO) {
        return ResponseEntity.ok(saveOrUpdateTicket(null, ticketDTO));
    }

    @PutMapping("/ticket/{id}")
    public ResponseEntity<Ticket> updateTicket(@PathVariable int id, @RequestBody TicketDTO ticketDTO) {
        return ResponseEntity.ok(saveOrUpdateTicket(id, ticketDTO));
    }
	
	@DeleteMapping("/ticket/{id}")
	public ResponseEntity<Void> deleteTicket(@PathVariable("id") int id ) {
	  ticketService.deleteTicket(id);
	  return ResponseEntity.noContent().build();
	}
	
	private Ticket saveOrUpdateTicket(Integer id, TicketDTO ticketDTO) {
        Ticket ticket;

        if (id == null) {  // It's a new ticket
            ticket = new Ticket();
        } else {  // It's a ticket update
            ticket = ticketRepository.findById(id).orElseThrow(() -> new RuntimeException("Ticket not found"));
            ticket.getVolHoraire().clear();
        }

        ticket.setDescription(ticketDTO.getDescription());
        ticket.setServiceDedie(ticketDTO.getServiceDedie());
        ticket.setNomClient(ticketDTO.getNomClient());
        ticket.setGenreProblem(ticketDTO.getGenreProblem());
        ticket.setStatut(ticketDTO.getStatut());

        for (VolumeHoraireDTO vhDTO : ticketDTO.getVolHoraire()) {
            VolumeHoraireKey vhKey = new VolumeHoraireKey();
            vhKey.setIdPersonne(vhDTO.getIdPersonne());

            VolumeHoraire vh = new VolumeHoraire();
            vh.setId(vhKey);
            vh.setVolHoraire(vhDTO.getVolHoraire());

            Personne personne = personneRepository.findById(vhDTO.getIdPersonne()).orElse(null);
            if (personne == null) {
                throw new RuntimeException("Person not found");
            }
            vh.setPersonne(personne);
            vh.setTicket(ticket);
            ticket.getVolHoraire().add(vh);
        }
        return ticketRepository.save(ticket);
    }
}
