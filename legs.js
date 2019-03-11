
//
// initBuffers
//
// Initialize the buffers we'll need. For this demo, we just
// have one object -- a simple three-dimensional cube.
//
function initBuffers10(gl, i) {
 

    // const texture = loadTexture(gl, 'track.png');
    // Create a buffer for the cube's vertex positions.
  
    const positionBuffer = gl.createBuffer();
  
    // Select the positionBuffer as the one to apply buffer
    // operations to from here out.
  
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
     angle = 0;
    const  pi = 3.14;
     diff = (2 * pi) / 12;
     cur = 0;
     radius = 0.5;
    //  var positions = []  ;
    // Now create an array of positions for the cube.
    // for(i=0;i<12;i++){
        
    //         //Origin
    //         positions[cur++] = 0.0;
    //         positions[cur++] = 0.0;
    //         positions[cur++] = 0.0;

    //         //Point with lower angle
    //         positions[cur++] = radius * Math.cos(angle);
    //         positions[cur++] = radius * Math.sin(angle);
    //         positions[cur++] = 0;

    //         //Point with higher angle
    //         angle += diff;
    //         positions[cur++] = radius * Math.cos(angle);
    //         positions[cur++] = radius * Math.sin(angle);
    //         positions[cur++] = 0;
    // }
    const positions = [
        -0.05, -1.0,  -0.54,
        -0.05,  -0.8,  -0.54,
        0.05,  -0.8,  -0.54,
        0.05, -1.0,  -0.54,
       
       // Back face
       -0.05, -1.0, -0.56,
       -0.05,  -0.8, -0.56,
        0.05,  -0.8, -0.56,
        0.05, -1.0, -0.56,
       
       // Top face
       -0.05,  -0.8, -0.56,
       -0.05,  -0.8,  -0.54,
        0.05,  -0.8,  -0.54,
        0.05,  -0.8, -0.56,
       
       // Bottom face
       -0.05, -1.0, -0.56,
        0.05, -1.0, -0.56,
        0.05, -1.0,  -0.54,
       -0.05, -1.0,  -0.54,
       
       // Right face
        0.05, -1.0, -0.56,
        0.05,  -0.8, -0.56,
        0.05,  -0.8,  -0.54,
        0.05, -1.0,  -0.54,
       
       // Left face
       -0.05, -1.0, -0.56,
       -0.05, -1.0,  -0.54,
       -0.05,  -0.5,  -0.56,
       -0.05,  -0.5, -0.54,
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
       0.0,  0.0,  0.10,
       0.0,  0.0,  0.10,
       0.0,  0.0,  0.10,
       0.0,  0.0,  0.10,
  
      // Back
       0.0,  0.0, -0.10,
       0.0,  0.0, -0.10,
       0.0,  0.0, -0.10,
       0.0,  0.0, -0.10,
  
      // Top
      -0.10, -0.10,  0.0,
      -0.10, -0.10,  0,
      -0.10, -0.10,  0,
      -0.10, -0.10, 0,
      // Bottom
       0.0, -0.10,  0.0,
       0.0, -0.10,  0.0,
       0.0, -0.10,  0.0,
       0.0, -0.10,  0.0,
  
      // Right
       0.10,  -0.10,  0.0,
       0.10,  -0.10,  0.0,
       0.10,  -0.10,  0.0,
       0.10,  -0.10,  0.0,
  
      // Left
      -0.10,  0.0,  0.0,
      -0.10,  0.0,  0.0,
      -0.10,  0.0,  0.0,
      -0.10,  0.0,  0.0
    ];
  
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexNormals),
                  gl.STATIC_DRAW);
  
    // Now set up the texture coordinates for the faces.
  
    const textureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
  
    const textureCoordinates = [
         // Front
      0.0,  0.0,
      0.94,  0.94,
      0.0,  0.94,
      0.94,  0.0,
    // Back
    0.0,  0.0,
    0.97,  0.0,
    0.97,  0.97,
    0.0,  0.97,
    // Top
    0.0,  0.0,
    0.97,  0.0,
    0.97,  0.97,
    0.0,  0.97,
    // Bottom
    0.0,  0.0,
    0.0,  0.95,
    0.95,  0.0,
    0.95,  0.95,
    // Right
    0.0,  0.0,
    0.0,  0.96,
    0.96,  0.96,
    0.96,  0.0,
    // Left
    0.0,  0.0,
    0.99,  0.0,
    0.99,  0.99,
    0.0,  0.99,

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
  