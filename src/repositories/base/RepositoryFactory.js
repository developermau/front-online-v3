import ProductosRepository from "../api/productosRepository";
import CategoriasRepository from "../api/categoriasRepository";
import ProveedoresRepository from "../api/proveedoresRepository";
// relaciones
import RelGustaRepository from "../api/relGustaRepository";

const repositories = {
  productos: ProductosRepository,
  categorias: CategoriasRepository,
  proveedores: ProveedoresRepository,
  // relaciones
  gustas: RelGustaRepository
  // other repositories ...
};

export const RepositoryFactory = {
  get: name => repositories[name]
};
