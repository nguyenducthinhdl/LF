function resetGame() {
	/* Will be decided */
}

var lfGame;
var scene,
    camera, fieldOfView, aspectRatio, nearPlane, farPlane,
    renderer,
    container,
    controls;
var HEIGHT, WIDTH,
    mousePos = { x: 0, y: 0 };
var control;
var world;
var light;
var physics_stats;

function createScene() {

	Physijs.scripts.worker = '/LF/LF/physijs_worker.js';
	Physijs.scripts.ammo = '/LF/LF/ammo.js';

	TWEEN.start();
	/* The physic world */


	HEIGHT = window.innerHeight;
	WIDTH = window.innerWidth;

	lfGame = new LFGame();

	scene = new Physijs.Scene({ fixedTimeStep: 1 / 120 });
		scene.setGravity(new THREE.Vector3( 0, 0, -9.82 ));
		scene.addEventListener(
			'update',
			function() {
				//applyForce();
				scene.simulate( undefined, 1 );
				physics_stats.update();
			}
		);
		
	aspectRatio = WIDTH / HEIGHT;
	fieldOfView = 50;
	nearPlane = .1;
	farPlane = 10000;
	camera = new THREE.PerspectiveCamera(
	    fieldOfView,
	    aspectRatio,
	    nearPlane,
	    farPlane
	    );
  	scene.fog = new THREE.Fog(0xf7d9aa, 100,950);
	lfGame.gotoScene(scene);
	camera.position.x = 0;
	camera.position.z = 200;
	camera.position.y = 0;

	// Light
	light = new THREE.DirectionalLight( 0xFFFFFF );
	light.position.set( 20, 40, 15 );
	light.target.position.copy( scene.position );
	light.castShadow = true;
	light.shadow.camera.left = -60;
	light.shadow.camera.top = -60;
	light.shadow.camera.right = 60;
	light.shadow.camera.bottom = 60;
	light.shadow.camera.near = 20;
	light.shadow.camera.far = 200;
	light.shadow.bias = -.0001
	light.shadow.mapSize.height = light.shadow.mapSize.width = 2048;
	light.lookAt(0, 0, 0);
	//light.shadowDarkness = .7;
	scene.add( light );
	scene.simulate();

	renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
	renderer.setSize(WIDTH, HEIGHT);
	renderer.shadowMap.enabled = true;

	container = document.getElementById('stadium');
	container.appendChild(renderer.domElement);

	physics_stats = new Stats();
	physics_stats.domElement.style.position = 'absolute';
	physics_stats.domElement.style.top = '50px';
	physics_stats.domElement.style.zIndex = 100;
	container.appendChild( physics_stats.domElement );

	window.addEventListener('resize', handleWindowResize, false);

	controls = new THREE.OrbitControls(camera, renderer.domElement);
//	controls.addEventListener( 'change', renderer ); 
	controls.enableZoom = true;

	lfGame.gotoCamera(camera);
	//controls.minPolarAngle = -Math.PI / 2;
	//controls.maxPolarAngle = Math.PI

	loop();
}

function handleWindowResize() {
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;
  renderer.setSize(WIDTH, HEIGHT);
  camera.aspect = WIDTH / HEIGHT;
  camera.updateProjectionMatrix();
}

function loop() {
	controls.update();
	//lfGame.gotoCamera(camera);
	lfGame.gotoCamera(camera);
	lfGame.updateWorld();
	renderer.render(scene, camera);
	physics_stats.update();
	scene.simulate(undefined, 1);
	requestAnimationFrame(loop);
}


function init(event){
  resetGame();
  createScene();

  //loop();
}


window.addEventListener('load', init, false);
