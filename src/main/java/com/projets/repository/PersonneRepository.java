package com.projets.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.projets.model.Personne;

public interface PersonneRepository extends JpaRepository<Personne, Integer>{
	
	@Query("select p.idPersonne as idPersonne, p.nom as nom, p.prenom as prenom from Personne p")
    List<PersonneProjection> findAllPersonneData();
}
