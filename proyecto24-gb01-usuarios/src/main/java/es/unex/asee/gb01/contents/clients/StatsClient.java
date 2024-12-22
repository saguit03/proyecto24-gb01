package es.unex.asee.gb01.contents.clients;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import es.unex.asee.gb01.contents.dto.ViewDTO;
import es.unex.asee.gb01.contents.dto.LanguageDTO;
import es.unex.asee.gb01.contents.dto.ReviewDTO;

import java.util.List;

@FeignClient(name = "stats-client", url = "http://localhost:8083")
public interface StatsClient {

    @GetMapping("/languages/{idLanguage}")
    List<LanguageDTO> getLanguage(@PathVariable("idLanguage") Integer idLanguage);

    @GetMapping("/views/{idView}")
    List<ViewDTO> getView(@PathVariable("idView") Integer idView);

    @GetMapping("/reviews/{idReview}")
    List<ReviewDTO> getReview(@PathVariable("idReview") Integer idReview);
}
