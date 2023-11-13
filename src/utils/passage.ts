import Passage from "@passageidentity/passage-node";
import { NextApiRequest, NextApiResponse, NextPageContext } from "next";

const passage = new Passage({
  appID: process.env.NEXT_PUBLIC_PASSAGE_APP_ID as string,
  apiKey: process.env.PASSAGE_API_KEY,
});

export const getAuthenticatedUserFromSession = async (
  req: NextPageContext["req"] | NextApiRequest,
  res: NextPageContext["res"] | NextApiResponse
) => {
  // For local dev:
  // return { isAuthorized: true, userID: "your ID" };

  try {
    const userID = await passage.authenticateRequest(req);
    if (userID) {
      let passageUser;
      try {
        passageUser = await passage.user.get(userID);
      } catch (error: any) {
        console.error('Failed to get user', error?.message, error?.statusCode)
      }
      return { isAuthorized: true, userID: userID, passageUser };
    }
  } catch (error) {
    // authentication failed
    console.debug('Failed to authN user', error)
    return { isAuthorized: false, userID: "" };
  }
};

