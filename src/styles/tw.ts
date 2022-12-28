export function tw(literals: TemplateStringsArray, ...placeholders: string[]) {
  let result = "";
  for (let i = 0; i < placeholders.length; i++) {
    result += literals[i];
    result += placeholders[i].toString();
  }
  result += literals[literals.length - 1];
  return result;
}
