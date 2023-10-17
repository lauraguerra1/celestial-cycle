import { createClient, SupabaseClientOptions } from "@supabase/supabase-js";
import jwt from "jsonwebtoken";

const getSupabase = (userId: string) => {
  const options: SupabaseClientOptions<"public"> = {};

  if (userId) {
    const payload = {
      userId,
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    };
    const token = jwt.sign(payload, process.env.SUPABASE_JWT_SECRET as string);

    options.global = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
    options
  );
  return supabase;
};

export { getSupabase };
