import * as FileSystem from 'expo-file-system';

export const getFileFromStorage = async (dir: string, fileName: string) => {
  try {
    const fileInfo = await FileSystem.getInfoAsync(
      FileSystem.documentDirectory + dir + "/" + fileName,
    );
    if (fileInfo.exists && !fileInfo.isDirectory) {
      return fileInfo.uri;
    }
    return null;
  } catch (e) {
    console.log(e);
  }
}

export const downloadAndSaveFile = async (dir: string, fileName: string, fileUrl: string) => {
  try {
    const directoryInfo = await FileSystem.getInfoAsync(
      FileSystem.documentDirectory! + dir,
    );

    if (!directoryInfo.exists) {
      await FileSystem.makeDirectoryAsync(
        FileSystem.documentDirectory! + dir,
        {
          intermediates: true,
        },
      );
    }
    
    await FileSystem.downloadAsync(
      fileUrl,
      FileSystem.documentDirectory! + dir + "/" + fileName,
    );
    const fileInfo = await FileSystem.getInfoAsync(
      FileSystem.documentDirectory + dir + "/" + fileName,
    );
    return fileInfo.uri;
  } catch (e) {
    console.log(e);
  }
}