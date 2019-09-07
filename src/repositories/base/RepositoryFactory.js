import ProductosRepository from "../api/productosRepository";
import CategoriasRepository from "../api/categoriasRepository";
// relaciones
import RelGustaRepository from "../api/relGustaRepository";

const repositories = {
  productos: ProductosRepository,
  categorias: CategoriasRepository,
  gustas: RelGustaRepository
  // other repositories ...
};

export const RepositoryFactory = {
  get: name => repositories[name]
};
