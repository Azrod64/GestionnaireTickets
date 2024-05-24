package com.projets.model;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;

@Entity
public class VolumeHoraire {
	
	@EmbeddedId
	VolumeHoraireKey id;
	
	@ManyToOne
	@MapsId("idTicket")
	@JoinColumn(name = "ticket_id")
	Ticket ticket;
	
	@ManyToOne
	@MapsId("idPersonne")
	@JoinColumn(name = "personne_id")
	Personne personne;
	
	int volHoraire;
}
