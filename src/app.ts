import { envs } from "./config/envs";
import { Server } from "./config/server";


(async () => {
  main();
})();

function main() {
  const server = new Server({
    port: envs.PORT,
    routes: ""
  });
}