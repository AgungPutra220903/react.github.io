
  
    const urlParams = new URLSearchParams(window.location.search);
    const apiKey = urlParams.get('key');
    
    const randomId = getRandomIdFromUrl();

    
    const videoUrl = sessionStorage.getItem('videoUrl');
    const videoTitle = sessionStorage.getItem('videoTitle');
    const pageTitle = document.title = videoTitle;
    
if (pageTitle == null){
  document.title = "Play Video";
}
    
if (videoUrl) {
const videoPlayer = document.getElementById('playVideo');
    videoPlayer.src = videoUrl;
    videoPlayer.addEventListener('loadedmetadata', function() {
        videoPlayer.play();
    });
      document.getElementById('videoTitle').innerText = videoTitle;
} else {
  console.error('No video URL found in sessionStorage');
  const mainElement = document.querySelector('main.container');
  if (mainElement) {
    mainElement.style.display = 'none';  // Menyembunyikan elemen main
  }
}

function processVideoFromRandomId(videos) {
  const randomId = getRandomIdFromUrl();
  if (randomId) {
    const video = videos.find(video => video.id === randomId);

    if (video) {
      // Dapatkan URL video dan judul dari data JSON
      const videoUrl = video.Url;
      const videoTitle = video.Judul;

      // Update elemen video player langsung
      const videoPlayer = document.getElementById('video-id'); // Perbaiki ID
      const videoTitleElement = document.getElementById('videoTitle');

      if (videoPlayer && videoTitleElement) {
        videoPlayer.querySelector('source').src = videoUrl; // Update source src
        videoTitleElement.innerText = videoTitle;
        
        videoPlayer.load(); // Muat video dengan URL baru
        videoPlayer.play(); // Play video setelah metadata dimuat
      } else {
        console.error('Video player or title element not found.');
      }
    } else {
      console.error('Video not found for the given randomId.');
    }
  } else {
    console.error('Random ID not found in URL.');
  }
}





  const apiUrl = 'https://raw.githubusercontent.com/AgungDevlop/Viral/main/Video.json';
  let videos = [];
  let currentPage = 1;
  const videosPerPage = 10;
      // Load video list from JSON for the specified key


// Fungsi untuk mengacak array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Fetch JSON data
fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    videos = shuffleArray(data); // Mengacak urutan video

    loadVideos(currentPage);
    renderPageNumbers();
    processVideoFromRandomId(videos);
  })
  .catch(error => {
    console.error('Error:', error);
  });



function getRandomIdFromUrl() {
  const currentUrl = window.location.pathname;
  const urlParts = currentUrl.split('/');
  return urlParts[urlParts.length - 1]; // Mengambil ID video dari path
}


   if (apiKey === 's1m0ntox' || randomId) {
  

window.formatCount = function(count) {
  if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'K';
  } else {
    return count.toString();
  }
  };



window.loadVideos = function(page) {
  const start = (page - 1) * videosPerPage;
  const end = start + videosPerPage;
  const currentVideos = videos.slice(start, end);
  const playlistContainer = document.getElementById('videoPlaylist');
  playlistContainer.innerHTML = '';

  currentVideos.forEach(video => {
    const videoTitleWithExtension = video.Judul;
    const videoTitle = videoTitleWithExtension.replace(/\.[^/.]+$/, ""); // Removes file extension
    const videoUrl = video.Url;
    const videoId = video.id;

    const videoElement = document.createElement('div');
    videoElement.classList.add('video-thumbnail', 'relative');
    videoElement.innerHTML = `
      <div class="bg-white p-4 rounded-lg shadow-md flex flex-col">
        <h2 class="text-xl font-bold mb-2">${videoTitle}</h2>
        <div class="aspect-w-16 aspect-h-9 relative">
          <div class="loading-overlay">
            <div class="loading-placeholder"></div>
          </div>
          <video id="data-video" class="w-full h-40 object-cover" preload="metadata" onloadedmetadata="captureThumbnail(this)">
            <source src="${videoUrl}" type="video/mp4">
            Your browser does not support the video tag.
          </video>
        </div>
        <div class="flex justify-between items-center mt-4">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-1 rounded"
            onclick="playVideos('${videoUrl}', '${videoTitle}')">
            <i class="fas fa-play"></i> Play Video
          </button>
          <button onclick="download('${videoUrl}', '${videoTitle}')" rel="noopener noreferrer"
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-1 rounded">
            <i class="fas fa-download"></i> Download
          </button>
          <button onclick="copyVideoId('${videoId}')" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-1 rounded">
            <i class="fas fa-copy"></i> Copy Link
          </button>
        </div>
      </div>
    `;
    playlistContainer.appendChild(videoElement);
  });
}


