package es.unex.asee.gb01.contents.dto;

public class CategoryDTO {
    private long idCategory;
    private String name;

    public CategoryDTO() {
    }

    public CategoryDTO(long idCategory, String name) {
        this.idCategory = idCategory;
        this.name = name;
    }

    public long getIdCategory() {
        return idCategory;
    }

    public void setIdCategory(long idCategory) {
        this.idCategory = idCategory;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}
