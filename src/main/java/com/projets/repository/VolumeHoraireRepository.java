package com.projets.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.projets.model.VolumeHoraire;
import com.projets.model.VolumeHoraireKey;

import jakarta.transaction.Transactional;

public interface VolumeHoraireRepository extends JpaRepository<VolumeHoraire, VolumeHoraireKey>{
	
	@Transactional
    @Modifying
    @Query("DELETE FROM VolumeHoraire v WHERE v.personne.id = :personneId")
    void deleteByPersonneId(@Param("personneId") int personneId);

}
