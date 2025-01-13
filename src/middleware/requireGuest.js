export const requireGuest = (req, res, next) => {
  try {
    if (!req.session || req.session?.user) {
      return res.redirect("/reminders");
    }
    return next();
  } catch (error) {
    next(error);
  }
};
