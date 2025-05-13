import React, { createContext, useContext, useState } from 'react';

const ConnectionContext = createContext(null);

export function ConnectionProvider({ children }) {
  const [pendingConnection, setPendingConnection] = useState(null);

  const startConnection = (nodeId, handleType) => {
    setPendingConnection({ nodeId, handleType });
  };

  const resetConnection = () => {
    setPendingConnection(null);
  };

  return (
    <ConnectionContext.Provider value={{
      pendingConnection,
      startConnection,
      resetConnection
    }}>
      {children}
    </ConnectionContext.Provider>
  );
}

export function useConnection() {
  const context = useContext(ConnectionContext);
  if (!context) {
    throw new Error('useConnection must be used within a ConnectionProvider');
  }
  return context;
}