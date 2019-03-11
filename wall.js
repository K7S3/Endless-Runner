
//
// initBuffers
//
// Initialize the buffers we'll need. For this demo, we just
// have one object -- a simple three-dimensional cube.
//
function initBuffers2(gl, i) {
 

    // const texture = loadTexture(gl, 'track.png');
    // Create a buffer for the cube's vertex positions.
  
    const positionBuffer = gl.createBuffer();
  
    // Select the positionBuffer as the one to apply buffer
    // operations to from here out.
  
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  
    // Now create an array of positions for the cube.
  
    const positions = [
      // Front face
      -1.22, -1.22,  1.22,
       1.22, -1.22,  1.22,
       1.24,  1.24,  1.24,
      -1.24,  1.24,  1.24,
  
      // Back face
      -1.24, -1.24, -1.24,
      -1.24,  1.24, -1.24,
       1.24,  1.24, -1.24,
       1.24, -1.24, -1.24,
  
      // Top face
      -3.0, -1.24, -1.24,
       -1.24, -1.24, -1.24,
       -1.24, -1.24,  1.24,
      -3.0, -1.24,  1.248,
  
      // Bottom face
      -1.248, -1.248, -1.248,
       1.248, -1.248, -1.248,
       1.248, -1.248,  1.248,
      -1.248, -1.248,  1.248,
  
        // Left face
        3.0, -1.0, -1.0,
        3.0, -1.0,  1.0,
        3.0,  1.0,  1.0,
        3.0,  1.0, -1.0,
  
      // Left face
      -3.0, -1.0, -1.0,
      -3.0, -1.0,  1.0,
      -3.0,  1.0,  1.0,
      -3.0,  1.0, -1.0,
    ];
    console.log('sfkjf');
    // Now pass the list of positions into WebGL to build the
    // shape. We do this by creating a Float32Array from the
    // JavaScript array, then use it to fill the current buffer.
  
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
  
    // Set up the normals for the vertices, so that we can compute lighting.
  
    const normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
  
    const vertexNormals = [
      // Front
       0.0,  0.0,  1.0,
       0.0,  0.0,  1.0,
       0.0,  0.0,  1.0,
       0.0,  0.0,  1.0,
  
      // Back
       0.0,  0.0, -1.0,
       0.0,  0.0, -1.0,
       0.0,  0.0, -1.0,
       0.0,  0.0, -1.0,
  
      // Top
      -1.0, -1.0,  0.0,
      -1.0, -1.0,  0,
      -1.0, -1.0,  0,
      -1.0, -1.0, 0,
      // Bottom
       0.0, -1.0,  0.0,
       0.0, -1.0,  0.0,
       0.0, -1.0,  0.0,
       0.0, -1.0,  0.0,
  
      // Right
       1.0,  0.0,  0.0,
       1.0,  0.0,  0.0,
       1.0,  0.0,  0.0,
       1.0,  0.0,  0.0,
  
      // Left
      -1.0,  0.0,  0.0,
      -1.0,  0.0,  0.0,
      -1.0,  0.0,  0.0,
      -1.0,  0.0,  0.0
    ];
  
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexNormals),
                  gl.STATIC_DRAW);
  
    // Now set up the texture coordinates for the faces.
  
    const textureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
  
    const textureCoordinates = [
      // Front
      0.0,  0.0,
      0.97,  0.0,
      0.97,  0.97,
      0.0,  0.97,
      // Back
      0.0,  0.0,
      0.97,  0.0,
      0.97,  0.97,
      0.0,  0.97,
      // Top
      0.0,  0.0,
      0.97,  0.0,
      0.99,  0.99,
      0.0,  0.99,
      // Bottom
      0.0,  0.0,
      0.99,  0.0,
      0.95,  0.95,
      0.0,  0.95,
      // Right
      0.0,  0.0,
      0.95,  0.0,
      0.95,  0.95,
      0.0,  0.95,
      // Left
      0.0,  0.0,
      0.95,  0.0,
      0.95,  0.95,
      0.0,  0.95,
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

      16, 17, 18,     16, 18, 19,   // right
      20, 21, 22,     20, 22, 23,   // left
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
  