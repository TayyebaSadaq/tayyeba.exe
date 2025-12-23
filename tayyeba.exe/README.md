# ☕ Tayyeba's Cute Personal Website ✨

Welcome to your cozy corner of the internet! This is a personal website with a pink cafe/cottage theme, designed to showcase your work, experiences, and hobbies in a warm and welcoming way.

## 📁 Folder Structure

```
tayyeba.exe/
├── index.html          # Home page - welcome message
├── about.html          # About me page - personal introduction
├── projects.html       # Projects page - showcases your work
├── career.html         # Career page - work experience timeline
├── hobbies.html        # Hobbies & blog - personal interests
├── css/
│   └── style.css      # Main stylesheet - pink cafe theme
├── js/
│   ├── projects.js    # Loads projects from JSON
│   └── career.js      # Loads career info from JSON
├── data/
│   ├── projects.json  # Your projects data
│   └── career.json    # Your career data
├── images/            # Store your images here
└── assets/            # Other assets (icons, etc.)
```

## 🎨 Theme & Colors

The website features a cozy pink cafe/cottage aesthetic with:
- **Primary colors**: Soft pinks, cream, warm whites
- **Fonts**: Quicksand (body), Caveat (headings), Raleway (text)
- **Vibe**: Personal, warm, welcoming - not corporate!

## 🚀 How to Use

### 1. **Customize Your Information**

#### Update the Home Page (index.html)
- Edit the welcome message
- Update social media links (search for `yourusername` and replace)
- Add your own personal touch!

#### Update About Me (about.html)
- Fill in your introduction
- Add your skills and interests
- Share your story
- Update social links

#### Add Your Projects (data/projects.json)
Edit the JSON file with your project details:
```json
{
  "name": "Project Name",
  "description": "What does it do?",
  "image": "images/project-screenshot.png",
  "repo": "https://github.com/yourusername/repo"
}
```

#### Add Your Career (data/career.json)
Edit the JSON file with your work experience:
```json
{
  "company": "Company Name",
  "time": "Start - End",
  "role": "Your Role",
  "description": "What you did there"
}
```

#### Customize Hobbies & Blog (hobbies.html)
- Add your gaming updates
- Share book reviews
- Upload Minecraft screenshots to `images/` folder
- Write blog posts
- Update your social media links

### 2. **Add Images**

Place your images in the `images/` folder:
- Project screenshots
- Minecraft builds
- Book covers
- Gaming captures
- Profile pictures

Then reference them in HTML like: `images/your-image.png`

### 3. **Update Social Links**

Find and replace these placeholder links throughout the site:
- `https://instagram.com/yourusername` → Your Instagram
- `https://twitch.tv/yourusername` → Your Twitch
- `https://github.com/yourusername` → Your GitHub
- `https://pagebound.com/yourusername` → Your Pagebound
- `https://codedbytea.tumblr.com` → Already set! ✨

### 4. **Add More Pages** (Optional)

To add a new page:
1. Create a new HTML file (e.g., `gallery.html`)
2. Copy the structure from an existing page
3. Add the link to the navigation bar in ALL pages
4. Customize the content!

## 💻 Running Your Website

### Locally (For Testing)
1. Open any HTML file in your web browser
2. Or use a local server:
   - Python: `python -m http.server 8000`
   - VS Code: Use "Live Server" extension
   - Node.js: `npx serve`

### Deploy Online (Free Options)
- **GitHub Pages**: Push to GitHub and enable Pages
- **Netlify**: Drag and drop your folder
- **Vercel**: Connect your repository
- **Neocities**: Upload files directly

## 📝 Customization Tips

### Change Colors
Edit the CSS variables in `css/style.css`:
```css
:root {
  --primary-pink: #FFB6C1;    /* Change these colors! */
  --soft-pink: #FFC0CB;
  --dark-pink: #FF69B4;
  /* ... and more */
}
```

### Change Fonts
Update the Google Fonts import in `css/style.css` and change:
```css
--font-main: 'Quicksand', sans-serif;
--font-heading: 'Caveat', cursive;
```

### Add Animations
The CSS includes animation classes. Add them to elements:
- `fadeInDown` - Fade in from top
- `fadeInUp` - Fade in from bottom
- `heartbeat` - Pulse animation

## 🐛 Troubleshooting

### Projects/Career Not Loading?
- Check that JSON files are in the `data/` folder
- Make sure JSON syntax is valid (use a JSON validator)
- Open browser console (F12) to see errors
- Ensure you're running from a server (not just opening HTML files)

### Images Not Showing?
- Verify images are in the `images/` folder
- Check file paths are correct
- Use forward slashes: `images/pic.png` not `images\pic.png`
- Check file extensions match (case-sensitive on some servers)

### Styling Looks Wrong?
- Verify `css/style.css` path is correct in HTML files
- Clear browser cache (Ctrl+F5)
- Check for CSS syntax errors

## 📱 Instagram Integration

For Instagram posts, you have a few options:
1. **Manual**: Add images and text manually to `hobbies.html`
2. **Instagram API**: Requires developer account and setup
3. **Third-party**: Use services like SnapWidget or LightWidget
4. **Link**: Just link to your Instagram (current setup)

## ✨ Features

- ✅ Responsive design (mobile-friendly)
- ✅ Cute pink cafe/cottage theme
- ✅ Dynamic content loading from JSON
- ✅ Smooth animations
- ✅ Clean, commented code
- ✅ Easy to customize
- ✅ No frameworks needed - pure HTML/CSS/JS!

## 💖 Made With Love

This website was designed to be:
- **Personal**: Not corporate or stuffy
- **Cozy**: Warm, welcoming vibes
- **You**: Authentic and true to your personality
- **Fun**: Enjoyable to update and maintain

---

**Have fun customizing your cozy corner! ☕✨**

Remember: This is YOUR space. Make it uniquely yours! Add whatever you want, 
change whatever you'd like, and most importantly - have fun with it!

Need help? The code is heavily commented to guide you! 💕
