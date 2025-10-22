import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router';
import App from './App';
import useAuthStore from './store/useAuthStore';
import './index.css';

// Initialize auth from localStorage
useAuthStore.getState().initializeAuth();

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
