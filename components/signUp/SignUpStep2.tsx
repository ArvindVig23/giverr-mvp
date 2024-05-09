import Link from 'next/link';
import React from 'react';

const SignUpStep2: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div>Sign UP Step2 form</div>
      <div className="mt-4">
        <Link
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          href={'/sign-up'}
        >
          Back to step 1
        </Link>
      </div>
    </div>
  );
};

export default SignUpStep2;
