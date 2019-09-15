// HTTP CODES
var Util = require("../util/httpcodes");

export function fnHandlerError(errFrontend) {
  let result = {
    errorTypeName: "GENERAL",
    errorTypeDetail: errFrontend.message,
    nameError: errFrontend.name,
    statusCode: Util.HttpCodes.HTTP_500_INTERNAL_SERVER_ERROR,
    sqlState: 0,
    parentCode: "",
    table: "",
    code: "",
    errno: 0,
    isAxiosError: errFrontend.isAxiosError,
    myValidationErrors: []
  };

  // Auxiliares
  let errorsList = [];
  let original = {};
  let parent = {};

  if (errFrontend !== null && errFrontend !== undefined) {
    errorsList = errFrontend.errors;

    original = errFrontend.original;
    parent = errFrontend.parent;

    if (original !== null && original !== undefined) {
      result.code = original.code;
      result.sqlState = original.sqlState;
      result.sqlMessage = original.sqlMessage;
      result.errno = original.errno;
    }

    if (parent !== undefined && parent !== null) {
      result.code = parent.code;
      result.parentDetail = parent.detail;
      result.sqlState = parent.sqlState;
      result.sqlMessage = parent.message;
      result.table = parent.table;
      result.errno = parent.errno;
    }

    if (errorsList !== null && errorsList !== undefined) {
      if (Array.isArray(errorsList)) {
        errorsList.forEach(error => {
          result.myValidationErrors.push(error);
        });
      }
    }

    switch (errFrontend.nameError) {
      case "SequelizeDatabaseError":
        result.statusCode = Util.HttpCodes.HTTP_400_BAD_REQUEST;

        if (result.sqlState >= 23000 && result.sqlState <= 23999) {
          result.errorTypeName = "Integrity constraint violation";
          result.errorTypeDetail =
            "Registro duplicado en la columna " + err.errors[0].path;
        } else if (result.sqlState >= 22000 && result.sqlState <= 22999) {
          result.errorTypeName = "Data exception";
          result.errorTypeDetail = "Valores numericos fuera de rango";
        } else if (result.sqlState >= 1000 && result.sqlState <= 1999) {
          result.errorTypeName = "Warning";
          result.errorTypeDetail = "Valores numericos fuera de rango";
        } else {
          result.errorTypeDetail = "SQL." + result.sqlMessage;
        }

        break;
      case "SequelizeValidationError":
        result.errorTypeName = "Validacion Sequelize";
        result.statusCode = Util.HttpCodes.HTTP_428_PRECONDITION_REQUIRED;
        result.errorTypeDetail = "Los valores que introdujo no son validos.";
        break;
      case "SequelizeUniqueConstraintError":
        result.errorTypeName = "Validacion Sequelize UNIQUE";
        result.statusCode = Util.HttpCodes.HTTP_409_CONFLICT;

        if (result.sqlMessage === null || result.sqlMessage === undefined) {
          result.sqlMessage = "Error, con la BD";
        }
        result.errorTypeDetail = "SQL." + result.sqlMessage;
        break;
      case "SequelizeForeignKeyConstraintError":
        result.errorTypeName = "Referencia con otras tablas";
        result.statusCode = Util.HttpCodes.HTTP_409_CONFLICT;
        result.errorTypeDetail =
          "No se puede eliminar o actualizar el registro, existe dependencia con otras tablas";
        break;
      default:
        console.error("Problema, no se identifico el error...");
        result.statusCode = Util.HttpCodes.HTTP_500_INTERNAL_SERVER_ERROR;
        break;
    }
  }
  return result;
}
