const { throwCustomError } = require("../utils/functions");
const { createLibroMongo, getLibroMongo,getLibrosMongo, updateLibroMongo, softDeleteLibroMongo} = require("./libro.actions");

async function readLibroConFiltros(query) {
  //const clavesDeseadas = ["genero", "fechaPublicacion", "editorial", "titulo", "autor"];
  const { genero, fechaPublicacion, editorial, titulo, autor, todo, ...resto} = query;

        // Crear nuevo objeto solo con claves existentes
       // const filtros = Object.fromEntries(
       //   Object.entries(query).filter(([clave]) => clavesDeseadas.includes(clave))
       // );
       if (Object.keys(resto).length>0){
        throw new Error ("No puedes filtrar por eso");
       }
        var resultadosBusqueda;
        console.log(todo)
        if(todo==="true"){
            resultadosBusqueda = await getLibrosMongo(query );

        }else{
            resultadosBusqueda = await getLibrosMongo({...query, isDeleted: false });
        }
        
    return resultadosBusqueda;
}
async function readLibro(id) {
    const resultadosBusqueda = await getLibroMongo(id);
    return resultadosBusqueda;
}

async function createLibro(datos) {
    const { tipo, relleno, precio, masa, cantidad, coccion } = datos;

    // hacer llamado a base de datos con el filtro de tipo
    const LibroCreado = await createLibroMongo(datos);

    return LibroCreado;
}


async function updateLibro(datos, userId) {
    const { _id, ...cambios } = datos;

    // hacer llamado a base de datos con el filtro de tipo
    const LibroCreado = await updateLibroMongo(_id, cambios, userId);

    return LibroCreado;
}
async function deleteLibro(id, userId) {
    try {
      // Usa `await` para asegurarte de que el error se propague adecuadamente
      const libroEliminado = await softDeleteLibroMongo(id, userId); 
      
      return libroEliminado; // Devuelve el libro eliminado
    } catch (error) {
      throw error; // Lanza el error para que el llamador lo maneje
    }
  }
module.exports = {
    readLibroConFiltros,
    readLibro,
    createLibro,
    updateLibro,
    deleteLibro
}