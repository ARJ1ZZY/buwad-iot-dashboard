# buwad-iot-dashboard

Fix for "Can't determine Firebase Database URL" (quick)
1) Make sure your env file is in the subproject folder that runs Vite:
   cd "C:\Users\Administrator\Documents\aj file\buwad1\buwad-iot-dashboard"
   copy ..\.env.example .env.local
   notepad .env.local   # fill your Firebase values, save

2) Use the provided safe initializer
   - The project includes src/firebase.js (new). Replace any direct initializeApp/getDatabase usage in your App.jsx:
     // before:
     // const app = initializeApp(firebaseConfig);
     // const database = getDatabase(app);
     // after:
     import app, { db } from './firebase';
     # use `db` instead of calling getDatabase(app) yourself

3) Restart dev server:
   npm run dev
   # open the Local URL Vite prints (usually http://localhost:5173)

If you still see the error, paste the terminal output and browser Console log and I will advise next steps.