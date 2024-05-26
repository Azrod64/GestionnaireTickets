package com.projets.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projets.model.Ingenieur;

public interface IngenieurRepository extends JpaRepository<Ingenieur, Integer> {

}
