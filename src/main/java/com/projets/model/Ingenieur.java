package com.projets.model;

import jakarta.persistence.Entity;

@Entity
public class Ingenieur extends Personne{
	private String qualifications;
	private int nbProjet;
	
	@Override
	public String toString() {
		return "Ingenieur [qualifications=" + qualifications + ", nbProjet=" + nbProjet + "]";
	}
	public String getQualifications() {
		return qualifications;
	}
	public void setQualifications(String qualifications) {
		this.qualifications = qualifications;
	}
	public int getNbProjet() {
		return nbProjet;
	}
	public void setNbProjet(int nbProjet) {
		this.nbProjet = nbProjet;
	}
	
}
