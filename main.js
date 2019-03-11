
var videocopy = 0;
var cubeRotation = 0.0;
var time =0;
main();

//
// Start here
//
function main() {
    const canvas = document.querySelector('#glcanvas');
    const gl = canvas.getContext('webgl');

    // If we don't have a GL context, give up now

    if (!gl) {
        alert('Unable to initialize WebGL. Your browser or machine may not support it.');
        return;
  }
  
  // Vertex shader program

  var vsSource = `
  attribute vec3 aVertexNormal;
  uniform vec3 u_lightWorldPosition;
  attribute vec4 aVertexPosition;
    attribute vec2 aTextureCoord;
uniform mat4 u_world;
  uniform int fl;
 
    uniform mat4 uNormalMatrix;
    uniform mat4 uModelViewMatrix;
    varying highp vec2 vTextureCoord;
    varying highp vec3 vLighting;
    uniform mat4 uProjectionMatrix;
    void main(void) {
        gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
        vTextureCoord = aTextureCoord;
        // Apply lighting effect
        highp vec3  ambientLight;
     
        ambientLight = vec3(1.0, 1.0, 1.0);
    
        highp vec3 directionalLightColor;
        if(fl==1)
         directionalLightColor = vec3(0.5, 0.25, 0.25);
        else
         directionalLightColor = vec3(0.0, 0.0, 0.0);
        highp vec3 directionalVector = (vec3(0.75, -2, 3));
        highp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 0.0);
        highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
        vLighting = ambientLight + (directionalLightColor * directional);
    }
    `;
    
    // Fragment shader program
    
    var fsSource = `
    varying highp vec3 vLighting;
    varying highp vec2 vTextureCoord;
    uniform int grey_scale;
    uniform sampler2D uSampler;
    void main(void) {
        highp vec4 texelColor = texture2D(uSampler, vTextureCoord);
        if(grey_scale == 0)
        gl_FragColor = vec4(texelColor.rgb * vLighting, texelColor.a);
        else{
        
        gl_FragColor = vec4(vec3((texelColor.r + texelColor.g + texelColor.b)/3.0,(texelColor.r + texelColor.g + texelColor.b)/3.0,(texelColor.r + texelColor.g + texelColor.b)/3.0), texelColor.a);
        }
    }
  `;
  
  // Initialize a shader program; this is where all the lighting
  // for the vertices and so forth is established.
  const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

  // Collect all the info needed to use the shader program.
  // Look up which attributes our shader program is using
  // for aVertexPosition, aVertexNormal, aTextureCoord,
  // and look up uniform locations.
  const programInfo = {
      program: shaderProgram,
      attribLocations: {
          vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
          vertexNormal: gl.getAttribLocation(shaderProgram, 'aVertexNormal'),
          textureCoord: gl.getAttribLocation(shaderProgram, 'aTextureCoord'),
        },
        uniformLocations: {
            projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
            modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
            normalMatrix: gl.getUniformLocation(shaderProgram, 'uNormalMatrix'),
            uSampler: gl.getUniformLocation(shaderProgram, 'uSampler'),
            fl: gl.getUniformLocation(shaderProgram, 'fl'),
            grey_scale : gl.getUniformLocation(shaderProgram, 'grey_scale'),
        },
    };

    // Here's where we call the routine that builds all the
    // objects we'll be drawing.
    
    const buffers1 = initBuffers(gl,0);
    const buffers2 = initBuffers2(gl,0);
    const buffers3 = initBuffers3(gl,0);
    const buffers4 = initBuffers4(gl,pos);
    const buffers5 = initBuffers5(gl,0);
    const buffers6 = initBuffers6(gl,0);
    const buffers7 = initBuffers(gl,1);
    const buffers8 = initBuffers8(gl,0);
    const buffers9 = initBuffers9(gl,0);
    const buffers10 = initBuffers10(gl,0);
    const texture1 = loadTexture(gl, 'track.png');
    const texture3 = loadTexture(gl, 'sky.png');
    const texture2 = loadTexture(gl, 'wall.png');
    const texture4 = loadTexture(gl, 'player.png');
    const texture5 = loadTexture(gl, 'coins.png');
    const texture6 = loadTexture(gl, 'train.png');
    const texture7 = loadTexture(gl, 'deadend.jpg');
    const texture8 = loadTexture(gl, 'jump.jpg');
    const texture9 = loadTexture(gl, 'dog.jpg');
    const texture10 = loadTexture(gl, 'legs.jpg');
    const texture11 = loadTexture(gl, 'boost.jpeg');
    const texture12 = loadTexture(gl, 'cop.jpg');
    // const video = setupVideo('sky.mp4');
    var then = 0, then2=0;
    var pos=0;
    var spacePressed = false;
    var rightPressed =false;
    var leftPressed=false;
    var count=0;
    var keypresstime = 0, flashtime=2;
    var height = 0;
    var height_flag = 0,dist=0, danger =1, danger_time=0;
    // Draw the scene repeatedly
    var score =0, lives=1,height_flag2, height_time=0,jumping_boots=0, height_time2=0;
    function render(now) {
        // console.log(now)
        // console.log((now*0.001-height_time))
        if(now*0.001-height_time>10){
            height_flag2=0;
            // return 0;
        }
        if(now*0.001-height_time2>10){
            jumping_boots=0;
            // return 0;
        }
       
        if(danger==1){
            document.getElementById('danger').innerHTML = "Danger!";
        }
        else
        {
            document.getElementById('danger').innerHTML = "";
        }
        // console.log(dist)
        if(Math.abs(dist)<0.05){
        dist = 0;
        // pos=0;
        }
        if(Math.abs(dist-1.5)<0.05){
        dist=1.5;
        // pos=1;
        }
        if(Math.abs(dist+1.5)<0.05){
        dist=-1.5;
        // pos = -1;
        }
        if(pos==1&&dist<1.35){
            dist+=0.15;           
        }
        else if(pos==0&&dist<=1.5&&dist>0){
            dist-=0.15;
        }
        else if(pos==0&&dist>=-1.5&&dist<0){
            dist+=0.15;
        }
        else if(pos==-1&&dist>-1.35){
            dist-=0.15;
        }  
        else if(pos==-2&&dist>=-2.00){
            dist-=0.05;
            if(dist<=-2.00)
                pos=-3;                      
        } 
        else if(pos==-3){
            dist+=0.05;      
            if(dist>-1.35){
                dist=-1.5;               
                pos = -1;
            } 
        } 
        else if(pos==2&&dist<=2.00){
            dist+=0.05;
            if(dist>=2.00)
                pos=3;                      
        } 
        else if(pos==3){
            dist-=0.05;      
            if(dist<1.35){
                dist=1.5;               
                pos = 1;
            } 
        }
        // console.log(dist)
        // console.log(danger)
        
        if(lives==0){
            now=0;
            danger=0;
            document.getElementById('glcanvas').remove();
            var img = document.createElement('img');
            img.src = './busted.png';
            img.alt = 'Busted';
            img.height = '600';
            img.width = '800';
            img.style="display: block; margin-left:auto; margin-right:auto; ";
            document.getElementById('load').appendChild(img);
        }
        if(Math.round(now*0.001)==150){
            now=0;
            danger=0;
            document.getElementById('glcanvas').remove();
            var img = document.createElement('img');
            img.src = './escaped.jpeg';
            img.alt = 'Escaped';
            img.height = '600';
            img.width = '800';
            img.style="display: block; margin-left:auto; margin-right:auto; ";
            document.getElementById('load').appendChild(img);
        }
        if(height>0.5){
            height_flag = 0;
        }
        if(height_flag == 0){
            height -=0.02
        }
        if(Math.abs(height) <0.05){
            height=0;
            // height_flag = 0;
        }
        document.getElementById('score').innerHTML = score;
        time = now;
        now *= 0.001;  // convert to seconds
        document.getElementById('time').innerHTML = Math.round(now);
        if(now-danger_time>10){
            danger=0;
            danger_time=0;
        }
        // console.log(now);
        if(now%5 <= 2.5)
        {
            gl.uniform1i(programInfo.uniformLocations.fl, 1);
            // flashtime = now;
        }
        else{
            gl.uniform1i(programInfo.uniformLocations.fl, 0);
        }
        const deltaTime = now - then;
        document.addEventListener('keydown', keyDownHandler, false);
        document.addEventListener('keyup', keyUpHandler, false);
        // console.log(rightPressed)
        function keyUpHandler(event) {
            
            if(event.keyCode == 71)
            gl.uniform1i(programInfo.uniformLocations.grey_scale, 0);
            // console.log(event.keyCode)
            if(rightPressed == false && leftPressed ==false && spacePressed == false)
            return;
            const deltaTime2 = now - keypresstime;
            // console.log(deltaTime2)
            if(event.keyCode == 39 && deltaTime2 >0.01  ) {
                rightPressed = false;
                if(pos==1)
                {
                    if(danger==1)
                    {
                        lives--;
                        // now =0;
                    }
                    else{    
                        pos=2;
                        danger=1;
                        danger_time=time*0.001;
                    }
                    return;
                }
                else if (pos==0)
                pos=1;                   
                else
                pos=0;
                // console.log(pos);
                return;
            }
            else if(event.keyCode == 37 && deltaTime2 >0.1) {
                // console.log(now-danger_time)
                leftPressed = false;
                if(pos==-1){
                    if(danger==1)
                    {
                        lives--;
                        // now=0;
                    }
                    else{    
                        pos=-2;
                        danger=1;
                        danger_time=time*0.001;
                    }
                    return;
                }
                else if(pos==0)
                pos=-1;
                else 
                pos=0;
                // console.log(pos);
                return;
            }
            else if(event.keyCode == 32 && deltaTime2 >0.1) {
                spacePressed = false;
                if(height_flag==0){
                    // height += 0.8; 
                    height_flag = 1;           
                }
                return;
            }
            
        }
        // console.log(danger_time)
        // console.log(danger_time)
        // console.log(height_flag);
        function keyDownHandler(event){
            if(event.keyCode == 71)
            gl.uniform1i(programInfo.uniformLocations.grey_scale, 1);
            if(rightPressed ==true || leftPressed == true || spacePressed==true)
            return;
            keypresstime = now;
            if(event.keyCode ==39)
             rightPressed = true;
            if(event.keyCode == 37)
             leftPressed = true;
             if(event.keyCode == 32)
             spacePressed = true;

        }
        if(height_flag == 1){
        height += 0.2;
        // console.log(height_flag);
        }

        for(i=0;i<1000;i++){
            drawScene(gl, programInfo, buffers1, texture1, deltaTime,18,1*i,now,0,0);
            drawScene(gl, programInfo, buffers2, texture2, deltaTime,12,1*i,now,0,0);
            drawScene(gl, programInfo, buffers3, texture3, deltaTime,6,i,now,0,0);
            
        }
        // console.log( Math.abs(-(0*5+5)*2+now/2+0.5)-3)
        // console.log(Math.abs(-2*(1*5+3)+now/2+0.5));
        for(i=0;i<1000;i++){
            // console.log(i%2);
            if(i%2==0){
                drawScene(gl, programInfo, buffers8, texture8, deltaTime,6,i*5+5,now,-3.0, -0.0);
                drawScene(gl, programInfo, buffers5, texture11, deltaTime,6,i*25+4,now,0.0, -1.0);
                if(pos == -1&&dist<=-1.5 && Math.abs(-(i*5+5)*2+now/2+0.5)-2.5<=0.1&&Math.abs(-(i*5+5)*2+now/2+0.5)-2.5>=0.0&&height==0 )
                {
                    if(danger==1&&(now-danger_time)>3)
                    {
                        lives--;
                        // now=0;
                    }
                    else{    
                        // pos=-2;
                        // console.log('bkb')
                        danger=1;
                        danger_time=time*0.001;
                    }
                }
                if(pos == 0 && Math.abs(-2*(i*25+4)+now/2+0.5)<=0.1)
                {

                   height=1.5;
                   height_flag2=1;
                   height_time=now;
                }
                
            }
            else {
                drawScene(gl, programInfo, buffers8, texture8, deltaTime,6,i*5+7.5,now,3.0, -0.0);
                drawScene(gl, programInfo, buffers5, texture11, deltaTime,6,i*5+3,now,-2.0, -1.0);
                if(pos == 1 &&dist>=1.5&&  Math.abs(-(i*5+7.5)*2+now/2+0.5)-2.5<=0.1&&Math.abs(-(i*5+7.5)*2+now/2+0.5)-2.5>=0.0 &&height==0)
                {
                    
                    if(danger==1&&(now-danger_time)>3)
                    {
                        lives--;
                        // now=0;
                    }
                else{    
                    // pos=-2;
                    danger=1;
                    danger_time=time*0.001;
                }
            }
            if(pos == -1 && Math.abs(-2*(i*5+3)+now/2+0.5)<=0.1)
                {
                    jumping_boots=1;
                //    height=1.5;
                //    height_flag2=1;
                   height_time2=now;
                }
            
            }
            if(i%15<5){  
                drawScene(gl, programInfo, buffers5, texture5, deltaTime,36,i/4,now,-1.5, -0.6);
                
                if(pos == -1 && -i/2+now/2+0.5<=0.1&&-i/2+now/2+0.5>=0 )
                score +=2;
                
            }
            else if (i%15>5&&i%15<10){
            drawScene(gl, programInfo, buffers5, texture5, deltaTime,36,i/4,now,0, -0.6);
            if(pos == 0 && -i/2+now/2+0.5<=0.1&&-i/2+now/2+0.5>=0)
            score +=2;
            }
            else{
            drawScene(gl, programInfo, buffers5, texture5, deltaTime,36,i/4,now,1.5, -0.6);
            
            if(pos == 1 && -i/2+now/2+0.5<=0.1&&-i/2+now/2+0.5>=0)
            score +=2; 
            
            }   
        }
        // console.log(jumping_boots);
        for(i=0;i<100;i++){
            drawScene(gl, programInfo, buffers6, texture6, deltaTime,30,i*30+10,now*5,-1.9, 0);
            if(pos <= -1 && -2*(i*30+10)+now*5/2+2.75 >= -0.1 && -2*(i*30+10)+now*5/2+2.75 <= 0.1 ){
                if(jumping_boots==1){
                    height = 1;
                    
                }
                else
                lives--;
                // console.log(Math.abs(-2*(i*30+10)+now*5/2+2.65))
            }
            if(pos<=-1 && dist<=-1.30 && Math.abs(-2*(i*30+10)+now*5/2+0.65)<=2&&jumping_boots==0){
                // console.log(now-danger_time)
                if(danger==1&&(now-danger_time)>2){
                    // now=0;
                    lives--;
                    console.log('hi')
                }
                else
                {
                    pos=0;
                    danger=1;
                    danger_time=now;
                }
            }
        }
        for(i=0;i<100;i++){
            drawScene(gl, programInfo, buffers6, texture6, deltaTime,36,i*35+15,now*5,1.9, 0);
            if(pos >= 1 && (-2*(i*35+15)+now*5/2+2.65)>=-0.1 && (-2*(i*35+15)+now*5/2+2.65)<=0.1){
                lives--;
                // now=0;
            }
            if(pos>=1 && dist>=1.30 && Math.abs((-2*(i*35+15)+now*5/2+0.65))<=2){
                if(danger==1){
                    lives--;
                    // now=0;
                }
                else
                {
                    pos=0;
                    danger=1;
                    danger_time=now;
                }
            }
          
        }
        // console.log(height_flag2)
        // console.log( (-2*(0*35+15)+now*5/2+2.65))
        // console.log(-2*(0*30+10)+now*5/2+2.65)
        for(i=0;i<100;i++){
            drawScene(gl, programInfo, buffers7, texture7, deltaTime,6,i*10+5,now,2, 0);
            if(pos == 0 && Math.abs(-2*(i*10+5)+now/2)<=1.9 && Math.abs(-2*(i*10+5)+now/2)>=0.3&&height_flag2==0){
                lives--;
            }

        }
        
        // console.log(Math.abs(-2*(0*5+5)+now/2))
        if(jumping_boots==0){
        drawScene(gl, programInfo, buffers10, texture10, deltaTime,30,-0.1,0,dist*0.6, height*0.6+0.6,0);
        drawScene(gl, programInfo, buffers4, texture4, deltaTime,36,0,0,dist,height,0);
        }
        else{
            drawScene(gl, programInfo, buffers10, texture10, deltaTime,30,-0.1,0,dist*0.6, (height*0.6*1.5+0.6)*1.,0);
        drawScene(gl, programInfo, buffers4, texture4, deltaTime,36,0,0,dist,height*1.5,0);
        }
        if(danger==1){
        drawScene(gl, programInfo, buffers10, texture12, deltaTime,30,-0.2,0,dist*0.6, height*0.6+0.6,0);
        drawScene(gl, programInfo, buffers4, texture12, deltaTime,36,-0.1,0,dist,height,0);
        }
        else{
        drawScene(gl, programInfo, buffers9, texture9, deltaTime,30,(Math.round(time*0.01)%2)*0.01+0.05-0.10,0,dist*1.25+0.05,0);
        drawScene(gl, programInfo, buffers9, texture9, deltaTime,30,(Math.round(time*0.01)%2)*0.01+0.05-0.10,0,dist*1.25-0.05,0);
        }
        // drawScene(gl, programInfo, buffers9, texture9, deltaTime,30,-0.10,0,dist*1.25,height+0.3,0);
        // console.log(now/2)
        // console.log(score)
        
        requestAnimationFrame(render);
        then = now;
    }
    requestAnimationFrame(render);
}

