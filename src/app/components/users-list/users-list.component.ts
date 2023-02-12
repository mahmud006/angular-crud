import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LocalStorageService } from 'ngx-webstorage';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FilterPipe } from 'src/app/pipes/FilterPipe';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit {
  users: any[] = [];
  totalUsers = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: any;
  sortBy = '';
  sortOrder = 'asc';
  displayedUsers: any[] = [];
  term: string = '';
  filterOption: string = 'name';
  data: string = '';
  idx: any;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private localStorage: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit() {
    // this.userId++;
    let storedUser: any = localStorage.getItem('user');
    this.users = JSON.parse(storedUser);
    this.totalUsers = this.users.length;
    this.displayedUsers = this.users.slice(0, this.pageSize);
    console.log(this.users);
  }

  sortList(field: string) {
    // this.displayedUsers = this.users.slice(0, this.pageSize);
    if (this.sortOrder === 'asc') {
      this.displayedUsers.sort((a, b) => (a[field] < b[field] ? -1 : 1));
      this.sortOrder = 'desc';
    } else {
      this.displayedUsers.sort((a, b) => (a[field] > b[field] ? -1 : 1));
      this.sortOrder = 'asc';
    }
  }
  handlePageChange(event: any) {
    this.displayedUsers = this.users.slice(
      event.pageIndex * event.pageSize,
      (event.pageIndex + 1) * event.pageSize
    );
    this.pageSize = event.pageSize;
    this.totalUsers = event.length;
  }
  deleteUser(user: any) {
    const indexInUsers = this.users.indexOf(user);
    const indexInDisplayedUsers = this.displayedUsers.indexOf(user);
    this.displayedUsers.splice(indexInDisplayedUsers, 1);
    this.users.splice(indexInUsers, 1);
    localStorage.setItem('user', JSON.stringify(this.users));
  }
  filterBy(option: string) {
    this.filterOption = option;
  }
  editUser(user: any) {
    const index = this.users.indexOf(user);
    console.log(index);
    this.router.navigate(['/create-user'], {
      queryParams: {
        idx: index,
        data: 'edit',
      },
    });
  }
  onCreateUser() {
    this.router.navigate(['/create-user'], {
      queryParams: {
        data: 'create',
      },
    });
  }
}
