uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform vec2 uFrequency;
uniform float uRandomAmplitud;
uniform float uTime;

attribute vec3 position;
attribute float aRandom;

attribute vec2 uv;
varying vec2 vUv;
varying float vRandom;
varying float vElevation;

void main() {
    vUv = uv;
    vec4 modelPosition =  modelMatrix * vec4(position, 1.0);
    
    float elevation = sin(modelPosition.x * uFrequency.x + uTime) * .3 * sin(modelPosition.y * uFrequency.y + uTime) + aRandom * uRandomAmplitud ;
    modelPosition.z += elevation;
    vElevation = elevation;

    vec4 viewPosition = viewMatrix * modelPosition;

    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    vRandom = aRandom;


}