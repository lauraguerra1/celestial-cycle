import { useEffect } from "react";
import Router from "next/router";
import { getAuthenticatedUserFromSession } from "@/utils/passage";
import { getSupabase } from "../utils/supabase";
import { GetServerSideProps } from "next";
import React from "react";

type DashboardProps = {
  isAuthorized: boolean;
  name?: string;
};

export default function Dashboard({ isAuthorized, name }: DashboardProps) {
  useEffect(() => {
    if (!isAuthorized) {
      Router.push("/");
    }
  }, [isAuthorized]);

  return <h1>Welcome {name}! </h1>;
}

export const getServerSideProps = (async (context) => {
  const loginProps = await getAuthenticatedUserFromSession(
    context.req,
    context.res
  );
  if (loginProps?.isAuthorized) {
    const supabase = getSupabase(loginProps.userID);
    const { data } = await supabase
      .from("users")
      .select()
      .eq("passage_user_id", loginProps.userID);
    console.log(data);
    return {
      props: {
        isAuthorized: loginProps.isAuthorized,
        name: data?.[0].name as string,
      },
    };
  } else {
    return {
      props: {
        isAuthorized: false,
      },
    };
  }
}) satisfies GetServerSideProps<DashboardProps>;
