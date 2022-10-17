
import React from 'react';

import { AuthProvider } from './auth';
import { FavoritesProvider } from './favorites';
import { RecentsProvider } from './recents';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <FavoritesProvider>
      <RecentsProvider>
        {children}
      </RecentsProvider>
    </FavoritesProvider>
  </AuthProvider>
);

export default AppProvider;