package es.unex.asee.gb01.contents.dto;

public class ViewDTO {
    private long idView;
    private boolean isFinished;
    private long idprofile;
    private long idContent;
    private int typeContent;

    public ViewDTO() {
        this.idView = 0;
        this.isFinished = false;
        this.idprofile = 0;
        this.idContent = 0;
        this.typeContent = 0;
    }

    public ViewDTO(long idView, boolean isFinished, long idprofile, long idContent, int typeContent) {
        this.idView = idView;
        this.isFinished = isFinished;
        this.idprofile = idprofile;
        this.idContent = idContent;
        this.typeContent = typeContent;
    }

    public long getIdView() {
        return idView;
    }

    public void setIdView(long idView) {
        this.idView = idView;
    }

    public boolean isFinished() {
        return isFinished;
    }

    public void setFinished(boolean finished) {
        isFinished = finished;
    }

    public long getidprofile() {
        return idprofile;
    }

    public void setidprofile(long idprofile) {
        this.idprofile = idprofile;
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
