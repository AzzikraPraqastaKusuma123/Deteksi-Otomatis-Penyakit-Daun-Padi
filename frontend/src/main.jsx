import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { I18nextProvider } from 'react-i18next'; // Import I18nextProvider
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import App from './App.jsx'
import i18n from './i18n'; // Import the i18n instance

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <I18nextProvider i18n={i18n}> {/* Wrap App with I18nextProvider */}
        <App />
      </I18nextProvider>
    </Suspense>
  </StrictMode>,
)