document.addEventListener('DOMContentLoaded', function() {
    // Simulate smartwatch reminder
    setTimeout(function() {
        alert('Time to take your medicine!');
    }, 5000); // Reminder after 5 seconds for demonstration

    // Initialize the Google Map and display nearby hospitals
    function initMap() {
        // Replace with user's actual location using Geolocation API or a fixed location for testing
        const userLocation = { lat: -34.397, lng: 150.644 };
        const map = new google.maps.Map(document.getElementById('map'), {
            center: userLocation,
            zoom: 12,
        });

        const service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
            location: userLocation,
            radius: 5000,
            type: ['hospital'],
        }, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                for (let i = 0; i < results.length; i++) {
                    const place = results[i];
                    new google.maps.Marker({
                        position: place.geometry.location,
                        map: map,
                        title: place.name,
                    });
                }
            }
        });
    }

    // Call the initMap function after the page has loaded
    initMap();

    // Virtual Assistant functionality
    document.getElementById('send-button').addEventListener('click', function() {
        const userInput = document.getElementById('user-input').value;
        if (userInput) {
            displayMessage('You', userInput);
            fetchAIResponse(userInput);
            document.getElementById('user-input').value = '';
        }
    });

    function displayMessage(sender, message) {
        const chatOutput = document.getElementById('chat-output');
        chatOutput.innerHTML += `<p><strong>${sender}:</strong> ${message}</p>`;
        chatOutput.scrollTop = chatOutput.scrollHeight;
    }

    function fetchAIResponse(message) {
        // This is a placeholder function for fetching a response from an AI API
        // Replace this with an actual API call.
        const aiResponse = `You asked about "${message}". Here’s a general advice: Eat healthily, exercise regularly, and consult a doctor for medical advice.`;

        setTimeout(() => {
            displayMessage('Assistant', aiResponse);
        }, 1000);
    }
});
