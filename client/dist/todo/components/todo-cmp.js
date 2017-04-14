"use strict";var __decorate=this&&this.__decorate||function(t,e,o,i){var s,n=arguments.length,r=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,o,i);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(r=(n<3?s(r):n>3?s(e,o,r):s(e,o))||r);return n>3&&r&&Object.defineProperty(e,o,r),r},__metadata=this&&this.__metadata||function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};Object.defineProperty(exports,"__esModule",{value:!0});var core_1=require("@angular/core"),todo_service_1=require("../services/todo-service"),geolocation_service_1=require("../services/geolocation-service");require("aws-sdk/dist/aws-sdk");var TodoCmp=function(){function t(t,e,o){this._todoService=t,this.geolocation=e,this.zone=o,this.title="UNAUTHORIZED SFMOMA SHOW",this.about=!1,this.submiting=!1,this.currentpast=!1,this.menuopen=!1,this.toobig=!1,this.file_url="",this.warning=!0,this.located=!1,this.inmoma=!1,this.count=0,this.item={todoMessage:0,createdAt:0,todoArtwork:0,todoDate:0,todoMedium:0,todoSize:0,todoArtist:0,todoEmail:0,file_url:0},this.viewing=!1,this.message="Please, allow location access to Unauthorized SFMOMA Show in order to confirm that you are currently at SFMOMA.",this.todos=[],this.isClassVisible=!1,this.center="Undisclosed Location",this.todoForm={todoMessage:""}}return t.prototype.ngOnInit=function(){this._getAll()},t.prototype._getAll=function(){var t=this;this._todoService.getAll().subscribe(function(e){console.log("Todos: ",e),t.zone.run(function(){console.log("Got item: ",e),t.all=e.item;for(var o=t.all.length-1;o>=0;o--)t.all[o]=t.all[o],t.all[o].prev=t.all[o-1];t.all=t.all.slice(1),t.item=e.item[0],t.count=e.count})})},t.prototype.fileEvent=function(t){var e=t.target.files,o=e[0];this.file=o,console.log("Selected file: ",this.file),this.file.size>2097152?(console.log("file too big! Max 2MB"),this.toobig=!0):this.toobig=!1},t.prototype.togglemenu=function(){this.menuopen?this.menuopen=!1:this.menuopen=!0},t.prototype.abouttoggle=function(){this.currentpast=!1,this.about=!0,this.submiting=!1,this.viewing=!1,this.isClassVisible=!0,this.menuopen&&(this.menuopen=!1)},t.prototype.pasttoggle=function(){this._getAll(),this.currentpast=!0,this.about=!1,this.submiting=!1,this.viewing=!1,this.isClassVisible=!0,this.menuopen&&(this.menuopen=!1)},t.prototype.submit=function(){this.currentpast=!1,this.about=!1,this.submiting=!1,this.viewing=!1,this.isClassVisible=!0,this.menuopen&&(this.menuopen=!1)},t.prototype.view=function(){this._getAll(),this.getCurrentPosition(),this.currentpast=!1,this.about=!1,this.submiting=!1,this.viewing=!0,this.isClassVisible=!0,this.menuopen&&(this.menuopen=!1)},t.prototype.reset=function(){this._getAll(),this.about=!1,this.currentpast=!1,this.submiting=!1,this.viewing=!1,this.isClassVisible=!1,this.menuopen&&(this.menuopen=!1)},t.prototype.add=function(t){this.submiting=!0;var e=window.AWS;console.log(e);var o=this.file;e.config.accessKeyId="AKIAJGBCGJ455OKL6PIQ",e.config.secretAccessKey="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";var i=new e.S3({params:{Bucket:"sfmomashow"}}),s=new Date,n=s.getTime(),r={Key:n+o.name,Body:o},a=this;i.upload(r,function(e,o){e?console.log("error: ",e):(console.log("response: ",o),t.file_url=o.Location,a._todoService.add(t).subscribe(function(t){console.log("m: ",t),a.zone.run(function(){console.log("added: ",t),a.item=t,a.pasttoggle(),a.submiting=!1})}))})},t.prototype.remove=function(t){var e=this;this._todoService.remove(t).subscribe(function(){e.todos.forEach(function(o,i){if(o._id===t)return e.todos.splice(i,1)})})},t.prototype.getCurrentPosition=function(){var t=this;this.message="",navigator.geolocation?(console.log("Getting position"),this.geolocation.getCurrentPosition().forEach(function(e){t.center=e.coords.latitude+", "+e.coords.longitude,t.zoom="11",t.message="",t.warning=!1,t.located=!0,t.distance=t.getDistance(e.coords.latitude,e.coords.longitude,"37.785665","-122.400502").toFixed(3),t.distance<.145&&(t.inmoma=!0)},null).then(function(){return console.log("Geolocation service: completed.")})["catch"](function(e){if(e.code>0){switch(e.code){case e.PERMISSION_DENIED:t.message="You have to be at SFMOMA to visit or participate in this exhibition. If you don’t allow location access to Unauthorized SFMOMA Show, it is impossible to confirm that you are at SFMOMA right now.";break;case e.POSITION_UNAVAILABLE:t.message="You have to be at SFMOMA to visit or participate in this exhibition. If you don’t allow location access to Unauthorized SFMOMA Show, it is impossible to confirm that you are at SFMOMA right now.";break;case e.TIMEOUT:t.message="Please, allow location access to Unauthorized SFMOMA Show in order to confirm that you are currently at SFMOMA."}t.warning=!0}})):(this.message="browser doesn't support geolocation",this.warning=!0)},t.prototype.getDistance=function(t,e,o,i){var s=.017453292519943295,n=Math.cos,r=.5-n((o-t)*s)/2+n(t*s)*n(o*s)*(1-n((i-e)*s))/2;return 12742*Math.asin(Math.sqrt(r))},t}();TodoCmp=__decorate([core_1.Component({selector:"todo-cmp",templateUrl:"todo/templates/todo.html",styleUrls:["todo/styles/todo.css"]}),__metadata("design:paramtypes",[todo_service_1.TodoService,geolocation_service_1.GeolocationService,core_1.NgZone])],TodoCmp),exports.TodoCmp=TodoCmp;