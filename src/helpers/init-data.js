import { join, resolve } from "node:path";
import { mkdir, rename, stat } from "node:fs/promises";
import { httpFetch } from "#http";
import { setUsers } from "#database";

const DATA_URL = "https://jsonplaceholder.typicode.com/users";
const DATA_DIR = resolve("src/data");
const DATA_FILE = join(DATA_DIR, "users.json");

export async function initializeData() {
  await ensureDirectory(DATA_DIR);
  await ensureFile(DATA_FILE, async () => {
    const users = await httpFetch(DATA_URL);

    await setUsers(users);
  });
}

async function ensureDirectory(path) {
  try {
    const info = await stat(path);

    if (!info.isDirectory()) {
      await rename(path, `${path}.${Date.now()}`);
      await mkdir(path);
    }
  } catch {
    await mkdir(path, { recursive: true });
  }
}

async function ensureFile(path, createFile) {
  try {
    const info = await stat(path);

    if (!info.isFile()) {
      await rename(path, `${path}.${Date.now()}`);
      await createFile();
    }
  } catch {
    await createFile();
  }
}
