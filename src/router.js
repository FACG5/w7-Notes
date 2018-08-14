const {
    handelHomePage,
    serverStaticFile,
    handelError
  } = require("./handler/functions.js");
  const router = (req, res) => {
    const endponit = req.url;
    if (endponit === "/") {
      handelHomePage(req, res);
    } else if (endponit.includes("public")) {
      serverStaticFile(req, res);
    } else {
      handelError(res);
    }
  };
  
  module.exports = router;