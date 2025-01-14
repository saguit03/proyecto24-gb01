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

    @Column(name = "iduser", nullable = false)
    private long iduser;

    @Column(name = "idContent", nullable = false)
    private int idContent;

    private int contentType;

    public FavoriteEntity() {
    }

    public FavoriteEntity(Long iduser, int idContent, int contentType) {
        this.iduser = iduser;
        this.idContent = idContent;
        this.contentType = contentType;
    }

    public Long getIdFavorite() {
        return idFavorite;
    }

    public void setIdFavorite(Long idFavorite) {
        this.idFavorite = idFavorite;
    }

    public Long getiduser() {
        return iduser;
    }

    public void setiduser(Long iduser) {
        this.iduser = iduser;
    }

    public int getIdContent() {
        return idContent;
    }

    public void setIdContent(int idContent) {
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
        return Objects.equals(iduser, that.iduser) &&
                Objects.equals(idContent, that.idContent) &&
                contentType == that.contentType
                ;
    }

    @Override
    public int hashCode() {
        return Objects.hash(iduser, idContent, contentType);
    }

    @Override
    public String toString() {
        return "FavoriteEntity{" +
                "idFavorite=" + idFavorite +
                ", iduser=" + iduser +
                ", idContent=" + idContent +
                ", contentType=" + contentType +
                '}';
    }
}

