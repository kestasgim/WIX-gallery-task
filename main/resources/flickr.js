function flickr(query, imageFinder, gallery) {
  if (query) {
    let images;
    let apiKey = 'b394136d5dde8d9d0d4f8fc6685386e2';
    let flickrSearchURL = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key='
      + apiKey + '&tags=' + query + '&format=json&nojsoncallback=1';

    let httpRequest = new XMLHttpRequest();

    for (let i in imageFinder.httpRequests) {
      if (imageFinder.httpRequests[i].gallery === gallery) {
        imageFinder.httpRequests[i].requests.push(httpRequest);
      }
    }

    httpRequest.open("GET", flickrSearchURL, true);
    httpRequest.onload = function () {
      const httpResponseObject = JSON.parse(httpRequest.response);

      images = [];
      for (let i = 0; i < httpResponseObject.photos.photo.length; i++) {
        let image = {
          id: httpResponseObject.photos.photo[i].id,
          url: 'https://farm' + httpResponseObject.photos.photo[i].farm
            + '.staticflickr.com/' + httpResponseObject.photos.photo[i].server
            + '/' + httpResponseObject.photos.photo[i].id
            + '_' + httpResponseObject.photos.photo[i].secret
            + '.jpg',
          title: httpResponseObject.photos.photo[i].title
        }
        images.push(image);
      }
      imageFinder.onImagesReady(query, images, gallery);
    }
    httpRequest.send(null);
  }
}

//https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key={api_key}&tags={query}&nojsoncallback=1
//https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
//api_key: 'b394136d5dde8d9d0d4f8fc6685386e2'