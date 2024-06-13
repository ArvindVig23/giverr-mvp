'use client';
import React, { useState } from 'react';
import OrganizationsPage from '../../components/organizations/Organization';

const Organizations: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  return (
    <OrganizationsPage
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
    />
  );
};
export default Organizations;
