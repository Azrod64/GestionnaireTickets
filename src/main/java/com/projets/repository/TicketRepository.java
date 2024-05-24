package com.projets.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projets.model.Ticket;

public interface TicketRepository extends JpaRepository<Ticket, Long>{

}
