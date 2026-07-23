import { getUsers, setUsers } from "#database";
import { getRequestBody, sendError, sendJson } from "#http";

export async function postHandler({ request, response, paths }) {
  ////////////////////////////// ==> /users
  if (paths.length !== 0)
    return sendError(response, 404, {
      message: "Route not found.",
      error: "Not Found",
    });

  const contentType = request.headers["content-type"] ?? "";

  if (!contentType.startsWith("application/json"))
    return sendError(response, 415, {
      message: "Content-Type must be application/json.",
      error: "Unsupported Media Type",
    });

  let payload;

  try {
    payload = JSON.parse(await getRequestBody(request));
  } catch {
    return sendError(response, 400, {
      message: "Invalid JSON.",
      error: "Bad Request",
    });
  }

  const { name } = payload;

  if (!name)
    return sendError(response, 400, {
      message: "The 'name' field is required.",
      error: "Bad Request",
    });

  const users = await getUsers();
  const id = users.length ? users.at(-1).id + 1 : 1;
  const newUser = { id, name };

  users.push(newUser);

  await setUsers(users);

  return sendJson(response, 201, newUser);
}
