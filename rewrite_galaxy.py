import re
import os

filepath = r"c:\Users\lucas\.gemini\antigravity\scratch\Personal Website\src\pages\galaxy.astro"

with open(filepath, 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Update Headings and Titles
code = code.replace("P.WebGL Brain Network", "P.WebGL Galaxy Network")
code = code.replace("Mess with my brain", "Galactic Control Panel")
code = code.replace("# of Braincells", "Star Density")
code = code.replace("Trains of Thought", "Arm Spread")
code = code.replace("value=\"300\"", "value=\"50000\"")
code = code.replace("min=\"10\" max=\"1000\"", "min=\"5000\" max=\"100000\"")
code = code.replace("min=\"20\" max=\"250\"", "min=\"1\" max=\"10\"")
code = code.replace("value=\"100\"", "value=\"4\"")

# 2. Update Group Name
code = code.replace("const brainGroup = new THREE.Group();", "const galaxyGroup = new THREE.Group();")
code = code.replace("brainGroup.add(loadedModel);", "")
code = code.replace("scene.add(brainGroup);", "scene.add(galaxyGroup);")
code = code.replace("brainGroup.matrixWorld", "galaxyGroup.matrixWorld")

# 3. Add EVERYTHING to galaxyGroup instead of scene
code = code.replace("scene.add(coreMesh);", "galaxyGroup.add(coreMesh);")
code = code.replace("scene.add(catMeshRender);", "galaxyGroup.add(catMeshRender);")
code = code.replace("scene.add(leafMeshRender);", "galaxyGroup.add(leafMeshRender);")
code = code.replace("scene.add(mesh);", "galaxyGroup.add(mesh);") # For lines
code = code.replace("scene.add(coreReturnMesh);", "galaxyGroup.add(coreReturnMesh);")

# 4. Remove GLTF Loader and Layer 1
gltf_pattern = r"// THE EXPLICIT ASSET BRAIN BOUNDARY.*?// LAYER 2:"
code = re.sub(gltf_pattern, "// LAYER 2:", code, flags=re.DOTALL)
code = code.replace("import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';", "")

# 5. Remove shell opacity fading in animate()
shell_fade_pattern = r"// Faint down the Outer GLTF Biological Shell and slice it!.*?if \(window\.brainModelRef\) \{.*?\}"
code = re.sub(shell_fade_pattern, "", code, flags=re.DOTALL)

# 6. Update Density and Connection Labels
code = re.sub(r"function updateDensityLabel\(val\) \{.*?\}", """function updateDensityLabel(val) {
            if (val <= 20000) return "Sparse Cluster";
            if (val <= 40000) return "Dwarf Galaxy";
            if (val <= 60000) return "Spiral Galaxy";
            if (val <= 80000) return "Supermassive";
            return "Milky Way";
        }""", code, flags=re.DOTALL)

code = re.sub(r"function updateConnectionsLabel\(val\) \{.*?\}", """function updateConnectionsLabel(val) {
            if (val <= 2) return "Tight Spiral";
            if (val <= 5) return "Standard Arms";
            if (val <= 8) return "Loose Galaxy";
            return "Scattered Dust";
        }""", code, flags=re.DOTALL)

# 7. Rebuild Ambient Network with Galaxy Math
rebuild_pattern = r"function rebuildAmbientNetwork\(\) \{.*?\} // Initialize natively"
galaxy_math = """function rebuildAmbientNetwork() {
            if (ambientNodesMesh) { 
                galaxyGroup.remove(ambientNodesMesh); 
                clickableMeshes.splice(clickableMeshes.indexOf(ambientNodesMesh), 1);
                ambientNodesMesh.geometry.dispose(); 
                ambientNodesMesh.material.dispose(); 
            }
            if (pointGeoRef) pointGeoRef.dispose();
            
            const nodeCount = parseInt(sliderDensity.value);
            const armSpread = parseInt(sliderConnections.value);

            const positions = new Float32Array(nodeCount * 3);
            const colors = new Float32Array(nodeCount * 3);
            
            // Realistic Milky Way Colors
            const colorInside = new THREE.Color(0xfff1dc); // Warm bright core
            const colorOutside = new THREE.Color(0x1a2b5a); // Deep blue outer edge
            
            const radius = 600; // Large enough to encompass the existing Hubs
            const branches = 4; // 4 Main Spiral Arms
            const randomness = 0.25;
            const randomnessPower = 3;

            for (let i = 0; i < nodeCount; i++) {
                const i3 = i * 3;
                // Distribute more stars towards the core (Math.random() squared)
                const starRadius = Math.random() * Math.random() * radius;
                
                // Spin angle increases with distance
                const spinAngle = starRadius * (armSpread * 0.001);
                const branchAngle = ((i % branches) / branches) * Math.PI * 2;
                
                // Random scatter
                const randomX = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * starRadius;
                const randomY = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * starRadius;
                const randomZ = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * starRadius;

                // Flatten the Y axis to make it a galaxy disk!
                positions[i3] = Math.cos(branchAngle + spinAngle) * starRadius + randomX;
                positions[i3 + 1] = randomY * 0.15; // Extremely flat disk
                positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * starRadius + randomZ;
                
                // Color interpolation
                const mixedColor = colorInside.clone();
                mixedColor.lerp(colorOutside, starRadius / radius);
                
                colors[i3] = mixedColor.r;
                colors[i3 + 1] = mixedColor.g;
                colors[i3 + 2] = mixedColor.b;
            }

            pointGeoRef = new THREE.BufferGeometry();
            pointGeoRef.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            pointGeoRef.setAttribute('color', new THREE.BufferAttribute(colors, 3));
            
            const pointMat = new THREE.PointsMaterial({ 
                size: 2.5, 
                sizeAttenuation: true, 
                depthWrite: false, 
                blending: THREE.AdditiveBlending, 
                vertexColors: true,
                transparent: true,
                opacity: 0.9
            });
            
            ambientNodesMesh = new THREE.Points(pointGeoRef, pointMat);
            ambientNodesMesh.userData.isAmbient = true;
            galaxyGroup.add(ambientNodesMesh);
            clickableMeshes.push(ambientNodesMesh);
        }

        // Initialize natively"""

code = re.sub(rebuild_pattern, galaxy_math, code, flags=re.DOTALL)

# 8. Prevent Connection Lines between Nodes (Requested by user)
code = code.replace("createThickLine(hubCenter, catPos, hub.color, 1.8, 0.8, hub.id);", "// Lines disabled by request")
code = code.replace("createThickLine(catPos, itemPos, hub.color, 1.0, 0.6, hub.id);", "// Lines disabled by request")

# 9. Add Rotation Animation
code = code.replace("// Auto-rotation disabled for now by request.", "galaxyGroup.rotation.y -= 0.0005;")

# 10. Update Base Opacity for Ambient Nodes in Animate Loop
code = code.replace("baseTargetOpacity = mesh instanceof THREE.Points ? 0.5 : 0.25;", "baseTargetOpacity = mesh instanceof THREE.Points ? 0.9 : 0.0;")

# Fix any orphaned lines mesh removal inside rebuildAmbientNetwork just in case
code = code.replace("if (ambientLineMesh)", "/* if (ambientLineMesh) */")

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(code)
    
print("Rewrite successful")
