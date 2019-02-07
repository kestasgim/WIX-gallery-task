function static(query, imageFinder, gallery){
  
  let images;

  if (window.DATA.staticImagesDb && query) {
      
    //Task 1 solution 1:
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

    //Task 1 solution 2:
    // images = [];
    // for (let i = 0; i < window.DATA.staticImagesDb.length; i++) {
    //   if (window.DATA.staticImagesDb[i].title.includes(query)) {
    //     let image = {
    //       id: window.DATA.staticImagesDb[i].id,
    //       url: window.DATA.staticImagesDb[i].url,
    //       title: window.DATA.staticImagesDb[i].title
    //     }
    //     images.push(image);
    //   }
    // }

  }
  imageFinder.onImagesReady(query, images, gallery);
}