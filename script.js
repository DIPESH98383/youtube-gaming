// Get all the video cards
const videoCards = document.querySelectorAll('.video-card');
const modal = document.getElementById('modal');
const modalVideo = document.getElementById('modal-video');
const closeModal = document.querySelector('.close');

// When a video card is clicked, open the modal and play the video
videoCards.forEach(videoCard => {
    videoCard.addEventListener('click', () => {
        const videoId = videoCard.getAttribute('data-video');
        modal.style.display = 'flex';
        modalVideo.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    });
});

// When the close button is clicked, close the modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    modalVideo.src = ''; // Stop the video when closing
});

// Close modal if user clicks outside the modal content
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        modalVideo.src = ''; // Stop the video when closing
    }
});
// Toggle the like button between liked and not liked
function toggleLike(button) {
    button.classList.toggle('liked');
    
    if (button.classList.contains('liked')) {
        button.innerText = '👍 Liked';
    } else {
        button.innerText = '👍 Like';
    }
}
const toggleSidebar = () => {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = sidebar.style.display === 'none' ? 'block' : 'none';
};

document.querySelector('.header').insertAdjacentHTML('beforeend', `
    <button onclick="toggleSidebar()" aria-label="Toggle Sidebar">☰</button>
`);
document.querySelectorAll('.play-button').forEach(button => {
    button.addEventListener('click', (event) => {
        const videoId = event.target.closest('.video-card').dataset.video;
        const modal = document.getElementById('modal');
        const modalVideo = document.getElementById('modal-video');
        modalVideo.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        modal.style.display = 'block';
    });
});

document.querySelector('.close').addEventListener('click', () => {
    document.getElementById('modal').style.display = 'none';
    document.getElementById('modal-video').src = '';
});
const toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
};

document.querySelector('.header').insertAdjacentHTML('beforeend', `
    <button onclick="toggleDarkMode()" aria-label="Toggle Dark Mode">🌙</button>
`);
<div class="video-card" data-video="znGh-2VBK80" data-channel-id="channel123">
    <div class="video-thumbnail">
        <iframe src="https://www.youtube.com/embed/znGh-2VBK80" frameborder="0" allowfullscreen></iframe>
    </div>
    <p class="video-title">Video Title #1</p>
    <button class="subscribe-button" data-subscribed="false">Subscribe</button>
</div>
const apiKey = 'YOUR_API_KEY';
const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&videoCategoryId=20&regionCode=IN&maxResults=100&key=${apiKey}`;

fetch(url)
    .then(response => response.json())
    .then(data => {
        const videoGrid = document.querySelector('.video-grid');
        data.items.forEach(video => {
            const videoCard = document.createElement('div');
            videoCard.classList.add('video-card');
            videoCard.innerHTML = `
                <div class="video-thumbnail">
                    <iframe src="https://www.youtube.com/embed/${video.id}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    <button class="play-button">▶</button>
                </div>
                <p class="video-title">${video.snippet.title}</p>
                <div class="video-stats">
                    <span><strong>Likes:</strong> ${video.statistics.likeCount}</span>
                    <span><strong>Comments:</strong> ${video.statistics.commentCount}</span>
                    <span><strong>Views:</strong> ${video.statistics.viewCount}</span>
                </div>
            `;
            videoGrid.appendChild(videoCard);
        });
    })
    .catch(error => console.error('Error fetching YouTube data:', error));
// Replace with your YouTube API key

// Replace with Channel IDs of the channels
const channelIds = {
  SandMan: 'UC6H07w7iQ-pcJPf3jp0weBQ', // Replace with actual Channel ID for SandMan
  SlashingWolf: 'UCzW91hnTKh2trYNyH09AhIg', // Replace with actual Channel ID for SlashingWolf
  BeastBoyShub: 'UCcV4PIS6yCR6yH55fYQpAHQ' // Replace with actual Channel ID for BeastBoyShub
};

// Fetch videos for each channel and display them
const videoGrid = document.querySelector('.video-grid');

const fetchVideos = (channelId, channelName) => {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=10&order=date&key=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      data.items.forEach(video => {
        const videoCard = document.createElement('div');
        videoCard.classList.add('video-card');
        videoCard.innerHTML = `
          <div class="video-thumbnail">
            <iframe src="https://www.youtube.com/embed/${video.id.videoId}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <button class="play-button">▶</button>
          </div>
          <p class="video-title">${video.snippet.title}</p>
          <div class="video-stats">
            <span><strong>Channel:</strong> ${channelName}</span>
          </div>
        `;
        videoGrid.appendChild(videoCard);
      });
    })
    .catch(error => console.error('Error fetching YouTube data:', error));
};

// Fetch videos for all channels
fetchVideos(channelIds.SandMan, 'SandMan');
fetchVideos(channelIds.SlashingWolf, 'SlashingWolf');
fetchVideos(channelIds.BeastBoyShub, 'BeastBoyShub');
