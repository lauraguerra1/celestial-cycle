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
  try {
    const userID = await passage.authenticateRequest(req);
    if (userID) {
      return { isAuthorized: true, userID: userID };
    }
  } catch (error) {
    // authentication failed
    return { isAuthorized: false, userID: "" };
  }
};
