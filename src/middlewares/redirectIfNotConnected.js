module.exports = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    console.log('je suis dans le 1er middleware')
    return res.redirect('/');
  }

  next();
};
