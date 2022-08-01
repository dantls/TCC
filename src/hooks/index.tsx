import React from 'react';

import { AuthProvider } from './auth';
import { FavoritesProvider } from './favorites';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <FavoritesProvider>
      {children}
    </FavoritesProvider>
  </AuthProvider>
);

export default AppProvider;