import { Component, OnInit, Inject, PLATFORM_ID, Input } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  FormControlName,
} from '@angular/forms';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { LocalStorageService } from 'ngx-webstorage';
import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements OnInit {
  createUserForm: FormGroup;
  firstName: string = '';
  lastName: string = '';
  gender: string = '';
  dateOfBirth: string = '';
  phone: string = '';
  email: string = '';
  window: any;
  usersData: any = [];
  photo: any;
  userId: Number = 0;
  data: any;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private fb: FormBuilder,
    private localStorage: LocalStorageService,
    private router: Router,
    private userService: UserService
  ) {
    // this.usersData = [{ userId: 0 }];
    this.createUserForm = this.fb.group({
      userId: this.userService.getNextUserId(),
      photo: ['', Validators.required],
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      gender: [''],
      dateOfBirth: ['', Validators.required],
      city: [''],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {
    this.router.routerState.root.queryParams.subscribe((params: any) => {
      this.data = params.data;
    });
  }
  dateValidator(control: FormControl) {
    console.log('hello2');
    const currentDate = new Date();
    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 50);
    const value = new Date(Date.parse(control.value));
    console.log(value.getTime());
    console.log(currentDate.getTime());
    console.log(minDate.getTime());

    if (
      value.getTime() < currentDate.getTime() ||
      value.getTime() > minDate.getTime()
    ) {
      console.log('h3');
      return { dateOfBirth: true };
    } else {
      return null;
    }
  }
  onSubmit() {
    if (this.createUserForm.valid) {
      console.log(isPlatformBrowser(this.platformId));
      if (isPlatformBrowser(this.platformId)) {
        let storedUser: any = localStorage.getItem('user');
        if (storedUser) {
          this.usersData = JSON.parse(storedUser);
        }
        this.usersData.push(this.createUserForm.value);
        localStorage.setItem('user', JSON.stringify(this.usersData));
      }
      this.createUserForm.reset();
      this.router.navigate(['/']);
    }
  }
}
