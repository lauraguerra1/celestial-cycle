import React from 'react';
import { getAuthenticatedUserFromSession } from "@/utils/passage";
import { GetServerSideProps } from "next";
import { AuthProps } from '@/types/types';
import RegistrationForm from '@/components/RegistrationForm';

export default function registrationform ({isAuthorized }: AuthProps){
  return (<RegistrationForm isAuthorized={isAuthorized} />)
}

export const getServerSideProps = (async (context) => {
  const loginProps = await getAuthenticatedUserFromSession(
    context.req,
    context.res
  );
  if (loginProps?.isAuthorized) {
    return {
      props: {
        isAuthorized: loginProps.isAuthorized,
      },
    };
  } else {
    return {
      props: {
        isAuthorized: false,
      },
    };
  }
}) satisfies GetServerSideProps<AuthProps>;