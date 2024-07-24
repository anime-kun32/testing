document.addEventListener('DOMContentLoaded', () => {
  const contentDiv = document.getElementById('content');
  const progressBar = document.getElementById('progress-bar');
  const links = document.querySelectorAll('.nav-link');

  // Function to load page content via Fetch API
  function loadPage(url) {
      progressBar.style.width = '0%'; // Reset progress bar

      fetch(url)
          .then(response => {
              if (response.ok) return response.text();
              throw new Error('Network response was not ok.');
          })
          .then(data => {
              // Update content
              contentDiv.innerHTML = data;

              // Update progress bar
              progressBar.style.width = '100%';
          })
          .catch(error => {
              console.error('There was a problem with the fetch operation:', error);
          });
  }

  // Handle link clicks
  links.forEach(link => {
      link.addEventListener('click', (event) => {
          event.preventDefault();
          const url = event.target.getAttribute('href');

          loadPage(url);

          // Update the browser's URL
          history.pushState(null, '', url);
      });
  });

  // Handle back/forward navigation
  window.addEventListener('popstate', () => {
      loadPage(location.pathname);
  });

  // Load initial content based on the current URL
  loadPage(location.pathname);
});
