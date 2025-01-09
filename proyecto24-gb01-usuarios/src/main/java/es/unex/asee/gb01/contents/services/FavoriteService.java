package es.unex.asee.gb01.contents.services;

import java.util.List;
import java.util.ArrayList;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.unex.asee.gb01.contents.entities.FavoriteEntity;
import es.unex.asee.gb01.contents.repositories.FavoritesRepository;
import es.unex.asee.gb01.contents.exceptions.UserNotOwnerException;
import es.unex.asee.gb01.contents.dto.ContentDTO;

@Service
public class FavoriteService {
    
    ContentService contentService;
    FavoritesRepository favoritesRepository;

    @Autowired
    public FavoriteService(ContentService contentService, FavoritesRepository favoritesRepository) {
        this.contentService = contentService;
        this.favoritesRepository = favoritesRepository;
    }

    public List<ContentDTO> getAllFavorites() {
        List<FavoriteEntity> favorites = favoritesRepository.findAll();
        List<ContentDTO> contents = new ArrayList<>();

        for (FavoriteEntity favorite : favorites) {
            ContentDTO content = contentService.getContentById(favorite.getIdContent(), favorite.getContentType());
            contents.add(content);
        }

        return contents;
    }

    public List<ContentDTO> getAllFavoritesByUser(long iduser) {
        List<FavoriteEntity> favorites = favoritesRepository.findByiduser(iduser);
        List<ContentDTO> contents = new ArrayList<>();

        for (FavoriteEntity favorite : favorites) {
            ContentDTO content = contentService.getContentById((int) favorite.getIdContent(), favorite.getContentType());
            contents.add(content);
        }

        return contents;
    }

    public FavoriteEntity addFavorite(Long iduser, int idContent, int contentType) {
        FavoriteEntity favorite = new FavoriteEntity();
        favorite.setiduser(iduser);
        favorite.setIdContent(idContent);
        favorite.setContentType(contentType);

        return favoritesRepository.save(favorite);
    }

    public void removeFavorite(Long iduser, Long idFavorite) {
        FavoriteEntity favorite = favoritesRepository.findById(idFavorite)
                .orElseThrow(() -> new EntityNotFoundException("Favorite not found"));

        // Verificar que el favorito pertenece al usuario
        if (!favorite.getiduser().equals(iduser)) {
            try{
                throw new UserNotOwnerException("User does not own this favorite");
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        favoritesRepository.delete(favorite);
    }


}
