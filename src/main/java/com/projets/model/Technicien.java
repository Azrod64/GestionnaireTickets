package com.projets.model;

import jakarta.persistence.Entity;

@Entity
public class Technicien extends Personne{
	private String competences;

	public String getCompetences() {
		return competences;
	}

	public void setCompetences(String competences) {
		this.competences = competences;
	}

	@Override
	public String toString() {
		return "Technicien [competences=" + competences + "]";
	}
	
}
