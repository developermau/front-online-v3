import ProductosRepository from "../api/productosRepository";
import CategoriasRepository from "../api/categoriasRepository";
import ProveedoresRepository from "../api/proveedoresRepository";
import FotografiasRepository from "../api/fotografiasRepository";
import OpinionesRepository from "../api/opinionesRepository";
// relaciones
import RelGustaRepository from "../api/relGustaRepository";
// Uploads
import UploadsRepository from "../api/uploadsRepository";
import FotografiasUploadsRepository from "../api/fotografiasUploadsRepository";

const repositories = {
  productos: ProductosRepository,
  categorias: CategoriasRepository,
  proveedores: ProveedoresRepository,
  fotografias: FotografiasRepository,
  opiniones: OpinionesRepository,
  // relaciones
  gustas: RelGustaRepository,
  // Uploads
  uploads: UploadsRepository,
  uploadFotografias: FotografiasUploadsRepository
  // other repositories ...
};

export const RepositoryFactory = {
  get: name => repositories[name]
};
