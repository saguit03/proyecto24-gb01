const funcionesComunes = {
    // Funciones comunes
    search: (querySearch)=>{
        const query = new URLSearchParams()
        console.log(querySearch.elements)
        for ( let element in  querySearch.elements){
            query.append(element.name,element.value)
        }
        return query
    }
    // searchContents: (title)
}
export default funcionesComunes