import { getUsers, setUsers } from "#database";
import { getRequestBody, sendError, sendJson } from "#http";

export async function putHandler({ request, response, paths }) {
  ////////////////////////////// ==> /users/:id
  if (paths.length !== 1)
    return sendError(response, 404, {
      message: "Route not found.",
      error: "Not Found",
    });

  return sendError(response, 501, {
    message: "PUT is not implemented yet.",
    error: "Not Implemented",
  });



























  // const contentType = request.headers["content-type"] ?? "";

  // if (!contentType.startsWith("application/json"))
  //   return sendError(response, 415, {
  //     message: "Content-Type must be application/json.",
  //     error: "Unsupported Media Type",
  //   });

  // const [id] = paths;

  // if (!/^[1-9]\d*$/.test(id))
  //   return sendError(response, 400, {
  //     message: "User ID must be a positive integer.",
  //     error: "Bad Request",
  //   });

  // const userId = +id;
  // const users = await getUsers();
  // const user = users.find(({ id }) => id === userId)

  // if (!user)
  //   return sendError(response, 404, {
  //     message: "User not found.",
  //     error: "Not Found",
  //   });

  // let payload;

  // try {
  //   payload = await getRequestBody(request);
  // } catch {
  //   return sendError(response, 400, {
  //     message: "Invalid JSON.",
  //     error: "Bad Request",
  //   });
  // }

  // const { name } = payload;

  // if (!name)
  //   return sendError(response, 400, {
  //     message: "The 'name' field is required.",
  //     error: "Bad Request",
  //   });

  // users.forEach(
  //   (user, i) => user.id === userId && (users[i] = { ...user, name }),
  // );

  // await setUsers(users);

  // return sendJson(response, 204);
}
