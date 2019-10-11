import { Platform } from 'react-native';

// export const createImageFormData = (imageType, photo, body) => {
//   const { fileName, type, uri } = photo;
//   const data = new FormData();

//   data.append(imageType, {
//     name: fileName && fileName.length ? fileName : 'image.jpg',
//     type: type,
//     uri: Platform.OS === 'android' ? uri : uri.replace('file://', '')
//   });

//   if (body) {
//     Object.keys(body).forEach(key => {
//       data.append(key, body[key]);
//     });
//   }

//   return data;
// };

export const createImageFormData = (imageType, image) => {
  const { uri, name, filename } = image;

  let data = new FormData();
  data.append(imageType, {
    uri,
    name: name ? name : imageType + '.png',
    filename: filename ? filename : imageType + '.png',
    type: 'image/png'
  });
  data.append('Content-Type', 'image/png');

  return data;
};
