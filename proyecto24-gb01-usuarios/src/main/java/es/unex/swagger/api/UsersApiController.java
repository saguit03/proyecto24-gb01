package es.unex.swagger.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import es.unex.asee.gb01.contents.entities.UserEntity;
import es.unex.asee.gb01.contents.mappers.UserMapper;
import es.unex.asee.gb01.contents.repositories.UserRepository;
import es.unex.swagger.model.Subscription;
import es.unex.swagger.model.User;
import es.unex.swagger.model.UserLogIn;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Schema;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;
import java.util.List;

@javax.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.SpringCodegen", date = "2024-10-18T10:29:32.211856553Z[GMT]")
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UsersApiController implements UsersApi {


    private static final Logger log = LoggerFactory.getLogger(UsersApiController.class);

    private final ObjectMapper objectMapper;

    private final HttpServletRequest request;
    @Autowired
    UserRepository userRepository;
    @Autowired
    private es.unex.asee.gb01.contents.services.UserService userService;
    @Autowired
    private UserMapper userMapper;

    @org.springframework.beans.factory.annotation.Autowired
    public UsersApiController(ObjectMapper objectMapper, HttpServletRequest request) {
        this.objectMapper = objectMapper;
        this.request = request;
    }

    public ResponseEntity<Void> deleteSubscriptionByUserCookie(
            @Parameter(in = ParameterIn.COOKIE, description = "", required = false, schema = @Schema()) @CookieValue(value = "SessionUserCookie", required = false) User sessionUserCookie) {
        String accept = request.getHeader("Accept");
        return new ResponseEntity<Void>(HttpStatus.NOT_IMPLEMENTED);
    }

    public ResponseEntity<User> deleteUserById(@Parameter(in = ParameterIn.PATH, description = "El id del user que se desea buscar.", required = false, schema = @Schema()) @PathVariable("idUser") Integer idUser
    ) {
        String accept = request.getHeader("Accept");
        if (accept != null && accept.contains("application/json")) {
            try {
                UserEntity user = userRepository.findById(idUser.longValue()).orElse(null);
                ResponseEntity<User> respuesta = new ResponseEntity<User>(UserMapper.toModel(user), HttpStatus.OK);
                userRepository.deleteById(idUser.longValue());

                return respuesta;
            } catch (Exception e) {
                log.error("Couldn't serialize response for content type application/json", e);
                return new ResponseEntity<User>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        return new ResponseEntity<User>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    public List<UserEntity> getAllUsers() {
        String accept = request.getHeader("Accept");
        if (accept != null && accept.contains("application/json")) {
            try {
                return userRepository.findAll();
            } catch (Exception e) {
                log.error("Couldn't serialize response for content type application/json", e);
                return null;
            }
        }
        return null;
    }

    public ResponseEntity<Subscription> getSubscriptionByUserCookie(@Parameter(in = ParameterIn.COOKIE, description = "", required = false, schema = @Schema()) @CookieValue(value = "SessionUserCookie", required = false) User sessionUserCookie) {
        String accept = request.getHeader("Accept");
        if (accept != null && accept.contains("application/json")) {
            try {
                return new ResponseEntity<Subscription>(objectMapper.readValue("{\n  \"idSubscription\" : 1,\n  \"tipo-subscription\" : {\n    \"Quantity\" : 6.0274563,\n    \"id-tipo-subscription\" : 0,\n    \"Name-tipo-subscription\" : \"Name-tipo-subscription\"\n  },\n  \"startDate\" : \"08/10/2022\",\n  \"idUser\" : 0,\n  \"endDate\" : \"08/10/2024\"\n}", Subscription.class), HttpStatus.NOT_IMPLEMENTED);
            } catch (IOException e) {
                log.error("Couldn't serialize response for content type application/json", e);
                return new ResponseEntity<Subscription>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        return new ResponseEntity<Subscription>(HttpStatus.NOT_IMPLEMENTED);
    }

    public ResponseEntity<User> getUserById(@PathVariable("idUser") Integer idUser) {
        String accept = request.getHeader("Accept");
        if (accept != null && (accept.contains("application/json") || accept.contains("application/xml"))) {
            try {
                UserEntity userEntity = userRepository.findById(idUser.longValue())
                        .orElse(null);

                if (userEntity == null) {
                    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
                }

                return new ResponseEntity<>(UserMapper.toModel(userEntity), HttpStatus.OK);
            } catch (Exception e) {
                log.error("Error retrieving user with id: " + idUser, e);
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    public ResponseEntity<User> postUser(@Valid @RequestBody UserLogIn body) {
        String accept = request.getHeader("Accept");
        if (accept != null && (accept.contains("application/json") || accept.contains("application/xml"))) {
            try {
                // Comprobar si existe usuario o email
                if (userRepository.findByUsername(body.getUsername()) != null ||
                        userRepository.findByEmail(body.getEmail()) != null) {
                    return new ResponseEntity<>(HttpStatus.CONFLICT); // 409 es más apropiado que 204
                }

                // Crear y guardar usuario
                User aux = new User(body.getUsername(), body.getPassword());
                aux.setEmail(body.getEmail());
                UserEntity savedUser = userRepository.save(UserMapper.toEntity(aux));

                return new ResponseEntity<>(UserMapper.toModel(savedUser), HttpStatus.CREATED);
            } catch (Exception e) {
                log.error("Error processing user creation request", e);
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE); // 406 para Accept header no soportado
    }


    // Nuevo método que acepta datos en formato form-urlencoded
    @PostMapping(consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public ResponseEntity<User> postUserForm(
            @RequestParam("name") String name,
            @RequestParam("surname") String surname,
            @RequestParam("username") String username,
            @RequestParam("email") String email,
            @RequestParam("password") String password) {

        try {
            // Validación para evitar duplicados
            if (userRepository.findByUsername(username) != null || userRepository.findByEmail(email) != null) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            // Crear el objeto User desde los parámetros individuales
            User body = new User();
            body.setUsername(username);
            body.setEmail(email);
            body.setPassword(password);
            body.setName(name);
            body.setSurname(surname);

            // Guardar en la base de datos
            UserEntity savedUser = userRepository.save(UserMapper.toEntity(body));
            return new ResponseEntity<>(UserMapper.toModel(savedUser), HttpStatus.CREATED);
        } catch (Exception e) {
            log.error("Couldn't serialize response for content type application/x-www-form-urlencoded", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<User> putUserById(@Parameter(in = ParameterIn.PATH, description = "El id del user que se desea buscar.", required = false, schema = @Schema()) @PathVariable("idUser") Integer idUser, @Valid @RequestBody User body
    ) {
        String accept = request.getHeader("Accept");
        if (accept != null && accept.contains("application/json")) {
            try {

                // Verificar si el usuario existe
                UserEntity existingUser = userRepository.findById(idUser.longValue())
                        .orElse(null);

                if (existingUser == null) {
                    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
                }

                if (body.getUsername() != null)
                    existingUser.setUsername(body.getUsername());
                if (body.getEmail() != null)
                    existingUser.setEmail(body.getEmail());
                if (body.getPassword() != null)
                    existingUser.setPassword(body.getPassword());
                if (body.getName() != null)
                    existingUser.setName(body.getName());
                if (body.getSurname() != null)
                    existingUser.setSurname(body.getSurname());

                UserEntity updatedUser = userRepository.save(existingUser);
                return new ResponseEntity<>(UserMapper.toModel(updatedUser), HttpStatus.OK);

            } catch (Exception e) {
                log.error("Couldn't serialize response for content type application/json", e);
                return new ResponseEntity<User>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        return new ResponseEntity<User>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    public ResponseEntity<Subscription> updateSubscriptionByUserCookie(
            @Parameter(in = ParameterIn.COOKIE, description = "", required = false, schema = @Schema()) @CookieValue(value = "User", required = false) User sessionUserCookie, @Parameter(in = ParameterIn.DEFAULT, description = "", schema = @Schema()) @Valid @RequestBody Subscription body
    ) {
        String accept = request.getHeader("Accept");
        if (accept != null && accept.contains("application/json")) {
            try {
                return new ResponseEntity<Subscription>(objectMapper.readValue("{\n  \"idSubscription\" : 1,\n  \"tipo-subscription\" : {\n    \"Quantity\" : 6.0274563,\n    \"id-tipo-subscription\" : 0,\n    \"Name-tipo-subscription\" : \"Name-tipo-subscription\"\n  },\n  \"startDate\" : \"08/10/2022\",\n  \"idUser\" : 0,\n  \"endDate\" : \"08/10/2024\"\n}", Subscription.class), HttpStatus.NOT_IMPLEMENTED);
            } catch (IOException e) {
                log.error("Couldn't serialize response for content type application/json", e);
                return new ResponseEntity<Subscription>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        return new ResponseEntity<Subscription>(HttpStatus.NOT_IMPLEMENTED);
    }

    public ResponseEntity<User> userLogIn(@Parameter(in = ParameterIn.DEFAULT, description = "", schema = @Schema()) @Valid @RequestBody UserLogIn body, HttpServletResponse response
    ) {
        String accept = request.getHeader("Accept");

        try {
            User user = null;
            if (userRepository.findByUsername(body.getUsername()) != null) {

                user = UserMapper.toModel(userRepository.findByUsername(body.getUsername()));
                if (!user.getPassword().equals(body.getPassword().trim())) {
                    log.error("La contraseña es incorrecta");
                    return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
                }
            } else {
                log.error("El user no existe");
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }


            Cookie cookieUser = new Cookie("User", user.getEmail());
            cookieUser.setPath("http://localhost:3000/");
            response.addCookie(cookieUser);

            return new ResponseEntity<User>(user, HttpStatus.OK);
        } catch (Exception e) {
            log.error("Couldn't serialize response for content type application/json", e);
            return new ResponseEntity<User>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
