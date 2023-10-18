import '@passageidentity/passage-elements/passage-profile';
import dotenv from 'dotenv';

function Profile() {
  dotenv.config();
  const passageAppId = process.env.NEXT_PUBLIC_PASSAGE_APP_ID;

  if (!passageAppId) {
    throw new Error('NEXT_PUBLIC_PASSAGE_APP_ID is not defined in the environment.');
  }

  return (
    <div>
      <passage-profile app-id={passageAppId}></passage-profile>
    </div>
  );
}
export default Profile;