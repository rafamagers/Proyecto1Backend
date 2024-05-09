const Libro = require("./libro.model")

async function getLibroMongo(filtros) {
    const cantidadLibros = await Libro.countDocuments(filtros);
    const LibrosFiltrados = await Libro.find(filtros);

    return {
        resultados: LibrosFiltrados,
        // paginaMax: cantidadLibros / 20,
        // paginaActual: 1,
        cantidadLibros: cantidadLibros
    };
}

async function createLibroMongo(datos) {
    try {
      // Verifica si el vendedor proporcionado existe
      const vendedor = datos.vendedor; // Obtén el ID del vendedor de los datos
  
      const usuarioVendedor = await Usuario.findById(vendedor); // Busca al usuario por ID
      if (!usuarioVendedor) {
        throw new Error('Vendedor no encontrado'); // Lanza un error si el vendedor no existe
      }
  
      // Si el vendedor es válido, crea el libro
      const libroCreado = await Libro.create(datos); // Crea el libro con los datos proporcionados
  
      return libroCreado; // Devuelve el libro creado
    } catch (error) {
      console.error('Error al crear el libro:', error); // Registro de error en consola
      throw error; // Vuelve a lanzar el error para que el llamador lo maneje
    }
  }
async function updateLibroMongo(id, cambios) {
    const resultado = await Libro.findByIdAndUpdate(id, cambios);

    return resultado
}

async function softDeleteLibroMongo(id) {
  try {
    // Encuentra el libro por ID y marca isDeleted como true
    const libroEliminado = await Libro.findByIdAndUpdate(
      id, // ID del libro
      { isDeleted: true }, // Campos a actualizar
      { new: true } // Devuelve el documento actualizado
    );

    // Verifica si el libro fue encontrado
    if (!libroEliminado) {
      throw new Error('Libro no encontrado');
    }

    return libroEliminado; // Devuelve el libro marcado como eliminado
  } catch (error) {
    console.error('Error al realizar soft delete:', error); // Manejo de errores
    throw error; // Vuelve a lanzar el error para que el llamador lo maneje
  }
}

module.exports = {
    createLibroMongo,
    getLibroMongo,
    updateLibroMongo,
    softDeleteLibroMongo
};