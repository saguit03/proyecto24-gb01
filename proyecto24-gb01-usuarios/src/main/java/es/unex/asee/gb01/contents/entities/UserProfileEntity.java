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
    private Long idprofile;

    @Column(name = "iduser", nullable = false)
    private Long iduser;

    @Column(name = "profilename", nullable = false)
    private String profilename;

    @Column(name = "pin", nullable = false)
    private String pin;

    public UserProfileEntity() {
        this.profilename = "";
        this.pin = "";
    }

    public UserProfileEntity(Long iduser, String profilename, String pin) {
        this.iduser = iduser;
        this.profilename = profilename;
        this.pin = pin;
    }

    public Long getidprofile() {
        return idprofile;
    }

    public void setidprofile(Long idprofile) {
        this.idprofile = idprofile;
    }

    public Long getiduser() {
        return iduser;
    }

    public void setiduser(Long iduser) {
        this.iduser = iduser;
    }

    public String getprofilename() {
        return profilename;
    }

    public void setprofilename(String profilename) {
        this.profilename = profilename;
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
        return Objects.equals(idprofile, that.idprofile) &&
                Objects.equals(iduser, that.iduser) &&
                Objects.equals(profilename, that.profilename) &&
                Objects.equals(pin, that.pin);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idprofile, iduser, profilename, pin);
    }

    @Override
    public String toString() {
        return "UserProfileEntity{" +
                "idprofile=" + idprofile +
                ", iduser=" + iduser +
                ", profilename='" + profilename + '\'' +
                ", pin='" + pin + '\'' +
                '}';
    }
}

