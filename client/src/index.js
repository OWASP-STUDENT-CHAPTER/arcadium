import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter as Router } from 'react-router-dom';

import { AuthProvider } from './context/authContext';
import { GameProvider } from './context/gameContext';

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <GameProvider>
          <Router>
            <App />
          </Router>
        </GameProvider>
      </AuthProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
