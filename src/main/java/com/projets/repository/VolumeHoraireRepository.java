package com.projets.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.projets.model.VolumeHoraire;
import com.projets.model.VolumeHoraireKey;

public interface VolumeHoraireRepository extends JpaRepository<VolumeHoraire, VolumeHoraireKey>{

}
