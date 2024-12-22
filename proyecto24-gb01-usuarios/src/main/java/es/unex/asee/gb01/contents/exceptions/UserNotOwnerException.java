package es.unex.asee.gb01.contents.exceptions;

public class UserNotOwnerException extends Exception {
    private static final long serialVersionUID = 1L;

    public UserNotOwnerException() {
        super("User is not the owner.");
    }

    public UserNotOwnerException(String message) {
        super(message);
    }
}