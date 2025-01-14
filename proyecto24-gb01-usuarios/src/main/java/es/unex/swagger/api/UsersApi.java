/**
 * NOTE: This class is auto generated by the swagger code generator program (3.0.62).
 * https://github.com/swagger-api/swagger-codegen
 * Do not edit the class manually.
 */
package es.unex.swagger.api;


import es.unex.asee.gb01.contents.entities.UserEntity;
import es.unex.swagger.model.Subscription;
import es.unex.swagger.model.User;
import es.unex.swagger.model.UserLogIn;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.CrossOrigin;


import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.List;

@javax.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.SpringCodegen", date = "2024-10-18T10:29:32.211856553Z[GMT]")
@Validated
@CrossOrigin(origins = "*", allowedHeaders = "*")

public interface UsersApi {

    @Operation(summary = "Elimina la suscripción de un user, dando la id de la suscripción", description = "Elimina la suscripción de un user, dando la id de la suscripción.", security = {
            @SecurityRequirement(name = "cookieAuth"),
            @SecurityRequirement(name = "medifli_auth", scopes = {
                    "write:users",
                    "read:users"})}, tags = {"subscription"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Operación exitosa."),

            @ApiResponse(responseCode = "400", description = "Valor no soportado"),

            @ApiResponse(responseCode = "404", description = "Suscripción no encontrada")})
    @RequestMapping(value = "/users/subscriptions",
            method = RequestMethod.DELETE)
    ResponseEntity<Void> deleteSubscriptionByUserCookie(@Parameter(in = ParameterIn.COOKIE, description = "", required = false, schema = @Schema()) @CookieValue(value = "SessionUserCookie", required = false) User sessionUserCookie
    );


