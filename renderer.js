import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const boneRotationsFingerExtended = {
    finger_thumb_0_l: {x: 0.15090551581490171, y: 1.2149336076406705, z: 2.019459412398716},
    finger_thumb_1_l: {x: 0.000794191138932505, y: -0.002629079950646412, z: 0.2978829479044721},
    finger_thumb_2_l: {x: -0.0002373686441604053, y: 0.0028023982774440033, z: 0.00788550480398585},
    finger_index_0_l: {x: 0.02883395713258045, y: -0.10188528153925631, z: 0.3897926310834159},
    finger_index_1_l: {x: -0.0020319366077235536, y: 0.009877618943886541, z: 0.27167436767402634},
    finger_index_2_l: {x: 0.00024082709895081924, y: -0.0023202244113146617, z: 0.0530650324462534},
    finger_middle_0_l: {x: 0.0000850158838804307, y: -0.0003611123616903498, z: 0.3624346331517439},
    finger_middle_1_l: {x: 0.001345285995220015, y: -0.007255124018210212, z: 0.2161126376113087},
    finger_middle_2_l: {x: -0.0013783187671029097, y: 0.008137647300894195, z: 0.1835096038043268},
    finger_ring_0_l: {x: 0.016347979870483413, y: -0.08031318149150043, z: 0.3454226743903807},
    finger_ring_1_l: {x: -0.0008225324991084371, y: 0.004997762597866752, z: 0.16846813338116865},
    finger_ring_2_l: {x: 0.0015477667966466123, y: -0.008393912978559114, z: 0.1715523265723547},
    finger_pinky_0_l: {x: 0.0016222457749863757, y: 0.056861872789604105, z: 0.1211088842572306},
    finger_pinky_1_l: {x: 0.00379584054055253, y: -0.02260896439601826, z: 0.16588836278739814},
    finger_pinky_2_l: {x: -0.0038302103903521266, y: 0.0251383597389647, z: 0.11765689952047954},
    finger_thumb_0_r: {x: -3.090687142876181, y: 1.2149336076406705, z: 2.419459412398716},
    finger_thumb_1_r: {x: -0.0404059626162052, y: -5.15615532492575e-8, z: 4.54471944522084e-8},
    finger_thumb_2_r: {x: -0.0002373686441604053, y: 0.0028023982774440033, z: 0.00788550480398585},
    finger_index_0_r: {x: 0.02883395713258045, y: -0.10188528153925631, z: 0.3897926310834159},
    finger_index_1_r: {x: -0.0020319366077235536, y: 0.009877618943886541, z: 0.27167436767402634},
    finger_index_2_r: {x: 0.00024082709895081924, y: -0.0023202244113146617, z: 0.0530650324462534},
    finger_middle_0_r: {x: 0.0000850158838804307, y: -0.0003611123616903498, z: 0.3624346331517439},
    finger_middle_1_r: {x: 0.001345285995220015, y: -0.007255124018210212, z: 0.2161126376113087},
    finger_middle_2_r: {x: -0.0013783187671029097, y: 0.008137647300894195, z: 0.1835096038043268},
    finger_ring_0_r: {x: 0.016347979870483413, y: -0.08031318149150043, z: 0.3454226743903807},
    finger_ring_1_r: {x: -0.0008225324991084371, y: 0.004997762597866752, z: 0.16846813338116865},
    finger_ring_2_r: {x: 0.0015477667966466123, y: -0.008393912978559114, z: 0.1715523265723547},
    finger_pinky_0_r: {x: 0.0016222457749863757, y: 0.056861872789604105, z: 0.1211088842572306},
    finger_pinky_1_r: {x: 0.00379584054055253, y: -0.02260896439601826, z: 0.16588836278739814},
    finger_pinky_2_r: {x: -0.0038302103903521266, y: 0.0251383597389647, z: 0.11765689952047954}
}

