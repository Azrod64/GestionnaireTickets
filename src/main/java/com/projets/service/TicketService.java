package com.projets.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projets.repository.TicketRepository;


@Service
public class TicketService {
	@Autowired TicketRepository ticketRespository;
	
	public void deleteTicket(int id) {
		ticketRespository.deleteById(id);
	}
	
}
