package com.projets.dto;

public class PersonneDTO {
	private int idPersonne;
    private String nom;
    private String prenom;
    private String email;
    private String qualifications;
    private int nbProjet;
    private String competences;
    
	public int getIdPersonne() {
		return idPersonne;
	}

	public void setIdPersonne(int idPersonne) {
		this.idPersonne = idPersonne;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public String getPrenom() {
		return prenom;
	}

	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
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

	public String getCompetences() {
		return competences;
	}

	public void setCompetences(String competences) {
		this.competences = competences;
	}

	public PersonneDTO(int idPersonne, String nom, String prenom, String email, String qualifications, int nbProjet,
			String competences) {
		super();
		this.idPersonne = idPersonne;
		this.nom = nom;
		this.prenom = prenom;
		this.email = email;
		this.qualifications = qualifications;
		this.nbProjet = nbProjet;
		this.competences = competences;
	}
    
    
}
