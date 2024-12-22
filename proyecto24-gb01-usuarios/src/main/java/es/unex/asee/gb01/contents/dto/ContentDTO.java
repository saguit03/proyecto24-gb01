package es.unex.asee.gb01.contents.dto;

public class ContentDTO {
    private String title;
    private ContentType contentType;

    public ContentDTO() {
    }

    public ContentDTO(String title, ContentType contentType) {
        this.title = title;
        this.contentType = contentType;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public ContentType getContentType() {
        return contentType;
    }

    public void setContentType(ContentType contentType) {
        this.contentType = contentType;
    }

    public int getContentTypeInt() {
        return ContentType.toInt(contentType);
    }
}
