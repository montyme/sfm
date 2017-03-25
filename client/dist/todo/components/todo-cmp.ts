import {
  Component,
  OnInit,
  NgZone
} from "@angular/core";

import {
  Validators,
  FormGroup,
  FormControl
} from "@angular/forms";

import {
  TodoService
} from "../services/todo-service";

import {
  GeolocationService
} from "../services/geolocation-service";

require('aws-sdk/dist/aws-sdk');


type Todo = {
  todoMessage: string;

  _id?: string;
};

@Component({
  selector: "todo-cmp",
  templateUrl: "todo/templates/todo.html",
  styleUrls: ["todo/styles/todo.css"]
})
export class TodoCmp implements OnInit {
  title: string = "UNAUTHORIZED SFMOMA SHOW";
  file: any;
  file_url: string = "";
  warning: boolean;
  located: boolean;
  inmoma: boolean = false;
  item: any = {
    todoMessage: 0,
    createdAt: 0,
    todoArtwork: 0,
    todoDate: 0,
    todoMedium: 0,
    todoSize: 0,
    todoArtist: 0,
    todoEmail: 0,
    file_url: 0
  };
  submiting: boolean = false;
  viewing: boolean = false;
  message: string;
  todos: Todo[] = [];
  todoForm: Todo;
  distance: any;
  isClassVisible: boolean =false;

  center: string = "Undisclosed Location";
        
  // The initial map zoom level. Required.
  zoom: string;


  constructor(private _todoService: TodoService, private geolocation: GeolocationService, private zone:NgZone ) {
    this.todoForm = {
      "todoMessage": ""
    };

  }

  ngOnInit() {
    this._getAll();
    this.getCurrentPosition();
  }

  private _getAll(): void {
    let that = this;
    this._todoService
        .getAll()
        .subscribe((todos) => {
          console.log('Todos: ', todos);
          that.zone.run(() => {
            console.log( 'Got item: ', todos);
            that.item = todos;
          });
        });
  }

  fileEvent(fileInput:any){
    var files = fileInput.target.files;
    var file = files[0];
    this.file = file;
    console.log("Selected file: ", this.file );
  }

  submit(): void{
    this.submiting = true;
    this.viewing = false;
    this.isClassVisible = true;
  }

  view(): void{
    this.submiting = false;
    this.viewing = true;
    this.isClassVisible = true;
  }

  reset(): void {
    this.submiting = false;
    this.viewing = false;
    this.isClassVisible = false;
  }

  add(todoForm:any): void {
    let AWSService = (<any>window).AWS; 
    console.log(AWSService);
    let file = this.file;
    AWSService.config.accessKeyId = "AKIAJGBCGJ455OKL6PIQ";
    AWSService.config.secretAccessKey = "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";
    let bucket = new AWSService.S3({params: {Bucket: 'sfmomashow'}});
    let d = new Date();
    let n = d.getTime();
    let params = {Key:n+file.name, Body: file};
    let that = this;
    bucket.upload( params, function( error, res ){
      if( error ){
        console.log( 'error: ', error );
      }else{
        console.log( 'response: ', res);
        todoForm.file_url = res.Location;
        that._todoService
          .add(todoForm)
          .subscribe((m) => {
            console.log( "m: ", m);
            that.zone.run(() => { 
              console.log( "added: ", m);
              that.item = m;
              that.view();
            });
        });
      }
    });
  }

  remove(id: string): void {
    this._todoService
      .remove(id)
      .subscribe(() => {
        this.todos.forEach((t, i) => {
          if (t._id === id)
            return this.todos.splice(i, 1);
        });
      });
  }

  // Tries to get the current position.
  getCurrentPosition() {

      this.located = false;
      this.warning = false;
      this.message = "";

      if (navigator.geolocation) {
          console.log( "Getting position");

          // Gets the current position.
          this.geolocation.getCurrentPosition().forEach(

              // Next.
              (position: Position) => {

                 //  if (this.center.lat() != position.coords.latitude && this.center.lng() != position.coords.longitude) {
                      
                      // Sets the new center map & zoom.
                      // New center object: triggers OnChanges.
                      this.center = position.coords.latitude + ', ' + position.coords.longitude;
                      this.zoom = "11";
                      this.message = "";
                      this.warning = false;
                      this.located = true;

                      this.distance = this.getDistance(
                                        position.coords.latitude, 
                                        position.coords.longitude, 
                                        '37.785665', 
                                        '-122.400502'
                                      );

                      if( this.distance < 0.145 ){
                        this.inmoma = true;
                      }

                 //  }

              }, null

          ).then(() => console.log('Geolocation service: completed.')).catch(

              (error: PositionError) => {

                  if (error.code > 0) {

                      switch (error.code) {
                          case error.PERMISSION_DENIED:
                              this.message = 'permission denied';
                              break;
                          case error.POSITION_UNAVAILABLE:
                              this.message = 'position unavailable';
                              break;
                          case error.TIMEOUT:
                              this.message = 'position timeout';
                              break;
                      }

                      this.warning = true;
                  }

              });

      } else {
          // Browser doesn't support geolocation.
          this.message = "browser doesn't support geolocation";
          this.warning = true;
      }
  }

  getDistance(lat1, lon1, lat2, lon2) {
    let p = 0.017453292519943295;    // Math.PI / 180
    let c = Math.cos;
    let a = 0.5 - c((lat2 - lat1) * p)/2 + 
            c(lat1 * p) * c(lat2 * p) * 
            (1 - c((lon2 - lon1) * p))/2;

    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
  }
}
