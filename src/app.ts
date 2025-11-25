import { envs } from "@/src/config/envs";
import { Server } from "@/src/config/server";
import { AppRoutes } from "@/src/routes/v1";


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