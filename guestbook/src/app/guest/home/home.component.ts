import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableDataSource,MatTableModule} from '@angular/material/table';
import {Guest} from '../guest';
import { GuestServService } from '../guest-serv.service';
import { ViewEncapsulation } from '@angular/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort,MatSortModule} from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [MatFormFieldModule,MatInputModule,MatIconModule,MatButtonModule,MatTableModule,MatSlideToggleModule,MatPaginatorModule,MatSortModule,CommonModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  encapsulation:ViewEncapsulation.None
})
export class HomeComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'address','edit','delete'];
  dataSource = new MatTableDataSource<Guest>();
  @ViewChild(MatSort) sort : any;
  @ViewChild(MatPaginator) paginator : any;
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

        //stick the sort function and paginator section to dataSource which is the material table 
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      })
  }

  filteredGuests : Guest[] = [];
  searchGuest(input:String){
    this.filteredGuests = this.guests.filter(item=>item.name.toLowerCase().includes(input.toLowerCase())
    || item.email.toLowerCase().includes(input.toLowerCase()) || item.address.toLowerCase().includes(input.toLowerCase()))
    this.dataSource = new MatTableDataSource<Guest>(this.filteredGuests);
  }

  createGuest(guest:Guest){
     console.log('Guest submitted:', guest);
    if(guest.id!==0){
      if(confirm('Are you sure you want to change the records of this guest?')){
      this.guestService.updateguest(guest).subscribe({
      next:(data)=>{
        console.log(`Guest records succesfully updated!`);
        window.location.reload();
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
    }else{
      //CREATE GUEST
       this.guestService.createguest(guest).subscribe({
      next:(data)=>{
        console.log(`Guest succesfully added to database!`);
        window.location.reload();
      },
      error:(err)=>{
        console.log(err);
      }
    })
    }
    
  }

  clearData(){
    this.guest.name=this.guest.email=this.guest.address="";
  }

  deleteGuest(guest:Guest){
    if (!guest.id) {
    console.error('Invalid guest ID.');
    return;
  }

if(confirm('Are you sure you want to delete this guest?')){
         this.guestService.deleteguest(guest).subscribe({
          next:(data)=>{
        console.info('Guest deleted succesfully');
        window.location.reload();
      },
      error:(err)=>{
        console.error(err);
      }
         })
        }
  }

  addData(guest:Guest){
     console.log('Guest ID for update:', guest.id);
    this.guest.id = guest.id;
    this.guest.name = guest.name;
    this.guest.email = guest.email;
    this.guest.address= guest.address;

  }
}