// // The rotation of the bones of the hand model when the fingers are fully closed
const boneRotationsFingersClosed = {
    finger_thumb_0_l:  {x: 0, y: 0, z: 0.8},
    finger_thumb_1_l:  {x: 0, y: 0, z: 0.8},
    finger_thumb_2_l:  {x: 0, y: 0, z: 0.8},
    finger_index_0_l:  {x: 0, y: 0, z: 0.9},
    finger_index_1_l:  {x: 0, y: 0, z: 0.9},
    finger_index_2_l:  {x: 0, y: 0, z: 0.9},
    finger_middle_0_l: {x: 0, y: 0, z: 0.9},
    finger_middle_1_l: {x: 0, y: 0, z: 0.9},
    finger_middle_2_l: {x: 0, y: 0, z: 0.9},
    finger_ring_0_l:   {x: 0.05, y: 0.2, z: 0.9},
    finger_ring_1_l:   {x: 0, y: 0, z: 0.9},
    finger_ring_2_l:   {x: 0, y: 0, z: 0.8},
    finger_pinky_0_l:  {x: 0.15, y: 0.2, z: 0.9},
    finger_pinky_1_l:  {x: 0, y: 0, z: 0.9},
    finger_pinky_2_l:  {x: 0, y: 0, z: 0.9},
    finger_thumb_0_r:  {x: 0, y: 0, z: 0.8},
    finger_thumb_1_r:  {x: 0, y: 0, z: 0.8},
    finger_thumb_2_r:  {x: 0, y: 0, z: 0.8},
    finger_index_0_r:  {x: 0, y: 0, z: 0.9},
    finger_index_1_r:  {x: 0, y: 0, z: 0.9},
    finger_index_2_r:  {x: 0, y: 0, z: 0.9},
    finger_middle_0_r: {x: 0, y: 0, z: 0.9},
    finger_middle_1_r: {x: 0, y: 0, z: 0.9},
    finger_middle_2_r: {x: 0, y: 0, z: 0.9},
    finger_ring_0_r:   {x: 0.05, y: 0.2, z: 0.9},
    finger_ring_1_r:   {x: 0, y: 0, z: 0.9},
    finger_ring_2_r:   {x: 0, y: 0, z: 0.8},
    finger_pinky_0_r:  {x: 0.15, y: 0.2, z: 0.9},
    finger_pinky_1_r:  {x: 0, y: 0, z: 0.9},
    finger_pinky_2_r:  {x: 0, y: 0, z: 0.9}
}

const boneObjects = {
    finger_thumb_0_l: null,
    finger_thumb_1_l: null,
    finger_thumb_2_l: null,
    finger_index_0_l: null,
    finger_index_1_l: null,
    finger_index_2_l: null,
    finger_middle_0_l: null,
    finger_middle_1_l: null,
    finger_middle_2_l: null,
    finger_ring_0_l: null,
    finger_ring_1_l: null,
    finger_ring_2_l: null,
    finger_pinky_0_l: null,
    finger_pinky_1_l: null,
    finger_pinky_2_l: null,
    finger_thumb_0_r: null,
    finger_thumb_1_r: null,
    finger_thumb_2_r: null,
    finger_index_0_r: null,
    finger_index_1_r: null,
    finger_index_2_r: null,
    finger_middle_0_r: null,
    finger_middle_1_r: null,
    finger_middle_2_r: null,
    finger_ring_0_r: null,
    finger_ring_1_r: null,
    finger_ring_2_r: null,
    finger_pinky_0_r: null,
    finger_pinky_1_r: null,
    finger_pinky_2_r: null
};

const loader = new GLTFLoader();

const canvas = document.getElementById("webgl");

const scene = new THREE.Scene();

scene.background = new THREE.Color("#111111");

const size = 5;
const divisions = 10;

const gridHelper = new THREE.GridHelper( size, divisions );
gridHelper.position.setY(-1);
scene.add( gridHelper );

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

const rectLight = new THREE.RectAreaLight(0xffffff, 10, 100);
// light.position.set(0,10,10);
rectLight.position.set( 0, 0, 5 );
rectLight.lookAt( 0, 0, 0 );
//scene.add(rectLight);

const camera = new THREE.PerspectiveCamera(45, sizes.width/sizes.height);
camera.position.z = 10;
camera.add(rectLight);
scene.add(camera);
const controls = new OrbitControls(camera, canvas);
controls.maxDistance = 20;
controls.minDistance = 5;

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});

renderer.setSize(sizes.width, sizes.height);
renderer.render(scene,camera); 

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width/sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
});

let hands = "L";

document.getElementsByName("handSelect").forEach((element) => {
    element.addEventListener("click", () => {
        hands = element.value;
    });
});

