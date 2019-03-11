
//
// initBuffers
//
// Initialize the buffers we'll need. For this demo, we just
// have one object -- a simple three-dimensional cube.
//
function initBuffers6(gl, i) {
 
  
    const positionBuffer = gl.createBuffer();
  
  
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  
    // Now create an array of positions for the cube.
  
    const positions = [
       // Front face
  -0.30, -1.0,  2.0,
  0.30, -1.0,  2.0,
  0.30,  0.0,  2.0,
 -0.30,  0.0,  2.0,
 
 // Back face
 -0.30, -1.0, -2.0,
 -0.30,  0.0, -2.0,
  0.30,  0.0, -2.0,
  0.30, -1.0, -2.0,
 
 // Top face
 -0.30,  0.0, -2.0,
 -0.30,  0.0,  2.0,
  0.30,  0.0,  2.0,
  0.30,  0.0, -2.0,
 
 // Bottom face
 -0.30, -1.0, -2.0,
  0.30, -1.0, -2.0,
  0.30, -1.0,  2.0,
 -0.30, -1.0,  2.0,
 
 // Right face
  0.30, -1.0, -2.0,
  0.30,  0.0, -2.0,
  0.30,  0.0,  2.0,
  0.30, -1.0,  2.0,
 
 // Left face
 -0.30, -1.0, -2.0,
 -0.30, -1.0,  2.0,
 -0.30,  0.0,  2.0,
 -0.30,  0.0, -2.0,
    ];
    
    // Now pass the list of positions into WebGL to build the
    // shape. We do this by creating a Float32Array from the
    // JavaScript array, then use it to fill the current buffer.
  
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
  
    // Set up the normals for the vertices, so that we can compute lighting.
  
    const normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
  
    const vertexNormals = [
       // Front
     0.0,  0.0,  0.98,
     0.0,  0.0,  0.98,
     0.0,  0.0,  0.98,
     0.0,  0.0,  0.98,

    // Back
     0.0,  0.0, -0.98,
     0.0,  0.0, -0.98,
     0.0,  0.0, -0.98,
     0.0,  0.0, -0.98,

    // Top
     0.0,  0.99,  0.0,
     0.0,  0.99,  0.0,
     0.0,  0.99,  0.0,
     0.0,  0.99,  0.0,

    // Bottom
     0.0, -0.99,  0.0,
     0.0, -0.99,  0.0,
     0.0, -0.99,  0.0,
     0.0, -0.99,  0.0,

    // Right
     0.99,  0.0,  0.0,
     0.91,  0.0,  0.0,
     0.91,  0.0,  0.0,
     0.91,  0.0,  0.0,

    // Left
    -0.91,  0.0,  0.0,
    -0.91,  0.0,  0.0,
    -0.91,  0.0,  0.0,
    -0.91,  0.0,  0.0
    ];
  
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexNormals),
                  gl.STATIC_DRAW);
  
    // Now set up the texture coordinates for the faces.
  
    const textureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
  
    const textureCoordinates = [
      // Front
      0.0,  0.0,
      0.99,  0.99,
      0.0,  0.99,
      0.99,  0.0,
    // Back
    0.0,  0.0,
    0.99,  0.0,
    0.99,  0.99,
    0.0,  0.99,
    // Top
    0.0,  0.0,
    0.99,  0.0,
    0.99,  0.99,
    0.0,  0.99,
    // Bottom
    0.0,  0.0,
    0.0,  0.99,
    0.99,  0.0,
    0.99,  0.99,
    // Right
    0.0,  0.0,
    0.0,  0.99,
    0.98,  0.98,
    0.98,  0.0,
    // Left
    0.0,  0.0,
    0.98,  0.0,
    0.98,  0.98,
    0.0,  0.98,
     
    ];
  
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates),
                  gl.STATIC_DRAW);
  
    
    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  
   
    const indices = [
      0,  1,  2,      0,  2,  3,    // front
      4,  5,  6,      4,  6,  7,    // back
      8,  9,  10,     8,  10, 11,   // top
      12, 13, 14,     12, 14, 15,   // bottom
      16, 17, 18,     16, 18, 19,   // right
      20, 21, 22,     20, 22, 23,   // left  // left
    ];
  
  
  
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
        new Uint16Array(indices), gl.STATIC_DRAW);
  
    return {
      position: positionBuffer,
      normal: normalBuffer,
      textureCoord: textureCoordBuffer,
      indices: indexBuffer,
    };
  }
  