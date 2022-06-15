// Variables
// ---------
let camera;
let renderer;
let scene;
let loop;

let container;

let controls;
let controller1, controller2;
let marker, raycaster, INTERSECTION;
let tempMatrix = new THREE.Matrix4();
let effect;

var controller = {
    movement: 'slide', // slide, teleport
    left: 'default', // hands (does handtracking), default (default controllers), none, or model name
    right: 'default', // hands (does handtracking), default (default controllers), none, or model name
};





let gravity = 9.8;

//const direction = new THREE.Vector3();
let orientation_a, orientation_b, orientation_g;










/* ====================================================================================================
 * Player
 * ==================================================================================================== */

class Player {
    constructor() {
    }

    move() {
    }

    setPosition() {
    }

    setRotation() {
    }

    getPosition() {
    }

    getRotation() {
    }
}










/* ====================================================================================================
 * Controller
 * ==================================================================================================== */

class Controller {
    constructor(i) {
        this.controllers = this.createController(i);
        this.controllerGrip = this.createControllerGrip(i);
//        this.isSelecting = null;

        this.initInputListenerXR();

        this.group = new THREE.Group();
/*
        this.marker = new THREE.Mesh(
            new THREE.CircleGeometry( 0.25, 32 ).rotateX( - Math.PI / 2 ),
            new THREE.MeshBasicMaterial( { color: 0xFF00FF } )
        );
        scene.add( this.marker );
*/
        raycaster = new THREE.Raycaster();
    }

    createController(i) {
        const controllers = renderer.xr.getController(i);
//        controllers.name = '' + i;

//        const controllerGrip = [0, 1].map(i => renderer.xr.getControllerGrip(i));
//        controllerGrip.add(controllerModelFactory.createControllerModel(controllerGrip));
//        scene.add(controllerGrip);

        if (0) { // debug!! force show cont0 in desktop mode
            this.group.add(controllers);
            controllers.visible = true;
//            controllers.isSelecting = false;
        }

        return controllers;
    }

    createControllerGrip(i) {
        const controllerModelFactory = new THREE.XRControllerModelFactory();

        const controllerGrip = renderer.xr.getControllerGrip(i);
        controllerGrip.add(controllerModelFactory.createControllerModel(controllerGrip));
//        controllerGrip.name = '' + (i + 2);
        return controllerGrip
    }

    initInputListenerXR() {
        const listenerFor = name => event => {
            const cb = this._eventListeners[name];
            if (cb) {
                const uuid = event.target.uuid;
                const cont = this.controllers;
                if (cont && cont.uuid === uuid) cb(idx);
            }
        };
//        this._addSelectListener('selectstart', listenerFor('xr-trigger-press-start'));
//        this._addSelectListener('selectend', listenerFor('xr-trigger-press-end'));
        this._addSelectListener('selectstart', this.onSelectStart);
        this._addSelectListener('selectend', this.onSelectEnd);
        this._addSelectListener('connected', function(event) {
            this.controllers.add(this.buildController(event.data));
        });
        this._addSelectListener( 'disconnected', function () {
            this.controllers.remove(this.children[0]);
        });
    }

    _addSelectListener(eventName, listener) {
//        this.controllers.forEach(cont => {
//            cont.addEventListener(eventName, listener.bind(this));
//        });
        this.controllers.addEventListener(eventName, listener.bind(this));
    }

    onSelectStart() {
        console.log(this.name + ' was pressed.');
        this.controllers.userData.isSelecting = true;
        
    }

    onSelectEnd() {
        console.log(this.name + ' was released.');
        this.controllers.userData.isSelecting = false;
    }

    update() {

    }

