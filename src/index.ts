import { app } from "./server";
import { config } from "../config";

app().then(app => {
  app.listen(config.httpPort, () => {
    console.info('Server listening on', config.httpPort);
  });
});

