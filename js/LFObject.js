const LFCONST = {
	BallRadius: 5,
	Ground: {Width: 120, Height: 160},
	Goal: {Width: 30, Height: 45}
}

var Goal = function() {
	var geometry = new THREE.PlaneGeometry( LFCONST.Goal.Width, LFCONST.Goal.Height, 32 );
	var material = new THREE.MeshBasicMaterial( {color: 0x999999} );
	this.mesh =  new THREE.Mesh( geometry, material );
	this.mesh.rotation.x = Math.PI * 0.5;
}

var Ball = function() {
	var geometry = new THREE.SphereGeometry( LFCONST.BallRadius, 32, 32 );
	var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
	this.mesh =  new THREE.Mesh( geometry, material );
	this.mesh.position.x = 0;
	this.mesh.position.y = 0;
	this.mesh.position.z = LFCONST.BallRadius;
}

var Ground = function() {
	var geometry = new THREE.PlaneGeometry( LFCONST.Ground.Width, LFCONST.Ground.Height, 32 );
	var material = new THREE.MeshBasicMaterial( {color: 0x00ffff, side: THREE.DoubleSide} );
	this.mesh = new THREE.Mesh( geometry, material );
	this.mesh.position.x = 0;
	this.mesh.position.y = 0;
	this.mesh.position.z = 0;

//	this.mess.rotation.x += Math.PI*
}

var LFGame = function() {
	this.ball = new Ball();
	this.ground = new Ground;
	this.goals = [new Goal, new Goal];

	/* Create group objects */
	this.meshGame = new THREE.Group();
	this.meshGame.add(this.ball.mesh);
	this.meshGame.add(this.ground.mesh);
	this.meshGame.add(this.goals[0].mesh);
	this.meshGame.add(this.goals[1].mesh);

	this.goals[0].mesh.position.x = 0;
	this.goals[0].mesh.position.y = (LFCONST.Ground.Height - LFCONST.Goal.Height) / 2;

	this.goals[1].mesh.position.x = 10;
	this.goals[1].mesh.position.y = (LFCONST.Ground.Height - LFCONST.Goal.Height) / 2;

	this.defaultHeight = 100;
}

LFGame.prototype.gotoScene = function(scene) {
	scene.add(this.meshGame);
}

LFGame.prototype.gotoCamera = function(camera) {
	camera.position.x = this.ball.mesh.position.x + 50;
	camera.position.y = this.ball.mesh.position.y - 50;
	camera.position.z = 200;
//	camera.lookAt(new THREE.Vector3(this.ball.mesh.position.x, this.ball.mesh.position.y, this.ball.mesh.position.z));
	camera.lookAt(this.ball.mesh.position);
}
