import jwt from "jsonwebtoken";

import authConfig from "../../config/auth";

export default async function (req, res) {
  const apiSecret = req.headers["api-secret"];

  if (!apiSecret) {
    return res.status(401).json({
      status: false,
      message: "Autenticação obrigatória para acessar este recurso.",
    });
  }

  if (apiSecret !== process.env.API_SECRET) {
    return res.status(401).json({
      status: false,
      message: "Autenticação obrigatória para acessar este recurso.",
    });
  }

  try {
    return res.status(200).json({
      status: true,
      token: jwt.sign({ hasPermission: true }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  } catch (error) {
    return res.status(401).json({
      status: false,
      message: "Autenticação obrigatória para acessar este recurso.",
    });
  }
}
