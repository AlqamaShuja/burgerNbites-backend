const { logReqBody } = require("../middleware/logReqBody");
const authRoute = require("./authRoute");
const productRoute = require("./productRoute");

const allRoutes = (app) => {
  app.use(logReqBody);
  app.get("/api/test", (req, res) =>
    res.send({ success: true, data: "test data" })
  );
  // app.use("/api", verifyToken);
  app.use("/api/auth", authRoute);
  app.use("/api/product", productRoute);

  // When No Route Match
  app.use("*", (req, res) => res.status(404).send({ success: false, data: 'No route matched' }));
};

module.exports = allRoutes;
