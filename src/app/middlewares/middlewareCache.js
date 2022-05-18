import BaseService from "../utils/BaseService";

export default async function (req, res, next) {
  const cep = req.body.cep;

  const isValidCep = await BaseService.validateCep(cep);

  if (!isValidCep) {
    return res.status(400).json({
      status: false,
      message: "CEP inválido para requisição.",
    });
  }

  const existsCache = await BaseService.checkExistCache(cep);

  if (!existsCache) {
    return next();
  }
  return res
    .status(200)
    .json({ status: true, response: existsCache, infoCache: true });
}
