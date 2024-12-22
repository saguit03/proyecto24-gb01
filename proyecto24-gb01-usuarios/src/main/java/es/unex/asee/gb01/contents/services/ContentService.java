package es.unex.asee.gb01.contents.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.unex.asee.gb01.contents.clients.ContentsClient;
import es.unex.asee.gb01.contents.dto.CategoryDTO;
import es.unex.asee.gb01.contents.dto.MovieDTO;
import es.unex.asee.gb01.contents.dto.SeasonDTO;
import es.unex.asee.gb01.contents.dto.SeriesDTO;

import java.util.List;

@Service
public class ContentService {

    private final ContentsClient contentsClient;
    @Autowired
    public ContentService(ContentsClient contentsClient) {
        this.contentsClient = contentsClient;
    }

    public List<MovieDTO> getMovie(int movieId) {
        return contentsClient.getMovie(movieId);
    }

    public List<CategoryDTO> getCategory(int categoryId) {
        return contentsClient.getCategory(categoryId);
    }

    public List<SeriesDTO> getSeries(int seriesId) {
        return contentsClient.getSeries(seriesId);
    }

    public List<SeasonDTO> getSeason(int seasonId) {
        return contentsClient.getSeason(seasonId);
    }
}
