"use strict";var __decorate=this&&this.__decorate||function(t,e,o,r){var i,s=arguments.length,c=s<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,o,r);else for(var d=t.length-1;d>=0;d--)(i=t[d])&&(c=(s<3?i(c):s>3?i(e,o,c):i(e,o))||c);return s>3&&c&&Object.defineProperty(e,o,c),c},__metadata=this&&this.__metadata||function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};Object.defineProperty(exports,"__esModule",{value:!0});var core_1=require("@angular/core"),todo_service_1=require("../services/todo-service"),TodoCmp=function(){function t(t){this._todoService=t,this.title="ng2do",this.todos=[],this.todoForm={todoMessage:""}}return t.prototype.ngOnInit=function(){this._getAll()},t.prototype._getAll=function(){var t=this;this._todoService.getAll().subscribe(function(e){t.todos=e})},t.prototype.add=function(t){var e=this;this._todoService.add(t).subscribe(function(t){e.todos.push(t),e.todoForm.todoMessage=""})},t.prototype.remove=function(t){var e=this;this._todoService.remove(t).subscribe(function(){e.todos.forEach(function(o,r){if(o._id===t)return e.todos.splice(r,1)})})},t}();TodoCmp=__decorate([core_1.Component({selector:"todo-cmp",templateUrl:"todo/templates/todo.html",styleUrls:["todo/styles/todo.css"]}),__metadata("design:paramtypes",[todo_service_1.TodoService])],TodoCmp),exports.TodoCmp=TodoCmp;