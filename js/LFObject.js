const LFCONST = {
	BallRadius: 5,
	Ground: {Width: 240, Height: 320},
	Goal: {Width: 60, Height: 30}
}

var Goal = function() {
	var geometry = new THREE.PlaneGeometry( LFCONST.Goal.Width, LFCONST.Goal.Height, 32 );
	var material = Physijs.createMaterial(
			new THREE.MeshBasicMaterial( {color: 0x999999} )
	);
	//this.mesh =  new THREE.Mesh( geometry, material );
	this.mesh = new Physijs.PlaneMesh(geometry, material, 0);
	this.mesh.position.set(0, 0, 0);
	this.mesh.rotation.x = Math.PI * 0.5;
}

var Ball = function() {
	var geometry = new THREE.SphereGeometry( LFCONST.BallRadius, 32, 32 );

	/* Load ball texture */
	var texture = new THREE.TextureLoader().load( "assets/ball1.jpg" );
	texture.wrapS = THREE.RepeatWrapping;
	texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set( 1, 1 );

	/* Create material based on texture */
	var material = Physijs.createMaterial(
			new THREE.MeshLambertMaterial({
				map: texture,
				color: 0xaaaaaa
			}),
			.8, // high friction
			.4 // low restitution
		);
		material.map.wrapS = material.map.wrapT = THREE.RepeatWrapping;
	material.map.repeat.set( 1, 1 );

	this.mesh =  new Physijs.SphereMesh(
						geometry,
						material,
						0.2,
						{ restitution: 0.3 }
					);
	this.mesh.position.x = 0;
	this.mesh.position.y = 0;
	this.mesh.position.z = LFCONST.BallRadius + 20;
	//this.mesh.position.set(0, 0, LFCONST.BallRadius + 200);

	//new TWEEN.Tween(this.mesh.material).to({opacity: 1}, 500).start();

	/* The physical body */


	/* Add the force */
	

	/* The trajectory movement */
		
}

Ball.prototype.translate = function(x, y, z) {
	this.mesh.position.x += x;
	this.mesh.position.y += y;
	this.mesh.position.z += z;
	this.body.position.set(this.mesh.position.x, this.mesh.position.y, this.mesh.position.z);
}

Ball.prototype.updateBody = function() {
//	var deltaX = this.body.position.x - this.mesh.position.x;
//	var deltaY = this.body.position.y - this.mesh.position.y;
//	var deltaZ = this.body.position.z - this.mesh.position.z;
//
//	this.mesh.position.x = this.body.position.x;
//	this.mesh.position.y = this.body.position.y;
//	this.mesh.position.z = this.body.position.z;
//
//	this.mesh.rotation.x += -(deltaY + deltaZ) * 0.05 * Math.PI;
//	this.mesh.rotation.y += -(deltaX + deltaZ) * 0.05 * Math.PI;
//	this.mesh.rotation.z += -(deltaX + deltaY) * 0.05 * Math.PI;
//
////	console.log(this.body.position);
	console.log(this.mesh.position);
//	this.body.position.copy( this.mesh.position );
}

var Ground = function() {
	var geometry = new THREE.PlaneGeometry( LFCONST.Ground.Width, LFCONST.Ground.Height, 32 );
	//var material = new THREE.MeshBasicMaterial( {color: 0x00ffff, side: THREE.DoubleSide} );
	var material = Physijs.createMaterial(
			new THREE.MeshLambertMaterial({color: 0x00ffff, side: THREE.DoubleSide}),
			.8, // high friction
			.4 // low restitution
		);
	//this.mesh = new THREE.Mesh( geometry, material );
	this.mesh = new Physijs.PlaneMesh(
			new THREE.PlaneGeometry( LFCONST.Ground.Width, LFCONST.Ground.Height, 32 ),
			//new THREE.PlaneGeometry(50, 50),
			material,
			0 // mass
		);
	this.mesh.position.x = 0;
	this.mesh.position.y = 0;
	this.mesh.position.z = 0;

	this.mesh.receiveShadow = true;

//	this.mesh.useQuaternion = true;
//	this.mesh.quaternion.setFromAxisAngle( new THREE.Vector3( 0, 0, 1 ), 0 );

//	var shape = new CANNON.Box(new CANNON.Vec3( 0, 0, 1));
//	body = new CANNON.Body( {mass: 0, shape: shape} );
//	body.quaternion.set( this.mesh.quaternion.x, this.mesh.quaternion.y, this.mesh.quaternion.z, this.mesh.quaternion.w );
	//world.add( body );

//	this.mess.rotation.x += Math.PI*
}

var LFGame = function() {
	this.ball = new Ball();
	this.ground = new Ground;
	this.goals = [new Goal, new Goal];

	/* Create group objects */
	//this.meshGame = new THREE.Group();
	//this.meshGame.add(this.ball.mesh);
	//this.meshGame.add(this.ground.mesh);
	//this.meshGame.add(this.goals[0].mesh);
	//this.meshGame.add(this.goals[1].mesh);

	this.goals[0].mesh.position.x = 0;
	this.goals[0].mesh.position.y = LFCONST.Ground.Height / 2;
	this.goals[0].mesh.position.z = LFCONST.Goal.Height / 2;

	this.goals[1].mesh.position.x = 0;
	this.goals[1].mesh.position.y = -LFCONST.Ground.Height / 2;
	this.goals[1].mesh.position.z = LFCONST.Goal.Height / 2;

	this.defaultHeight = 100;

	this.lastTime = (new Date()).getTime();	
}

LFGame.prototype.gotoScene = function(scene) {
	//scene.add(this.meshGame);
	scene.add(this.ball.mesh);
	scene.add(this.ground.mesh);
	scene.add(this.goals[0].mesh);
	scene.add(this.goals[1].mesh);
}

LFGame.prototype.gotoCamera = function(camera) {
	camera.position.x = this.ball.mesh.position.x - 10;
	camera.position.y = this.ball.mesh.position.y - 150;
	camera.position.z = 50;
//	camera.lookAt(new THREE.Vector3(this.ball.mesh.position.x, this.ball.mesh.position.y, this.ball.mesh.position.z));
	camera.lookAt(this.ball.mesh.position);
}

LFGame.prototype.updateWorld = function() {
	var now = (new Date()).getTime();
	var delta = 0;
	if (this.lastTime) {
		delta = (now - this.lastTime) / 1000;
	}
	
	//console.log(delta);

	if (delta > 0.01) {
		this.lastTime = now;
		/* Update the physical world */

		/* Update the physical world to graphic object */
		this.ball.updateBody();
	}
}
