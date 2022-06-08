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

        this.marker = new THREE.Mesh(
            new THREE.CircleGeometry( 0.25, 32 ).rotateX( - Math.PI / 2 ),
            new THREE.MeshBasicMaterial( { color: 0xFF00FF } )
        );
        scene.add( this.marker );

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
//            this.renderer.render(this.scene, this.camera);

//            renderer.render(scene, camera);
//            effect.render( scene, camera );


if(VR) {
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



















/*
        let container = document.querySelector('#VRScene');
        let renderer = new THREE.WebGLRenderer({ antialias : true });
        let canvas = renderer.domElement;
        container.appendChild(canvas);
        renderer.setSize(window.innerWidth, window.innerHeight);
        
        let scene = new THREE.Scene();
        
        let camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.setY(1.7);
        scene.add(camera);
        
    
        let sphereRadius = 1;
        let sphereGeometry = new THREE.SphereBufferGeometry(
            sphereRadius,
            16,
            16
        );
        let sphereMaterial = new THREE.MeshLambertMaterial({
            color: 0xFF0000
        });
        let sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
        let cubeGeometry = new THREE.BoxBufferGeometry(
            1.5 * sphereRadius,
            1.5 * sphereRadius,
            1.5 * sphereRadius
        );
        let cubeMaterial = new THREE.MeshLambertMaterial({
            color: 0x00FF00
        });
        let cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
        
    
        let shapes = new THREE.Object3D();
        shapes.add(sphereMesh);
        shapes.add(cubeMesh);
        shapes.position.setY(1.7);
        shapes.position.setZ(-10);
        scene.add(shapes);
        
    
        let light = new THREE.PointLight();
        light.position.setY(2);
        scene.add(light);
        
    
        let clock = new THREE.Clock(); //Need to keep track of time elapsed between frames
        function update() {
            let timeDelta = clock.getDelta();
            let rotationAmount = 2 * Math.PI * timeDelta * 0.1; //0.1 rotations per second
            shapes.rotation.x += rotationAmount;
            shapes.rotation.y += rotationAmount;
            renderer.render(scene, camera);
        }
        renderer.setAnimationLoop(update);
        
        function onResize () {
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        }
        
        window.addEventListener('resize', onResize);
        window.addEventListener('wheel', function(event) {
            event.preventDefault();
        }, {passive: false, capture: true});
*/

    }

    init() {
        this.setupXR();
    }

    setupXR() {
        document.write(`
      <button id='VRIcon' class='toggleVR' style="  position: fixed; bottom: 10px; right: 10px; outline: none; border: none; background: none; width: 60px; z-index: 10000;" onclick='toggleVR()' title='Toggle VR Mode for Mobile Devices Only'>
        <svg style="width: 100%; fill: white; stroke: rgba(0,0,0,0.25);" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 62.7 52.375" enable-background="new 0 0 62.7 41.9" xml:space="preserve"><path d="M53.4,5.5h-44c-2.1,0-3.7,1.7-3.7,3.7v22.6c0,2.1,1.7,3.7,3.7,3.7h13.4c1.1,0,2.1-0.6,2.5-1.6l3-7.5c1.2-2.6,4.9-2.5,6,0.1  l2.6,7.3c0.4,1,1.4,1.7,2.5,1.7h13.9c2.1,0,3.7-1.7,3.7-3.7V9.3C57.2,7.2,55.5,5.5,53.4,5.5z M20.4,27c-3.2,0-5.7-2.6-5.7-5.7  s2.6-5.7,5.7-5.7s5.7,2.6,5.7,5.7S23.6,27,20.4,27z M42.4,27c-3.2,0-5.7-2.6-5.7-5.7s2.6-5.7,5.7-5.7s5.7,2.6,5.7,5.7  S45.6,27,42.4,27z"/></svg>
      </button>
      <svg id="VROverlay" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="none meet" width="100vw" height="100vh" viewBox="0, 0, 400, 200" style="position: absolute; top: 0; left: 0; bottom: 0; right: 0; z-index: 9999; display: none;"><g id="svgg"><path id="path0" d="M0.000 100.000 L 0.000 200.000 200.000 200.000 L 400.000 200.000 400.000 100.000 L 400.000 0.000 200.000 0.000 L 0.000 0.000 0.000 100.000 M123.200 24.415 C 141.210 25.211,159.255 28.205,173.350 32.735 C 178.197 34.293,177.923 34.087,179.317 37.200 C 183.677 46.934,187.409 57.508,189.285 65.442 C 189.657 67.014,190.107 68.840,190.285 69.500 C 190.571 70.563,191.727 76.842,192.512 81.600 C 194.061 90.993,194.351 106.695,193.196 118.700 C 191.605 135.239,186.579 153.249,179.843 166.551 C 178.325 169.549,178.777 169.199,174.900 170.373 C 165.570 173.198,155.277 175.504,146.200 176.802 C 138.576 177.893,135.924 178.159,127.100 178.718 C 121.366 179.081,104.959 179.020,99.500 178.614 C 92.476 178.093,90.796 177.937,86.200 177.379 C 73.330 175.819,61.432 173.326,51.231 170.052 C 47.963 169.003,48.229 169.242,46.493 165.785 C 44.317 161.453,41.562 154.489,39.735 148.700 C 28.787 114.020,30.795 76.185,45.414 41.700 C 47.660 36.402,48.667 34.508,49.431 34.148 C 55.382 31.340,68.780 28.088,81.702 26.315 C 87.744 25.486,89.603 25.301,100.069 24.487 C 105.449 24.069,114.712 24.040,123.200 24.415 M297.000 24.406 C 303.768 24.714,311.757 25.470,318.900 26.480 C 322.602 27.002,329.369 28.158,329.613 28.308 C 329.696 28.359,330.515 28.541,331.432 28.712 C 339.134 30.147,350.569 33.748,350.913 34.848 C 350.991 35.097,351.319 35.840,351.642 36.500 C 351.965 37.160,352.548 38.463,352.938 39.395 C 353.328 40.328,353.854 41.543,354.106 42.095 C 355.917 46.060,359.362 55.962,360.822 61.400 C 361.161 62.665,361.697 64.645,362.012 65.800 C 366.195 81.129,367.669 102.395,365.719 119.300 C 364.828 127.020,363.092 137.034,362.182 139.700 C 362.069 140.030,361.622 141.666,361.189 143.336 C 360.755 145.006,360.301 146.626,360.178 146.936 C 360.056 147.246,359.569 148.715,359.097 150.200 C 358.170 153.113,356.692 157.181,356.040 158.612 C 355.818 159.100,355.350 160.220,355.001 161.100 C 354.119 163.322,351.436 168.707,351.033 169.063 C 350.850 169.225,350.070 169.537,349.300 169.758 C 348.530 169.978,346.505 170.566,344.800 171.064 C 339.510 172.609,333.122 174.129,327.500 175.179 C 322.294 176.151,321.363 176.294,312.400 177.495 C 295.515 179.758,267.720 179.354,251.659 176.614 C 243.264 175.182,239.486 174.396,232.700 172.670 C 228.973 171.723,225.791 170.801,223.029 169.867 L 220.759 169.100 219.794 167.200 C 218.233 164.129,216.400 160.240,216.400 160.001 C 216.400 159.880,216.250 159.492,216.066 159.140 C 214.778 156.672,211.040 144.896,209.512 138.491 C 201.756 105.983,205.129 70.519,218.908 39.700 C 221.031 34.954,221.311 34.479,222.220 34.106 C 225.587 32.723,232.214 30.678,235.568 29.987 C 236.595 29.775,237.990 29.455,238.668 29.276 C 243.076 28.109,256.321 26.032,263.900 25.320 C 276.979 24.090,285.130 23.865,297.000 24.406 " stroke="none" fill="#000000" fill-rule="evenodd"></path></g></svg>
      `);

        if ('xr' in navigator) {




//            navigator.xr.isSessionSupported('immersive-vr').then(function(supported) {
//                if(supported) {
//                  if(navigator.xr.isSessionSupported('immersive-vr')) {



/*
                let supported = navigator.xr.isSessionSupported( 'immersive-vr' );
                if(supported) {


                    renderer.xr.enabled = true;
                    new THREE.VRButton(this.renderer);
                    document.body.appendChild( THREE.VRButton.createButton(renderer));
                    document.getElementById('VRButton').style.visibility = 'visible';

                }
*/







				navigator.xr.isSessionSupported('immersive-vr').then(function(supported) {
					if(supported) {
                        renderer.xr.enabled = true;
                        new THREE.VRButton(renderer);
                        document.body.appendChild(THREE.VRButton.createButton(renderer));
                        document.getElementById('VRButton').style.display = 'block';
                        document.getElementById('VRIcon').style.display = 'none';
//                        effect = renderer;
//effect = new THREE.StereoEffect(renderer);
//effect.setSize(window.innerWidth, window.innerHeight);
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










var VR = false;
function toggleVR() {
  if (VR) {
    VR = false;
//    controls = new THREE.OrbitControls(camera, renderer.domElement);
    cancelFullScreen();
  } else {
    VR = true;
//    controls = new THREE.DeviceOrientationControls(camera); // This function was removed!!!
    requestFullscreen(document.documentElement);
  }
  renderer.setSize(window.innerWidth, window.innerHeight);
}

var requestFullscreen = function(ele) {
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

    loop.stop();
    loop.start();
  };

  var cancelFullScreen = function() {
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

    loop.stop();
    loop.start();
};

