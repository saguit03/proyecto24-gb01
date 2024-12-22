package es.unex.asee.gb01.contents.dto;

public class ViewDTO {
    private long idView;
    private boolean isFinished;
    private long idProfile;
    private long idContent;
    private int typeContent;

    public ViewDTO() {
        this.idView = 0;
        this.isFinished = false;
        this.idProfile = 0;
        this.idContent = 0;
        this.typeContent = 0;
    }

    public ViewDTO(long idView, boolean isFinished, long idProfile, long idContent, int typeContent) {
        this.idView = idView;
        this.isFinished = isFinished;
        this.idProfile = idProfile;
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

    public long getIdProfile() {
        return idProfile;
    }

    public void setIdProfile(long idProfile) {
        this.idProfile = idProfile;
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
