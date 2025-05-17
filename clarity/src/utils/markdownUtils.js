export function wrapMarkdownSectionsInCards(html) {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;

  const children = Array.from(tempDiv.childNodes);
  const sections = [];
  let currentSection = null;

  children.forEach((node) => {
    if (node.nodeType === 1 && /^H[1-6]$/.test(node.tagName)) {
      // If there's an existing section, push it to the sections array
      if (currentSection) {
        sections.push(currentSection);
      }
      // Start a new section with the current heading
      currentSection = document.createElement('div');
      currentSection.className = 'markdown-card';
      currentSection.appendChild(node.cloneNode(true)); // Clone the heading into the new section
    } else {
      // If it's not a heading and there's an active section, append it
      if (currentSection) {
        currentSection.appendChild(node.cloneNode(true)); // Clone the node
      } else {
        // If it's not a heading and no active section (content before first heading)
        // Create a default section for this initial content
        if (!sections.length && !currentSection) {
          currentSection = document.createElement('div');
          currentSection.className = 'markdown-card';
        }
        if (currentSection) {
          currentSection.appendChild(node.cloneNode(true)); // Clone the node
        }
      }
    }
  });

  // Push the last currentSection if it exists
  if (currentSection) {
    sections.push(currentSection);
  }

  const scrollWrapper = document.createElement('div');
  scrollWrapper.className = 'markdown-cards-scroll-wrapper';

  sections.forEach(section => scrollWrapper.appendChild(section));

  tempDiv.innerHTML = '';
  tempDiv.appendChild(scrollWrapper);

  return tempDiv.innerHTML;
}