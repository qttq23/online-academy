'use strict';


module.exports = function(Auth) {

  Auth.disableRemoteMethodByName('find');
  Auth.disableRemoteMethodByName('findById');
  Auth.disableRemoteMethodByName('create');
  Auth.disableRemoteMethodByName('prototype.patchAttributes');
  Auth.disableRemoteMethodByName('deleteById');



};
