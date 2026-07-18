import { getUsers } from "#database";
import { sendError, sendJson } from "#http";

export async function getHandler({ response, paths }) {
  ////////////////////////////// ==> /users
  if (paths.length === 0) {
    const users = await getUsers();

    return sendJson(response, 200, users);
  }

  ////////////////////////////// ==> /users/:id
  if (paths.length !== 1)
    return sendError(response, 404, {
      message: "Route not found.",
      error: "Not Found",
    });

  const [id] = paths;

  if (!/^[1-9]\d*$/.test(id))
    return sendError(response, 400, {
      message: "User ID must be a positive integer.",
      error: "Bad Request",
    });

  const userId = +id;
  const user = await getUsers(userId);

  if (!user)
    return sendError(response, 404, {
      message: "User not found.",
      error: "Not Found",
    });

  return sendJson(response, 200, user);
}
