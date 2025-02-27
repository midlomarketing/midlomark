export function lexicalToPlainText(json) {
  function extractText(node) {
    // console.log(node)
    if (node?.type === 'text') {
      return node.text || ' ';
    }
    if (node?.type === 'block') {
      if (node.fields.blockType === 'tableOfContents') {
        return `Header: ${node.fields.headerSection.headerText}. Text in section: ${node.fields.tableOfContents.map(content => extractText(content.headerText.root)).join(' / ')}`
      }
      if (node?.fields.blockType === 'contentNoMedia') {
        return `Header: ${node.fields.headerSection.headerText}. Text in section: ${extractText(node.fields.content.root)}`
      }
      if (node?.fields.blockType === 'contentWithMedia') {
        return `Header: ${node.fields.headerSection.headerText}. Text in section: ${extractText(node.fields.content.root)}`
      }
    }
    if (node?.children) {
      return node.children.map(extractText).join(' ');
    }
    return "\n";
  }

  return extractText(json?.root)
}
