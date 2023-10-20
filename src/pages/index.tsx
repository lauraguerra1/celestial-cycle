import { useEffect, useState } from "react"
import React from "react";
import { getAuthenticatedUserFromSession } from "@/utils/passage";
import Router from "next/router";
import { GetServerSideProps } from "next";
import DemoPage from "@/components/DemoPage";
import HomeLoading from "@/components/HomeLoading"

type HomeProps = {
  isAuthorized: boolean;
}

export default function Home({ isAuthorized }: HomeProps) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => { 
      setLoading(false)
    }, 1500)

    if (isAuthorized) {
      Router.push("/dashboard"); 
    } 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[loading]);

  return (
    loading ? <HomeLoading /> : <DemoPage />
  );
}

export const getServerSideProps = (async (context) => {
  const loginProps = await getAuthenticatedUserFromSession(
    context.req,
    context.res
  );
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
