//Verificando se o usuario está logado para ele n entrar na pagina de lognin se ele já estiver logado
module.exports = (req, res, next) => {
  if (req.session && !req.session.user) {
    return next();
  }
  return res.redirect("/app/dashboard");
};
