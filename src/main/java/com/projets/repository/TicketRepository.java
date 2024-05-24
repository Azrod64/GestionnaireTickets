package com.projets.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.projets.model.Ticket;

public interface TicketRepository extends JpaRepository<Ticket, Integer>{

	@Query("select t from Ticket t ")
    List<Ticket> findAllTickets();
	
}
