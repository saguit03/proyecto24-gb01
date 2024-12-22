package es.unex.asee.gb01.contents.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import es.unex.asee.gb01.contents.clients.StatsClient;
import es.unex.asee.gb01.contents.dto.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@RestController
@RequestMapping("/stats")
public class StatsController {

    StatsClient statsClient;

    @Autowired
    public StatsController(StatsClient statsClient) {
        this.statsClient = statsClient;
    }


    @GetMapping("/languages/{idLanguage}")
    public List<LanguageDTO> getLanguage(@PathVariable("idLanguage") Integer idLanguage) {
        return statsClient.getLanguage(idLanguage);
    }

    @GetMapping("/views/{idView}")
    public List<ViewDTO> getView(@PathVariable("idView") Integer idView) {
        return statsClient.getView(idView);
    }

    @GetMapping("/reviews/{idReview}")
    public List<ReviewDTO> getReview(@PathVariable("idReview") Integer idReview) {
        return statsClient.getReview(idReview);
    }

}
