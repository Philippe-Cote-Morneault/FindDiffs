import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-create-game-simple-view",
  templateUrl: "./create-game-simple-view.component.html",
  styleUrls: ["./create-game-simple-view.component.css"],
})
export class CreateGameSimpleViewComponent implements OnInit {

  public constructor() {}

  public title: string = "Create a simple point of view game";
  public submitButton: string = "Submit";
  public cancelButton: string = "Cancel";
  public gameName: string = "Name of the game :";

  public verifyInfoGame(): void {
    // const gameName: string = (document.getElementById("gameInput") as HTMLInputElement).value;

    // if()
    // let img = new Image();

    /*
      window.URL = window.URL || window.webkitURL;

      $("form").submit( function( e ) {
          var form = this;
          e.preventDefault(); //Stop the submit for now
                                      //Replace with your selector to find the file input in your form
          var fileInput = $(this).find("input[type=file]")[0],
              file = fileInput.files && fileInput.files[0];

          if( file ) {
              var img = new Image();

              img.src = window.URL.createObjectURL( file );

              img.onload = function() {
                  var width = img.naturalWidth,
                      height = img.naturalHeight;

                  window.URL.revokeObjectURL( img.src );

                  if( width == 400 && height == 300 ) {
                      form.submit();
                  }
                  else {
                      //fail
                  }
              };
          }
          else { //No file was input or browser doesn't support client side reading
              form.submit();
          }

      });
    */
  }

  public ngOnInit(): void {}

}
// https://www.bootply.com/oFPl81lzM6