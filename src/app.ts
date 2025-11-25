import { envs } from "@/src/config/envs";
import { Server } from "@/src/config/server";


(async () => {
  main();
})();

function main() {
  const server = new Server({
    port: envs.PORT,
    routes: ""
  });
}