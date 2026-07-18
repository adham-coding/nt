import { sendError } from "#http";
import { getHandler } from "./get.js";
import { postHandler } from "./post.js";
import { putHandler } from "./put.js";
import { deleteHandler } from "./delete.js";

const methodHanlers = {
  GET: getHandler,
  POST: postHandler,
  PUT: putHandler,
  DELETE: deleteHandler,
};

export async function usersRoute(context) {
  const methodHandler = methodHanlers[context.method];

  if (!methodHandler)
    return sendError(context.response, 405, {
      message: `${context.method} is not allowed.`,
      error: "Method Not Allowed",
    });

  return methodHandler(context);
}
