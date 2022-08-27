import Resizer from "react-image-file-resizer";

const resizeFile = (file, maxWidth = 860, maxHeight = 860, quality = 100) => {
  const fileName = file.name;
  const fileExtension = fileName.slice(fileName.lastIndexOf(".") + 1);
  return new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      maxWidth,
      maxHeight,
      fileExtension,
      quality,
      0,
      (uri) => {
        resolve(uri);
      },
      "file"
    );
  });
};

export { resizeFile };
