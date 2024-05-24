package com.projets.model;

import java.util.Set;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;


@Entity
public class Ticket {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idTicket;
	
	private String description;
    private String serviceDedie;
    private String nomClient;
    private String genreProblem;
    private int statut;
    
    @OneToMany(mappedBy = "ticket")
    Set<VolumeHoraire> volHoraire;

	public int getIdTicket() {
		return idTicket;
	}

	public void setIdTicket(int idTicket) {
		this.idTicket = idTicket;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getServiceDedie() {
		return serviceDedie;
	}

	public void setServiceDedie(String serviceDedie) {
		this.serviceDedie = serviceDedie;
	}

	public String getNomClient() {
		return nomClient;
	}

	public void setNomClient(String nomClient) {
		this.nomClient = nomClient;
	}

	public String getGenreProblem() {
		return genreProblem;
	}

	public void setGenreProblem(String genreProblem) {
		this.genreProblem = genreProblem;
	}

	public int getStatut() {
		return statut;
	}

	public void setStatut(int statut) {
		this.statut = statut;
	}

	public Ticket() {
		super();
	}

	public Set<VolumeHoraire> getVolHoraire() {
		return volHoraire;
	}

	public void setVolHoraire(Set<VolumeHoraire> volHoraire) {
		this.volHoraire = volHoraire;
	}

	@Override
	public String toString() {
		return "Ticket [idTicket=" + idTicket + ", description=" + description + ", serviceDedie=" + serviceDedie
				+ ", nomClient=" + nomClient + ", genreProblem=" + genreProblem + ", statut=" + statut + ", volHoraire="
				+ volHoraire + "]";
	}

	public Ticket(int idTicket, String description, String serviceDedie, String nomClient, String genreProblem,
			int statut, Set<VolumeHoraire> volHoraire) {
		super();
		this.idTicket = idTicket;
		this.description = description;
		this.serviceDedie = serviceDedie;
		this.nomClient = nomClient;
		this.genreProblem = genreProblem;
		this.statut = statut;
		this.volHoraire = volHoraire;
	}
    
    
}
