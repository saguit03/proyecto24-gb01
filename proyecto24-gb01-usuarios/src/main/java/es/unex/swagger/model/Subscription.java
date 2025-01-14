package es.unex.swagger.model;


import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.validation.annotation.Validated;
import es.unex.swagger.configuration.NotUndefined;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.annotation.Nulls;


/**
 * Subscription
 */
@Validated
@NotUndefined
@javax.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.SpringCodegen", date = "2024-10-18T10:29:32.211856553Z[GMT]")


public class Subscription {
    @JsonProperty("iduser")

    private Long iduser = null;

    @JsonProperty("idsubscription")

    private Long idsubscription = null;

    @JsonProperty("startDate")

    private String startDate = null;

    @JsonProperty("endDate")

    @JsonInclude(JsonInclude.Include.NON_ABSENT)  // Exclude from JSON if absent
    @JsonSetter(nulls = Nulls.FAIL)    // FAIL setting if the value is null
    private String endDate = null;

    /**
     * Get iduser
     *
     * @return iduser
     **/
    @Schema(required = false, description = "")
    public Long getiduser() {
        return iduser;
    }

    public void setiduser(Long iduser) {

        this.iduser = iduser;
    }

    public Subscription idsubscription(Long idsubscription) {

        this.idsubscription = idsubscription;
        return this;
    }

    /**
     * Get idsubscription
     *
     * @return idsubscription
     **/
    @Schema(example = "1", required = false, description = "")
    public Long getidsubscription() {
        return idsubscription;
    }


    public void setidsubscription(Long idsubscription) {
        this.idsubscription = idsubscription;
    }

    public Subscription startDate(String startDate) {

        this.startDate = startDate;
        return this;
    }

    /**
     * Get startDate
     *
     * @return startDate
     **/
    @Schema(example = "08/10/2022", required = false, description = "")
    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public Subscription endDate(String endDate) {
        this.endDate = endDate;
        return this;
    }

    /**
     * Get endDate
     *
     * @return endDate
     **/
    @Schema(example = "08/10/2024", description = "")
    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    @Override
    public boolean equals(java.lang.Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Subscription subscription = (Subscription) o;
        return
                Objects.equals(this.iduser, subscription.iduser) &&
                        Objects.equals(this.idsubscription, subscription.idsubscription) &&
                        Objects.equals(this.startDate, subscription.startDate) &&
                        Objects.equals(this.endDate, subscription.endDate);
    }

    @Override
    public int hashCode() {
        return Objects.hash(iduser, idsubscription, startDate, endDate);
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("class Subscription {\n");
        sb.append("    iduser: ").append(toIndentedString(iduser)).append("\n");
        sb.append("    idsubscription: ").append(toIndentedString(idsubscription)).append("\n");
        sb.append("    startDate: ").append(toIndentedString(startDate)).append("\n");
        sb.append("    endDate: ").append(toIndentedString(endDate)).append("\n");
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
