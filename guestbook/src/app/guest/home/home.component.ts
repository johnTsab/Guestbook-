import { AfterViewInit, Component } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableDataSource,MatTableModule} from '@angular/material/table';
import {Guest} from '../guest';
import { GuestServService } from '../guest-serv.service';
import { ViewEncapsulation } from '@angular/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-home',
  imports: [MatFormFieldModule,MatInputModule,MatIconModule,MatButtonModule,MatTableModule,MatSlideToggleModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  encapsulation:ViewEncapsulation.None
})
export class HomeComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'address'];
  dataSource = new MatTableDataSource<Guest>();
  guest:Guest = {
    id:0,
    name:'',
    email:'',
    address:''
  }
  guests: Guest[]=[];
  isDarkMode = false;
 toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-mode', this.isDarkMode);
  }

  
  
  
  
  constructor(private guestService:GuestServService){}
  ngAfterViewInit(): void {
      this.guestService.fetchAllGuests().subscribe((data)=>{
        this.guests = data;
        this.dataSource = new MatTableDataSource<Guest>(data);
      })
  }

  filteredGuests : Guest[] = [];
  searchGuest(input:String){
    this.filteredGuests = this.guests.filter(item=>item.name.toLowerCase().includes(input.toLowerCase())
    || item.email.toLowerCase().includes(input.toLowerCase()) || item.address.toLowerCase().includes(input.toLowerCase()))
    this.dataSource = new MatTableDataSource<Guest>(this.filteredGuests);
  }
}
