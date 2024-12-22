package es.unex.asee.gb01.contents.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import es.unex.asee.gb01.contents.entities.FavoriteEntity;
import es.unex.asee.gb01.contents.repositories.FavoritesRepository;
import es.unex.asee.gb01.contents.services.FavoriteService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;


@RestController
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
    public Iterable<FavoriteEntity> getAllFavorites() {
        return favoriteService.getAllFavorites();
    }

    @GetMapping("/{idUser}")
    public Iterable<FavoriteEntity> getAllFavoritesByUser(@PathVariable long idUser) {
        return favoriteService.getAllFavoritesByUser(idUser);
    }

    @PostMapping("/{idUser}")
    public ResponseEntity<FavoriteEntity> addFavorite(
            @PathVariable Long idUser,
            @RequestParam Long idContent,
            @RequestParam int contentType) {
        FavoriteEntity favorite = favoriteService.addFavorite(idUser, idContent, contentType);
        return ResponseEntity.ok(favorite);
    }


    @DeleteMapping("/{idUser}/{idFavorite}")
    public ResponseEntity<Void> removeFavorite(
            @PathVariable Long idUser,
            @PathVariable Long idFavorite) {
        favoriteService.removeFavorite(idUser, idFavorite);
        return ResponseEntity.noContent().build();
    }


}
