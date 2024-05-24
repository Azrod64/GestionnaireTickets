package com.projets.model;

import java.util.List;
import java.util.Set;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
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
    
}
