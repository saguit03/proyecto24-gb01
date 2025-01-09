package es.unex.asee.gb01.contents.dto;

public class CategoryDTO extends ContentDTO {
    private long idCategory;

    public CategoryDTO() {
    }

    public CategoryDTO(long idCategory, String title) {
        super(title, ContentType.CATEGORY);
        this.idCategory = idCategory;
    }

    public long getIdCategory() {
        return idCategory;
    }

    public void setIdCategory(long idCategory) {
        this.idCategory = idCategory;
    }

}
