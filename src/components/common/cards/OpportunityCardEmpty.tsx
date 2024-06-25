import React from 'react';

function OpportunityCardEmpty() {
  return (
    <div className="max-w-[315px] m-auto text-center min-h-[200px] flex flex-col items-center justify-center">
      <h4 className="text-[#24181B80] md:text-[20px] -mt-5 font-medium">
        There is no Opportunity running in this Organization.
      </h4>
    </div>
  );
}

export default OpportunityCardEmpty;
