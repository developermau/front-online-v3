import ProductosRepository from "../api/productosRepository";

const repositories = {
  productos: ProductosRepository
  // other repositories ...
};

export const RepositoryFactory = {
  get: name => repositories[name]
};
