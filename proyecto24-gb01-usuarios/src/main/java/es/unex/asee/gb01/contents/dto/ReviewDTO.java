package es.unex.asee.gb01.contents.dto;

public class ReviewDTO {
    private long idReview;
    private int rating;
    private long idContent;
    private int typeContent;

    public ReviewDTO() {
        this.idReview = 0;
        this.rating = 0;
        this.idContent = 0;
        this.typeContent = 0;
    }

    public ReviewDTO(long idReview, int rating, long idContent, int typeContent) {
        this.idReview = idReview;
        this.rating = rating;
        this.idContent = idContent;
        this.typeContent = typeContent;
    }

    public long getIdReview() {
        return idReview;
    }

    public void setIdReview(long idReview) {
        this.idReview = idReview;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public long getIdContent() {
        return idContent;
    }

    public void setIdContent(long idContent) {
        this.idContent = idContent;
    }

    public int getTypeContent() {
        return typeContent;
    }

    public void setTypeContent(int typeContent) {
        this.typeContent = typeContent;
    }
}
