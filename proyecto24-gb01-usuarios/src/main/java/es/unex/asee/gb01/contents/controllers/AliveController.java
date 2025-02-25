package es.unex.asee.gb01.contents.controllers;

import org.springframework.http.ResponseEntity;        
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/alive")
public class StatsController {

    @GetMapping("")
    public ResponseEntity getLanguage() {
        return ResponseEntity.ok("OK");
    }
}
