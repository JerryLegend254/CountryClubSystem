import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import { useContext, createContext } from 'react';

import { httpGetAllMembers } from './requests';

const MembersContext = createContext();

function MembersContextProvider({ children }) {
  const {  data: members } = useQuery({
    queryKey: ['members'],
    queryFn: httpGetAllMembers,
  });
  const memberCount = members?.length || 0

  return (
    <MembersContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        members,
        memberCount
      }}
    >
      {children}
    </MembersContext.Provider>
  );
}

export function useMembers() {
  const context = useContext(MembersContext);
  if (!context) throw new Error('useMembers was used out of scope');
  return context;
}

MembersContextProvider.propTypes = {
  children: PropTypes.node,
};

export default MembersContextProvider;
