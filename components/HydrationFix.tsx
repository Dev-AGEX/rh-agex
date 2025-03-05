'use client';

import { useEffect } from 'react';

export function HydrationFix() {
  useEffect(() => {
    // Remove o atributo cz-shortcut-listen do body
    const body = document.querySelector('body');
    if (body && body.hasAttribute('cz-shortcut-listen')) {
      body.removeAttribute('cz-shortcut-listen');
    }
  }, []);

  return null;
}
