window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.continuous = true; // Continuous listening
recognition.interimResults = false; // Only final results
recognition.lang = 'en-UK';

// Start speech recognition when the page loads
window.onload = function () {
    recognition.start();
};

recognition.onresult = function (event) {
    let transcript = event.results[event.results.length - 1][0].transcript.trim();
    console.log("Recognized Speech:", transcript);
    document.getElementById("output").innerText = transcript;
    eel.say_hello_py(transcript); // Send speech to Python
};

recognition.onerror = function (event) {
    console.error("Speech recognition error:", event.error);
};

recognition.onend = function () {
    console.log("Restarting Speech Recognition...");
    recognition.start(); // Restart automatically
};

// Function to send button commands to Python
function sendCommand(command) {
    console.log("Sending command:", command);
    eel.say_hello_py(command);
}
recognition.continuous = true;
  if (e.results[0].isFinal) {	
  }

recognition.addEventListener("end", () => {
recognition.start();  
});
recognition.start();
