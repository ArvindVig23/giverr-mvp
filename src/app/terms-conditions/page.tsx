'use client';
import React from 'react';
import termsConditions from '@/utils/jsonData/termsConditions.json';

const TermsConditions = () => {
  return (
    <div className="w-full md:border-t border-[#E6E3D6] md:p-5 ">
      <div className="max-w-2xl mx-auto px-4">
        <div className="pt-8">
          <h2 className="text-[#24181B] font-medium text-2xl md:text-[32px] leading-[36px] mb-2">
            Terms & Conditions
          </h2>
          <p className="text-xs md:text-sm text-[#857E7E] mb-6">
            Effective Date: July 1, 2024
          </p>
        </div>

        <div className="mt-6">
          {termsConditions.map((section, index) => (
            <div key={index} className="mb-6">
              <h3 className="font-2xl text-base font-medium text-xl mb-3">
                {index + 1}. {section.heading}
              </h3>
              <div className="mb-[50px]">
                {section.description.map((item, itemIndex) => (
                  <div key={itemIndex}>
                    {item.headerName ? (
                      <p className="text-base mb-1">
                        <strong>{item.headerName}:</strong>
                      </p>
                    ) : null}
                    <p className="text-sm mb-2">{item.termDescription}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
