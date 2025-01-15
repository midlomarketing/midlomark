export function lexicalToPlainText(json) {
  function extractText(node) {
    if (node.type === 'text') {
      return node.text || ' ';
    }
    if (node.children) {
      return node.children.map(extractText).join(' ');
    }
    return "";
  }

  return extractText(json.root)
}
