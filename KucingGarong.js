
  const urlParams = new URLSearchParams(window.location.search);
  const apiKey = urlParams.get('key');
  
  const pathName = window.location.pathname.split('/').pop(); // Ambil pathName dari URL
  
  const apiUrl = 'https://raw.githubusercontent.com/AgungDevlop/Viral/main/Video.json';
  let videos = [];
  let currentPage = 1;
  const videosPerPage = 10;

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

      if (pathName) {
        const video = videos.find(video => video.id === pathName);

        if (video) {
          // Simpan ke sessionStorage
          sessionStorage.setItem('videoUrl', video.Url);
          sessionStorage.setItem('videoTitle', video.Judul);

          // Putar video tanpa memuat ulang halaman
          playVideo(video.Url, video.Judul);
        } else {
          console.error('Video not found for the given pathName.');
        }
      } else {
        loadVideos(currentPage);
        renderPageNumbers();
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });

  function playVideo(videoUrl, videoTitle) {
    const videoPlayer = document.getElementById('playVideo');
    if (videoPlayer) {
      videoPlayer.src = videoUrl;
      videoPlayer.addEventListener('loadedmetadata', function() {
        videoPlayer.play();
      });
      document.getElementById('videoTitle').innerText = videoTitle;
      document.title = videoTitle || "Play Video";
    }
  }

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
              onclick="playVideo('${videoUrl}', '${videoTitle}')">
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

  window.copyVideoId = function(videoId) {
    // Create a temporary input element
    const tempInput = document.createElement('input');
    tempInput.value = "https://mediafolder.my.id/" + videoId;
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
      const pageNumber = document.createElement('button');
      pageNumber.innerText = i;
      pageNumber.classList.add('mx-1', 'px-3', 'py-1', 'rounded', 'hover:bg-indigo-700', 'hover:text-white');
      if (i === currentPage) {
        pageNumber.classList.add('bg-indigo-700', 'text-white');
      }
      pageNumber.addEventListener('click', function () {
        currentPage = i;
        loadVideos(currentPage);
        renderPageNumbers();
      });
      pageNumbers.appendChild(pageNumber);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
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
	 
