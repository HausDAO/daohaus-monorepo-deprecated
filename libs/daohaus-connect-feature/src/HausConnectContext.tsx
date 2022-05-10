import { Haus } from '@daohaus/dao-data';
import { createContext, ReactNode, useState } from 'react';

type ConnectType = {
  profile: {
    address: string;
    ens: string;
  } | null;
};

export const HausConnectContext = createContext<ConnectType>({ profile: null });
type ConnectProviderProps = { children: ReactNode; Haus: Haus };

export const HausConnectProvider = ({
  children,
  Haus,
}: ConnectProviderProps) => {
  const [profile, setProfile] = useState(null);

  return (
    <HausConnectContext.Provider value={{ profile }}>
      {children}
    </HausConnectContext.Provider>
  );
};
