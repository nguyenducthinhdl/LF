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

function createScene() {
	HEIGHT = window.innerHeight;
	WIDTH = window.innerWidth;

	lfGame = new LFGame();

	scene = new THREE.Scene();
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
	lfGame.gotoCamera(camera);
	renderer.render(scene, camera);
	requestAnimationFrame(loop);
}


function init(event){
  resetGame();
  createScene();

  loop();
}


window.addEventListener('load', init, false);