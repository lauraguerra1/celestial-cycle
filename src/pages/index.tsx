import { useEffect } from "react"
import React from "react";
import PassageLogin from "@/components/login";
import { getAuthenticatedUserFromSession } from "@/utils/passage";
import Router from "next/router";
import { GetServerSideProps } from "next";

type HomeProps = { 
  isAuthorized: boolean;
  userID: any;
}

export default function Home({ isAuthorized }: HomeProps) {
  useEffect(() => {
    if (isAuthorized) {
      Router.push("/dashboard"); 
    } 
  },[]);

  return (
    <div>
      <PassageLogin />
    </div>
  );

}

export const getServerSideProps = (async (context) => {
  const loginProps = await getAuthenticatedUserFromSession(
    context.req,
    context.res
  );
  //  db queries, etc
  return {
    props: {
      isAuthorized: loginProps?.isAuthorized ?? false,
      userID: loginProps?.userID ?? "",
    },
  };
}) satisfies GetServerSideProps<{
  isAuthorized: boolean;
  userID: any;
}>;
