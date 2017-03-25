"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var todo_service_1 = require("../services/todo-service");
var geolocation_service_1 = require("../services/geolocation-service");
require('aws-sdk/dist/aws-sdk');
var TodoCmp = (function () {
    function TodoCmp(_todoService, geolocation) {
        this._todoService = _todoService;
        this.geolocation = geolocation;
        this.title = "UNAUTHORIZED SFMOMA SHOW";
        this.file_url = "";
        this.inmoma = false;
        this.submiting = false;
        this.viewing = false;
        this.todos = [];
        this.isClassVisible = false;
        this.center = "Undisclosed Location";
        this.todoForm = {
            "todoMessage": ""
        };
    }
    TodoCmp.prototype.ngOnInit = function () {
        this._getAll();
        this.getCurrentPosition();
    };
    TodoCmp.prototype._getAll = function () {
        var _this = this;
        this._todoService
            .getAll()
            .subscribe(function (todos) {
            _this.todos = todos;
        });
    };
    TodoCmp.prototype.fileEvent = function (fileInput) {
        var files = fileInput.target.files;
        var file = files[0];
        this.file = file;
        console.log("Selected file: ", this.file);
    };
    TodoCmp.prototype.submit = function () {
        this.submiting = true;
        this.viewing = false;
        this.isClassVisible = true;
    };
    TodoCmp.prototype.view = function () {
        this.submiting = false;
        this.viewing = true;
        this.isClassVisible = true;
    };
    TodoCmp.prototype.reset = function () {
        this.submiting = false;
        this.viewing = false;
        this.isClassVisible = false;
    };
    TodoCmp.prototype.add = function (todoForm) {
        var AWSService = window.AWS;
        console.log(AWSService);
        var file = this.file;
        AWSService.config.accessKeyId = "AKIAJGBCGJ455OKL6PIQ";
        AWSService.config.secretAccessKey = "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";
        var bucket = new AWSService.S3({ params: { Bucket: 'sfmomashow' } });
        var params = { Key: file.name, Body: file };
        var that = this;
        bucket.upload(params, function (error, res) {
            if (error) {
                console.log('error: ', error);
            }
            else {
                console.log('response: ', res);
                todoForm.file_url = res.Location;
                that._todoService
                    .add(todoForm)
                    .subscribe(function (m) {
                    that.todos = m;
                    that.view();
                });
            }
        });
    };
    TodoCmp.prototype.remove = function (id) {
        var _this = this;
        this._todoService
            .remove(id)
            .subscribe(function () {
            _this.todos.forEach(function (t, i) {
                if (t._id === id)
                    return _this.todos.splice(i, 1);
            });
        });
    };
    // Tries to get the current position.
    TodoCmp.prototype.getCurrentPosition = function () {
        var _this = this;
        this.located = false;
        this.warning = false;
        this.message = "";
        if (navigator.geolocation) {
            console.log("Getting position");
            // Gets the current position.
            this.geolocation.getCurrentPosition().forEach(
            // Next.
            function (position) {
                //  if (this.center.lat() != position.coords.latitude && this.center.lng() != position.coords.longitude) {
                // Sets the new center map & zoom.
                // New center object: triggers OnChanges.
                _this.center = position.coords.latitude + ', ' + position.coords.longitude;
                _this.zoom = "11";
                _this.message = "";
                _this.warning = false;
                _this.located = true;
                _this.distance = _this.getDistance(position.coords.latitude, position.coords.longitude, '37.785665', '-122.400502');
                if (_this.distance < 145000) {
                    _this.inmoma = true;
                }
                //  }
            }, null).then(function () { return console.log('Geolocation service: completed.'); }).catch(function (error) {
                if (error.code > 0) {
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            _this.message = 'permission denied';
                            break;
                        case error.POSITION_UNAVAILABLE:
                            _this.message = 'position unavailable';
                            break;
                        case error.TIMEOUT:
                            _this.message = 'position timeout';
                            break;
                    }
                    _this.warning = true;
                }
            });
        }
        else {
            // Browser doesn't support geolocation.
            this.message = "browser doesn't support geolocation";
            this.warning = true;
        }
    };
    TodoCmp.prototype.getDistance = function (lat1, lon1, lat2, lon2) {
        var p = 0.017453292519943295; // Math.PI / 180
        var c = Math.cos;
        var a = 0.5 - c((lat2 - lat1) * p) / 2 +
            c(lat1 * p) * c(lat2 * p) *
                (1 - c((lon2 - lon1) * p)) / 2;
        return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
    };
    return TodoCmp;
}());
TodoCmp = __decorate([
    core_1.Component({
        selector: "todo-cmp",
        templateUrl: "todo/templates/todo.html",
        styleUrls: ["todo/styles/todo.css"]
    }),
    __metadata("design:paramtypes", [todo_service_1.TodoService, geolocation_service_1.GeolocationService])
], TodoCmp);
exports.TodoCmp = TodoCmp;
