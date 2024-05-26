import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

// Sélectionnez l'élément DOM avec l'ID 'root'
const container = document.getElementById('root');

// Assurez-vous que l'élément existe avant de créer la racine
if (container) {
    const root = createRoot(container);
    root.render(<App />);
} else {
    console.error("L'élément DOM avec l'ID 'root' n'existe pas.");
}
