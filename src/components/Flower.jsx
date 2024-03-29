import React, { Component } from 'react';
import * as THREE from 'three';
import OrbitControlsFactory from 'three-orbit-controls';
import loadFont from 'load-bmfont';
import createGeometry from 'three-bmfont-text';
import MSDFShader from 'three-bmfont-text/shaders/msdf';
import fontFile from '../assets/Orbitron-Black.fnt';
import fontAtlas from '../assets/Orbitron-Black.png';
import { vertexShader, fragmentShader } from '../helperFunctions/flower-helper/shaders.js';


const OrbitControls = OrbitControlsFactory(THREE);

class Flower extends Component {
    componentDidMount() {
        this.initThree();
        this.init();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
        // Stop the animation frame before unmounting
        cancelAnimationFrame(this.requestID);
        this.renderer.dispose(); // Dispose of the renderer on cleanup
    }

    initThree() {
        const container = this.mount;

        this.renderer = new THREE.WebGLRenderer({ alpha: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(this.renderer.domElement);

        this.camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
        this.camera.position.z = 60;

        this.scene = new THREE.Scene();

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);

        this.clock = new THREE.Clock();

        window.addEventListener('resize', this.handleResize);
    }

    init() {
        loadFont(fontFile, (err, font) => {
            if (err) {
                console.error("Error loading font:", err);
                return;
            }

            this.fontGeometry = createGeometry({
                font: font,
                text: "Wer bist?"
            });

            this.loader = new THREE.TextureLoader();
            this.loader.load(fontAtlas, texture => {
                this.fontMaterial = new THREE.RawShaderMaterial(
                    MSDFShader({
                        map: texture,
                        side: THREE.DoubleSide,
                        transparent: true,
                        negate: false,
                        color: 0xffffff
                    })
                );

                this.createRenderTarget();
                this.createMesh();
                this.animate();
            });
        });
    }

    createRenderTarget() {
        this.rt = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);
        this.rtCamera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
        this.rtCamera.position.z = 2.5;

        this.rtScene = new THREE.Scene();
        this.rtScene.background = new THREE.Color('#000000');

        this.text = new THREE.Mesh(this.fontGeometry, this.fontMaterial);
        this.text.position.set(-0.965, -0.525, 0);
        this.text.rotation.set(Math.PI, 0, 0);
        this.text.scale.set(0.008, 0.04, 1);

        this.rtScene.add(this.text);
    }

    createMesh() {
        this.geometry = new THREE.TorusKnotGeometry(9, 3, 768, 3, 4, 3);

        this.material = new THREE.ShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            uniforms: {
                uTime: { value: 0 },
                uTexture: { value: this.rt.texture }
            }
        });

        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.mesh);
    }

    animate = () => {
        this.requestID = requestAnimationFrame(this.animate);
        this.renderScene();
    }

    renderScene() {
        this.controls.update();
        this.material.uniforms.uTime.value = this.clock.getElapsedTime();
        this.renderer.setRenderTarget(this.rt);
        this.renderer.render(this.rtScene, this.rtCamera);
        this.renderer.setRenderTarget(null);
        this.renderer.render(this.scene, this.camera);
    }

    handleResize = () => {
        const container = this.mount;
        this.camera.aspect = container.clientWidth / container.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(container.clientWidth, container.clientHeight);
    }

    render() {
        return <div ref={ref => (this.mount = ref)} className="webgl-container" />;
    }
}

export default Flower;
