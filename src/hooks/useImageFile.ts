import { useEffect, useState } from "react";

import { downloadAndSaveFile, getFileFromStorage } from "src/utils/fileSystem";

export const useImageFile = (imageUrl: string) => {
  const [image, setImage] = useState<null | string>(null);
  useEffect(() => {
    const getFile = async () => {
      const dir = "images";
      const splittedUrl = imageUrl.split("/");
      const fileName = splittedUrl[splittedUrl.length - 1];
      const fileFromStorage = await getFileFromStorage(dir, fileName);
      if (fileFromStorage) {
        return setImage(fileFromStorage);
      }
      const downloadedFile = await downloadAndSaveFile(dir, fileName, imageUrl);
      if (downloadedFile) return setImage(downloadedFile);
    };
    if (imageUrl) getFile();
  }, [imageUrl]);

  return image;
};
