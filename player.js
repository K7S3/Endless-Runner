
//
// initBuffers
//
// Initialize the buffers we'll need. For this demo, we just
// have one object -- a simple three-dimensional cube.
//
function initBuffers4(gl, i) {
 

    // const texture = loadTexture(gl, 'track.png');
    // Create a buffer for the cube's vertex positions.
  
    const positionBuffer = gl.createBuffer();
  
    // Select the positionBuffer as the one to apply buffer
    // operations to from here out.
  
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  
    // Now create an array of positions for the cube.
  
    const positions = [
  //    // Front face
  // -0.05, -0.5,  -0.30,
  //  0.05, -0.5,  -0.30,
  //  0.05,  -0.35,  -0.30,
  // 0.05,  -0.35,  -0.30,
  
  // // Back face
  // -0.05, -0.5, -0.55,
  // -0.05,  -0.35, -0.55,
  //  0.05,  -0.35, -0.55,
  //  0.05, -0.5, -0.55,
  
  // // Top face
  // -0.05,  -0.35, -0.55,
  // -0.05,  -0.35,  -0.30,
  //  0.05,  -0.35,  -0.30,
  //  0.05,  -0.35, -0.55,
  
  // // Bottom face
  // -0.05, -0.5, -0.55,
  //  0.05, -0.5, -0.55,
  //  0.05, -0.5,  -0.30,
  // -0.05, -0.5,  -0.30,
  
  // // Right face
  //  0.05, -0.5, -0.55,
  //  0.05,  -0.35, -0.55,
  //  0.05,  -0.35,  -0.30,
  //  0.05, -0.5,  -0.30,
  
  // // Left face
  // -0.05, -0.5, -0.55,
  // -0.05, -0.5,  -0.30,
  // -0.05,  -0.35,  -0.30,
  // -0.05,  -0.35, -0.55,

  //dada
   // Front face
   -0.15, -0.8,  -0.5,
   0.15, -0.8,  -0.5,
   0.15,  -0.5,  -0.5,
  0.15,  -0.5,  -0.5,
  
  // Back face
  -0.15, -0.8, -0.6,
  -0.15,  -0.5, -0.6,
   0.15,  -0.5, -0.6,
   0.15, -0.8, -0.6,
  
  // Top face
  -0.15,  -0.5, -0.6,
  -0.15,  -0.5,  -0.5,
   0.15,  -0.5,  -0.5,
   0.15,  -0.5, -0.6,
  
  // Bottom face
  -0.15, -0.8, -0.6,
   0.15, -0.8, -0.6,
   0.15, -0.8,  -0.5,
  -0.15, -0.8,  -0.5,
  
  // Right face
   0.15, -0.8, -0.6,
   0.15,  -0.5, -0.6,
   0.15,  -0.5,  -0.5,
   0.15, -0.8,  -0.5,
  
  // Left face
  -0.15, -0.8, -0.6,
  -0.15, -0.8,  -0.5,
  -0.15,  -0.5,  -0.5,
  -0.15,  -0.5, -0.6,
];
    
    // Now pass the list of positions into WebGL to build the
    // shape. We do this by creating a Float32Array from the
    // JavaScript array, then use it to fill the current buffer.
  
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
  
    // Set up the normals for the vertices, so that we can compute lighting.
  
    const normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
  
    const vertexNormals = [
    //  // Front
    //  0.0,  0.0,  1.0,
    //  0.0,  0.0,  1.0,
    //  0.0,  0.0,  1.0,
    //  0.0,  0.0,  1.0,

    // // Back
    //  0.0,  0.0, -1.0,
    //  0.0,  0.0, -1.0,
    //  0.0,  0.0, -1.0,
    //  0.0,  0.0, -1.0,

    // // Top
    //  0.0,  1.0,  0.0,
    //  0.0,  1.0,  0.0,
    //  0.0,  1.0,  0.0,
    //  0.0,  1.0,  0.0,

    // // Bottom
    //  0.0, -1.0,  0.0,
    //  0.0, -1.0,  0.0,
    //  0.0, -1.0,  0.0,
    //  0.0, -1.0,  0.0,

    // // Right
    //  1.0,  0.0,  0.0,
    //  1.0,  0.0,  0.0,
    //  1.0,  0.0,  0.0,
    //  1.0,  0.0,  0.0,

    // // Left
    // -1.0,  0.0,  0.0,
    // -1.0,  0.0,  0.0,
    // -1.0,  0.0,  0.0,
    // -1.0,  0.0,  0.0,
    // // Front
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
    0.0,  0.98,  0.0,
    0.0,  0.98,  0.0,
    0.0,  0.98,  0.0,
    0.0,  0.97,  0.0,

   // Bottom
    0.0, -0.97,  0.0,
    0.0, -0.97,  0.0,
    0.0, -0.97,  0.0,
    0.0, -0.97,  0.0,

   // Right
    0.97,  0.0,  0.0,
    0.97,  0.0,  0.0,
    0.97,  0.0,  0.0,
    0.97,  0.0,  0.0,

   // Left
   -0.97,  0.0,  0.0,
   -0.97,  0.0,  0.0,
   -0.97,  0.0,  0.0,
   -0.97,  0.0,  0.0


    ];
  
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexNormals),
                  gl.STATIC_DRAW);
  
    // Now set up the texture coordinates for the faces.
  
    const textureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
  
    const textureCoordinates = [
      //    // Front
      // 0.0,  0.0,
      // 0.97,  0.0,
      // 0.97,  0.97,
      // 0.0,  0.97,
      // // Back
      // 0.0,  0.0,
      // 0.97,  0.0,
      // 0.97,  0.97,
      // 0.0,  0.97,
      // // Top
      // 0.0,  0.0,
      // 1.0,  0.0,
      // 1.0,  1.0,
      // 0.0,  1.0,
      // // Bottom
      // 0.0,  0.0,
      // 1.0,  0.0,
      // 1.0,  1.0,
      // 0.0,  1.0,
      // // Right
      // 0.0,  0.0,
      // 1.0,  0.0,
      // 1.0,  1.0,
      // 0.0,  1.0,
      // // Left
      // 0.0,  0.0,
      // 1.0,  0.0,
      // 1.0,  1.0,
      // 0.0,  1.0,
      // // Front
      0.0,  0.0,
      0.97,  0.0,
      0.97,  0.97,
      0.0,  0.99,
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
      0.99,  0.0,
      0.99,  0.99,
      0.0,  0.99,
      // Right
      0.0,  0.0,
      0.99,  0.0,
      0.99,  0.91,
      0.0,  0.96,
      // Left
      0.0,  0.0,
      0.96,  0.0,
      0.96,  0.96,
      0.0,  0.96,
    ];
  
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates),
                  gl.STATIC_DRAW);
  
    // Build the element array buffer; this specifies the indices
    // into the vertex arrays for each face's vertices.
  
    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  
    // This array defines each face as two triangles, using the
    // indices into the vertex array to specify each triangle's
    // position.
  
    const indices = [
        0,  1,  2,      0,  2,  3,    // front
    4,  5,  6,      4,  6,  7,    // back
    8,  9,  10,     8,  10, 11,   // top
    12, 13, 14,     12, 14, 15,   // bottom
    16, 17, 18,     16, 18, 19,   // right
    20, 21, 22,     20, 22, 23,   // left   // left
      // 24,  25,  26,      24,  26,  27,    // front
      // 28,  29,  30,      28,  30,  31,    // back
      // 32,  33,  34,     32,  34, 35,   // top
      // 36, 37, 38,     36, 38, 39,   // bottom
      // 40, 41, 42,     40, 42, 43,   // right
      // 44, 45, 46,     44, 46, 47,
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
  