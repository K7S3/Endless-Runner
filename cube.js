
//
// initBuffers
//
// Initialize the buffers we'll need. For this demo, we just
// have one object -- a simple three-dimensional cube.
//
function initBuffers(gl, i) {
 

  // const texture = loadTexture(gl, 'track.png');
  // Create a buffer for the cube's vertex positions.

  const positionBuffer = gl.createBuffer();

  // Select the positionBuffer as the one to apply buffer
  // operations to from here out.

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // Now create an array of positions for the cube.

  const positions = [
    // Front face
    -1.0, -1.0,  1.0,
     1.0, -1.0,  1.0,
     1.0,  1.0,  1.0,
    -1.0,  1.0,  1.0,

    // Back face
    -1.0, -1.0, -1.0,
    -1.0,  1.0, -1.0,
     1.0,  1.0, -1.0,
     1.0, -1.0, -1.0,

    // Top face
    -3.0, -1.0, -1.0,
     -1.0, -1.0, -1.0,
     -1.0, -1.0,  1.0,
    -3.0, -1.0,  1.0,

    // Bottom face
    -1.0, -1.0, -1.0,
     1.0, -1.0, -1.0,
     1.0, -1.0,  1.0,
    -1.0, -1.0,  1.0,

    // Right face
    1.0, -1.0, -1.0,
    3.0, -1.0, -1.0,
    3.0, -1.0,  1.0,
    1.0, -1.0,  1.0,

    // Left face
    -1.0, -1.0, -1.0,
    -1.0, -1.0,  1.0,
    -1.0,  1.0,  1.0,
    -1.0,  1.0, -1.0,
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
    -0.98, -0.98,  0.0,
    -0.98, -0.98,  0,
    -0.98, -0.98,  0,
    -0.98, -0.98, 0,
    // Bottom
     0.0, -0.92,  0.0,
     0.0, -0.92,  0.0,
     0.0, -0.92,  0.0,
     0.0, -0.92,  0.0,

    // Right
     0.92,  -0.92,  0.0,
     0.92,  -0.92,  0.0,
     0.92,  -0.92,  0.0,
     0.92,  -0.92,  0.0,

    // Left
    -0.92,  0.0,  0.0,
    -0.92,  0.0,  0.0,
    -0.92,  0.0,  0.0,
    -0.92,  0.0,  0.0
  ];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexNormals),
                gl.STATIC_DRAW);

  // Now set up the texture coordinates for the faces.

  const textureCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);

  const textureCoordinates = [
    // Front
    0.0,  0.0,
    0.99,  0.0,
    0.99,  0.99,
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
    0.0,  0.98,
    // Bottom
    0.0,  0.0,
    0.98,  0.0,
    0.98,  0.98,
    0.0,  0.98,
    // Right
    0.0,  0.0,
    0.98,  0.0,
    0.98,  0.98,
    0.0,  0.98,
    // Left
    0.0,  0.0,
    0.98,  0.0,
    0.98,  0.98,
    0.0,  0.98,
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
   
    8,  9,  10,     8,  10, 11,   // top
    12, 13, 14,     12, 14, 15,   // bottom
    16, 17, 18,     16, 18, 19,   // right
  
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
