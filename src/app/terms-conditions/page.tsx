'use client';
import React from 'react';
import termsConditions from '@/utils/jsonData/termsConditions.json';
import { replaceFromJson } from '@/services/frontend/commonServices';
import { SUPPORT_EMAIL } from '@/constants/constants';

const TermsConditions = () => {
  const processedData = replaceFromJson(
    termsConditions,
    /{{SUPPORT_EMAIL}}/g,
    SUPPORT_EMAIL,
  );
  return (
    <div className="w-full md:border-t border-[#E6E3D6] md:p-5 ">
      <div className="max-w-2xl mx-auto px-4">
        <div className="pt-8">
          <h2 className="text-[#24181B] font-medium text-2xl md:text-[32px] leading-[36px] mb-2">
            Terms & Conditions
          </h2>
          <p className="text-xs md:text-sm text-[#857E7E] mb-[50px]">
            Effective Date: July 1, 2024
          </p>
        </div>

        <div className="mt-6">
          {processedData.map((section: any, index: number) => (
            <div key={index} className="mb-6">
              <h3 className="font-2xl text-base font-medium text-xl mb-3">
                {index + 1}. {section.heading}
              </h3>
              <div className="mb-[50px]">
                {section.description.map((item: any, itemIndex: number) => (
                  <div key={itemIndex} className="mb-5">
                    {item.headerName ? (
                      <p className="text-base">
                        <strong className="font-medium text-[#24181B]">
                          {item.headerName}:
                        </strong>
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
