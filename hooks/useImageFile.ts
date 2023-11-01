import {useEffect, useState} from 'react';

import { downloadAndSaveFile, getFileFromStorage } from '../utils/fileSystem';
import { apiUrl } from '../services/apiConfig';

export const useImageFile = (imageUrl: string) => {
  const [image, setImage] = useState<null | string>(null);
  useEffect(() => {
    const getFile = async () => {
      const fileName = imageUrl.split("/")[2];
      const dir = imageUrl.split("/")[1];
      const fileUrl = `${apiUrl}${imageUrl}`;
      const fileFromStorage = await getFileFromStorage(dir, fileName)
      if (fileFromStorage) {
        return setImage(fileFromStorage);
      }
      const downloadedFile = await downloadAndSaveFile(dir, fileName, fileUrl)
      if (downloadedFile) return setImage(downloadedFile);
    };
    if (imageUrl) getFile();
  }, [imageUrl])

  return image;
}