    buildController(data) {
        switch(data.targetRayMode) {
            case 'tracked-pointer':
                const geometry = new THREE.BufferGeometry();
                geometry.setAttribute('position', new THREE.Float32BufferAttribute([0,0,0,0,0,-1],3));
                geometry.setAttribute('color', new THREE.Float32BufferAttribute([0.5,0.5,0.5,0,0,0],3));
                const material = new THREE.LineBasicMaterial({vertexColors:true,blending:THREE.AdditiveBlending});
                return new THREE.Line(geometry,material);
            case 'gaze':
                const gaze_geometry = new THREE.RingGoemetry(0.02,0.04,32).translate(0,0,-1);
                const gaze_material = new THREE.MeshBesicMaterial({opacity:0.5,transparent:true});
                return new THREE.Mesh(gaze_geometry,gaze_material);
        }
    }
}


function createControls(camera, canvas) {
    const controls = new THREE.OrbitControls(camera, canvas);

    controls.enableDamping = true;

    controls.tick = () => controls.update();

    return controls;
}










/* ====================================================================================================
 * Resizer
 * ==================================================================================================== */

class Resizer {
    constructor(container, camera, renderer) {
        this.setSize(container, camera, renderer);

        window.addEventListener('resize', () =>  {
            this.setSize(container, camera, renderer);
            this.onResize();
        });
    }

    onResize() {}

    setSize(container, camera, renderer) {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
    }
}










/* ====================================================================================================
 * Camera
 * ==================================================================================================== */

class Camera extends THREE.PerspectiveCamera {
    constructor() {
        super();
        this.onCreate();
    }

    onCreate() {
        new THREE.PerspectiveCamera(35, 1, 0.1, 100);
        this.position.set(-1.5, 1.5, 6.5);
    }
}










/* ====================================================================================================
 * Model
 * ==================================================================================================== */

class Model extends THREE.Group {
    constructor(data) {
        super();

        let assetName = eval("assets." + data);
        this.modelUrl = assetName.src

        this.onCreate();
    }

    onCreate() {
        const dracoLoader = new THREE.DRACOLoader();
        dracoLoader.setDecoderPath( 'vendor/three/examples/js/libs/draco/' );
        dracoLoader.setDecoderConfig({ type: 'js' });

        new THREE.GLTFLoader().
            setDRACOLoader( dracoLoader ).
            load(this.modelUrl,
                gltf => {
                    this.updateTransform();
                    this.add(gltf.scene);
                    console.log(this);
                });
    }

    updateMaterials(model) {
        model.traverse(child => {
            child.material = new THREE.MeshNormalMaterial();
        });
    }

    updateTransform() {

    }

    dispose() {

    }

    rotate(x, y, z) {
        this.rotation.x = THREE.MathUtils.degToRad(x);
        this.rotation.y = THREE.MathUtils.degToRad(y);
        this.rotation.z = THREE.MathUtils.degToRad(z);
    }

    scale(x, y, z) {
        this.scale.set(x, y, z);
    }
}










/* ====================================================================================================
 * Loop
 * ==================================================================================================== */

const clock = new THREE.Clock();

class Loop {
    constructor(camera, scene, renderer) {
//        this.camera = camera;
//        this.scene = scene;
//        this.renderer = renderer;
        this.updatables = [];

//        this.tempMatrix = tempMatrix;
//        this.controller1 = controller1;
//        this.controller2 = controller2;
    }

    start() {
        renderer.setAnimationLoop(() => {
            this.tick();


		if(fakeVR) {

			camera.rotation.x = -THREE.MathUtils.degToRad(orientation_g + 90);
			camera.rotation.y =  THREE.MathUtils.degToRad(orientation_a); // OK
			camera.rotation.z = -THREE.MathUtils.degToRad(orientation_b);

		    effect.render( scene, camera );
		} else {
		    renderer.render(scene, camera);
		}

        });
    }

    stop() {
        renderer.setAnimationLoop(null);
    }

