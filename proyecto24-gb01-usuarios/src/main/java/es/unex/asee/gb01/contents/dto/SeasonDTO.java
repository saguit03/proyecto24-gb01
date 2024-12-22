package es.unex.asee.gb01.contents.dto;

public class SeasonDTO extends ContentDTO {
    private long idSeason;
    private int numChapters;

    public SeasonDTO() {
        super();
        super.setContentType(ContentType.SEASON);
        this.numChapters = 0;
    }

    public SeasonDTO(int idSeason, String title, int numChapters) {
        super(title, ContentType.SEASON);
        this.idSeason = idSeason;
        this.numChapters = numChapters;
    }

    public long getIdSeason() {
        return idSeason;
    }

    public void setIdSeason(long idSeason) {
        this.idSeason = idSeason;
    }

    public int getNumChapters() {
        return numChapters;
    }

    public void setNumChapters(int numChapters) {
        this.numChapters = numChapters;
    }
}
