function static(query, imageFinder, gallery){
  
  let images;

  if (window.DATA.staticImagesDb && query) {
      
    images = (window.DATA.staticImagesDb.filter(item => item.title.includes(query))).map(function (image) {
      delete image.type;
      delete image.width;
      delete image.height;
      delete image.componentType;
      delete image.mediaType;
      delete image.iconUrl;
      delete image.originalFileName;
      return image;
    });

  }
  imageFinder.onImagesReady(query, images, gallery);
}