    tick() {
        const delta = clock.getDelta();




        INTERSECTION = undefined;

        if ( controller1.controllers.userData.isSelecting === true ) {
//            console.log('Controller 1!');
            tempMatrix.identity().extractRotation( controller1.controllers.matrixWorld );

            raycaster.ray.origin.setFromMatrixPosition( controller1.controllers.matrixWorld );
            raycaster.ray.direction.set( 0, 0, - 1 ).applyMatrix4( tempMatrix );
        }
        else if ( controller2.controllers.userData.isSelecting === true ) {
//            console.log('Controller 2!');
            tempMatrix.identity().extractRotation( controller2.controllers.matrixWorld );

            raycaster.ray.origin.setFromMatrixPosition( controller2.controllers.matrixWorld );
            raycaster.ray.direction.set( 0, 0, - 1 ).applyMatrix4( tempMatrix );
        }





//        controller1.update();

//        cleanIntersected();
//        intersectObjects( controller1 );
//        intersectObjects( controller2 );

//        for (const object of this.updatables) {
//            object.tick(delta);
//        }
    }
}










/* ====================================================================================================
 * Scene
 * ==================================================================================================== */

class Scene extends THREE.Scene {
    constructor() {
        super();

        //sun.pos.x
        //sun.pos.y
        //sun.pos.z

        //sky.color

        this.onCreate();
    }

    onCreate() {
        new THREE.Scene();
        this.background = new THREE.Color('skyblue');
    }
}










/* ====================================================================================================
 * Application
 * ==================================================================================================== */

class App {
    constructor() {
        camera = new Camera();
	camera.position.set ( 0, 0, 0 );

        renderer = createRenderer();
        scene = new Scene();
        loop = new Loop(camera, scene, renderer);

        document.writeln(`<div id="VRScene" style="position: absolute; width: 100%; height: 100%; display: block;"></div>`);
        container = document.querySelector('#VRScene');
        container.append(renderer.domElement);

//        controls = createControls(camera, renderer.domElement);

//        console.log(controls[0]);

        const { ambientLight, mainLight } = createLights();

        loop.updatables.push(controls);
        scene.add(ambientLight, mainLight);

        const resizer = new Resizer(container, camera, renderer);
    }

    init() {
        this.setupXR();
    }

