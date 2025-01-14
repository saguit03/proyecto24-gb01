package es.unex.asee.gb01.contents.entities;

import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Entity;
import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import java.time.LocalDate;
import java.util.Objects;

@Entity
@Table(name = "subscriptions")
public class SubscriptionEntity {

    @Id
    @GeneratedValue
    private Long idsubscription;

    @Column(name = "iduser", nullable = false)
    private Long iduser;

    @Column(name = "startDate", nullable = false)
    private LocalDate startDate;

    @Column(name = "endDate")
    private LocalDate endDate;

    public Long getidsubscription() {
        return idsubscription;
    }

    public void setidsubscription(Long idsubscription) {
        this.idsubscription = idsubscription;
    }

    public Long getiduser() {
        return iduser;
    }

    public void setiduser(Long iduser) {
        this.iduser = iduser;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        SubscriptionEntity that = (SubscriptionEntity) o;
        return idsubscription.equals(that.idsubscription) &&
                iduser.equals(that.iduser) &&
                startDate.equals(that.startDate) &&
                endDate.equals(that.endDate);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idsubscription, iduser, startDate, endDate);
    }

    @Override
    public String toString() {
        return "SubscriptionEntity{" +
                "idsubscription=" + idsubscription +
                ", iduser=" + iduser +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                '}';
    }
}
