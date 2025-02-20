export function lexicalToPlainText(json) {
  function extractText(node) {
    // console.log(node)
    if (node?.type === 'text') {
      return node.text || ' ';
    }
    // if (node.type === 'block') {
    //   if (node.fields.blockType === 'tableOfContents') return node
    // }
    if (node?.children) {
      return node.children.map(extractText).join(' ');
    }
    return "";
  }

  return extractText(json?.root)
}
