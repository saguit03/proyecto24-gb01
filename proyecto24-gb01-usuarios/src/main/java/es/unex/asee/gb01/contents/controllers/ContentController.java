package es.unex.asee.gb01.contents.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import es.unex.asee.gb01.contents.clients.ContentsClient;
import es.unex.asee.gb01.contents.dto.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/contents")
public class ContentController {
    ContentsClient contentsClient;
    
    @Autowired
    public ContentController(ContentsClient contentsClient) {
        this.contentsClient = contentsClient;
    }

    @GetMapping("/movies/{idMovie}")
    public MovieDTO getMovie(@PathVariable("idMovie") Integer idMovie) {
        return contentsClient.getMovie(idMovie);
    }

    @GetMapping("/categories/{idCategory}")
    public CategoryDTO getCategory(@PathVariable("idCategory") Integer idCategory) {
        return contentsClient.getCategory(idCategory);
    }

    @GetMapping("/series/{idSeries}")
    public SeriesDTO getSeries(@PathVariable("idSeries") Integer idSeries) {
        return contentsClient.getSeries(idSeries);
    }

    @GetMapping("/seasons/{idSeason}")
    public SeasonDTO getSeason(@PathVariable("idSeason") Integer idSeason) {
        return contentsClient.getSeason(idSeason);
    }

}
