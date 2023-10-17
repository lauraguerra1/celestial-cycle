
// import Homepage from "@/components/Homepage"
import { useEffect, useState } from "react"
import { insights, userData } from '../mockdata'
import { User } from "@/types/types"
import { getZodiacSign } from "@/utils"
import Image from 'next/image'
import React from "react";
import PassageLogin from "@/components/login";
import { getAuthenticatedUserFromSession } from "@/utils/passage";
import Router from "next/router";
import { GetServerSideProps } from "next";
import DemoPage from "@/components/DemoPage"

type HomeProps = {
  logIn: (id: number) => void
  logOut: () => void, 
  isAuthorized: boolean;
  userID: any;
}

export default function Home({ isAuthorized, userID, logOut, logIn}: HomeProps) {
  useEffect(() => {
    if (isAuthorized) {
      Router.push("/dashboard"); 
    } 
  },[]);

  return (
    <DemoPage logIn={logIn} />
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
