package es.unex.asee.gb01.contents.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import es.unex.asee.gb01.contents.entities.FavoriteEntity;
import es.unex.asee.gb01.contents.repositories.FavoritesRepository;
import es.unex.asee.gb01.contents.services.FavoriteService;
import es.unex.asee.gb01.contents.dto.ContentDTO;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/favorites")
public class FavoritesController {

    FavoriteService favoriteService;
    FavoritesRepository favoritesRepository;

    @Autowired
    public FavoritesController(FavoriteService favoriteService, FavoritesRepository favoritesRepository) {
        this.favoriteService = favoriteService;
        this.favoritesRepository = favoritesRepository;
    }

    @GetMapping("")
    public Iterable<ContentDTO> getAllFavorites() {
        return favoriteService.getAllFavorites();
    }

    @GetMapping("/{iduser}")
    public Iterable<ContentDTO> getAllFavoritesByUser(@PathVariable long iduser) {
        return favoriteService.getAllFavoritesByUser(iduser);
    }

    @PostMapping("/{iduser}")
    public ResponseEntity<FavoriteEntity> addFavorite(
            @PathVariable Long iduser,
            @ModelAttribute FavoriteEntity favoriteEntity) {
        favoriteEntity.setiduser(iduser);
        FavoriteEntity favorite = favoriteService.addFavorite(
                favoriteEntity.getiduser(),
                favoriteEntity.getIdContent(),
                favoriteEntity.getContentType()
        );
        return ResponseEntity.ok(favorite);
    }

    @DeleteMapping("/{iduser}/{idFavorite}")
    public ResponseEntity<Void> removeFavorite(
            @PathVariable Long iduser,
            @PathVariable Long idFavorite) {
        favoriteService.removeFavorite(iduser, idFavorite);
        return ResponseEntity.noContent().build();
    }
}