const isHandInScene = {
    left: false,
    right: false
};

const moveHand = (hand, x, y, z) => {
    const object = scene.getObjectByName(hand + "_hand");
    object.position.set(x, y, z);
};

// Convert value in range oldMin to oldMax to a value between newMin and newMax 
const convertValueRange = (value, oldMin, oldMax, newMin, newMax) => (newMax - newMin) * ((value - oldMin) / (oldMax - oldMin)) + newMin;

const calculateBoneRotation = (bone) => {
    let flexion = 0;
    let fingerFlexion = (bone.name[bone.name.length - 1] == "l") ? leftHandFingerFlexion : rightHandFingerFlexion;

    // console.log(leftHandFingerFlexion); 
    // console.log(rightHandFingerFlexion); 

    for(const finger in fingerFlexion) {
        if(bone.name.includes(finger)) flexion = fingerFlexion[finger];
    }

    bone.rotation.x = convertValueRange(flexion, 0, ANALOG_MAX, boneRotationsFingerExtended[bone.name].x, boneRotationsFingerExtended[bone.name].x + boneRotationsFingersClosed[bone.name].x);
    bone.rotation.y = convertValueRange(flexion, 0, ANALOG_MAX, boneRotationsFingerExtended[bone.name].y,  boneRotationsFingerExtended[bone.name].y + boneRotationsFingersClosed[bone.name].y);
    bone.rotation.z = convertValueRange(flexion, 0, ANALOG_MAX, boneRotationsFingerExtended[bone.name].z, boneRotationsFingerExtended[bone.name].z + boneRotationsFingersClosed[bone.name].z);
}

const setBonePositions = () => {
    for (const boneName in boneObjects) {
        const bone = boneObjects[boneName];

        if(bone) calculateBoneRotation(bone);
    }
} 

const removeHand = (hand) => {
    const object = scene.getObjectByName(hand + "_hand");
    scene.remove(object);
}

const getBoneObjects = () => {
    for (const boneName in boneObjects) {
        const object = scene.getObjectByName(boneName);
        if (object) boneObjects[boneName] = object;
    }
};

const loadHandAtPosition = (hand, x, y, z) => {
    loader.load(
        // resource URL
        './models/vr_glove_' + hand + '_model.glb',
        // called when the resource is loaded
        function ( gltf ) {
            gltf.scene.name = hand + "_hand";

            gltf.scene.rotation.x = -Math.PI / 2;
            if(hand == 'left') {
                gltf.scene.rotation.z = 3 * Math.PI / 5;
            } else {
                gltf.scene.rotation.z = -3 * Math.PI / 5;
            }

            gltf.scene.position.set(x, y, z);
            
            gltf.scene.scale.set(15,15,15);
            scene.add( gltf.scene );

            getBoneObjects();
            console.log(boneObjects);
        },
        // called while loading is progressing
        function ( xhr ) {

            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

        },
        // called when loading has errors
        function ( error ) {

            console.log( error );

        }
    );
};

const updateModels = () => {
    switch(hands) {
        case 'L':
            if (isHandInScene.right) removeHand("right");
            if(isHandInScene.left && isHandInScene.right) moveHand("left", 0, -0.5, 0);
            if (!isHandInScene.left) loadHandAtPosition("left", 0, -0.5, 0);
            isHandInScene.left = true;
            isHandInScene.right = false;
            break;
        case 'R':
            if(isHandInScene.left) removeHand("left");
            if(isHandInScene.left && isHandInScene.right) moveHand("right", 0, -0.5, 0);
            if(!isHandInScene.right) loadHandAtPosition("right", 0, -0.5, 0);
            isHandInScene.left = false;
            isHandInScene.right = true;
            break;
        case 'B':
            if(!isHandInScene.left) {
                moveHand("right", 1, -0.5, 0);
                loadHandAtPosition("left", -1, -0.5, 0);
            }
            if(!isHandInScene.right) {
                moveHand("left", -1, -0.5, 0);
                loadHandAtPosition("right", 1, -0.5, 0);
            }
            isHandInScene.left = true;
            isHandInScene.right = true;
    }


}


const loop = () => {
    updateModels();
    setBonePositions();
    renderer.render(scene, camera);
    window.requestAnimationFrame(loop);
};

loop();