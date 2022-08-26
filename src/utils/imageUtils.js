import Resizer from "react-image-file-resizer";

const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      860,
      860,
      "jpeg",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "file"
    );
  });

export { resizeFile };
