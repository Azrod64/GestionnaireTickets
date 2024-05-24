package com.projets.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projets.model.Ticket;
import com.projets.repository.TicketRepository;

@Service
public class TicketService {
	@Autowired
    private TicketRepository ticketRepository;

    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }

    public Ticket getTicketById(Long id) {
        return ticketRepository.findById(id).orElse(null);
    }

    public void createOrUpdateTicket(Ticket ticket) {
        ticketRepository.save(ticket);
    }
    // Methods to delete tickets, if needed
}
