package com.projets.model;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class VolumeHoraireKey implements Serializable{
	
	private static final long serialVersionUID = 1L;

	@Column(name = "ticket_id")
    int idTicket;

    @Column(name = "personne_id")
    int idPersonne;
}