// Add this function to your script
window.copyVideoId = function(videoId) {
  // Create a temporary input element
  const tempInput = document.createElement('input');
  tempInput.value = "https://mediafolder.my.id/"+videoId;
  document.body.appendChild(tempInput);

  // Select the input field
  tempInput.select();
  tempInput.setSelectionRange(0, 99999); // For mobile devices

  // Copy the text inside the input field
  document.execCommand('copy');

  // Remove the temporary input
  document.body.removeChild(tempInput);

  // Display SweetAlert
  Swal.fire({
    title: 'Copied!',
    text: `Link video berhasil di copy`,
    icon: 'success',
    confirmButtonText: 'OK'
  });
}



window.playVideos = function(videoUrl, videoTitle) {
  // Save video details to sessionStorage
  sessionStorage.setItem('videoUrl', videoUrl);
  sessionStorage.setItem('videoTitle', videoTitle);

  // Dummy function for incrementing views (without Firebase)
  console.log('View incremented locally.');

  // Open a new tab with the current URL
  const url = window.location.search;
  window.open(url, '_blank');

  // Redirect or perform any other actions after incrementing views
  const urls = [
    'https://www.highratecpm.com/uyn55j734?key=6215083a0cad61022fb25eeca740099d',
    'https://owoampouhy.com/4/7802956',
    'https://ephraimguntub.com/i4BJdejmNPsUQw/86240',
    'https://acceptablereality.com/b-3jVZ0UP.3opVvzbqm/VNJAZnDO0/0aOFDvQdzfOrD/Me3YLwTfQX4JNUDgM-4hMIzogP'
  ];

  // Set a timeout to redirect back after 3 seconds with a random URL
  setTimeout(() => {
    const randomIndex = Math.floor(Math.random() * urls.length);
    window.location.href = urls[randomIndex];
  }, 3000);
}

window.download = function(videoUrl, videoTitle) {
  // Dummy function for incrementing downloads (without Firebase)
  console.log('Download incremented locally.');
  window.open(videoUrl, '_blank');

  const urls = [
    'https://www.highratecpm.com/uyn55j734?key=6215083a0cad61022fb25eeca740099d',
    'https://owoampouhy.com/4/7802956',
    'https://ephraimguntub.com/i4BJdejmNPsUQw/86240',
    'https://acceptablereality.com/b-3jVZ0UP.3opVvzbqm/VNJAZnDO0/0aOFDvQdzfOrD/Me3YLwTfQX4JNUDgM-4hMIzogP'
  ];

  // Set a timeout to redirect back after 3 seconds with a random URL
  setTimeout(() => {
    const randomIndex = Math.floor(Math.random() * urls.length);
    window.location.href = urls[randomIndex];
  }, 3000);
}


window.captureThumbnail = function(video) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const duration = video.duration;
  const middleTime = duration / 2;
  const currentTime = video.currentTime;
  video.removeAttribute('autoplay');
  video.currentTime = middleTime;
  setTimeout(() => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    video.currentTime = currentTime;
    video.setAttribute('poster', canvas.toDataURL('image/jpeg'));
    video.parentElement.querySelector('.loading-overlay').style.display = 'none';
  }, 500);
}


