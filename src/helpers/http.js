import https from "node:https";

export function httpFetch(url = "") {
  return new Promise((resolve, reject) => {
    https
      .get(url, (response) => {
        const status = response.statusCode ?? 500;

        if (status < 200 || status >= 300) {
          reject(new Error(`HTTP ${status}`));

          return;
        }

        const chunks = [];

        response.on("error", reject);
        response.on("data", (chunk) => chunks.push(chunk));
        response.on("end", () => {
          try {
            const body = Buffer.concat(chunks).toString("utf8");

            resolve(JSON.parse(body));
          } catch (error) {
            reject(error);
          }
        });
      })
      .on("error", reject);
  });
}

export function parseRequest(request) {
  const method = request.method ?? "GET";

  const url = new URL(
    request.url ?? "/",
    `http://${request.headers.host ?? "localhost"}`,
  );

  const [endpoint, ...paths] = url.pathname
    .toLowerCase()
    .split("/")
    .filter(Boolean);

  const query = {};

  for (const key of url.searchParams.keys()) {
    const values = url.searchParams.getAll(key);

    query[key] = values.length === 1 ? values[0] : values;
  }

  return {
    method,
    endpoint,
    paths,
    url,
    pathname: url.pathname,
    search: url.search,
    query,
    headers: request.headers,
  };
}

export function getRequestBody(request) {
  return new Promise((resolve, reject) => {
    const chunks = [];

    request.on("error", reject);
    request.on("data", (chunk) => chunks.push(chunk));
    request.on("end", () => {
      try {
        const body = Buffer.concat(chunks).toString("utf8");

        resolve(JSON.parse(body));
      } catch (error) {
        reject(error);
      }
    });
  });
}

export function sendJson(response, statusCode, body) {
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.writeHead(statusCode);

  if (body != null || typeof body != "string")
    response.end(JSON.stringify(body));
  else response.end(body);
}

export function sendError(response, statusCode, body) {
  return sendJson(response, statusCode, { statusCode, ...body });
}
