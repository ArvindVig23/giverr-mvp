import { NextResponse } from 'next/server';
const responseHandler = (
  status?: number,
  success?: boolean,
  data?: any,
  message?: string,
) => {
  const response = NextResponse.json(
    {
      success: success,
      data: data,
      message: message,
    },
    { status: status },
  );
  return response;
};

export default responseHandler;
