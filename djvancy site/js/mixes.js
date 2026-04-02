// Your API Key and Channel ID
const API_KEY = "AIzaSyDOSSF2NtEWU6K7g6zqsnXOSFVHuw3EDA8";
const CHANNEL_ID = "UCBVpJriQglqa6UtndEZtt1A";

// Number of videos to fetch
const MAX_RESULTS = 7;

// Select the container
const container = document.querySelector(".mixes-grid");

// Fetch latest videos
async function fetchLatestVideos() {
  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${MAX_RESULTS}`
    );

    const data = await res.json();
    const videos = data.items;

    // Clear container
    container.innerHTML = "";

    // Loop through videos
    videos.forEach((video) => {
      if (video.id.kind === "youtube#video") {
        const videoId = video.id.videoId;
        const title = video.snippet.title;

        const card = document.createElement("div");
        card.classList.add("mix-card");
        card.innerHTML = `
          <iframe src="https://www.youtube.com/embed/${videoId}" allowfullscreen></iframe>
          <p>${title}</p>
          <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">Watch on YouTube</a>
        `;

        container.appendChild(card);
      }
    });
  } catch (error) {
    console.error("Error fetching YouTube videos:", error);
    container.innerHTML = "<p>Unable to load videos at the moment.</p>";
  }
}

// Load videos on page load
window.addEventListener("DOMContentLoaded", fetchLatestVideos);