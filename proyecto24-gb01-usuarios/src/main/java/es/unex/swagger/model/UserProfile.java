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
    @JsonProperty("idprofile")

    private Long idprofile = null;

    @JsonProperty("iduser")

    private Long iduser = null;

    @JsonProperty("profilename")

    private String profilename = null;

    @JsonProperty("pin")

    private String pin = null;


    public UserProfile idprofile(Long idprofile) {

        this.idprofile = idprofile;
        return this;
    }

    /**
     * Get idprofile
     *
     * @return idprofile
     **/

    @Schema(example = "1", required = false, description = "")

    public Long getidprofile() {
        return idprofile;
    }


    public void setidprofile(Long idprofile) {

        this.idprofile = idprofile;
    }

    public UserProfile iduser(Long iduser) {

        this.iduser = iduser;
        return this;
    }

    /**
     * Id del user al que pertenece ese profile
     *
     * @return iduser
     **/

    @Schema(example = "1", required = false, description = "Id del user al que pertenece ese profile")

    public Long getiduser() {
        return iduser;
    }


    public void setiduser(Long iduser) {

        this.iduser = iduser;
    }

    public UserProfile profilename(String profilename) {

        this.profilename = profilename;
        return this;
    }

    /**
     * Get profilename
     *
     * @return profilename
     **/

    @Schema(example = "Pablito", required = false, description = "")

    public String getprofilename() {
        return profilename;
    }


    public void setprofilename(String profilename) {

        this.profilename = profilename;
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
        return Objects.equals(this.idprofile, userProfile.idprofile) &&
                Objects.equals(this.iduser, userProfile.iduser) &&
                Objects.equals(this.profilename, userProfile.profilename) &&
                Objects.equals(this.pin, userProfile.pin);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idprofile, iduser, profilename, pin);
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("class UserProfile {\n");

        sb.append("    idprofile: ").append(toIndentedString(idprofile)).append("\n");
        sb.append("    iduser: ").append(toIndentedString(iduser)).append("\n");
        sb.append("    profilename: ").append(toIndentedString(profilename)).append("\n");
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