//
// Initialize a texture and load an image.
// When the image finished loading copy it into the texture.
//
function loadTexture(gl, url) {
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
  
    // Because images have to be download over the internet
    // they might take a moment until they are ready.
    // Until then put a single pixel in the texture so we can
    // use it immediately. When the image has finished downloading
    // we'll update the texture with the contents of the image.
    const level = 0;
    const internalFormat = gl.RGBA;
    const width = 1;
    const height = 1;
    const border = 0;
    const srcFormat = gl.RGBA;
    const srcType = gl.UNSIGNED_BYTE;
    const pixel = new Uint8Array([0, 0, 0, 0]);  // opaque blue
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                  width, height, border, srcFormat, srcType,
                  pixel);
  
    const image = new Image();
    image.onload = function() {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                    srcFormat, srcType, image);
  
      // WebGL1 has different requirements for power of 2 images
      // vs non power of 2 images so check if the image is a
      // power of 2 in both dimensions.
      if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
         // Yes, it's a power of 2. Generate mips.
         gl.generateMipmap(gl.TEXTURE_2D);
      } else {
         // No, it's not a power of 2. Turn of mips and set
         // wrapping to clamp to edge
         gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
         gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
         gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      }
    };
    image.src = url;
  
    return texture;
  }
  
  function isPowerOf2(value) {
    return (value & (value - 1)) == 0;
  }
    
