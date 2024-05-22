import React from 'react';

export function OrganizationEmpty() {
  return (
    <div className="max-w-[315px] m-auto text-center min-h-[200px] flex flex-col items-center justify-center">
      <h4 className="text-[#24181B] text-2xl font-medium">
        No results founded
      </h4>
      <p className="text-base text-[#24181B80]">
        There is no organization based on your search. Please try again.
      </p>
    </div>
  );
}

export default OrganizationEmpty;
