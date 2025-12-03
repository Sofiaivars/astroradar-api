import { envs } from "@config/envs";
import { Server } from "@config/server";
import { AppRoutes } from "@routes/v1";


(async () => {
  main();
})();

function main() {
  const server = new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
  });

  server.start();
}