--> Local Development：

1. Install dependencies:
cd "c:\Users\weiha\Desktop\CAREER\Website"
npm install
2. Start the development server:
npm run dev
3. You'll see output like:
VITE v4.x.x ready in xxx ms
➜  Local:   http://localhost:5173/

--> Build for Production：

1. Create an optimized build (This creates a dist folder with files ready for deployment):
npm run build
2. Deploy to the Internet (Vercel (Recommended - Super Easy)):
2.1 Create a Repository on GitHub:
cd "c:\Users\weiha\Desktop\CAREER\Website"
git init # Initialize git (only first time)
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/my-react-website.git
git branch -M main
git push -u origin main
2.2: The file I need to push:
✅ src folder
✅ package.json
✅ vite.config.js
✅ index.html

--> File Explanation & How Often You'll Touch Them
You'll mainly work in App.jsx (logic + UI) and App.css (styling).

package.json	Lists dependencies & npm scripts		⚠️ Rarely (only when adding packages)
vite.config.js	Build tool configuration			⚠️ Almost never
index.html	Main HTML page with root div			⚠️ Almost never
main.jsx	React app entry point				⚠️ Almost never
App.jsx		Your main component - UI & logic goes here	✅ Frequently
App.css		Styles for your components			✅ Frequently
index.css	Global styles					⏸️ Occasionally
