export const requireSession = (req, res, next) => {
  try {
    if (!req?.session?.user) {
      return res.redirect("/");
    }
    next();
  } catch (error) {
    next(error);
  }
};
