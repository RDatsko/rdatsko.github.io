// Disable right-click context menu for a cleaner user experience
document.oncontextmenu = document.body.oncontextmenu = function() { return false; };

// Initialize Pannellum viewer
const viewerSummerhill = pannellum.viewer('Summerhill', {
    "default": {
        "firstScene": "3Flibrary",
        "author": "Summerhill",
        "sceneFadeDuration": 1000,
        "autoLoad": true,
        "showFullscreenCtrl": true
    },
    "scenes": {
        "1Fhallway": {
            "title": "1F Hallway",
            "type": "equirectangular",
            "compass": true,
            "northOffset": 0,
            "panorama": "https://rdatsko.github.io/aoba/360/images/Summerhill_1F-hallway.jpg",
            "autoLoad": true,
            "hotSpots": [
                {
                    "pitch": 0,
                    "yaw": 71,
                    "type": "scene",
                    "text": "Imaginarium Classroom",
                    "sceneId": "1Fimaginarium"
                },
                {
                    "pitch": 0,
                    "yaw": -93,
                    "type": "scene",
                    "text": "Sunset Classroom",
                    "sceneId": "1Fsunset"
                },
                {
                    "pitch": 0,
                    "yaw": 103,
                    "type": "scene",
                    "text": "Sunshine Classroom",
                    "sceneId": "1Fsunshine"
                },
            ]
        },
        "1Fimaginarium": {
            "title": "Imaginarium Classroom",
            "type": "equirectangular",
            "compass": true,
            "northOffset": 0,
            "panorama": "https://rdatsko.github.io/aoba/360/images/Summerhill_1F-imaginarium.jpg",
            "autoLoad": true,
            "hotSpots": [
                {
                    "pitch": 0,
                    "yaw": 155,
                    "type": "scene",
                    "text": "1F Hallway",
                    "sceneId": "1Fhallway"
                },
            ]
        },
        "1Fsunset": {
            "title": "Sunset Classroom",
            "type": "equirectangular",
            "compass": true,
            "northOffset": 0,
            "panorama": "https://rdatsko.github.io/aoba/360/images/Summerhill_1F-sunset.jpg",
            "autoLoad": true,
            "hotSpots": [
                {
                    "pitch": 0,
                    "yaw": 121,
                    "type": "scene",
                    "text": "1F Hallway",
                    "sceneId": "1Fhallway"
                },
            ]
        },
        "1Fsunshine": {
            "title": "Sunshine Classroom",
            "type": "equirectangular",
            "compass": true,
            "northOffset": 0,
            "panorama": "https://rdatsko.github.io/aoba/360/images/Summerhill_1F-sunshine.jpg",
            "autoLoad": true,
            "hotSpots": [
                {
                    "pitch": 0,
                    "yaw": -50,
                    "type": "scene",
                    "text": "1F Hallway",
                    "sceneId": "1Fhallway"
                },
                {
                    "pitch": 0,
                    "yaw": 165,
                    "type": "scene",
                    "text": "Outdoor Playground",
                    "sceneId": "playground"
                },
            ]
        },
        "playground": {
            "title": "Outdoor Playground",
            "type": "equirectangular",
            "compass": true,
            "northOffset": 0,
            "panorama": "https://rdatsko.github.io/aoba/360/images/Summerhill_playground.jpg",
            "autoLoad": true,
            "hotSpots": [
                {
                    "pitch": 0,
                    "yaw": -18,
                    "type": "scene",
                    "text": "Sunshine Classroom",
                    "sceneId": "1Fsunshine"
                },
            ]
        },
        "2Fhallway": {
            "title": "2F Hallway",
            "type": "equirectangular",
            "compass": true,
            "northOffset": 0,
            "panorama": "https://rdatsko.github.io/aoba/360/images/Summerhill_2F-hallway.jpg",
            "autoLoad": true,
            "hotSpots": [
                {
                    "pitch": -15,
                    "yaw": 30,
                    "type": "scene",
                    "text": "1F Hallway",
                    "sceneId": "1Fhallway"
                },
                {
                    "pitch": 0,
                    "yaw": 10,
                    "type": "scene",
                    "text": "3F Hallway",
                    "sceneId": "3Fhallway"
                },
                {
                    "pitch": 0,
                    "yaw": 90,
                    "type": "scene",
                    "text": "Full Moon Classroom",
                    "sceneId": "2Ffullmoon"
                },
                {
                    "pitch": 0,
                    "yaw": -113,
                    "type": "scene",
                    "text": "Half Moon Classroom",
                    "sceneId": "2Fhalfmoon"
                },
            ]
        },
        "2Ffullmoon": {
            "title": "Full Moon Classroom",
            "type": "equirectangular",
            "compass": true,
            "northOffset": 0,
            "panorama": "https://rdatsko.github.io/aoba/360/images/Summerhill_2F-fullmoon.jpg",
            "autoLoad": true,
            "hotSpots": [
                {
                    "pitch": 0,
                    "yaw": 174,
                    "type": "scene",
                    "text": "2F Hallway",
                    "sceneId": "2Fhallway"
                },
            ]
        },
        "2Fhalfmoon": {
            "title": "Half Moon Classroom",
            "type": "equirectangular",
            "compass": true,
            "northOffset": 0,
            "panorama": "https://rdatsko.github.io/aoba/360/images/Summerhill_2F-halfmoon.jpg",
            "autoLoad": true,
            "hotSpots": [
                {
                    "pitch": 0,
                    "yaw": 58,
                    "type": "scene",
                    "text": "2F Hallway",
                    "sceneId": "2Fhallway"
                },
            ]
        },
        "3Fhallway": {
            "title": "3F Hallway",
            "type": "equirectangular",
            "compass": true,
            "northOffset": 0,
            "panorama": "https://rdatsko.github.io/aoba/360/images/Summerhill_3F-hallway.jpg",
            "autoLoad": true,
            "hotSpots": [
                {
                    "pitch": -15,
                    "yaw": 30,
                    "type": "scene",
                    "text": "2F Hallway",
                    "sceneId": "2Fhallway"
                },
                {
                    "pitch": 0,
                    "yaw": -90,
                    "type": "scene",
                    "text": "K5 Classroom",
                    "sceneId": "3Fk5classroom"
                },
                {
                    "pitch": 0,
                    "yaw": 90,
                    "type": "scene",
                    "text": "Library and Gym",
                    "sceneId": "3Flibrary"
                },
            ]
        },
        "3Fk5classroom": {
            "title": "K5 Classroom",
            "type": "equirectangular",
            "compass": true,
            "northOffset": 0,
            "panorama": "https://rdatsko.github.io/aoba/360/images/Summerhill_3F-k5.jpg",
            "autoLoad": true,
            "hotSpots": [
                {
                    "pitch": 0,
                    "yaw": 43,
                    "type": "scene",
                    "text": "3F Hallway",
                    "sceneId": "3Fhallway"
                },
                {
                    "pitch": 0,
                    "yaw": 90,
                    "type": "scene",
                    "text": "Kitchen",
                    "sceneId": "3Fkitchen"
                },
            ]
        },
        "3Fkitchen": {
            "title": "Kitchen",
            "type": "equirectangular",
            "compass": true,
            "northOffset": 0,
            "panorama": "https://rdatsko.github.io/aoba/360/images/Summerhill_3F-kitchen.jpg",
            "autoLoad": true,
            "hotSpots": [
                {
                    "pitch": 0,
                    "yaw": -60,
                    "type": "scene",
                    "text": "K5 Classroom",
                    "sceneId": "3Fk5classroom"
                },
            ]
        },
        "3Flibrary": {
            "title": "Library and Gym",
            "type": "equirectangular",
            "compass": true,
            "northOffset": 0,
            "panorama": "https://rdatsko.github.io/aoba/360/images/Summerhill_3F-library-gym.jpg",
            "autoLoad": true,
            "hotSpots": [
                {
                    "pitch": 0,
                    "yaw": 150,
                    "type": "scene",
                    "text": "3F Hallway",
                    "sceneId": "3Fhallway"
                },
            ]
        },
    }
});

