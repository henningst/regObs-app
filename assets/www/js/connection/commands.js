var SendInPictureCommand,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

SendInPictureCommand = (function() {

  function SendInPictureCommand(picture) {
    this.picture = picture;
    this.gotFile = __bind(this.gotFile, this);
    this.gotFileEntry = __bind(this.gotFileEntry, this);
    this.gotFS = __bind(this.gotFS, this);
    this.send = __bind(this.send, this);
    console.log("createing send in picture command");
  }

  SendInPictureCommand.prototype.send = function() {
    console.log("sending picture");
    return window.resolveLocalFileSystemURI(this.picture.PictureImage, this.gotFileEntry, this.fail);
  };

  SendInPictureCommand.prototype.gotFS = function(fileSystem) {
    var url;
    console.log("got file system");
    url = this.picture.PictureImage;
    console.log("getting file " + url);
    return fileSystem.root.getFile(url, {}, this.gotFileEntry, this.fail);
  };

  SendInPictureCommand.prototype.gotFileEntry = function(fileEntry) {
    console.log("got file entry");
    return fileEntry.file(this.gotFile, this.fail);
  };

  SendInPictureCommand.prototype.gotFile = function(file) {
    var reader,
      _this = this;
    console.log("got file");
    reader = new FileReader();
    reader.onloadend = function(evt) {
      _this.picture.PictureImage = evt.target.result.substring(23);
      return SendObjectToServer(_this.picture);
    };
    return reader.readAsDataURL(file);
  };

  SendInPictureCommand.prototype.fail = function(e) {
    var k, v;
    console.log("sending in picture failed:");
    for (k in e) {
      v = e[k];
      console.log(k + " -> " + v);
    }
    return console.log("value of secur err " + FileError.SECURITY_ERR + " not found err " + FileError.NOT_FOUND_ERR);
  };

  return SendInPictureCommand;

})();