window.renderPageNumbers = function() {
const totalPages = Math.ceil(videos.length / videosPerPage);
    const pageNumbers = document.getElementById('pageNumbers');
    pageNumbers.innerHTML = ''; // Clear existing page numbers

    const maxVisiblePages = 3; // Set the maximum visible page numbers
    const displayedPages = [];

    // Calculate the range of pages to display
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (totalPages <= maxVisiblePages) {
        // If total pages are less than or equal to maxVisiblePages, display all pages
        startPage = 1;
        endPage = totalPages;
    } else {
        // Ensure the current page is centered if not at the beginning or end
        if (currentPage <= Math.ceil(maxVisiblePages / 2)) {
            endPage = maxVisiblePages;
        } else if (currentPage >= totalPages - Math.floor(maxVisiblePages / 2)) {
            startPage = totalPages - maxVisiblePages + 1;
        }
    }

    if (startPage > 1) {
        const firstPage = document.createElement('button');
        firstPage.innerText = '1';
        firstPage.classList.add('mx-1', 'px-3', 'py-1', 'rounded', 'hover:bg-indigo-700', 'hover:text-white');
        firstPage.addEventListener('click', function () {
            currentPage = 1;
            loadVideos(currentPage);
            renderPageNumbers();
        });
        pageNumbers.appendChild(firstPage);

        if (startPage > 2) {
            const ellipsis = document.createElement('span');
            ellipsis.textContent = '...';
            pageNumbers.appendChild(ellipsis);
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        displayedPages.push(i);
        const button = document.createElement('button');
        button.innerText = i;
        button.classList.add('mx-1', 'px-3', 'py-1', 'rounded', 'hover:bg-indigo-700', 'hover:text-white');
        if (i === currentPage) {
            button.classList.add('bg-indigo-500', 'text-white');
        } else {
            button.classList.add('bg-gray-300', 'text-gray-600');
        }
        button.addEventListener('click', function () {
            currentPage = i;
            loadVideos(currentPage);
            renderPageNumbers();
        });
        pageNumbers.appendChild(button);
    }

    if (endPage < totalPages) {
        if (totalPages - endPage >= 2) {
            const ellipsis = document.createElement('span');
            ellipsis.textContent = '...';
            pageNumbers.appendChild(ellipsis);
        }

        const lastPage = document.createElement('button');
        lastPage.innerText = totalPages;
        lastPage.classList.add('mx-1', 'px-3', 'py-1', 'rounded', 'hover:bg-indigo-700', 'hover:text-white');
        lastPage.addEventListener('click', function () {
            currentPage = totalPages;
            loadVideos(currentPage);
            renderPageNumbers();
        });
        pageNumbers.appendChild(lastPage);
    }
}

// Log the device id to the console
console.log('Device ID:', navigator.userAgent);

  } else {
        console.error('Invalid or missing API key');
        // Handle the case where the API key is invalid or missing
    }

    document.getElementById('searchButton').addEventListener('click', function() {
        filterVideos();
    });

window.filterVideos = function() {
  const searchValue = document.getElementById('searchInput').value.toLowerCase();
  const videoThumbnails = document.querySelectorAll('.video-thumbnail');
  let found = false;
  videoThumbnails.forEach(thumbnail => {
    const titleElement = thumbnail.querySelector('h2');
    const title = titleElement.textContent.toLowerCase();
    if (title.includes(searchValue)) {
      thumbnail.style.display = 'block';
      found = true;
    } else {
      thumbnail.style.display = 'none';
    }
  });
  document.getElementById('noResults').style.display = found ? 'none' : 'block';
}

   
   document.addEventListener('DOMContentLoaded', function() {
  // Ambil elemen video
  var videoElement = document.getElementById('video-id');


 
});

var myFP = fluidPlayer(
        'video-id',	{
	"layoutControls": {
		"controlBar": {
			"autoHideTimeout": 3,
			"animated": true,
			"autoHide": true
		},
		"htmlOnPauseBlock": {
			"html": null,
			"height": null,
			"width": null
		},
		"autoPlay": false,
		"mute": true,
		"allowTheatre": true,
		"playPauseAnimation": true,
		"playbackRateEnabled": true,
		"allowDownload": false,
		"playButtonShowing": true,
		"fillToContainer": false,
		"posterImage": ""
	},
	"vastOptions": {
		"adList": [],
		"adCTAText": false,
		"adCTATextPosition": ""
	}
});

 
const currentYear = new Date().getFullYear();
    document.getElementById('copyrightText').textContent = `© Copyright By Orang Keren ${currentYear}`;
    document.getElementById('title').textContent = `Orang Keren ${currentYear}`;
  