//
// Draw the scene.
//


function drawScene(gl, programInfo, buffers, texture, deltaTime,vertexCount,i, now,pos,h,yes=0) {
    // gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
    // gl.clearDepth(1.0);                 // Clear everything
    // gl.enable(gl.DEPTH_TEST);           // Enable depth testing
    // gl.disable(gl.DEPTH_TEST);
    // gl.depthFunc(gl.LEQUAL);            // Near things obscure far things
    // Clear the canvas before we start drawing on it.
  
    // gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  
    // Create a perspective matrix, a special matrix that is
    // used to simulate the distortion of perspective in a camera.
    // Our field of view is 45 degrees, with a width/height
    // ratio that matches the display size of the canvas
    // and we only want to see objects between 0.1 units
    // and 100 units away from the camera.
  
    const fieldOfView = 135 * Math.PI / 180;   // in radians
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear = 0.0;
    const zFar = 100.0;
    const projectionMatrix = mat4.create();
  
    // note: glmatrix.js always has the first argument
    // as the destination to receive the result.
    mat4.perspective(projectionMatrix,
                     fieldOfView,
                     aspect,
                     zNear,
                     zFar);
                  
    // Set the drawing position to the "identity" point, which is
    // the center of the scene.
    const modelViewMatrix = mat4.create();
                    //  mat4.multiply(projectionMatrix, projectionMatrix, viewMatrix);
    // Now move the drawing position a bit to where we want to
    // start drawing the square.
  
    mat4.translate(modelViewMatrix,     // destination matrix
                   modelViewMatrix,     // matrix to translate
                   [0.0+pos, 0.0+h,-2.0*i+now/2]); 
                   

    mat4.rotate(modelViewMatrix,  // destination matrix
                modelViewMatrix,  // matrix to rotate
                2,     // amount to rotate in radians
                [0, yes, 0]);       // axis to rotate around (Z)
    // mat4.rotate(modelViewMatrix,  // destination matrix
    //             modelViewMatrix,  // matrix to rotate
    //             cubeRotation * .7,// amount to rotate in radians
    //             [0, 0, 0]);       // axis to rotate around (X)
  
    const normalMatrix = mat4.create();
    mat4.invert(normalMatrix, modelViewMatrix);
    mat4.transpose(normalMatrix, normalMatrix);
  
    // Tell WebGL how to pull out the positions from the position
    // buffer into the vertexPosition attribute
    {
      const numComponents = 3;
      const type = gl.FLOAT;
      const normalize = false;
      const stride = 0;
      const offset = 0;
      gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
      gl.vertexAttribPointer(
          programInfo.attribLocations.vertexPosition,
          numComponents,
          type,
          normalize,
          stride,
          offset);
      gl.enableVertexAttribArray(
          programInfo.attribLocations.vertexPosition);
    }
  
    // Tell WebGL how to pull out the texture coordinates from
    // the texture coordinate buffer into the textureCoord attribute.
    {
      const numComponents = 2;
      const type = gl.FLOAT;
      const normalize = false;
      const stride = 0;
      const offset = 0;
      gl.bindBuffer(gl.ARRAY_BUFFER, buffers.textureCoord);
      gl.vertexAttribPointer(
          programInfo.attribLocations.textureCoord,
          numComponents,
          type,
          normalize,
          stride,
          offset);
      gl.enableVertexAttribArray(
          programInfo.attribLocations.textureCoord);
    }
  
    // Tell WebGL how to pull out the normals from
    // the normal buffer into the vertexNormal attribute.
    {
      const numComponents = 3;
      const type = gl.FLOAT;
      const normalize = false;
      const stride = 0;
      const offset = 0;
      gl.bindBuffer(gl.ARRAY_BUFFER, buffers.normal);
      gl.vertexAttribPointer(
          programInfo.attribLocations.vertexNormal,
          numComponents,
          type,
          normalize,
          stride,
          offset);
      gl.enableVertexAttribArray(
          programInfo.attribLocations.vertexNormal);
    }
  
    // Tell WebGL which indices to use to index the vertices
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);
  
    // Tell WebGL to use our program when drawing
  
    gl.useProgram(programInfo.program);
  
    // Set the shader uniforms
  
    gl.uniformMatrix4fv(
        programInfo.uniformLocations.projectionMatrix,
        false,
        projectionMatrix);
    gl.uniformMatrix4fv(
        programInfo.uniformLocations.modelViewMatrix,
        false,
        modelViewMatrix);
    gl.uniformMatrix4fv(
        programInfo.uniformLocations.normalMatrix,
        false,
        normalMatrix);
  
    // Specify the texture to map onto the faces.
  
    // Tell WebGL we want to affect texture unit 0
    gl.activeTexture(gl.TEXTURE0);
  
    // Bind the texture to texture unit 0
    gl.bindTexture(gl.TEXTURE_2D, texture);
  
    // Tell the shader we bound the texture to texture unit 0
    gl.uniform1i(programInfo.uniformLocations.uSampler, 0);
    
  
    {
    //   const vertexCount = 6;
      const type = gl.UNSIGNED_SHORT;
      const offset = 0;

      gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
    //   gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
    }
  
    // Update the rotation for the next draw
  
    // cubeRotation += deltaTime;
  }
  //ss
//
// Initialize a shader program, so WebGL knows how to draw our data
//
function initShaderProgram(gl, vsSource, fsSource) {
    var vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    var fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
  
    // Create the shader program
  
    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
  
    // If creating the shader program failed, alert
  
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
      return null;
    }
  
    return shaderProgram;
  }
  
  //
  // creates a shader of the given type, uploads the source and
  // compiles it.
  //
  function loadShader(gl, type, source, now) {
    const shader = gl.createShader(type);
  
    // Send the source to the shader object
  
    gl.shaderSource(shader, source, now);
  
    // Compile the shader program
  
    gl.compileShader(shader);
  
    // See if it compiled successfully
  
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
  
    return shader;
  }
  