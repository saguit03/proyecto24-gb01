package es.unex.asee.gb01.contents.dto;

public class SeriesDTO extends ContentDTO {
    private long idSeries;
    private int numSeasons;

    public SeriesDTO() {
        super();
        super.setContentType(ContentType.SERIES);
        this.numSeasons = 0;
    }

    public SeriesDTO(int idSeries, String title, int numSeasons) {
        super(title, ContentType.SERIES);
        this.idSeries = idSeries;
        this.numSeasons = numSeasons;
    }

    public long getIdSeries() {
        return idSeries;
    }

    public void setIdSeries(long idSeries) {
        this.idSeries = idSeries;
    }

    public int getNumSeasons() {
        return numSeasons;
    }

    public void setNumSeasons(int numSeasons) {
        this.numSeasons = numSeasons;
    }

}
