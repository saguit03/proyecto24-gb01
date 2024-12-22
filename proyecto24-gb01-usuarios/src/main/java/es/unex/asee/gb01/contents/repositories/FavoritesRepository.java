package es.unex.asee.gb01.contents.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import es.unex.asee.gb01.contents.entities.FavoriteEntity;

@Repository
public interface FavoritesRepository extends JpaRepository<FavoriteEntity, Long> {
    List<FavoriteEntity> findByIdUser(long idUser);
}
