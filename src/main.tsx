import '@/global.css';

import App from '@/App';
import { BrowserRouter } from 'react-router-dom';
import QueryProvider from '@/providers/QueryProvider';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryProvider>
  </StrictMode>
);
