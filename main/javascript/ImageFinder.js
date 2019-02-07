(function () {

  var ImageFinder = window.CLASSES.ImageFinder = function () { };

  ImageFinder.prototype.httpRequests = [];

  ImageFinder.prototype.onImagesReady = function (query, images, gallery) {
    gallery._onSearchResultReady({ query: query, images });
  }

  ImageFinder.prototype.search = function (query, moduleId, gallery) {

    let searchModules = [
      { id: 'static', searchFunction: static },
      { id: 'flickr', searchFunction: flickr },
    ];

    let searchFlag = false;
    for (let i in this.httpRequests) {
      if (this.httpRequests[i].gallery == gallery) {
        if(this.httpRequests[i].requests){
          this.httpRequests[i].requests.forEach( function (request) {
            request.abort();
          })
        }
        searchFlag = true;
      }
    }
    if (!searchFlag) {
      this.httpRequests.push({ gallery: gallery, requests: [] });
    }

    let searchModule = searchModules.find(searchModule => searchModule.id === moduleId);

    if (searchModule) {
      searchModule.searchFunction(query, this, gallery);
    } else {
      throw new Error('Search module has not been found!');
    }
  }
})();