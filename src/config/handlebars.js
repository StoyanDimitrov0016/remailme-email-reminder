import { create } from "express-handlebars";
import path from "path";

const hbs = create({
  defaultLayout: "main",
  layoutsDir: path.join("src", "views", "layouts"),
  partialsDir: path.join("src", "views", "partials"),
  helpers: {
    currentYear: () => new Date().getFullYear(),
    equals: (a, b) => a === b,
  },
});

const setupHandlebars = (app) => {
  app.engine("handlebars", hbs.engine);
  app.set("view engine", "handlebars");
  app.set("views", path.resolve("src", "views"));
};

export default setupHandlebars;
