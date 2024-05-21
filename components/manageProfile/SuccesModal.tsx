import React from 'react';
import Image from 'next/image';
import Succuss from '../../public/images/img.jpg';
export default function Modal() {
  return (
    <div className="flex flex-col gap-5">
      <h4 className="text-[#24181B] text-2xl font-medium">You are all set!</h4>
      <div className="overflow-hidden rounded-lg w-full">
        <Image className="w-full" src={Succuss} alt="success" />
      </div>
      <p>
        Your submission for the event &apos;Paws for a Cause&apos; has been
        received. We&apos;re thrilled to start reviewing your details and will
        provide you with updates shortly.
      </p>
      <p>Please expect to hear from us within 1 to 3 days.</p>
    </div>
  );
}
