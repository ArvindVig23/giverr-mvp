'use client';
import React from 'react';
import privacyPolicies from '@/utils/jsonData/privacy-policy.json';
const PrivactPolicy = () => {
  return (
    <div className="w-full md:border-t border-[#E6E3D6] md:p-5 ">
      <div className="max-w-2xl mx-auto px-4">
        <div className="pt-8">
          <h2 className="text-[#24181B] font-medium text-2xl md:text-[32px] leading-[36px] mb-2">
            Privacy Policy
          </h2>
          <p className="text-xs md:text-sm text-[#857E7E] mb-[50px]">
            Effective Date: July 1, 2024
          </p>
        </div>
        <div className="mt-6">
          {privacyPolicies.map((section: any, index: number) => (
            <div key={index} className="mb-[50px]">
              <h3 className="font-2xl text-base font-medium text-xl mb-1">
                {index + 1}. {section.heading}
              </h3>
              <div className="mb-[50px]">
                {section.description.map((item: any, itemIndex: number) => (
                  <div key={itemIndex} className="mb-2">
                    {item.itemName && (
                      <p className="text-base font-medium">{item.itemName}:</p>
                    )}
                    <p className="text-sm mb-2">{item.itemDescription}</p>
                    {item.subItems && (
                      <div>
                        {item.subItems.map((subItem: any, subIndex: number) => (
                          <div key={subIndex} className="mb-[50px]">
                            <p
                              className={`text-base font-medium ${subIndex === 0 ? 'mt-[50px]' : ''}`}
                            >
                              {`${index + 1}.${subIndex + 1}`}{' '}
                              {subItem.subItemHeading}
                            </p>
                            {subItem.subItemDescription.map(
                              (desc: any, descIndex: number) => (
                                <div key={descIndex} className="mb-2">
                                  <p className="text-sm font-medium">
                                    {desc.descriptionHeading}:
                                  </p>
                                  <p className="text-sm">{desc.content}</p>
                                </div>
                              ),
                            )}
                          </div>
                        ))}
                      </div>
                    )}
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

export default PrivactPolicy;
