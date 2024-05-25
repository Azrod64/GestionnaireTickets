package com.projets.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;

@Entity
public class VolumeHoraire {
	
	@EmbeddedId
	VolumeHoraireKey id;
	
	int volHoraire;
	
	@JsonIgnore
	@ManyToOne
	@MapsId("idTicket")
	@JoinColumn(name = "ticket_id")
	Ticket ticket;
	
	@JsonIgnore
	@ManyToOne
	@MapsId("idPersonne")
	@JoinColumn(name = "personne_id")
	Personne personne;
	
	@JsonProperty("nomPersonne") 
    public String getNomPersonne() {
        return this.getPersonne().getNom();
    }
	

	public VolumeHoraireKey getId() {
		return id;
	}

	public void setId(VolumeHoraireKey id) {
		this.id = id;
	}

	public Ticket getTicket() {
		return ticket;
	}

	public void setTicket(Ticket ticket) {
		this.ticket = ticket;
	}

	public Personne getPersonne() {
		return personne;
	}

	public void setPersonne(Personne personne) {
		this.personne = personne;
	}

	public int getVolHoraire() {
		return volHoraire;
	}

	public void setVolHoraire(int volHoraire) {
		this.volHoraire = volHoraire;
	}

	@Override
	public String toString() {
		return "VolumeHoraire [id=" + id + ", ticket=" + ticket + ", personne=" + personne + ", volHoraire="
				+ volHoraire + "]";
	}
	
	
}
