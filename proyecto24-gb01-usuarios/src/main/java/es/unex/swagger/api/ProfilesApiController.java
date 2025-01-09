package es.unex.swagger.api;


import com.fasterxml.jackson.databind.ObjectMapper;
import es.unex.asee.gb01.contents.entities.UserProfileEntity;
import es.unex.asee.gb01.contents.mappers.UserProfileMapper;
import es.unex.asee.gb01.contents.repositories.UserProfileRepository;
import es.unex.swagger.model.User;
import es.unex.swagger.model.UserProfile;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Schema;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.io.IOException;
import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;

@javax.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.SpringCodegen", date = "2024-10-18T10:29:32.211856553Z[GMT]")
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ProfilesApiController implements ProfilesApi {

    private static final Logger log = LoggerFactory.getLogger(ProfilesApiController.class);
    private final ObjectMapper objectMapper;
    private final HttpServletRequest request;
    @Autowired
    private UserProfileMapper userProfileMapper;
    @Autowired
    private UserProfileRepository userProfileRepository;

    @org.springframework.beans.factory.annotation.Autowired
    public ProfilesApiController(ObjectMapper objectMapper, HttpServletRequest request) {
        this.objectMapper = objectMapper;
        this.request = request;
    }

    public ResponseEntity<UserProfile> deleteUserProfileById(@Parameter(in = ParameterIn.PATH, description = "El id del profile de user que se desea eliminar.", required = false, schema = @Schema()) @PathVariable("idprofile") Long idprofile, @Parameter(in = ParameterIn.COOKIE, description = "", required = false, schema = @Schema()) @CookieValue(value = "SessionUserCookie", required = false) User sessionUserCookie) {
        String accept = request.getHeader("Accept");
        if (accept != null && accept.contains("application/json")) {
            try {
                UserProfileEntity userProfile = userProfileRepository.findById(idprofile.longValue()).orElse(null);
                ResponseEntity<UserProfile> respuesta = new ResponseEntity<UserProfile>(UserProfileMapper.toModel(userProfile), HttpStatus.OK);
                userProfileRepository.deleteById(idprofile.longValue());

                return respuesta;
            } catch (Exception e) {
                log.error("Couldn't serialize response for content type application/json", e);
                return new ResponseEntity<UserProfile>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        return new ResponseEntity<UserProfile>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    public ResponseEntity<List<UserProfile>> getProfilesByUserId(
            @PathVariable("iduser") Long iduser) {

        // Simulación de datos: Reemplazar con acceso real a la base de datos o servicio
        List<UserProfileEntity> allProfiles = userProfileRepository.findByiduser(iduser);


        return ResponseEntity.ok(userProfileMapper.toModelList(allProfiles));
    }

    public ResponseEntity<UserProfile> postUserProfile(@Parameter(in = ParameterIn.DEFAULT, description = "", schema = @Schema()) @Valid @RequestBody UserProfile body
    ) {
        String accept = request.getHeader("Accept");
        if (accept != null && accept.contains("application/json")) {
            try {
                userProfileRepository.save(UserProfileMapper.toEntity(body));
                return new ResponseEntity<UserProfile>(body, HttpStatus.CREATED);
            } catch (Exception e) {
                log.error("Couldn't serialize response for content type application/json", e);
                return new ResponseEntity<UserProfile>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        return new ResponseEntity<UserProfile>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    public ResponseEntity<UserProfile> putUserProfileById(@Parameter(in = ParameterIn.PATH, description = "El id del profile de user que se desea eliminar.", required = false, schema = @Schema()) @PathVariable("idprofile") Long idprofile,@Parameter(in = ParameterIn.COOKIE, description = "", required = false, schema = @Schema()) @CookieValue(value = "User", required = false) User sessionUserCookie, @Parameter(in = ParameterIn.DEFAULT, description = "", schema = @Schema()) @Valid @RequestBody UserProfile body
    ) {
        String accept = request.getHeader("Accept");
        if (accept != null && accept.contains("application/json")) {
            try {
                System.out.println(body);
                userProfileRepository.deleteById(idprofile);
                userProfileRepository.save(UserProfileMapper.toEntity(body));
                return new ResponseEntity<UserProfile>(body, HttpStatus.OK);
            } catch (Exception e) {
                log.error("Couldn't serialize response for content type application/json", e);
                return new ResponseEntity<UserProfile>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        return new ResponseEntity<UserProfile>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
