function iniScene() {

    // Canvas
    CANVAS = document.querySelector('canvas.webgl')

    var container = document.createElement('div');
    document.body.appendChild(container);

    var near = 20,
        far = 80000;
    CAMERA = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, near, far);
    CAMERA.position.set(24000, 1665, 18500);

    SCENE = new THREE.Scene();
    // SCENE.background = new THREE.Color(0xdddddd);

    // ground
    var geometry = new THREE.BoxGeometry(10, 0.15, 10);
    var material = new THREE.MeshPhongMaterial({
        color: 0xa0adaf,
        shininess: 150,
        specular: 0xffffff,
        shading: THREE.SmoothShading
    });

    var ground = new THREE.Mesh(geometry, material);
    ground.scale.multiplyScalar(3);
    ground.castShadow = false;
    ground.receiveShadow = true;
    // scene.add(ground);

    // Renderer
    RENDERER = new THREE.WebGLRenderer({
        canvas: CANVAS,
        antialias: true,
    });
    RENDERER.setSize(window.innerWidth, window.innerHeight);
    RENDERER.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    RENDERER.shadowMap.enabled = true;
    RENDERER.shadowMap.type = THREE.BasicShadowMap;

    RIG = new ThreeStoryControls.CameraRig(CAMERA, SCENE)

    const tooltipDiv = document.createElement('div');
    tooltipDiv.className = 'pointlabel';
    // tooltipDiv.textContent = 'Tooltip';
    tooltipDiv.style.marginTop = '-1em';
    TOOLTIP = new THREE.CSS2DObject(tooltipDiv);
    TOOLTIP.position.set(0, 0, 0);
    SCENE.add(TOOLTIP);

    LABEL_RENDERER = new THREE.CSS2DRenderer();
    LABEL_RENDERER.setSize(window.innerWidth, window.innerHeight);
    LABEL_RENDERER.domElement.style.position = 'absolute';
    LABEL_RENDERER.domElement.style.top = '0px';
    document.body.appendChild(LABEL_RENDERER.domElement);

    // Controls
    // CONTROLS = new THREE.OrbitControls(CAMERA, LABEL_RENDERER.domElement);
    // controls.enableDamping = true;

    function deg2rad(x){
        return x * Math.PI / 180
    }



    var story_cells = [
        {
            cell_num: 1,
            phi: deg2rad(60), // angle between x and the projection of radius on xy
            theta: deg2rad(45), // angle between radius and z
            rho: 27000,
            use_conjugate: false,
            comment: 'This is the cell at the center of the slice'
        },
        // {
        //     cell_num: 147,
        //     phi: deg2rad(60), // angle between x and the projection of radius on xy
        //     theta: deg2rad(-45), // angle between radius and z
        //     rho: 17000,
        //     use_conjugate: false,
        //     comment: 'This is the cell at the center of the slice'
        // },
        // {
        //     cell_num: 2,
        //     phi: deg2rad(90), // angle between x and the projection of radius on xy
        //     theta: deg2rad(0), // angle between radius and z
        //     rho: 24000,
        //     use_conjugate: true,
        //     comment: 'looking at the face of the slice'
        // },
        // {
        //     cell_num: 3,
        //     phi: deg2rad(-90), // angle between x and the projection of radius on xy
        //     theta: deg2rad(0), // angle between radius and z
        //     rho: 24000,
        //     use_conjugate: true,
        //     comment: 'looking at the face of the slice'
        // },
        {
            cell_num: 4,
            phi: deg2rad(-90), // angle between x and the projection of radius on xy
            theta: deg2rad(180), // angle between radius and z
            rho: 24000,
            use_conjugate: true,
            comment: 'looking at the face of the slice'
        },
        {
            cell_num: 5,
            phi: deg2rad(70),
            theta: deg2rad(60),
            rho: 1000,
        },
        {
            cell_num: 6,
            phi: deg2rad(80),
            theta: deg2rad(120),
            rho: 1000,
        },
        {
            cell_num: 7,
            phi: deg2rad(60),
            theta: deg2rad(190),
            rho: 1000,
        },
        {
            cell_num: 2,
            phi: deg2rad(80),
            theta: deg2rad(190),
            rho: 30000,
        },
        ];
    var camera_positions = story_cells.map((item) => {
        var id = item.cell_num - 4;
        var centroid;
        if (id <= 0) {
            centroid = {x: 0, y: 0, z: 0}
        } else {
            centroid = CELL_DATA[id].sphere_position;
        }

        var rho = item.rho
        var position = new THREE.Vector3().setFromSphericalCoords(rho, item.phi, item.theta).add(centroid)
        const mat = new THREE.Matrix4().lookAt(position, centroid, new THREE.Vector3(0, 1, 0))
        var quaternion = new THREE.Quaternion().setFromRotationMatrix(mat)

        // var euler = new THREE.Euler(...CELL_DATA[item].sphere_rotation, 'XYZ')
        // var coords_xy = new THREE.Vector3(CELL_DATA[item].sphere_position.x, CELL_DATA[item].sphere_position.y, 1000)
        // var position = new THREE.Vector3().setFromEuler(euler).add(coords_xy)
        // var quaternion = new THREE.Quaternion().setFromEuler(euler)

        return {
            position,
            quaternion,
            duration: 5,
            useSlerp: true,
        }
    })

    CONTROLS = new ThreeStoryControls.StoryPointsControls(RIG, camera_positions, {
        cycle: true,
    })
    CONTROLS.enable()
    CONTROLS.goToPOI(0)

    // nextBtn = document.querySelector('.next')
    // prevBtn = document.querySelector('.prev')
    //
    // nextBtn.addEventListener('click', () => console.log('Next clicked'))
    // nextBtn.addEventListener('onclick', () => console.log('Next onclicked'))
    // prevBtn.addEventListener('click', () => console.log('Previous clicked'))

    // CONTROLS.addEventListener('update', (event) => {
    //     if (event.progress > 0.8) {
    //         caption.innerText = storyPoints[event.upcomingIndex].caption
    //     }
    // })

    stats = new Stats();
    container.appendChild(stats.dom);

    // var axes = createAxes(1000, SCENE);
    // SCENE.add(axes)

}


