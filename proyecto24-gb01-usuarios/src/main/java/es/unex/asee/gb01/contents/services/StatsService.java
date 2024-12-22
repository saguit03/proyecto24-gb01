package es.unex.asee.gb01.contents.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import es.unex.asee.gb01.contents.clients.StatsClient;

import es.unex.asee.gb01.contents.dto.LanguageDTO;
import es.unex.asee.gb01.contents.dto.ViewDTO;
import es.unex.asee.gb01.contents.dto.ReviewDTO;

import java.util.List;

@Service
public class StatsService {
    private final StatsClient statsClient;

    @Autowired
    public StatsService(StatsClient statsClient) {
        this.statsClient = statsClient;
    }

    public List<LanguageDTO> getLanguage(int languageId) {
        return statsClient.getLanguage(languageId);
    }

    public List<ViewDTO> getView(int viewId) {
        return statsClient.getView(viewId);
    }

    public List<ReviewDTO> getReview(int reviewId) {
        return statsClient.getReview(reviewId);
    }

}
