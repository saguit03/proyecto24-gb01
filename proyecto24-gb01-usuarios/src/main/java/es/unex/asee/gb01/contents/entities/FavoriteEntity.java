package es.unex.asee.gb01.contents.entities;

import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Entity;
import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import java.util.Objects;

@Entity
@Table(name = "favorites")
public class FavoriteEntity {
    @Id
    @GeneratedValue
    private long idFavorite;

    @Column(name = "idUser", nullable = false)
    private long idUser;

    @Column(name = "idContent", nullable = false)
    private long idContent;

    private int contentType;

    public FavoriteEntity() {
    }

    public FavoriteEntity(Long idUser, Long idContent, int contentType) {
        this.idUser = idUser;
        this.idContent = idContent;
        this.contentType = contentType;
    }

    public Long getIdFavorite() {
        return idFavorite;
    }

    public void setIdFavorite(Long idFavorite) {
        this.idFavorite = idFavorite;
    }

    public Long getIdUser() {
        return idUser;
    }

    public void setIdUser(Long idUser) {
        this.idUser = idUser;
    }

    public Long getIdContent() {
        return idContent;
    }

    public void setIdContent(Long idContent) {
        this.idContent = idContent;
    }

    public int getContentType() {
        return contentType;
    }

    public void setContentType(int contentType) {
        this.contentType = contentType;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        FavoriteEntity that = (FavoriteEntity) o;
        return Objects.equals(idUser, that.idUser) &&
                Objects.equals(idContent, that.idContent) &&
                contentType == that.contentType
                ;
    }

    @Override
    public int hashCode() {
        return Objects.hash(idUser, idContent, contentType);
    }

    @Override
    public String toString() {
        return "FavoriteEntity{" +
                "idFavorite=" + idFavorite +
                ", idUser=" + idUser +
                ", idContent=" + idContent +
                ", contentType=" + contentType +
                '}';
    }
}

