//main.js
//In this file, we are setting up the scene, camera, renderer, and other objects for use in the 3D animation.

//Initialize the necessary global variables/objects
let scene, camera, renderer, cube, plane, line;

//This changes the speed of rotation of the Icosahedron
let shapeRotationSpeed = 0.001;

//init()
//This function will initialize all of the Objects necessary to display our scene.
//These Objects are later manipulated in another function to give the illusion of animation.
function init(){

    //Creating the Scene object. This object will act as a kind of grid where other Objects will be placed.
    scene = new THREE.Scene();

    //Creating the perspective camera. This object is placed onto the scene and will display the scene for the user.
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    //Create the renderer and set antialias to true
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    //Set the size of the renderer
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    //This can be used to set the background color of the scene. For now, we are using an external texture as the background.
    //renderer.setClearColor(0x66bcc4);

    //Appends the renderer object to document
    document.body.appendChild(renderer.domElement);

    //Creating the Icosahedron
    //When creating 3D objects for the scene, we need to establish their Geometry and their Material
    const geometry = new THREE.IcosahedronGeometry(4);
    const material = new THREE.MeshPhongMaterial( { color: 0xc22e2e, wireframe: false, reflectivity: 0 });

    //Sets the cube variable to the new Mesh object created from the geometry and material
    cube = new THREE.Mesh( geometry, material );

    //Changes the position of the Icosahedron
    cube.position.y = 3;

    //This code below is used to create the outline seen in the 3D Animation
    //It basically creates a wireframe that is animated in the same way as the Icosahedron
    const edges = new THREE.EdgesGeometry( cube.geometry );
    const linemat = new THREE.LineBasicMaterial( {color: 0x000000, linewidth: 10 });
    line = new THREE.LineSegments( edges, linemat);
    line.position.y = 3;

    //Adding the objects to the scene
    scene.add(line);
    scene.add(cube);

    //Creating the plane. This acts as the ground of the 3D animation.
    //More can be done to create a more detailed plane, but for now, we are setting it to a solid color
    const geometry1 = new THREE.PlaneGeometry(1000,1000);
    const material1 = new THREE.MeshPhongMaterial( { color: 0x77d977, side: THREE.DoubleSide, wireframe: false});
    plane = new THREE.Mesh(geometry1, material1);

    //Changing the rotation of the plane and its position
    plane.rotation.x =1.75;
    plane.position.y = -1;

    //Adding the plane to the scene
    scene.add(plane);

    
    //Giving the scene an ambient light source. This is extra lighting.
    const light = new THREE.AmbientLight( 0xffffff, 0.1);
    scene.add(light);

    //Creating the spotlight for the scene
    const spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set( 0, 200, 200);
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    spotLight.shadow.camera.near = 500;
    spotLight.shadow.camera.far = 4000;
    spotLight.shadow.camera.fov = 30;
    spotLight.decay = 1;

    //Adding the spotlight to the scene
    scene.add( spotLight );

    //Changing the position of the camera
    camera.position.z = 10;
    camera.position.y = 2;
}

//This function essentially runs a loop that requests the new display frames
//Because it is on a loop, we can incrementally change certain aspects and variables in the objects to give an illusion of motion
//However, on the back end, the user's display is simply changing what is drawn fast enough to look like it is moving
function animate() {
    requestAnimationFrame(animate);

    //Icosahedron rotation
    cube.rotation.x += shapeRotationSpeed;
    cube.rotation.y += shapeRotationSpeed;

    //Outline rotation. This should be kept as the same speed as the Icosahedron Mesh in order to stay in the same position
    line.rotation.x += shapeRotationSpeed;
    line.rotation.y += shapeRotationSpeed;

    //Render
    renderer.render(scene, camera);
}

//Here we call both the init() and animate() functions to bring the animation to life.
init();
animate();

