(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class WebGLSculpture {
  constructor(canvas) {
    this.canvas = canvas;
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
    this.animate = this.animate.bind(this);
    this.render = this.render.bind(this);
    this.onWindowResize = this.onWindowResize.bind(this);
    window.addEventListener('resize', this.onWindowResize);
    this.init();
  }

  init() {
    this.scene = new THREE.Scene();
    this.ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
    this.pointLight = new THREE.PointLight(0xffffff, 0.8);
    this.manager = new THREE.LoadingManager();
    this.textureLoader = new THREE.TextureLoader(this.manager);
    this.texture = this.textureLoader.load('assets/models/model.jpg');
    this.loader = new THREE.OBJLoader(this.manager);
    this.controls = new THREE.OrbitControls(this.camera);
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true
    });
    this.mouseX = 0;
    this.mouseY = 0;
    this.windowHalfX = window.innerWidth / 2;
    this.windowHalfY = window.innerHeight / 2;
    this.camera.position.z = 25;
    this.scene.add(this.ambientLight);
    this.camera.add(this.pointLight);
    this.scene.add(this.camera);

    this.manager.onProgress = (item, loaded, total) => {
      console.log(item, loaded, total);
    };

    var onProgress = xhr => {
      if (xhr.lengthComputable) {
        var percentComplete = xhr.loaded / xhr.total * 100;
        console.log(Math.round(percentComplete, 2) + '% downloaded');
      }
    };

    let onError = xhr => {};

    let texture = this.texture,
        scene = this.scene;
    this.loader.load('assets/models/model.obj', object => {
      object.traverse(child => {
        if (child instanceof THREE.Mesh) {
          child.material.map = texture;
        }
      });
      object.position.set(0, 0, 0);
      object.rotateY(Math.PI / 2);
      object.rotateX(-(Math.PI / 2));
      scene.add(object);
    }, onProgress, onError);
    this.controls.addEventListener('change', this.render);
    this.controls.enableKeys = true;
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.animate();
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.render();
  }

  render() {
    this.camera.lookAt(this.scene.position);
    this.renderer.render(this.scene, this.camera);
  }

}

exports.default = WebGLSculpture;
let $canvas;
if ($canvas = document.getElementById('canvas')) new WebGLSculpture($canvas);

},{}],2:[function(require,module,exports){
"use strict";

var _canvas = _interopRequireDefault(require("./components/canvas"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"./components/canvas":1}]},{},[2]);