// Function to hide the splash overlay for a given campus
function enterTour(campus) {
    const splash = document.getElementById(`splash-${campus}`);
    if (!splash) return;
    splash.style.display = 'none'; // Hide the splash screen
}

// Function to populate scene dropdown
function populateSceneSelector(viewer, selectorId, orderArray) {
    const selectorDiv = document.getElementById(selectorId);
    if (!selectorDiv) return;

    const select = selectorDiv.querySelector('select');
    const scenes = viewer.getConfig().scenes;
    // Clear existing options (if any)
    select.innerHTML = '';

    // Create an array of scene objects to sort
    const sortedScenes = Object.keys(scenes)
        .map(sceneId => ({ id: sceneId, title: scenes[sceneId].title || sceneId }))
        .sort((a, b) => {
            const indexA = orderArray.indexOf(a.title);
            const indexB = orderArray.indexOf(b.title);
            if (indexA === -1 && indexB === -1) return 0; // Both not in order, maintain current
            if (indexA === -1) return 1; // A not in order, B is
            if (indexB === -1) return -1; // B not in order, A is
            return indexA - indexB; // Sort by custom order
        });

    // Add sorted scenes as options
    sortedScenes.forEach(scene => {
        const option = document.createElement('option');
        option.value = scene.id;
        option.text = scene.title;
        select.appendChild(option);
    });

    // Set initial selection
    select.value = viewer.getScene();

    // On change, load the selected scene
    select.addEventListener('change', (e) => {
        const sceneId = e.target.value;
        viewer.loadScene(sceneId);
    });

    // Update dropdown when scene changes (to keep in sync with hotspot navigation)
    viewer.on('scenechange', () => {
        select.value = viewer.getScene();
    });
}

const summerhillOrder = [
    "Playground",
    "1F Hallway", "1F Imaginarium Classroom", "1F Sunset Classroom", "1F Sunshine Classroom",
    "2F Hallway", "2F Full Moon Classroom", "2F Half Moon Classroom",
    "3F Hallway", "3F K5 Classroom", "3F Kitchen", "3F Library &amp; Gym",
];
populateSceneSelector(viewerSummerhill, 'selector-summerhill', summerhillOrder);
