
//
// initBuffers
//
// Initialize the buffers we'll need. For this demo, we just
// have one object -- a simple three-dimensional cube.
//
function initBuffers3(gl, i) {
 

    // const texture = loadTexture(gl, 'track.png');
    // Create a buffer for the cube's vertex positions.
  
    const positionBuffer = gl.createBuffer();
  
    // Select the positionBuffer as the one to apply buffer
    // operations to from here out.
  
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  
    // Now create an array of positions for the cube.
  
    const positions = [
      // Front face
      // -1.0, -1.0,  1.0,
      //  1.0, -1.0,  1.0,
      //  1.0,  1.0,  1.0,
      // -1.0,  1.0,  1.0,
  
      // // Back face
      // -1.0, -1.0, -1.0,
      // -1.0,  1.0, -1.0,
      //  1.0,  1.0, -1.0,
      //  1.0, -1.0, -1.0,
  
      // Top face
      -5.0, 1.0, -1.0,
       5.0, 1.0, -1.0,
       5.0, 1.0,  1.0,
      -5.0, 1.0,  1.0,
  
      // // Bottom face
      // -1.0, -1.0, -1.0,
      //  1.0, -1.0, -1.0,
      //  1.0, -1.0,  1.0,
      // -1.0, -1.0,  1.0,
  
      // // Right face
      // 1.0, -1.0, -1.0,
      // 3.0, -1.0, -1.0,
      // 3.0, -1.0,  1.0,
      // 1.0, -1.0,  1.0,
  
      // // Left face
      // -1.0, -1.0, -1.0,
      // -1.0, -1.0,  1.0,
      // -1.0,  1.0,  1.0,
      // -1.0,  1.0, -1.0,
    ];
    
    // Now pass the list of positions into WebGL to build the
    // shape. We do this by creating a Float32Array from the
    // JavaScript array, then use it to fill the current buffer.
  
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
  
    // Set up the normals for the vertices, so that we can compute lighting.
  
    const normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
  
    const vertexNormals = [
   
      0.0, 1.0,  0.0,
       0.0, 1.0,  0.0,
       0.0, 1.0,  0.0,
       0.0, 1.0,  0.0,
 
  
    ];
  
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexNormals),
                  gl.STATIC_DRAW);
  
    // Now set up the texture coordinates for the faces.
  
    const textureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
  
    const textureCoordinates = [

      // Top
      0.0,  0.0,
      1.0,  0.0,
      1.0,  1.0,
      0.0,  1.0,
     
    ];
  
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates),
                  gl.STATIC_DRAW);

  
    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  

  
    const indices = [
      0,  1,  2,      0,  2,  3,    // front
   
    ];
  
    // Now send the element array to GL
  
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
        new Uint16Array(indices), gl.STATIC_DRAW);
  
    return {
      position: positionBuffer,
      normal: normalBuffer,
      textureCoord: textureCoordBuffer,
      indices: indexBuffer,
    };
  }
  