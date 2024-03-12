import * as FileSystem from "expo-file-system";
import { useEffect, useMemo, useState, type FC } from "react";
import { useImageFile } from "src/hooks/useImageFile";
import { Route } from "src/services/rocks";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

type RockProps = {
  route: Route;
};

const ModelRoute: FC<RockProps> = ({ route }) => {
  const modelFileUri = useImageFile(modelUrl);
  const [modelBuffer, setModelBuffer] = useState<string>();
  const materialFileUri = useImageFile(materialUrl);
  const [textureBuffer, setTextureBuffer] = useState<string>();

  useEffect(() => {
    const loadBuffer = async () => {
      if (!modelFileUri) return;
      const modelBuffer = await FileSystem.readAsStringAsync(modelFileUri);
      setModelBuffer(modelBuffer);
    };
    loadBuffer();
  }, [modelFileUri]);

  const parsedModel = useMemo(() => {
    if (!modelBuffer) return null;
    const loader = new OBJLoader();
    const parsedModel = loader.parse(modelBuffer);
    return parsedModel;
  }, [modelBuffer]);

  useEffect(() => {
    const loadTexture = async () => {
      if (!materialFileUri) return;
      const parsedTexture = await FileSystem.readAsStringAsync(
        materialFileUri,
        { encoding: FileSystem?.EncodingType?.Base64 },
      );
      setTextureBuffer(parsedTexture);
    };
    loadTexture();
  }, [materialFileUri]);

  const texture = useMemo(() => {
    if (!materialFileUri) return;
    const loader = new THREE.TextureLoader();
    const texture = loader.load(materialFileUri);
    return texture;
  }, [materialFileUri]);

  if (!parsedModel || !texture) return null;

  parsedModel.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.material.map = texture;
    }
  });

  return (
    <mesh>
      <primitive object={parsedModel}></primitive>
    </mesh>
  );
};

export default ModelRoute;
