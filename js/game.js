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

function createScene() {

	/* The physic world */
	


	HEIGHT = window.innerHeight;
	WIDTH = window.innerWidth;

	lfGame = new LFGame();

	scene = new Physijs.Scene;
		scene.setGravity(new THREE.Vector3( 0, -30, 0 ));
		scene.addEventListener(
			'update',
			function() {
				applyForce();
				scene.simulate( undefined, 1 );
				//physics_stats.update();
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
  
	renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
	renderer.setSize(WIDTH, HEIGHT);
	renderer.shadowMap.enabled = true;

	container = document.getElementById('stadium');
	container.appendChild(renderer.domElement);

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
	lfGame.updateWorld();
	renderer.render(scene, camera);
	requestAnimationFrame(loop);
}


function init(event){
  resetGame();
  createScene();

  loop();
}


window.addEventListener('load', init, false);
