# 🎵 MelodyMind – AI YouTube Music Plugin

**MelodyMind** is a voice-assisted Chrome Extension that revolutionizes music discovery using Artificial Intelligence and Machine Learning. It enables users to seamlessly search, play, and receive AI-driven music recommendations directly from YouTube, all through hands-free voice commands.

## 🚀 Features

* 🎤 **Voice-Controlled Music Playback**
  Use natural voice commands to play, pause, stop, and search for songs without touching your keyboard.

* 🧠 **AI-Powered Recommendations**
  Personalized music suggestions based on user preferences and listening history using deep learning models (CNNs & RNNs).

* 📺 **YouTube Integration**
  Stream music directly from YouTube without the need for any third-party apps or platforms.

* 🎧 **Dynamic Playlist Generation**
  Create playlists on the fly based on mood, genre, and history.

* 🔒 **Secure User Authentication**
  Uses OAuth 2.0 and JWT for secure user sessions and data privacy.

* 🌐 **Modern, Intuitive UI**
  Responsive interface with dark mode, custom themes, and smooth UX.

---

## 🧠 Tech Stack

### 🎯 Frontend

* React.js + Vite
* JavaScript, HTML, Tailwind CSS, Material UI
* Chrome Extension APIs

### 🧠 Backend

* Python (Flask), Node.js (Express)
* MySQL, Redis
* TensorFlow / PyTorch for AI
* Google Cloud Speech-to-Text, YouTube API

### 📦 Tools & Libraries

* Figma (UI design)
* Axios, Redux Toolkit
* Librosa, spaCy, NLTK (for NLP)
* yt-dlp, VLC for YouTube audio streaming

---

## ⚙️ Installation

### Prerequisites

* Google Chrome
* Node.js & npm
* Python 3.x
* MySQL
* Git

### Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/melodymind.git
   cd melodymind
   ```

2. **Install Frontend Dependencies**

   ```bash
   cd frontend
   npm install
   ```

3. **Install Backend Dependencies**

   ```bash
   cd ../backend
   pip install -r requirements.txt
   ```

4. **Set up MySQL Database**

   * Create schema and tables as per `/backend/db/schema.sql`

5. **Run Backend Server**

   ```bash
   python app.py
   ```

6. **Load Extension into Chrome**

   * Go to `chrome://extensions/`
   * Enable **Developer mode**
   * Click **Load unpacked**
   * Select the `/frontend` directory

---

## 🧪 Testing

* Frontend: Jest, React Testing Library
* Backend: Mocha, Chai
* Performance: Load testing via Postman
* Voice recognition: Manual test with various accents and noise levels

---

## 📦 Deployment

* **Frontend**: Chrome Web Store
* **Backend**: AWS Lambda / Heroku / Google Cloud
* **Database**: MySQL Atlas
* **Caching**: Redis

---

## 📸 Screenshots

![Login UI]([docs/screenshots/login.png](https://github.com/SRM27-code/MelodyMind-AI-YouTube-Music-Plugin/blob/main/Screenshots/Screenshot%202025-02-02%20220441.png)
![Voice Assistant GIF](docs/screenshots/voice.gif)
![Music Control Interface](docs/screenshots/player.png)

---

## 🔐 Security

* OAuth 2.0 authentication
* Encrypted user credentials
* GDPR compliance
* Protection against XSS, CSRF, and SQL injection

---

## 📈 Future Enhancements

* Mobile app (iOS/Android)
* Offline music caching
* Integration with Spotify & Apple Music
* Real-time lyrics display
* Multi-language voice support
* Collaborative playlists

---

## 👨‍💻 Authors

* Ankit Choudhary (21BAI10409)
* Shubham Mahind (21BAI10407)
* R.J. Thanaraman (21BAI10162)
* Abhishek Kumar (21BAI10021)
* Bhuvan Chandra (21BAI10079)

**Institution**: VIT Bhopal University, School of Computing Science and Engineering – Artificial Intelligence and Machine Learning
