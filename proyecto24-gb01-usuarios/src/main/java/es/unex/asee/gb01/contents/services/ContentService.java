package es.unex.asee.gb01.contents.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.unex.asee.gb01.contents.clients.ContentsClient;
import es.unex.asee.gb01.contents.dto.CategoryDTO;
import es.unex.asee.gb01.contents.dto.MovieDTO;
import es.unex.asee.gb01.contents.dto.SeasonDTO;
import es.unex.asee.gb01.contents.dto.SeriesDTO;
import es.unex.asee.gb01.contents.dto.ContentDTO;
import es.unex.asee.gb01.contents.dto.ContentType;

@Service
public class ContentService {

    private final ContentsClient contentsClient;
    @Autowired
    public ContentService(ContentsClient contentsClient) {
        this.contentsClient = contentsClient;
    }
    
    public ContentDTO getContentById(int idContent, int contentType) {
        switch (contentType) {
            case 1:
                return getMovie(idContent);
            case 2:
                return getSeason(idContent);
            case 3:
                return getSeries(idContent);
            case 4:
                return getCategory(idContent);
            default:
                return new ContentDTO("Not found", ContentType.MOVIE);
        }
    }

    public MovieDTO getMovie(int movieId) {
        return contentsClient.getMovie(movieId);
    }

    public CategoryDTO getCategory(int categoryId) {
        return contentsClient.getCategory(categoryId);
    }

    public SeriesDTO getSeries(int seriesId) {
        return contentsClient.getSeries(seriesId);
    }

    public SeasonDTO getSeason(int seasonId) {
        return contentsClient.getSeason(seasonId);
    }
}
