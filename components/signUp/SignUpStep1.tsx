import Link from 'next/link';
import React from 'react';

const SignUpStep1: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Link
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        href={'/sign-up?step=2'}
      >
        Continue
      </Link>
    </div>
  );
};

export default SignUpStep1;
