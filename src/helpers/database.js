import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const fileName = resolve("src/data/users.json");

export async function getUsers(userId) {
  const data = JSON.parse(await readFile(fileName, "utf8"));

  return userId ? data.find(({ id }) => id === userId) : data;
}

export async function setUsers(data) {
  await writeFile(fileName, JSON.stringify(data, null, 2));
}
