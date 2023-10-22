import { useEffect, useState } from "react"
import React from "react";
import { getAuthenticatedUserFromSession } from "@/utils/passage";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import DemoPage from "@/components/DemoPage";
import HomeLoading from "@/components/HomeLoading"

type HomeProps = {
  isAuthorized: boolean;
}

export default function Home({ isAuthorized }: HomeProps) {
  const [loading, setLoading] = useState(true)
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => { 
      setLoading(false);
    }, 1500)

    if (isAuthorized) {
      router.push("/dashboard"); 
    } 
  },[loading, router]);

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
