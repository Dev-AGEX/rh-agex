export function removeHydrationAttrs(element: HTMLElement) {
  const attrs = Array.from(element.attributes);
  attrs.forEach(attr => {
    if (attr.name.startsWith('data-') || attr.name === 'cz-shortcut-listen') {
      element.removeAttribute(attr.name);
    }
  });
}
