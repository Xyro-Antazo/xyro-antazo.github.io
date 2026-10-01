# 🎓 Leonardo Antazo - 3rd Year BSIT Student Portfolio & Resume

A modern, responsive, and industry-ready personal portfolio website built with pure **Vanilla HTML5, CSS3, and JavaScript**. Tailored specifically for **Leonardo Antazo**, a **3rd Year Bachelor of Science in Information Technology (BSIT)** student preparing for upcoming **On-the-Job Training (OJT) / Internships**, **Capstone Project defenses**, and technical job applications.

---

## 🌟 Features Included

- **No Frameworks or Node.js Required**: Runs natively in any web browser with zero configuration or installation.
- **Dedicated Printable Resume / CV**: Comes with a clean, professional `resume.html` with a one-click **"Print / Save as PDF"** feature.
- **Dark & Light Mode Switcher**: Modern toggle with automatic persistence using `localStorage`.
- **Fully Responsive**: Optimized for smartphones, tablets, and widescreen desktop displays.
- **Dynamic Project Filtering**: Interactive buttons to filter projects by category (*All*, *Web Applications*, *Database Systems*, *Prototypes*).
- **Sticky Navigation & Scroll Spy**: Auto-highlights the current section in the navbar as you scroll.
- **Interactive Contact Form**: Client-side validation for Name, Email, Subject, and Message with animated feedback.
- **OJT & Capstone Ready**: Pre-structured sections for Academic Focus, Technical Skills, Systems Architecture, and Certifications.
- **GitHub Pages Ready**: Structured for instant, 100% free hosting on GitHub.

---

## 📂 Project Structure

```
keen-tesla/
├── index.html                   # Leonardo's main portfolio website
├── resume.html                  # Leonardo's printable / downloadable CV & Resume
├── README.md                    # Project documentation & setup instructions
├── css/
│   └── style.css                # Modern CSS variables, responsive grid, animations
├── js/
│   └── script.js                # Theme switch, mobile nav drawer, project filter, form
└── assets/
    ├── documents/
    │   └── resume-readme.txt    # Notice explaining where to drop an optional resume.pdf
    └── images/
        ├── profile-avatar.svg   # Scalable avatar illustration
        ├── project-1.svg        # Mockup: CineTicket Cinema Reservation App
        ├── project-2.svg        # Mockup: Online Student Enrollment System
        └── project-3.svg        # Mockup: IT Helpdesk Prototype
```

---

## 🚀 How to Run Locally

You do not need to install anything!
1. Locate the `index.html` file in your file explorer.
2. **Double-click `index.html`** or right-click and choose **Open With > Google Chrome / Microsoft Edge / Firefox**.
3. *Optional (for VS Code users)*: Install the **Live Server** extension in VS Code and click **"Go Live"** in the bottom-right corner.

---

## ✏️ How to Customize with Your Own Information

### 1. Change Your Name and Degree Details
Open `index.html` and look for:
- `<title>`: Change `John Doe` to your real name.
- `<a href="#hero" class="nav-logo">`: Update the brand logo text.
- Hero Section (`<section id="hero">`):
  - Replace `John Doe` inside `<h1 class="hero-title">`.
  - Update `<h2 class="hero-subtitle">` with your specific career goal (e.g. *Aspiring Full-Stack Developer*, *UI/UX Designer*, *Database Administrator*).
  - Update your social links: replace `https://github.com` and `https://linkedin.com` with your personal profile URLs.
  - Update `mailto:johndoe.bsit@example.com` with your actual school/personal email.

### 2. Update About Me & School
In `index.html` under `<section id="about">`:
- Edit the bio paragraphs with your personal story, interests, and university/college name.
- Update the timeline items with your actual school name and graduation target year.

### 3. Customize Your Technical Skills
In `index.html` under `<section id="skills">`:
- Add or remove skill badges (e.g., Python, C++, Java, React, Tailwind, Kali Linux, etc.).

### 4. Replace Project Details & Screenshots
In `index.html` under `<section id="projects">`:
- Replace the project titles, descriptions, and tech stack tags with your actual coursework or Capstone projects.
- Replace SVG images in `assets/images/` with real screenshots (`.png` or `.jpg`) of your systems, and update the `<img src="assets/images/your-screenshot.png">` path in `index.html`.

### 5. Attach Your Actual Resume / CV
1. Save your resume as a PDF named `resume.pdf`.
2. Move it into the `assets/documents/` folder (`assets/documents/resume.pdf`).
3. In `index.html`, find:
   ```html
   <a href="assets/documents/resume-readme.txt" class="btn btn-outline nav-resume-btn" ...>
   ```
   Change the `href` to:
   ```html
   <a href="assets/documents/resume.pdf" class="btn btn-outline nav-resume-btn" download="My-Resume.pdf">
   ```

---

## 🌐 How to Host Free on GitHub Pages (For Professor Submission)

When submitting this project to your professor, you can give them a live link (e.g., `https://yourusername.github.io/portfolio`):

### Option A: Using GitHub Desktop (Beginner-Friendly & Recommended for Students)
1. Download and open [GitHub Desktop](https://desktop.github.com/).
2. Click **File > Add Local Repository** and select your `keen-tesla` folder.
3. Click **Publish repository** to push it to your GitHub account.
4. Go to your repository on github.com > **Settings** > **Pages**.
5. Set branch to `main` (or `master`) and folder to `/ (root)`, then click **Save**.

### Option B: Using Git Command Line
```bash
git add .
git commit -m "feat: complete 3rd year BSIT portfolio website"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPOSITORY_NAME.git
git push -u origin main
```
2. **Enable GitHub Pages**:
   - Open your repository on GitHub in your browser.
   - Go to **Settings** > **Pages** (in the left sidebar).
   - Under **Build and deployment > Source**, select **Deploy from a branch**.
   - Under **Branch**, select `main` and `/ (root)`, then click **Save**.
3. **Get Your Live URL**:
   - Within 1–2 minutes, GitHub will generate your live URL (e.g., `https://YOUR_GITHUB_USERNAME.github.io/YOUR_REPOSITORY_NAME/`).
   - Share this live link with your professor and on your resume!

---

## 💡 Tips for Defending / Presenting to Your Professor

If your professor asks questions about your code during checking:
- **"What architecture or structure did you use?"**:
  - Explain that you used semantic HTML5 tags (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`) for web accessibility (A11y) and SEO.
  - Explain that you separated concerns cleanly: markup in `index.html`, styling and CSS variables in `css/style.css`, and dynamic logic in `js/script.js`.
- **"How does the Dark/Light mode work?"**:
  - Point to `js/script.js`: it toggles a `data-theme` attribute on the `<body>` element, and saves the user's choice in `localStorage` so it stays saved when refreshing.
- **"How is the responsiveness handled?"**:
  - Point to `css/style.css`: it uses CSS Grid (`repeat(auto-fit, minmax(...))`) and Flexbox, with CSS media queries (`@media (max-width: 768px)`) for mobile layouts.
