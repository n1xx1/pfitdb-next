export function getSlugOrder(slug: string) {
  return parseInt(slug.match(/^(?:(\d+)-).*$/)?.[1] ?? "0", 10);
}

export function parseTitle(title: string) {
  const match = title.match(/^(.*?)(?:\s+-\s+(.*?)(?:\s+(\d+))?)?$/);
  if (match) {
    const [_, name, type, level] = match;
    return { name, type, level };
  }
  return {
    name: title,
  };
}
