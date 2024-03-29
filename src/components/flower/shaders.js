// src/shaders.js
export const vertexShader = `
varying vec2 vUv;
varying vec3 vPos;

void main() {
  vUv = uv;
  vPos = position;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;
export const fragmentShader = `
varying vec2 vUv;
varying vec3 vPos;

uniform sampler2D uTexture;
uniform float uTime;

void main() {
  float time = uTime * 0.1;
  vec2 repeat = -vec2(5.0, 3.0);
  vec2 uv = fract(vUv * repeat + vec2(time, 0.0)); // The sign of time change direction of movement

  float shadow = clamp(vPos.z / 5.0, 0.0, 1.0);

  vec3 texture = texture2D(uTexture, uv).rgb;

  gl_FragColor = vec4(texture * shadow, 1.0);
}`;

const shaders = { vertexShader, fragmentShader };
export default shaders;