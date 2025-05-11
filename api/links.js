let links = []; // Memoria temporal

export default function handler(req, res) {
  const { method, query, body } = req;

  const VALID_TOKEN = "O5GZF-HMDGI-6N32S-18VGK-H6CWI-CPPB6";

  if (query.api_token !== VALID_TOKEN) {
    return res.status(401).json({ error: "Token inválido" });
  }

  if (method === "POST") {
    // Añadir enlaces (espera lista de strings en body.links)
    if (!Array.isArray(body.links)) {
      return res.status(400).json({ error: "Debes enviar un array de enlaces." });
    }
    links.push(...body.links);
    return res.status(201).json({ total: links.length });
  }

  if (method === "GET") {
    const { action } = query;

    if (action === "link") {
      if (links.length === 0) {
        return res.status(404).json({ error: "No hay enlaces disponibles." });
      }
      const link = links.shift(); // Saca uno
      return res.status(200).json({ link, remaining: links.length });
    }

    if (action === "count") {
      return res.status(200).json({ total: links.length });
    }

    return res.status(400).json({ error: "Acción inválida." });
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Método ${method} no permitido`);
}
