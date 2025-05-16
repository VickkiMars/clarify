export function wrapMarkdownSectionsInCards(html) {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;

  const children = Array.from(tempDiv.childNodes);
  const sections = [];
  let currentSection = null;
  let currentLevel = null;

  children.forEach((node) => {
    if (node.nodeType === 1 && /^H[1-6]$/.test(node.tagName)) {
      const nodeLevel = parseInt(node.tagName.charAt(1), 10);

      if (currentSection === null) {
        // Start the first section
        currentSection = document.createElement('div');
        currentSection.className = 'markdown-card';
        currentLevel = nodeLevel;
      } else if (nodeLevel !== currentLevel) {
        // Different level heading starts a new section
        sections.push(currentSection);
        currentSection = document.createElement('div');
        currentSection.className = 'markdown-card';
        currentLevel = nodeLevel;
      }
      // If nodeLevel === currentLevel, continue appending in the same section
    } else if (currentSection === null) {
      // If first node(s) are not headings, start a section with null level
      currentSection = document.createElement('div');
      currentSection.className = 'markdown-card';
      currentLevel = null;
    }

    currentSection.appendChild(node);
  });

  if (currentSection) sections.push(currentSection);

  const scrollWrapper = document.createElement('div');
  scrollWrapper.className = 'markdown-cards-scroll-wrapper';

  sections.forEach(section => scrollWrapper.appendChild(section));

  tempDiv.innerHTML = '';
  tempDiv.appendChild(scrollWrapper);

  return tempDiv.innerHTML;
}
