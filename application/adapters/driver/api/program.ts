import StartUp from "./startUp";

let port = process.env.PORT || 80;

StartUp.app.listen(port, function () {
  console.log(`App está executando na porta ${port}`);
});