    setupXR() {
        document.write(`
      <button id='VRIcon' class='toggleVR' style="  position: fixed; bottom: 10px; right: 10px; outline: none; border: none; background: none; width: 60px; z-index: 10000;" onclick='toggleVR()' title='Toggle VR Mode for Mobile Devices Only'>
        <svg style="width: 100%; fill: white; stroke: rgba(0,0,0,0.25);" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 62.7 52.375" enable-background="new 0 0 62.7 41.9" xml:space="preserve"><path d="M53.4,5.5h-44c-2.1,0-3.7,1.7-3.7,3.7v22.6c0,2.1,1.7,3.7,3.7,3.7h13.4c1.1,0,2.1-0.6,2.5-1.6l3-7.5c1.2-2.6,4.9-2.5,6,0.1  l2.6,7.3c0.4,1,1.4,1.7,2.5,1.7h13.9c2.1,0,3.7-1.7,3.7-3.7V9.3C57.2,7.2,55.5,5.5,53.4,5.5z M20.4,27c-3.2,0-5.7-2.6-5.7-5.7  s2.6-5.7,5.7-5.7s5.7,2.6,5.7,5.7S23.6,27,20.4,27z M42.4,27c-3.2,0-5.7-2.6-5.7-5.7s2.6-5.7,5.7-5.7s5.7,2.6,5.7,5.7  S45.6,27,42.4,27z"/></svg>
      </button>

      <svg id="VROverlay" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="none meet" width="100vw" height="100vh" viewBox="0, 0, 2000, 1000" style="position: absolute; top: 0; left: 0; bottom: 0; right: 0; z-index: 9999; display: none;"><g id="svgg"><path id="path0" d="M 0 0 L 0 1000 L 1000000 1000 L 1000000 0 L 0 0 z M 500.04492 15 C 636.69612 15.006191 768.82704 43.380704 892.76562 99.34375 C 896.20268 100.89576 898.95249 103.64562 900.50391 107.08398 C 1013.1637 356.78574 1013.1657 643.21219 900.50781 892.91602 C 898.9564 896.35438 896.20466 899.10424 892.76758 900.65625 C 768.82901 956.61724 636.69909 984.9898 499.95508 985 C 363.30182 984.99379 231.171 956.61724 107.23242 900.65625 C 103.79536 899.10424 101.04557 896.35438 99.494141 892.91602 C -13.163603 643.21219 -13.163603 356.78574 99.494141 107.08398 C 101.04557 103.64562 103.79536 100.89576 107.23242 99.34375 C 231.171 43.380704 363.3009 15.0062 500.04492 15 z M 1500.0449 15 C 1636.6961 15.006191 1768.827 43.380704 1892.7656 99.34375 C 1896.2026 100.89576 1898.9525 103.64562 1900.5039 107.08398 L 1900.5078 107.08398 C 2013.1656 356.78574 2013.1656 643.21219 1900.5078 892.91602 C 1898.9564 896.35438 1896.2047 899.10424 1892.7676 900.65625 C 1768.8291 956.61724 1636.6991 984.9898 1499.9551 985 C 1363.3019 984.99379 1231.1709 956.61724 1107.2324 900.65625 C 1103.7953 899.10424 1101.0455 896.35438 1099.4941 892.91602 C 986.8364 643.21219 986.8364 356.78574 1099.4941 107.08398 C 1101.0455 103.64562 1103.7953 100.89576 1107.2324 99.34375 C 1231.1709 43.380704 1363.3009 15.0062 1500.0449 15 z " stroke="none" fill="#000000" fill-rule="evenodd"></path></g></svg>


`);
        if ('xr' in navigator) {

		navigator.xr.isSessionSupported('immersive-vr').then(function(supported) {
			if(supported) {
                        renderer.xr.enabled = true;
                        new THREE.VRButton(renderer);
                        document.body.appendChild(THREE.VRButton.createButton(renderer));
                        document.getElementById('VRButton').style.display = 'block';
                        document.getElementById('VRIcon').style.display = 'none';
			}
                    else {
//                        effect = new THREE.StereoEffect(renderer);
//                        effect.setSize(window.innerWidth, window.innerHeight);
                    }
				});



//                }
//            });
//                  } else {
//                      document.getElementById('VRIcon').style.visibility = 'visible';
 //                 }
        }

        controller1 = new Controller(0);
        controller2 = new Controller(1);

        scene.add(controller1.controllers);
        scene.add(controller1.controllerGrip);
        scene.add(controller2.controllers);
        scene.add(controller2.controllerGrip);

        console.log('@@ controller: ', controller1.controllers);
        console.log('@@ controller: ', controller2.controllers);
        console.log('@@ controllerGrip: ', controller1.controllerGrip);
        console.log('@@ controllerGrip: ', controller2.controllerGrip);


//        controller1.name = 'RightController';
//        controller2.name = 'LeftController';

//        console.log('@@ controllers: ', controller1.name);
//        console.log('@@ controllers: ', controller2.name);

//        controller1.setTouchpadListener(
//            (axes)=>{ console.log("onPressed: " + axes[0] + ", " + axes[1]); },
//            (axes)=>{ console.log("onReleased: " + axes[0] + ", " + axes[1]); }
//        );
//        controller1.setTriggerListener(
//            ()=>{ console.log("onPressed!"); },
//            ()=>{ console.log("onReleased!"); }
//        );

        loop.tick();

    }

    start() {
        loop.start();
    }

    stop() {
        loop.stop();
    }
}


















function createRenderer() {
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.physicallyCorrectLights = true;

    effect = new THREE.StereoEffect( renderer );
    effect.setSize( window.innerWidth, window.innerHeight );

    return renderer;
}

function createLights() {
    const ambientLight = new THREE.HemisphereLight(
        'white',
        'darkslategrey',
        5
    );

    const mainLight = new THREE.DirectionalLight('white', 4);
    mainLight.position.set(100, 100, 100);

    return { ambientLight, mainLight };
}










