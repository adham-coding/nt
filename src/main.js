import { createServer } from "node:http";
import { config } from "dotenv";
import { parseRequest, sendError } from "#http";
import { initializeData } from "#init-data";
import { usersRoute } from "#routes";

config();

////////////////////// Task 1 //////////////////////
await initializeData();

////////////////////// Task 2 //////////////////////
const routes = { users: usersRoute };
const port = Number(process.env.PORT) || 3000;
const server = createServer(async (request, response) => {
  try {
    const context = { ...parseRequest(request), request, response };
    const routeHandler = routes[context.endpoint];

    if (!routeHandler)
      return sendError(response, 404, {
        message: "Route not found.",
        error: "Not Found",
      });

    await routeHandler(context);
  } catch (error) {
    console.error(error);

    if (!response.headersSent)
      sendError(response, 500, {
        message: "Internal Server Error",
        error: "Internal Server Error",
      });
  }
});

server.listen(port, () => {
  console.log("Server is running on  >>>  http://localhost:3000");
});
