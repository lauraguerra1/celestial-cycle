<<<<<<< HEAD
import React, { useEffect } from "react";
=======
import { useEffect } from "react";
>>>>>>> main

const PassageLogin = () => {
  useEffect(() => {
    require("@passageidentity/passage-elements/passage-auth");
  }, []);

  return (
    <section className='h-90vh flex items-center justify-center'>
      <passage-auth
        app-id={process.env.NEXT_PUBLIC_PASSAGE_APP_ID}
      ></passage-auth>
    </section>
  );
};

export default PassageLogin;