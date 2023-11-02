<div align="center">
<h1> Celestial Cycle 🌙</h1>
Empowering women through a combination of astrological insights and menstrual cycle tracking.  
  
[VISIT OUR APP HERE](https://celestial-cycle.vercel.app)

*This application is currently being developed!*

Technologies used:<br>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src='https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white'/>
<img src='https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white' />
<img src='https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white' />
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" />
  <img src="https://img.shields.io/badge/-cypress-%23E5E5E5?style=for-the-badge&logo=cypress&logoColor=058a5e" />

  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white"/>
  <img src="https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white"/>
</div>

## Abstract: 

Celestial Cycle offers a seamless experience for users to input and track their menstrual flow, mood, cravings, and symptoms, alongside providing a glimpse of their daily horoscope and the current moon phase. Beyond these features, the app compiles this data to provide a comprehensive summary of insights, drawing on both the user's physical and emotional states, and the celestial influences at play in their life. By harmonizing this information, Celestial Cycle empowers users with a deeper understanding of themselves and their place within the universe, ultimately guiding them towards improved well-being and self-discovery.

# Preview of App:
 <div align='center'> 
    
  <h2>Login and Home Page</h2>
  <img src="https://github.com/lauraguerra1/celestial-cycle/assets/121131581/2a962a3d-f49f-431e-843a-c176d059ebb1" alt="Login and Home Page" />
    <h2>Calendar and Daily Insights</h2>
     <img src="https://github.com/lauraguerra1/celestial-cycle/assets/121131581/99e52073-3ac5-40b3-bc12-0c2f0c861aa4" alt="gif showing editing of results" />


  <h2>Adding an Entry</h2>
       <img src="https://github.com/lauraguerra1/celestial-cycle/assets/121131581/7b769f0c-99a3-49bc-9e8b-123873726925" alt="gif showing editing of results" />
 </div>

## Installation Instructions:
- Fork [this](https://github.com/lauraguerra1/celestial-cycle) repository. 
- Clone it to your local machine using the command: `git clone git@github.com:lauraguerra1/celestial-cycle.git`.
- Run the command: `cd celestial-cycle`
- Run the command: `npm install`
- Run the command: `npm run dev`
- To run Cypress e2e tests, run the command: `npm run cypress`

## Local development



Initial setup:
- Install Docker Desktop
- Run the command: `npx supabase login` and follow the instructions
- ~Run the command: `npx supabase init`~ -- only needed to be done once for this project I think?
- Run the command: `npx supabase link --project-ref vlgtrtvllgcifxunrcvw` using the Reference ID from the Project Settings page in Supabase.

Each time starting the app:
- Run the command: `npx supabase start` to start the local Supabase Postgres server
- Update `NEXT_PUBLIC_SUPABASE_URL` (API URL), `NEXT_PUBLIC_SUPABASE_ANON_KEY` and `SUPABASE_JWT_SECRET` in your `.env.local` using the output from the previous command
- Start the dev server: `npm run dev`

After running `supabase start`, a local version of the "Supabase Studio" is available at http://localhost:54323/, which can be used to create or update database tables. It is possible to sync changes made locally with our production instance. For more details, see [Supabase docs](https://supabase.com/docs/guides/cli/local-development).

Remaining TODO:
- Use `supabase/seed.sql` to seed some records in the database (i.e for the demo user)


## Context:
- All contributors are recent graduates of the Front End Engineering program at Turing School of Software and Design. This project was created for Women Who Code's Hackathon for Social Impact. 

## Contributors:
Front End Team
- [Laura Garcia Guerra](https://github.com/lauraguerra1)
- [Saki Chatphatthanasiri](https://github.com/sakisandrac)
- [Calli Hermann](https://github.com/caliham)
- [Amber Shipley](https://github.com/espressogoddess)


## Learning Goals:
- Gain proficiency in user authentication and in using a database as a platform.
- Solidify knowledge and understanding of full stack development principles.
- Implement new frameworks for React and CSS. 
