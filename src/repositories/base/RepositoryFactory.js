import ProductosRepository from "../api/productosRepository";
import CategoriasRepository from "../api/categoriasRepository";
import ProveedoresRepository from "../api/proveedoresRepository";
// relaciones
import RelGustaRepository from "../api/relGustaRepository";
// Uploads
import UploadsRepository from "../api/uploadsRepository";

const repositories = {
  productos: ProductosRepository,
  categorias: CategoriasRepository,
  proveedores: ProveedoresRepository,
  // relaciones
  gustas: RelGustaRepository,
  // Uploads
  uploads: UploadsRepository
  // other repositories ...
};

export const RepositoryFactory = {
  get: name => repositories[name]
};
