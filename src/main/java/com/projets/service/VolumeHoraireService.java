package com.projets.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projets.repository.VolumeHoraireRepository;

@Service
public class VolumeHoraireService {
	@Autowired VolumeHoraireRepository volumeHoraireRepository;

    public void deleteByPersonneId(int personneId) {
        volumeHoraireRepository.deleteByPersonneId(personneId);
    }
}
