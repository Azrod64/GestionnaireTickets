package com.projets.dto;

import java.util.List;

public class TicketDTO {
	private String description;
    private String serviceDedie;
    private String nomClient;
    private String genreProblem;
    private int statut;
    private List<VolumeHoraireDTO> volHoraire;
    
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
	public List<VolumeHoraireDTO> getVolHoraire() {
		return volHoraire;
	}
	public void setVolHoraire(List<VolumeHoraireDTO> volHoraire) {
		this.volHoraire = volHoraire;
	}
    
}