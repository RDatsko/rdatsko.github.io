pannellum.viewer('Summerhill', {
    "default": {
        "firstScene": "kitchen",
        "author": "Summerhill",
        "sceneFadeDuration": 1000,
        "autoLoad": true,
        "showFullscreenCtrl": true
    },
    "scenes": {
        "k5classroom": {
            "title": "K5 Classroom",
            "type": "equirectangular",
            "compass": true,
            "northOffset": 0,
            "panorama": "https://rdatsko.github.io/aoba/360/images/Summerhill_3F-K5.jpg",
            "autoLoad": true,
            "hotSpots": [
                {
                    "pitch": 0,
                    "yaw": -150,
                    "type": "scene",
                    "text": "Kitchen",
                    "sceneId": "kitchen"
                },
            ]
        },
        "kitchen": {
            "title": "Kitchen",
            "type": "equirectangular",
            "compass": true,
            "northOffset": 0,
            "panorama": "https://rdatsko.github.io/aoba/360/images/Summerhill_3F-Kitchen.jpg",
            "autoLoad": true,
            "hotSpots": [
                {
                    "pitch": 0,
                    "yaw": -150,
                    "type": "scene",
                    "text": "Kitchen",
                    "sceneId": "kitchen"
                },
            ]
        },
    }
});

document.oncontextmenu = document.body.oncontextmenu = function() { return false; }
