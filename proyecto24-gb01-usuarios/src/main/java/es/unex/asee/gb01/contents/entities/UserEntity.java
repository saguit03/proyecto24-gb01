package es.unex.asee.gb01.contents.entities;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import java.util.Objects;

@Entity
@Table(name = "users")
public class UserEntity {
    @Id
    @GeneratedValue
    private Long idUser = null;

    private String name = null;

    private String surname = null;

    private String username = null;

    private String email = null;

    private String password = null;

    private String startDate = null;

    private String profilePicture = null;

    private String registerDate = null;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "userprofiles")
    private List<UserProfileEntity> userProfiles = null;

    public UserEntity() {
    }

    public UserEntity(String name, String surname, String username, String email, String password) {
        this.name = name;
        this.surname = surname;
        this.username = username;
        this.email = email;
        this.password = password;

    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }

    public String getRegisterDate() {
        return registerDate;
    }

    public void setRegisterDate(String registerDate) {
        this.registerDate = registerDate;
    }

    public List<UserProfileEntity> getUserProfiles() {
        return userProfiles;
    }

    public void setUserProfiles(List<UserProfileEntity> userProfiles) {
        this.userProfiles = userProfiles;
    }

    public Long getIdUser() {
        return idUser;
    }

    public void setIdUser(Long idUser) {
        this.idUser = idUser;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserEntity that = (UserEntity) o;
        return idUser.equals(that.idUser) &&
                name.equals(that.name) &&
                surname.equals(that.surname) &&
                username.equals(that.username) &&
                email.equals(that.email) &&
                password.equals(that.password) &&
                startDate.equals(that.startDate) &&
                profilePicture.equals(that.profilePicture) &&
                registerDate.equals(that.registerDate) &&
                userProfiles.equals(that.userProfiles);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idUser, name, surname, username, email, password, startDate, profilePicture, registerDate, userProfiles);
    }

    @Override
    public String toString() {
        return "UserEntity{" +
                "idUser=" + idUser +
                ", name='" + name + '\'' +
                ", surname='" + surname + '\'' +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", startDate='" + startDate + '\'' +
                ", profilePicture='" + profilePicture + '\'' +
                ", registerDate='" + registerDate + '\'' +
                ", userProfiles=" + userProfiles +
                '}';
    }

}
