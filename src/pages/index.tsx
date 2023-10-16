import PassageLogin from "@/components/login";
import { getAuthenticatedUserFromSession } from "@/utils/passage";
import { useEffect } from "react";
import Router from "next/router";
import { GetServerSideProps } from "next";

export default function Home({
  isAuthorized,
  userID,
}: {
  isAuthorized: boolean;
  userID: any;
}) {
  useEffect(() => {
    if (isAuthorized) {
      Router.push("/dashboard");
    }
  });

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
