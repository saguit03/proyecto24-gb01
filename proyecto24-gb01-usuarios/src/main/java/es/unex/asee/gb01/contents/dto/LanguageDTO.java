package es.unex.asee.gb01.contents.dto;

public class LanguageDTO {
    private long idLanguage;
    private String name;

    public LanguageDTO() {
        this.idLanguage = 0;
        this.name = "";
    }

    public LanguageDTO(long idLanguage, String name) {
        this.idLanguage = idLanguage;
        this.name = name;
    }

    public long getIdLanguage() {
        return idLanguage;
    }

    public void setIdLanguage(long idLanguage) {
        this.idLanguage = idLanguage;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}
