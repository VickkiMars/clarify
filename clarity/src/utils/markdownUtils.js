export function wrapMarkdownSectionsInCards(html) {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;

  const children = Array.from(tempDiv.childNodes);
  const sections = [];
  let currentSection = null;

  children.forEach((node) => {
    if (node.nodeType === 1 && /^H[1-6]$/.test(node.tagName)) {
      if (currentSection) sections.push(currentSection);
      currentSection = document.createElement('div');
      currentSection.className = 'markdown-card';
    }

    if (!currentSection) {
      currentSection = document.createElement('div');
      currentSection.className = 'markdown-card';
    }

    currentSection.appendChild(node);
  });

  if (currentSection) sections.push(currentSection);

  tempDiv.innerHTML = '';

  // Create outer scroll container
  const scrollWrapper = document.createElement('div');
  scrollWrapper.className = 'markdown-cards-scroll-wrapper';

  sections.forEach(section => scrollWrapper.appendChild(section));
  tempDiv.appendChild(scrollWrapper);

  return tempDiv.innerHTML;
}
