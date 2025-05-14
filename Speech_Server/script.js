// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Get the buttons and the main containers first part
    const listenButton = document.querySelector('.listen-button');
    const closeButton = document.querySelector('.close-svgrepo');
    const img = document.querySelector('.prototype img');
    const bars = document.querySelectorAll('.bar, .bar-2, .bar-3, .bar-4, .bar-5');
    const settingsButton = document.querySelector('.settings-svgrepo');
    const closeButtonLanguages = document.querySelector('.close-button-languages');
    const closeButtonSettings = document.querySelector('.close-button-settings');
    const mainContainerSettings = document.querySelector('.main-container-settings');
    const mainContainerLanguages = document.querySelector('.main-container-languages');
    const mainContainerVoice = document.querySelector('.main-container-voice');
    const mainContainerTheme = document.querySelector('.main-container-theme');
    const mainContainerAbout = document.querySelector('.main-container-about'); // Main container for about
    const maincontainercontatct = document.querySelector('.main-container-contatct');
    const closeButtonVoice = document.querySelector('.close-svgrepo-com-3-voice');
    const themeButton = document.getElementById('themeButton');
    const closeButtonTheme = document.querySelector('.close-svgrepo-com-theme');
    const aboutUsButton = document.querySelector('.frame-17-settings'); // Button for about
    const closeButtonAbout = document.querySelector('.close-svgrepo-com-about'); // Close button for about
    const languagesButton = document.querySelector('.frame-7-settings'); // Button for languages
    const voiceButton = document.querySelector('.button-d-settings'); // Button for voice
    const ContatctUsButton = document.querySelector('.frame-1b-settings'); // button for contatct
    const closeButtonContatct = document.querySelector('.close-svgrepo-3-contact');

    // Hide the image by default
    img.style.display = 'none';

    // Add event listeners for the first part
    listenButton.addEventListener('click', () => {
        // Call the function to start music playback
        startMusicPlayback(); // This function should be defined in the Python script
    });
    
    function startMusicPlayback() {
        // Logic to start music playback
        // This could involve making an API call to the Python backend
        fetch('/start-music') // Example endpoint
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                console.log('Music playback started');
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }
    

    let isGifVisible = false; // Flag to track the visibility of the GIF

    listenButton.addEventListener('click', () => {
        if (!isGifVisible) {
            // Show the GIF
            img.src = 'img/ggg.gif';
            img.style.display = 'block'; // Show the image
    
            // Show the ai-1 div
            const aiDiv = document.querySelector('.ai-1');
            aiDiv.style.display = 'block'; // Show the ai-1 div
    
            // Disable the bars
            bars.forEach(bar => {
                bar.classList.add('disabled');
            });
    
            // Activate the app.py (make an AJAX request)
            fetch('/activate') // Adjust the endpoint as necessary
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json(); // Assuming the server responds with JSON
                })
                .then(data => {
                    console.log('App activated:', data);
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                });
    
            isGifVisible = true; // Update the flag to indicate the GIF is now visible
        } else {
            // Hide the GIF
            img.style.display = 'none'; // Hide the image
    
            // Hide the ai-1 div
            const aiDiv = document.querySelector('.ai-1');
            aiDiv.style.display = 'none'; // Hide the ai-1 div
    
            // Enable the bars
            bars.forEach(bar => {
                bar.classList.remove('disabled');
            });
    
            isGifVisible = false; // Update the flag to indicate the GIF is now hidden
        }
    });
    
    closeButton.addEventListener('click', () => {
        // Attempt to close the window
        window.close(); // This will only work if the window was opened via window.open()
    });


    // Function to activate the main-container-settings
    function activateSettings() {
        mainContainerSettings.style.display = 'block';
        mainContainerLanguages.style.display = 'none';
        mainContainerVoice.style.display = 'none';
        mainContainerTheme.style.display = 'none';
        mainContainerAbout.style.display = 'none'; // Hide about container
        melodymind.style.opacity = 'dimmed';
        mainContainer.style.pointerEvents = 'none';
        listenButton.style.display = 'none';
        settingsButton.disabled = true;
    }


    // Function to open the languages container
    function openLanguages() {
        mainContainerLanguages.style.display = 'block'; // Show the languages container
        mainContainerSettings.style.display = 'none'; // Hide the settings container
        mainContainerVoice.style.display = 'none'; // Hide the voice container
        maincontainercontatct.style.display = 'none';
        mainContainerTheme.style.display = 'none'; // Hide the theme container
        mainContainerAbout.style.display = 'none'; // Hide the about container
        mainContainer.style.opacity = 'dimmed'; // Dim the main container
        mainContainer.style.pointerEvents = 'none'; // Disable interactions with the main container
        settingsButton.disabled = true; // Disable the settings button
    }

    // Function to open the voice container
    function openVoice() {
        mainContainerVoice.style.display = 'block'; // Show the voice container
        mainContainerSettings.style.display = 'none'; // Hide the settings container
        maincontainercontatct.style.display = 'none';
        mainContainerLanguages.style.display = 'none'; // Hide the languages container
        mainContainerTheme.style.display = 'none'; // Hide the theme container
        mainContainerAbout.style.display = 'none'; // Hide the about container
        mainContainer.style.opacity = 'dimmed'; // Dim the main container
        mainContainer.style.pointerEvents = 'none'; // Disable interactions with the main container
        settingsButton.disabled = true; // Disable the settings button
    }

    // Add click event listener to the settings button
    settingsButton.addEventListener('click', activateSettings);

    // Add click event listener to the close button languages
    closeButtonLanguages.addEventListener('click', function() {
        mainContainerLanguages.style.display = 'none';
        activateSettings();
    });

    // Add click event listener to the close button settings
    closeButtonSettings.addEventListener('click', function() {
        mainContainerSettings.style.display = 'none';
    });

    // Add click event listener for the close button in the voice container
    closeButtonVoice.addEventListener('click', function() {
        mainContainerVoice.style.display = 'none';
        activateSettings();
    });

    // Add click event listener to the theme button
    themeButton.addEventListener('click', function() {
        mainContainerTheme.style.display = 'block';
        maincontainercontatct.style.display = 'none';
        mainContainerSettings.style.display = 'none';
        mainContainerLanguages.style.display = 'none';
        mainContainerVoice.style.display = 'none';
        mainContainerAbout.style.display = 'none'; // Hide the about container
        mainContainer.style.opacity = 'dimmed'; // Dim the main container
        mainContainer.style.pointerEvents = 'none'; // Disable interactions with the main container
        settingsButton.disabled = true; // Disable the settings button

    });

    closeButtonTheme.addEventListener('click', function() {
        mainContainerTheme.style.display = 'none'; // Hide the about container
        activateSettings(); // Show the settings container
    });

    // Add click event listener for the about us button
    ContatctUsButton.addEventListener('click', function() {
        console.log('About Us button clicked');
        maincontainercontatct.style.display = 'block';
        mainContainerAbout.style.display = 'none'; // Show the about container
        mainContainerSettings.style.display = 'none'; // Hide the settings container
        mainContainerLanguages.style.display = 'none'; // Hide the languages container
        mainContainerVoice.style.display = 'none'; // Hide the voice container
        mainContainerTheme.style.display = 'none'; // Hide the theme container
        mainContainer.style.opacity = 'dimmed'; // Dim the main container
        mainContainer.style.pointerEvents = 'none'; // Disable interactions with the main container
        settingsButton.disabled = true; // Disable the settings button
    });

    closeButtonContatct.addEventListener('click', function() {
        maincontainercontatct.style.display = 'none'; // Hide the about container
        activateSettings(); // Show the settings container
    });

    aboutUsButton.addEventListener('click', function() {
        console.log('About Us button clicked');
        mainContainerAbout.style.display = 'block'; // Show the about container
        maincontainercontatct.style.display = 'none';
        mainContainerSettings.style.display = 'none'; // Hide the settings container
        mainContainerLanguages.style.display = 'none'; // Hide the languages container
        mainContainerVoice.style.display = 'none'; // Hide the voice container
        mainContainerTheme.style.display = 'none'; // Hide the theme container
        mainContainer.style.opacity = 'dimmed'; // Dim the main container
        mainContainer.style.pointerEvents = 'none'; // Disable interactions with the main container
        settingsButton.disabled = true; // Disable the settings button
    });

    // Add click event listener for the close button in the about container
    closeButtonAbout.addEventListener('click', function() {
        mainContainerAbout.style.display = 'none'; // Hide the about container
        activateSettings(); // Show the settings container
    });

    // Add click event listener for the languages button
    languagesButton.addEventListener('click', openLanguages);

    // Add click event listener for the voice button
    voiceButton.addEventListener('click', openVoice);
});
