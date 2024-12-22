package es.unex.asee.gb01.contents.services;

import java.util.List;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.unex.asee.gb01.contents.entities.FavoriteEntity;
import es.unex.asee.gb01.contents.repositories.FavoritesRepository;
import es.unex.asee.gb01.contents.exceptions.UserNotOwnerException;

@Service
public class FavoriteService {
    
    ContentService contentService;
    FavoritesRepository favoritesRepository;

    @Autowired
    public FavoriteService(ContentService contentService, FavoritesRepository favoritesRepository) {
        this.contentService = contentService;
        this.favoritesRepository = favoritesRepository;
    }

    public List<FavoriteEntity> getAllFavorites() {
        return favoritesRepository.findAll();
    }

    public List<FavoriteEntity> getAllFavoritesByUser(long idUser) {
        return favoritesRepository.findByIdUser(idUser);
    }

    public FavoriteEntity addFavorite(Long idUser, Long idContent, int contentType) {
        FavoriteEntity favorite = new FavoriteEntity();
        favorite.setIdUser(idUser);
        favorite.setIdContent(idContent);
        favorite.setContentType(contentType);

        return favoritesRepository.save(favorite);
    }

    public void removeFavorite(Long idUser, Long idFavorite) {
        FavoriteEntity favorite = favoritesRepository.findById(idFavorite)
                .orElseThrow(() -> new EntityNotFoundException("Favorite not found"));

        // Verificar que el favorito pertenece al usuario
        if (!favorite.getIdUser().equals(idUser)) {
            try{
                throw new UserNotOwnerException("User does not own this favorite");
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        favoritesRepository.delete(favorite);
    }


}
