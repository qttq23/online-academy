'use strict';



module.exports = function(Video) {

  // limit: only read, create
  Video.disableRemoteMethodByName('prototype.patchAttributes')
  Video.disableRemoteMethodByName('deleteById')


  // validation



  // middleware
  // define in route



};
