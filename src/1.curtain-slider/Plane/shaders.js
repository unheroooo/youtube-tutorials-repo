const vs = `
    #ifdef GL_ES
    precision mediump float;
    #endif
    
    #define PI 3.14159265359
    
    // those are the mandatory attributes that the lib sets
    attribute vec3 aVertexPosition;
    attribute vec2 aTextureCoord;

    // those are mandatory uniforms that the lib sets and that contain our model view and projection matrix
    uniform mat4 uMVMatrix;
    uniform mat4 uPMatrix;

    uniform mat4 planeTextureMatrix;

    // if you want to pass your vertex and texture coords to the fragment shader
    varying vec3 vVertexPosition;
    varying vec2 vTextureCoord;

    varying float vDirection;

    uniform float uDirection;
    uniform float uIntensity;

    void main() {
        vec3 position = aVertexPosition;

        // 增强变形效果，基于强度参数
        float y = sin((position.x * 0.5 - 0.5) * PI) * uDirection * uIntensity;
        
        // 添加多层波动效果
        y += sin((position.x * 2.0 - 1.0) * PI * 2.0) * uDirection * uIntensity * 0.3;
        y += cos((position.z * 3.0 - 1.5) * PI) * uDirection * uIntensity * 0.2;

        position.y -= y;
        position.x += sin((position.y * 2.0 - 1.0) * PI) * uDirection * uIntensity * 0.1;
        
        gl_Position = uPMatrix * uMVMatrix * vec4(position, 1.0);

        // set the varyings
        vTextureCoord = (planeTextureMatrix * vec4(aTextureCoord, 0., 1.)).xy;
        vVertexPosition = position;

        vDirection = uDirection;
    }
    `;

const fs = `
#ifdef GL_ES
  precision mediump float;
#endif

#define S(a,b,n) smoothstep(a,b,n)

// get our varyings
varying vec3 vVertexPosition;
varying vec2 vTextureCoord;


// our texture sampler (default name, to use a different name please refer to the documentation)
uniform sampler2D planeTexture;

uniform float vDirection;
uniform float uTime;
uniform float uIntensity;
uniform float uFrequency;
uniform float uSpeed;
uniform float uDistortion;

void main(){

vec2 textureCoord = vTextureCoord;

const float PI = 3.141592;

// 基于不同球鞋特性的独特扭曲效果
float time = uTime * uSpeed;

// 主要波动效果 - 使用频率和强度参数
textureCoord.x += (
cos(textureCoord.x * uFrequency + (time * (PI / 3.0)))
+ cos(textureCoord.y * uFrequency * 0.8 + (time * (PI / 2.489)) * 0.7)
) * uDistortion * uIntensity;

textureCoord.y += (
sin(textureCoord.y * uFrequency * 0.9 + (time * (PI / 2.023)) * 0.8)
+ sin(textureCoord.x * uFrequency * 1.1 + (time * (PI / 3.1254)) * 1.2)
) * uDistortion * uIntensity * 1.5;

// 添加噪声效果
float noise = (sin(textureCoord.x * 20.0 + time * 2.0) + 
               cos(textureCoord.y * 20.0 + time * 1.5)) * 0.01 * uIntensity;
textureCoord += vec2(noise, noise);

// 边界保护
textureCoord = clamp(textureCoord, 0.01, 0.99);

vec4 color = texture2D(planeTexture, textureCoord);

// 添加动态亮度效果
float brightness = 1.0 + sin(time * 2.0) * 0.05 * uIntensity;
color.rgb *= brightness;

// 添加边缘发光效果
float edge = 1.0 - abs(vDirection) * 0.1;
color.rgb += vec3(0.1, 0.05, 0.0) * (1.0 - edge) * uIntensity;

gl_FragColor = color;

    }
    `;

export { vs, fs };
