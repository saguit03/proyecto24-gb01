package es.unex.swagger.model;


import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.validation.annotation.Validated;
import es.unex.swagger.configuration.NotUndefined;


/**
 * UserProfile
 */
@Validated
@NotUndefined
@javax.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.SpringCodegen", date = "2024-10-18T10:29:32.211856553Z[GMT]")


public class UserProfile {
    @JsonProperty("id-profile")

    private Long idProfile = null;

    @JsonProperty("idUser")

    private Long idUser = null;

    @JsonProperty("profileName")

    private String profileName = null;

    @JsonProperty("Pin")

    private String pin = null;


    public UserProfile idProfile(Long idProfile) {

        this.idProfile = idProfile;
        return this;
    }

    /**
     * Get idProfile
     *
     * @return idProfile
     **/

    @Schema(example = "1", required = false, description = "")

    public Long getIdProfile() {
        return idProfile;
    }


    public void setIdProfile(Long idProfile) {

        this.idProfile = idProfile;
    }

    public UserProfile idUser(Long idUser) {

        this.idUser = idUser;
        return this;
    }

    /**
     * Id del user al que pertenece ese profile
     *
     * @return idUser
     **/

    @Schema(example = "1", required = false, description = "Id del user al que pertenece ese profile")

    public Long getidUser() {
        return idUser;
    }


    public void setidUser(Long idUser) {

        this.idUser = idUser;
    }

    public UserProfile profileName(String profileName) {

        this.profileName = profileName;
        return this;
    }

    /**
     * Get profileName
     *
     * @return profileName
     **/

    @Schema(example = "Pablito", required = false, description = "")

    public String getProfileName() {
        return profileName;
    }


    public void setProfileName(String profileName) {

        this.profileName = profileName;
    }

    public UserProfile pin(String pin) {

        this.pin = pin;
        return this;
    }

    /**
     * Get pin
     *
     * @return pin
     **/

    @Schema(example = "1234", required = false, description = "")

    public String getPin() {
        return pin;
    }


    public void setPin(String pin) {

        this.pin = pin;
    }

    @Override
    public boolean equals(java.lang.Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        UserProfile userProfile = (UserProfile) o;
        return Objects.equals(this.idProfile, userProfile.idProfile) &&
                Objects.equals(this.idUser, userProfile.idUser) &&
                Objects.equals(this.profileName, userProfile.profileName) &&
                Objects.equals(this.pin, userProfile.pin);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idProfile, idUser, profileName, pin);
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("class UserProfile {\n");

        sb.append("    idProfile: ").append(toIndentedString(idProfile)).append("\n");
        sb.append("    idUser: ").append(toIndentedString(idUser)).append("\n");
        sb.append("    profileName: ").append(toIndentedString(profileName)).append("\n");
        sb.append("    pin: ").append(toIndentedString(pin)).append("\n");
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
