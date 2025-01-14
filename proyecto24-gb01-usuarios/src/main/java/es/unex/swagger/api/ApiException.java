package es.unex.swagger.api;

import org.springframework.web.bind.annotation.CrossOrigin;
@javax.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.SpringCodegen", date = "2024-10-18T10:29:32.211856553Z[GMT]")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ApiException extends Exception {
    private int code;

    public ApiException(int code, String msg) {
        super(msg);
        this.code = code;
    }
}
