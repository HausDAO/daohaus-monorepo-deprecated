import { createContext, ReactNode, useEffect, useState } from 'react';

type ConnectType = {
  profile: {
    address: string;
    ens: string | null;
  } | null;
};

export const HausConnectContext = createContext<ConnectType>({ profile: null });
type ConnectProviderProps = { children: ReactNode };

export const HausConnectProvider = ({
  children,
  haus,
}: ConnectProviderProps) => {
  const [profile, setProfile] = useState(null);
  useEffect(() => {}, []);
  return (
    <HausConnectContext.Provider value={{ profile }}>
      {children}
    </HausConnectContext.Provider>
  );
};