    @Operation(summary = "Elimina el user por su id", description = "Elimina el user dado su id en el endpoint.", security = {
            @SecurityRequirement(name = "cookieAuth"),
            @SecurityRequirement(name = "medifli_auth", scopes = {
                    "write:users",
                    "read:users"})}, tags = {"user"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Operación exitosa.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = User.class))),

            @ApiResponse(responseCode = "400", description = "Valor no soportado"),

            @ApiResponse(responseCode = "404", description = "User no encontrado")})
    @RequestMapping(value = "/users/{iduser}",
            produces = {"application/json", "application/xml"},
            method = RequestMethod.DELETE)
    ResponseEntity<User> deleteUserById(@Parameter(in = ParameterIn.PATH, description = "El id del user que se desea buscar.", required = false, schema = @Schema()) @PathVariable("iduser") Integer iduser
    );


    @Operation(summary = "Devuelve la información de todos los users", description = " Devuelve la lista de todos los users del sistema registrados.", security = {
            @SecurityRequirement(name = "cookieAuth"),
            @SecurityRequirement(name = "medifli_auth", scopes = {
                    "write:users",
                    "read:users"})}, tags = {"user"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Operación exitosa", content = @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = User.class)))),

            @ApiResponse(responseCode = "400", description = "Invalid ID supplied"),

            @ApiResponse(responseCode = "404", description = "User not found")})
    @RequestMapping(value = "/users",
            produces = {"application/json", "application/xml"},
            method = RequestMethod.GET)
    List<UserEntity> getAllUsers();


    @Operation(summary = "Devuelve la suscripción de un user.", description = "Devuelve la suscripción de un user, a partir de la cookie guardada en el navegador sobre el user.", security = {
            @SecurityRequirement(name = "cookieAuth"),
            @SecurityRequirement(name = "medifli_auth", scopes = {
                    "write:users",
                    "read:users"})}, tags = {"subscription"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Operación exitosa.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Subscription.class))),

            @ApiResponse(responseCode = "400", description = "Valor no soportado"),

            @ApiResponse(responseCode = "404", description = "Suscripción no encontrada")})
    @RequestMapping(value = "/users/subscriptions",
            produces = {"application/json", "application/xml", "application/x-www-form-urlencoded"},
            method = RequestMethod.GET)
    ResponseEntity<Subscription> getSubscriptionByUserCookie(@Parameter(in = ParameterIn.COOKIE, description = "", required = false, schema = @Schema()) @CookieValue(value = "SessionUserCookie", required = false) User sessionUserCookie
    );


    @Operation(summary = "Devuelve el user por su id", description = "Devuelve toda la infomración del user, dada su id", security = {
            @SecurityRequirement(name = "cookieAuth"),
            @SecurityRequirement(name = "medifli_auth", scopes = {
                    "write:users",
                    "read:users"})}, tags = {"user"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Operación exitosa.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = User.class))),

            @ApiResponse(responseCode = "400", description = "Valor no soportado"),

            @ApiResponse(responseCode = "404", description = "User no encontrado")})
    @RequestMapping(value = "/users/{iduser}",
            produces = {"application/json", "application/xml"},
            method = RequestMethod.GET)
    ResponseEntity<User> getUserById(@Parameter(in = ParameterIn.PATH, description = "El id del user que se desea buscar.", required = false, schema = @Schema()) @PathVariable("iduser") Integer iduser
    );

    // Nuevo método que acepta datos en formato form-urlencoded
    @PostMapping(value = "/users", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    ResponseEntity<User> postUserForm(
            @RequestParam("name") String name,
            @RequestParam("surname") String surname,
            @RequestParam("username") String username,
            @RequestParam("email") String email,
            @RequestParam("password") String password);

    @Operation(summary = "Actualiza la información del user por su id", description = "Actualiza la información del user dado su id en el endpoint.", security = {
            @SecurityRequirement(name = "cookieAuth"),
            @SecurityRequirement(name = "medifli_auth", scopes = {
                    "write:users",
                    "read:users"})}, tags = {"user"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Operación exitosa.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = User.class))),

            @ApiResponse(responseCode = "400", description = "Valor no soportado"),

            @ApiResponse(responseCode = "404", description = "User no encontrado")})
    @RequestMapping(value = "/users/{iduser}",
            produces = {"application/json", "application/xml"},
            consumes = {"application/json", "application/xml", "application/x-www-form-urlencoded"},
            method = RequestMethod.PUT)
    ResponseEntity<User> putUserById(@Parameter(in = ParameterIn.PATH, description = "El id del user que se desea buscar.", required = false, schema = @Schema()) @PathVariable("iduser") Integer iduser, @Valid @RequestBody User body
    );


    @Operation(summary = "Actualiza la suscripción de un user, dando la cookie del user", description = "Actualiza la suscripción de un user, dando la cookie del user.", security = {
            @SecurityRequirement(name = "cookieAuth"),
            @SecurityRequirement(name = "medifli_auth", scopes = {
                    "write:users",
                    "read:users"})}, tags = {"subscription"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Operación exitosa.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Subscription.class))),

            @ApiResponse(responseCode = "400", description = "Valor no soportado"),

            @ApiResponse(responseCode = "404", description = "Suscripción no encontrada")})
    @RequestMapping(value = "/users/subscriptions",
            produces = {"application/json", "application/xml", "application/x-www-form-urlencoded"},
            consumes = {"application/json", "application/xml", "application/x-www-form-urlencoded"},
            method = RequestMethod.PUT)
    ResponseEntity<Subscription> updateSubscriptionByUserCookie(@Parameter(in = ParameterIn.COOKIE, description = "", required = false, schema = @Schema()) @CookieValue(value = "SessionUserCookie", required = false) User sessionUserCookie
            , @Parameter(in = ParameterIn.DEFAULT, description = "", schema = @Schema()) @Valid @RequestBody Subscription body
    );


    @Operation(summary = "Inicio de sesión de un user", description = "Inicio de sesión de un user, añadiendo la cookie para mantener la sesión abierta.", security = {
            @SecurityRequirement(name = "cookieAuth"),
            @SecurityRequirement(name = "medifli_auth", scopes = {
                    "write:users",
                    "read:users"})}, tags = {"user"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully authenticated. The session ID is returned in a cookie named `JSESSIONID`. You need to include this cookie in subsequent requests.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = User.class))),

            @ApiResponse(responseCode = "400", description = "Valor no soportado"),

            @ApiResponse(responseCode = "404", description = "User no encontrado")})
    @RequestMapping(value = "/users/login",
            produces = {"application/json", "application/xml", "application/x-www-form-urlencoded"},
            consumes = {"application/json", "application/xml", "application/x-www-form-urlencoded"},
            method = RequestMethod.POST)
    ResponseEntity<User> userLogIn(@Parameter(in = ParameterIn.DEFAULT, description = "", schema = @Schema()) @Valid @RequestBody UserLogIn body, HttpServletResponse response
    );
}

