import fetch from "node-fetch";

export default async function handler(req, res) {
  const target = req.query.url;

  if (!target) {
    return res.status(400).send("Missing ?url=");
  }

  try {
    const response = await fetch(target, {
      method: req.method,
      headers: {
        "User-Agent": req.headers["user-agent"] || "",
      },
    });

    const body = await response.arrayBuffer();

    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    res.status(response.status).send(Buffer.from(body));
  } catch (err) {
    res.status(500).send("Proxy error: " + err.message);
  }
}
