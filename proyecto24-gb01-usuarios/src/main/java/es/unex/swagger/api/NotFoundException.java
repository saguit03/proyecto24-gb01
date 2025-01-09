package es.unex.swagger.api;

import org.springframework.web.bind.annotation.CrossOrigin;

@javax.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.SpringCodegen", date = "2024-10-18T10:29:32.211856553Z[GMT]")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class NotFoundException extends ApiException {
    private int code;

    public NotFoundException(int code, String msg) {
        super(code, msg);
        this.code = code;

    }
}
