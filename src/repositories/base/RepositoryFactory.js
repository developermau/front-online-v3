import ProductosRepository from "../api/productosRepository";
import CategoriasRepository from "../api/categoriasRepository";

const repositories = {
  productos: ProductosRepository,
  categorias: CategoriasRepository
  // other repositories ...
};

export const RepositoryFactory = {
  get: name => repositories[name]
};
