# UniFlow

One connected platform for students, faculty, wardens, mess managers and admins.

## Run
Open `index.html` (Sign up → pick Student, Staff, Hostel or Admin),  in a browser, or serve the folder: `npm start`. No build step.

## Test
`npm test` (Node 18+, no dependencies) runs workflow tests for attendance, gate passes, complaints, certificates, notices, mess demand, SOS and admin, plus site checks.

## Structure
- `index.html`, `css/landing.css`, `js/landing.js` — landing page
- `app/` — the app (`uniflow.html`, `app.css`, `app.js`)
- `tests/` — automated tests

## Demo logins
Student `CSE2301`/`student123` · Faculty `FAC101`/`faculty123` · Warden `WRD201`/`warden123` · Mess `MESS301`/`mess123` · Admin `admin`/`admin123`. Role buttons on the sign-in screen auto-fill these.
Demo build: data is stored in the browser only.

## Deploy
Static site. Drag the folder onto Netlify, or push to Vercel / GitHub Pages.
