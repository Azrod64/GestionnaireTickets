package com.projets.model;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class VolumeHoraireKey implements Serializable{
	
	private static final long serialVersionUID = 1L;

	@Column(name = "ticket_id")
    int idTicket;

    @Column(name = "personne_id")
    int idPersonne;

	public int getIdTicket() {
		return idTicket;
	}

	public void setIdTicket(int idTicket) {
		this.idTicket = idTicket;
	}

	public int getIdPersonne() {
		return idPersonne;
	}

	public void setIdPersonne(int idPersonne) {
		this.idPersonne = idPersonne;
	}
    
	// override equals and hashCode
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof VolumeHoraireKey)) return false;
        VolumeHoraireKey that = (VolumeHoraireKey) o;
        return idTicket == that.idTicket &&
                idPersonne == that.idPersonne;
    }

    @Override
    public int hashCode() {
        return Objects.hash(idTicket, idPersonne);
    }
}
