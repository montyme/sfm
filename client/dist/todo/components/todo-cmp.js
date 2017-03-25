"use strict";var __decorate=this&&this.__decorate||function(e,t,o,i){var s,n=arguments.length,r=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,o,i);else for(var c=e.length-1;c>=0;c--)(s=e[c])&&(r=(n<3?s(r):n>3?s(t,o,r):s(t,o))||r);return n>3&&r&&Object.defineProperty(t,o,r),r},__metadata=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(exports,"__esModule",{value:!0});var core_1=require("@angular/core"),todo_service_1=require("../services/todo-service"),geolocation_service_1=require("../services/geolocation-service");require("aws-sdk/dist/aws-sdk");var TodoCmp=function(){function e(e,t){this._todoService=e,this.geolocation=t,this.title="UNAUTHORIZED SFMOMA SHOW",this.file_url="",this.inmoma=!1,this.submiting=!1,this.viewing=!1,this.todos=[],this.isClassVisible=!1,this.center="Undisclosed Location",this.todoForm={todoMessage:""}}return e.prototype.ngOnInit=function(){this._getAll(),this.getCurrentPosition()},e.prototype._getAll=function(){var e=this;this._todoService.getAll().subscribe(function(t){e.todos=t})},e.prototype.fileEvent=function(e){var t=e.target.files,o=t[0];this.file=o,console.log("Selected file: ",this.file)},e.prototype.submit=function(){this.submiting=!0,this.viewing=!1,this.isClassVisible=!0},e.prototype.view=function(){this.submiting=!1,this.viewing=!0,this.isClassVisible=!0},e.prototype.reset=function(){this.submiting=!1,this.viewing=!1,this.isClassVisible=!1},e.prototype.add=function(e){var t=window.AWS;console.log(t);var o=this.file;t.config.accessKeyId="AKIAJGBCGJ455OKL6PIQ",t.config.secretAccessKey="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";var i=new t.S3({params:{Bucket:"sfmomashow"}}),s={Key:o.name,Body:o},n=this;i.upload(s,function(t,o){t?console.log("error: ",t):(console.log("response: ",o),e.file_url=o.Location,n._todoService.add(e).subscribe(function(e){n.todos=e,n.view()}))})},e.prototype.remove=function(e){var t=this;this._todoService.remove(e).subscribe(function(){t.todos.forEach(function(o,i){if(o._id===e)return t.todos.splice(i,1)})})},e.prototype.getCurrentPosition=function(){var e=this;this.located=!1,this.warning=!1,this.message="",navigator.geolocation?(console.log("Getting position"),this.geolocation.getCurrentPosition().forEach(function(t){e.center=t.coords.latitude+", "+t.coords.longitude,e.zoom="11",e.message="",e.warning=!1,e.located=!0,e.distance=e.getDistance(t.coords.latitude,t.coords.longitude,"37.785665","-122.400502"),e.distance<145e3&&(e.inmoma=!0)},null).then(function(){return console.log("Geolocation service: completed.")})["catch"](function(t){if(t.code>0){switch(t.code){case t.PERMISSION_DENIED:e.message="permission denied";break;case t.POSITION_UNAVAILABLE:e.message="position unavailable";break;case t.TIMEOUT:e.message="position timeout"}e.warning=!0}})):(this.message="browser doesn't support geolocation",this.warning=!0)},e.prototype.getDistance=function(e,t,o,i){var s=.017453292519943295,n=Math.cos,r=.5-n((o-e)*s)/2+n(e*s)*n(o*s)*(1-n((i-t)*s))/2;return 12742*Math.asin(Math.sqrt(r))},e}();TodoCmp=__decorate([core_1.Component({selector:"todo-cmp",templateUrl:"todo/templates/todo.html",styleUrls:["todo/styles/todo.css"]}),__metadata("design:paramtypes",[todo_service_1.TodoService,geolocation_service_1.GeolocationService])],TodoCmp),exports.TodoCmp=TodoCmp;