'use client';
import React, { useState } from 'react';
import OrganizationsPage from '../../components/organizations/Organization';

const Organizations: React.FC = () => {
  const [currrentPage, setCurrentPage] = useState<number>(1);
  return (
    <OrganizationsPage
      currrentPage={currrentPage}
      setCurrentPage={setCurrentPage}
    />
  );
};
export default Organizations;
