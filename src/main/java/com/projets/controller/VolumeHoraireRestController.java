package com.projets.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.projets.model.VolumeHoraire;
import com.projets.repository.VolumeHoraireRepository;

@RestController
public class VolumeHoraireRestController {
	@Autowired VolumeHoraireRepository volumeHoraireRepository;
	
	@GetMapping("/volHoraire/{id}")
	public List<VolumeHoraire> getVolHoraireTicket(@PathVariable("id") int id ) {
		return volumeHoraireRepository.findByIdIdTicket(id);
	}
}
