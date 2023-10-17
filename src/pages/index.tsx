
// import Homepage from "@/components/Homepage"
import { useEffect, useState } from "react"
import Image from 'next/image'
import React from "react";
import { getAuthenticatedUserFromSession } from "@/utils/passage";
import Router from "next/router";
import { GetServerSideProps } from "next";
import DemoPage from "@/components/DemoPage";
import HomeLoading from "@/components/HomeLoading"

type HomeProps = {
  logIn: (id: number) => void
  logOut: () => void, 
  isAuthorized: boolean;
  userID: any;
}

export default function Home({ isAuthorized, userID, logOut, logIn }: HomeProps) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => { 
      setLoading(false)
    }, 3000)

    if (isAuthorized) {
      Router.push("/dashboard"); 
    } 
 
  },[loading]);

  return (
    loading ? <HomeLoading /> : <DemoPage logIn={logIn} />
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
