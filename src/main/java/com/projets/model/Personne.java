package com.projets.model;

import java.util.Set;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.OneToMany;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public class Personne {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idPersonne;
	
	private String nom;
	private String prenom;
	private String email;
	private String mdp;
	
	@OneToMany(mappedBy = "personne")
    Set<VolumeHoraire> volHoraire;

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

	public String getMdp() {
		return mdp;
	}

	public void setMdp(String mdp) {
		this.mdp = mdp;
	}

	public Set<VolumeHoraire> getVolHoraire() {
		return volHoraire;
	}

	public void setVolHoraire(Set<VolumeHoraire> volHoraire) {
		this.volHoraire = volHoraire;
	}

	public Personne() {
		super();
	}

	public Personne(int idPersonne, String nom, String prenom, String email, String mdp,
			Set<VolumeHoraire> volHoraire) {
		super();
		this.idPersonne = idPersonne;
		this.nom = nom;
		this.prenom = prenom;
		this.email = email;
		this.mdp = mdp;
		this.volHoraire = volHoraire;
	}

	@Override
	public String toString() {
		return "Personne [idPersonne=" + idPersonne + ", nom=" + nom + ", prenom=" + prenom + ", email=" + email
				+ ", mdp=" + mdp + ", volHoraire=" + volHoraire + "]";
	}

}
