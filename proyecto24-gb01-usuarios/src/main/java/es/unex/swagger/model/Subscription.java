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
    @JsonProperty("idUser")

    private Long idUser = null;

    @JsonProperty("idSubscription")

    private Long idSubscription = null;

    @JsonProperty("startDate")

    private String startDate = null;

    @JsonProperty("endDate")

    @JsonInclude(JsonInclude.Include.NON_ABSENT)  // Exclude from JSON if absent
    @JsonSetter(nulls = Nulls.FAIL)    // FAIL setting if the value is null
    private String endDate = null;

    /**
     * Get idUser
     *
     * @return idUser
     **/
    @Schema(required = false, description = "")
    public Long getidUser() {
        return idUser;
    }

    public void setidUser(Long idUser) {

        this.idUser = idUser;
    }

    public Subscription idSubscription(Long idSubscription) {

        this.idSubscription = idSubscription;
        return this;
    }

    /**
     * Get idSubscription
     *
     * @return idSubscription
     **/
    @Schema(example = "1", required = false, description = "")
    public Long getIdSubscription() {
        return idSubscription;
    }


    public void setIdSubscription(Long idSubscription) {
        this.idSubscription = idSubscription;
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
                Objects.equals(this.idUser, subscription.idUser) &&
                        Objects.equals(this.idSubscription, subscription.idSubscription) &&
                        Objects.equals(this.startDate, subscription.startDate) &&
                        Objects.equals(this.endDate, subscription.endDate);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idUser, idSubscription, startDate, endDate);
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("class Subscription {\n");
        sb.append("    idUser: ").append(toIndentedString(idUser)).append("\n");
        sb.append("    idSubscription: ").append(toIndentedString(idSubscription)).append("\n");
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
