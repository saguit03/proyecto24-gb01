package es.unex.asee.gb01.contents.dto;

public class MovieDTO extends ContentDTO {
    private long idMovie;
    private String urlVideo;
    private int duration;

    public MovieDTO() {
        super();
        super.setContentType(ContentType.MOVIE);
        this.duration = 0;
        this.urlVideo = "";
    }

    public MovieDTO(String title, String urlVideo, int duration) {
        super(title, ContentType.MOVIE);
        this.duration = duration;
        this.urlVideo = urlVideo;
    }

    public long getIdMovie() {
        return idMovie;
    }

    public void setIdMovie(long idMovie) {
        this.idMovie = idMovie;
    }

    public String getUrlVideo() {
        return urlVideo;
    }

    public void setUrlVideo(String urlVideo) {
        this.urlVideo = urlVideo;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

}
