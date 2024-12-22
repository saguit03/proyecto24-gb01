package es.unex.swagger.model;


import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.ArrayList;
import java.util.List;

import org.springframework.validation.annotation.Validated;
import es.unex.swagger.configuration.NotUndefined;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.annotation.Nulls;

import javax.validation.Valid;
import javax.validation.constraints.Size;

/**
 * User
 */
@Validated
@NotUndefined
@javax.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.SpringCodegen", date = "2024-10-18T10:29:32.211856553Z[GMT]")


public class User {
    @JsonProperty("idUser")

    private Long idUser = null;

    @JsonProperty("Name")

    private String name = null;

    @JsonProperty("Surname")

    private String surname = null;

    @JsonProperty("Username")

    private String username = null;

    @JsonProperty("Email")

    private String email = null;

    @JsonProperty("Password")

    private String password = null;

    @JsonProperty("startDate")

    @JsonInclude(JsonInclude.Include.NON_ABSENT)  // Exclude from JSON if absent
    @JsonSetter(nulls = Nulls.FAIL)    // FAIL setting if the value is null
    private String startDate = null;

    @JsonProperty("profilePicture")

    @JsonInclude(JsonInclude.Include.NON_ABSENT)  // Exclude from JSON if absent
    @JsonSetter(nulls = Nulls.FAIL)    // FAIL setting if the value is null
    private String profilePicture = null;

    @JsonProperty("registerDate")

    @JsonInclude(JsonInclude.Include.NON_ABSENT)  // Exclude from JSON if absent
    @JsonSetter(nulls = Nulls.FAIL)    // FAIL setting if the value is null
    private String registerDate = null;

    @JsonProperty("userProfiles")
    @Valid
    private List<UserProfile> userProfiles = null;

    public User() {

    }

    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public User idUser(Long idUser) {

        this.idUser = idUser;
        return this;
    }

    /**
     * Get idUser
     *
     * @return idUser
     **/

    @Schema(example = "1", required = false, description = "")
    public Long getIdUser() {
        return idUser;
    }


    public void setIdUser(Long idUser) {

        this.idUser = idUser;
    }

    public User name(String name) {

        this.name = name;
        return this;
    }

    /**
     * Get name
     *
     * @return name
     **/
    @Schema(example = "Pablo", required = false, description = "")
    public String getName() {
        return name;
    }

    public void setName(String name) {

        this.name = name;
    }

    public User surname(String surname) {

        this.surname = surname;
        return this;
    }

    /**
     * Get surname
     *
     * @return surname
     **/
    @Schema(example = "Fernandez", required = false, description = "")
    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {

        this.surname = surname;
    }

    public User username(String username) {
        this.username = username;
        return this;
    }

    /**
     * Get username
     *
     * @return username
     **/

    @Schema(example = "pafernandez", required = false, description = "")
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public User email(String email) {

        this.email = email;
        return this;
    }

    /**
     * Get email
     *
     * @return email
     **/
    @Schema(example = "pafernandez@gmail.com", required = false, description = "")

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public User password(String password) {
        this.password = password;
        return this;
    }

    /**
     * Get password
     *
     * @return password
     **/
    @Schema(example = "pafernandez", required = false, description = "")
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public User startDate(String startDate) {
        this.startDate = startDate;
        return this;
    }

    /**
     * Get startDate
     *
     * @return startDate
     **/

    @Schema(example = "8/9/2024", description = "")
    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public User profilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
        return this;
    }

    /**
     * Get profilePicture
     *
     * @return profilePicture
     **/
    @Schema(example = "foto_profile.png", description = "")
    public String getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }

    public User registerDate(String registerDate) {

        this.registerDate = registerDate;
        return this;
    }

    /**
     * Get registerDate
     *
     * @return registerDate
     **/
    @Schema(example = "01/01/2020", description = "")
    public String getRegisterDate() {
        return registerDate;
    }

    public void setRegisterDate(String registerDate) {
        this.registerDate = registerDate;
    }

    public User userProfiles(List<UserProfile> userProfiles) {
        this.userProfiles = userProfiles;
        return this;
    }

    public User addUserProfilesItem(UserProfile userProfilesItem) {
        if (this.userProfiles == null) {
            this.userProfiles = new ArrayList<UserProfile>();
        }
        this.userProfiles.add(userProfilesItem);
        return this;
    }

    /**
     * Get userProfiles
     *
     * @return userProfiles
     **/

    @Schema(description = "")
    @Valid
    @Size(min = 1)
    public List<UserProfile> getUserProfiles() {
        return userProfiles;
    }


    public void setUserProfiles(List<UserProfile> userProfiles) {
        this.userProfiles = userProfiles;
    }

    @Override
    public boolean equals(java.lang.Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        User user = (User) o;
        return Objects.equals(this.idUser, user.idUser) &&
                Objects.equals(this.name, user.name) &&
                Objects.equals(this.surname, user.surname) &&
                Objects.equals(this.username, user.username) &&
                Objects.equals(this.email, user.email) &&
                Objects.equals(this.password, user.password) &&
                Objects.equals(this.startDate, user.startDate) &&
                Objects.equals(this.profilePicture, user.profilePicture) &&
                Objects.equals(this.registerDate, user.registerDate) &&
                Objects.equals(this.userProfiles, user.userProfiles);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idUser, name, surname, username, email, password, startDate, profilePicture, registerDate, userProfiles);
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("{\n");

        sb.append("    idUser: ").append(toIndentedString(idUser)).append("\n");
        sb.append("    name: ").append(toIndentedString(name)).append("\n");
        sb.append("    surname: ").append(toIndentedString(surname)).append("\n");
        sb.append("    username: ").append(toIndentedString(username)).append("\n");
        sb.append("    email: ").append(toIndentedString(email)).append("\n");
        sb.append("    password: ").append(toIndentedString(password)).append("\n");
        sb.append("    startDate: ").append(toIndentedString(startDate)).append("\n");
        sb.append("    profilePicture: ").append(toIndentedString(profilePicture)).append("\n");
        sb.append("    registerDate: ").append(toIndentedString(registerDate)).append("\n");
        sb.append("    userProfiles: ").append(toIndentedString(userProfiles)).append("\n");
        sb.append("}");
        return sb.toString();
    }

    /**
     * Convert the given object to string with each line indented by 4 spaces
     * (except the first line).
     */
    private String toIndentedString(java.lang.Object o) {
        if (o == null) {
            return "null";
        }
        return o.toString().replace("\n", "\n    ");
    }
}
