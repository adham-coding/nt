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
          resolve(Buffer.concat(chunks).toString("utf8"));
        });
      })
      .on("error", reject);
  });
}

export function parseRequest(request, { allowDuplicates = false } = {}) {
  const url = new URL(
    request.url ?? "/",
    `http://${request.headers?.host ?? "localhost"}`,
  );
  const query = Object.create(null);

  for (const [key, value] of url.searchParams) {
    if (!(key in query)) {
      query[key] = value;

      continue;
    }

    if (Array.isArray(query[key])) {
      if (allowDuplicates || !query[key].includes(value)) {
        query[key].push(value);
      }
    } else {
      if (query[key] === value) {
        if (allowDuplicates) {
          query[key] = [query[key], value];
        }
      } else query[key] = [query[key], value];
    }
  }

  const segments = url.pathname.split("/").filter(Boolean);
  const [endpoint = "", ...paths] = segments;

  return {
    url,
    pathname: url.pathname,
    endpoint,
    paths,
    query,
    search: url.search,
    method: (request.method ?? "GET").toUpperCase(),
    host: url.host,
    hostname: url.hostname,
    port: url.port,
    protocol: url.protocol,
    origin: url.origin,
    hash: url.hash,
    headers: request.headers,
  };
}

export function getRequestBody(request) {
  return new Promise((resolve, reject) => {
    const chunks = [];

    request.on("error", reject);
    request.on("data", (chunk) => chunks.push(chunk));
    request.on("end", () => {
      resolve(Buffer.concat(chunks).toString("utf8"));
    });
  });
}

export function sendJson(response, statusCode, body = {}) {
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.writeHead(statusCode);

  if (typeof body != "string") {
    body = JSON.stringify(body);
  }

  response.end(body);
}

export function sendError(response, statusCode, body) {
  return sendJson(response, statusCode, { statusCode, ...body });
}
