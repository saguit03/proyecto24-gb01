package es.unex.asee.gb01.contents.dto;

public enum ContentType {
    MOVIE,
    SERIES,
    SEASON,
    CATEGORY;

    public static ContentType fromString(String type) {
        for (ContentType contentType : ContentType.values()) {
            if (contentType.toString().equalsIgnoreCase(type)) {
                return contentType;
            }
        }
        return null;
    }

    public static int toInt(ContentType contentType) {
        switch (contentType) {
            case MOVIE:
                return 1;
            case SERIES:
                return 2;
            case SEASON:
                return 3;
            case CATEGORY:
                return 4;
            default:
                return 0;
        }
    }

    public static ContentType fromInt(int type) {
        switch (type) {
            case 1:
                return MOVIE;
            case 2:
                return SERIES;
            case 3:
                return SEASON;
            case 4:
                return CATEGORY;
            default:
                return null;
        }
    }

}

