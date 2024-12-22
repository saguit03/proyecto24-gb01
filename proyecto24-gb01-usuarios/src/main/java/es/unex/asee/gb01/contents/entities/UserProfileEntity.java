package es.unex.asee.gb01.contents.entities;

import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Entity;
import javax.persistence.Column;
import javax.persistence.GeneratedValue;

import java.util.Objects;

@Entity
@Table(name = "profiles")
public class UserProfileEntity {

    @Id
    @GeneratedValue
    private Long idProfile;

    @Column(name = "idUser", nullable = false)
    private Long idUser;

    @Column(name = "profileName", nullable = false)
    private String profileName;

    @Column(name = "pin", nullable = false)
    private String pin;

    public UserProfileEntity() {
        this.profileName = "";
        this.pin = "";
    }

    public UserProfileEntity(Long idUser, String profileName, String pin) {
        this.idUser = idUser;
        this.profileName = profileName;
        this.pin = pin;
    }

    public Long getIdProfile() {
        return idProfile;
    }

    public void setIdProfile(Long idProfile) {
        this.idProfile = idProfile;
    }

    public Long getidUser() {
        return idUser;
    }

    public void setidUser(Long idUser) {
        this.idUser = idUser;
    }

    public String getProfileName() {
        return profileName;
    }

    public void setProfileName(String profileName) {
        this.profileName = profileName;
    }

    public String getPin() {
        return pin;
    }

    public void setPin(String pin) {
        this.pin = pin;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserProfileEntity that = (UserProfileEntity) o;
        return Objects.equals(idProfile, that.idProfile) &&
                Objects.equals(idUser, that.idUser) &&
                Objects.equals(profileName, that.profileName) &&
                Objects.equals(pin, that.pin);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idProfile, idUser, profileName, pin);
    }

    @Override
    public String toString() {
        return "UserProfileEntity{" +
                "idProfile=" + idProfile +
                ", idUser=" + idUser +
                ", profileName='" + profileName + '\'' +
                ", pin='" + pin + '\'' +
                '}';
    }
}

