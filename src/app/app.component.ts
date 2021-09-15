import {Component, OnInit} from '@angular/core';
import { Vinyl     } from "./vinyl";
import {VinylService} from "./vinyl.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public title = 'Vinyl Shop';
  public vinyls!: Vinyl[];
  public currentVinyl!: Vinyl;
  public vinylForDeletion!: Vinyl;

  constructor(private vinylService: VinylService) {}

  ngOnInit() {

    this.getVinyls();
  }

  public getVinyls(): void {
    this.vinylService.getVinyls().subscribe(
      (response: Vinyl[]) => {
        this.vinyls = response
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

  public onOpenModal(vinyl: Vinyl, mode: string): void {
    const container = document.getElementById("main-container");

    const button = document.createElement('button')
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle','modal');

    if (mode === 'add'){
      button.setAttribute('data-target', '#addVinylModal');
    } else if (mode === 'edit'){
      this.currentVinyl = vinyl;
      button.setAttribute('data-target', '#editVinylModal');
    } else if (mode === 'delete'){
      this.vinylForDeletion = vinyl;
      button.setAttribute('data-target', '#deleteVinylModal');
    }

    // @ts-ignore: Object is possibly 'null'.
    container.appendChild(button);
    button.click();
  }

  public onAddVinyl(addForm: NgForm): void {
    // Closing the modal
    document.getElementById('add-vinyl-form')!.click();

    this.vinylService.addVinyl(addForm.value).subscribe(
      (response:Vinyl) => {
        console.log(response);

        // Refresh records
        this.getVinyls();

        // Clear fields
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onUpdateVinyl(vinyl: Vinyl): void {
    this.vinylService.updateVinyl(vinyl).subscribe(
      (response:Vinyl) => {
        console.log(response);
        this.getVinyls();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onDeleteVinyl(vinylId: number): void {
    this.vinylService.deleteVinyl(vinylId).subscribe(
      (response:void) => {
        console.log(response);
        this.getVinyls();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public searchVinyls(key: String): void {
    const results: Vinyl[] = [];

    for (const vinyl of this.vinyls){
      if (vinyl.name.toLowerCase().indexOf(key.toLowerCase().trim()) !== -1
        || vinyl.artist.toLowerCase().indexOf(key.toLowerCase().trim()) !== -1
        || vinyl.genre.toLowerCase().indexOf(key.toLowerCase().trim()) !== -1) {
        results.push(vinyl);
      }
    }

    this.vinyls = results;

    // Reset
    if (!key)
      this.getVinyls();
  }
}
