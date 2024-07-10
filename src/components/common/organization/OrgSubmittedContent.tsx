import Image from 'next/image';
import React from 'react';
import submittedImage from '/public/images/org-success.jpg';

const OrgSubmittedContent = ({ orgName, setShowModal }: any) => {
  return (
    <div className="flex flex-col gap-5">
      <div className="p-5 flex flex-col gap-5 submit-events">
        {' '}
        <h4 className="text-[#24181B] text-2xl font-medium">
          Your organization was submitted!
        </h4>
        <div className="overflow-hidden rounded-lg w-full">
          <Image className="w-full" src={submittedImage} alt="success" />
        </div>
        <p>
          Your submission for the organization &apos;{orgName}&apos; has been
          received. Our team is currently reviewing your submission.
        </p>
        <p>You can expect to hear back from us within 1 to 2 days.</p>
      </div>
      <div className="flex items-center justify-end p-6 border-t border-solid border-[#1E1E1E0D] rounded-b">
        <button
          onClick={() => setShowModal(false)}
          className="text-base  w-full h-[60px] py-3 flex justify-center items-center bg-[#E60054] rounded-[20px] font-medium text-white hover:bg-[#C20038]"
          type="button"
        >
          Close
        </button>{' '}
      </div>
    </div>
  );
};

export default OrgSubmittedContent;