var fakeVR = false;
function toggleVR() {
    if(DeviceMotionEvent && typeof DeviceMotionEvent.requestPermission === "function") {
        DeviceMotionEvent.requestPermission();
      }
	
  if (fakeVR) {
    fakeVR = false;
//    controls = new THREE.OrbitControls(camera, renderer.domElement);
    cancelFullScreen();
  } else {
    fakeVR = true;
//    controls = new THREE.DeviceOrientationControls(camera); // This function was removed!!!
    requestFullscreen(document.documentElement);
  }
  renderer.setSize(window.innerWidth, window.innerHeight);
}

var requestFullscreen = function(ele) {
    window.addEventListener("devicemotion", handleMotion);
    window.addEventListener("deviceorientation", handleOrientation);
    window.addEventListener('orientationchange', handleOrientationChange);
/*
    if (ele.requestFullscreen) {
      ele.requestFullscreen();
    } else if (ele.webkitRequestFullscreen) {
      ele.webkitRequestFullscreen();
    } else if (ele.mozRequestFullScreen) {
      ele.mozRequestFullScreen();
    } else if (ele.msRequestFullscreen) {
      ele.msRequestFullscreen();
    } else {
      console.log("Fullscreen API is not supported.");
    }
    document.getElementById('VROverlay').style.display = 'block';
*/
    loop.stop();
    loop.start();
  };

  var cancelFullScreen = function() {
/*
    if (document.cancelFullScreen) {
        document.cancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.msCancelFullScreen) {
        document.msCancelFullScreen();
    } else {
      console.log("Fullscreen API is not supported.");
    }
    document.getElementById('VROverlay').style.display = 'none';
*/
    window.removeEventListener("devicemotion", handleMotion);
    window.removeEventListener("deviceorientation", handleOrientation);
    window.removeEventListener('orientationchange', handleOrientationChange);

    loop.stop();
    loop.start();
};

function updateFieldIfNotNull(fieldName, value, precision=10){
    if (value != null)
      document.getElementById(fieldName).innerHTML = value.toFixed(precision);
  }


function handleMotion(event) {
//    updateFieldIfNotNull('Accelerometer_gx', event.accelerationIncludingGravity.x);
//    updateFieldIfNotNull('Accelerometer_gy', event.accelerationIncludingGravity.y);
//    updateFieldIfNotNull('Accelerometer_gz', event.accelerationIncludingGravity.z);
  
//    updateFieldIfNotNull('Accelerometer_x', event.acceleration.x);
//    updateFieldIfNotNull('Accelerometer_y', event.acceleration.y);
//    updateFieldIfNotNull('Accelerometer_z', event.acceleration.z);
  
//    updateFieldIfNotNull('Accelerometer_i', event.interval, 2);
  
//    updateFieldIfNotNull('Gyroscope_z', event.rotationRate.alpha);
//    updateFieldIfNotNull('Gyroscope_x', event.rotationRate.beta);
//    updateFieldIfNotNull('Gyroscope_y', event.rotationRate.gamma);
//    incrementEventCount();
  }



function handleOrientation(event) {
	orientation_a = event.alpha;
	orientation_b = event.beta;
	orientation_g = event.gamma;
	
	document.getElementById("Orientation_a1").innerHTML = orientation_a.toFixed(3);
	document.getElementById("Orientation_b1").innerHTML = orientation_b.toFixed(3);
	document.getElementById("Orientation_g1").innerHTML = orientation_g.toFixed(3);

	document.getElementById("Orientation_a2").innerHTML = orientation_a.toFixed(3);
	document.getElementById("Orientation_b2").innerHTML = orientation_b.toFixed(3);
	document.getElementById("Orientation_g2").innerHTML = orientation_g.toFixed(3);
}


/*
  function onDeviceOrientationChangeEvent( { alpha, beta, gamma } ) {
    if( scope.initialOffset === null ) {
        scope.initialOffset = alpha;
    }
    alpha = alpha - scope.initialOffset;
    if(alpha < 0) alpha += 360;
    scope.deviceOrientation = { alpha, beta, gamma };
};
*/


function handleOrientationChange(event) {

}
