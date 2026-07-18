import { getUsers, setUsers } from "#database";
import { getRequestBody, sendError, sendJson } from "#http";

export async function deleteHandler({ response, paths }) {
  ////////////////////////////// ==> /users/:id
  if (paths.length !== 1)
    return sendError(response, 404, {
      message: "Route not found.",
      error: "Not Found",
    });

  return sendError(response, 501, {
    message: "DELETE is not implemented yet.",
    error: "Not Implemented",
  });



























  // const [id] = paths;

  // if (!/^[1-9]\d*$/.test(id))
  //   return sendError(response, 400, {
  //     message: "User ID must be a positive integer.",
  //     error: "Bad Request",
  //   });

  // const userId = +id;
  // const users = await getUsers();
  // const user = users.find(({ id }) => id === userId);

  // if (!user)
  //   return sendError(response, 404, {
  //     message: "User not found.",
  //     error: "Not Found",
  //   });

  // await setUsers(users.filter(({ id }) => id !== userId));

  // return sendJson(response, 204);
}
