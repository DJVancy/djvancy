const channelID = "UCBVpJriQglqa6UtndEZtt1A";
const apiKey = "AIzaSyDOSSF2NtEWU6K7g6zqsnXOSFVHuw3EDA8";
const maxResults = 7;

fetch(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelID}&part=snippet,id&order=date&maxResults=${maxResults}`)
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById("mixes-grid");
    data.items.forEach(item => {
      if(item.id.kind === "youtube#video"){
        const videoID = item.id.videoId;
        const title = item.snippet.title;
        const card = document.createElement("div");
        card.classList.add("mix-card");
        card.innerHTML = `
          <iframe src="https://www.youtube.com/embed/${videoID}" allowfullscreen></iframe>
          <p>${title}</p>
        `;
        container.appendChild(card);
      }
    });
  })
  .catch(err => console.error(err));