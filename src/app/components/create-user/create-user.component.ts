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
// import { UserService } from '../../services/user.service';
import { parseTemplate } from '@angular/compiler';

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
  usersData: any = [];
  data: any;
  selectedUserData: any;
  idx: any = -1;
  uId: any;
  user = {
    firstName: '',
    lastName: '',
    gender: '',
    dateOfBirth: '',
    phone: '',
    email: '',
    photo: '',
    city: '',
  };
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private fb: FormBuilder,
    private localStorage: LocalStorageService,
    private router: Router // private userService: UserService
  ) {
    // if (this.idx != -1) {
    //   this.user = this.getUserData(this.idx);
    // } else {
    //   this.user = this.user;
    // }
    this.createUserForm = this.fb.group({
      // userId: this.userService.getNextUserId(),
      photo: [this.user.photo, Validators.required],
      firstName: [
        this.user.firstName,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      lastName: [
        this.user.lastName,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      gender: [this.user.gender],
      dateOfBirth: [
        this.user.dateOfBirth,
        [Validators.required, this.dateValidator, Validators.pattern],
      ],
      city: [this.user.city],
      phone: [this.user.phone, [Validators.required, this.phoneValidator]],
      email: [this.user.email, [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {
    this.router.routerState.root.queryParams.subscribe((params: any) => {
      this.data = params.data;
      this.idx = params.idx;
      this.uId = params.userId;
      if (this.data == 'edit') {
        this.user = this.getUserData(this.idx);
        // console.log(this.user.photo);
      }
    });
  }
  dateValidator(control: FormControl) {
    const currentDate = new Date();
    const birthdate = new Date(control.value);
    const minDate = new Date();
    const hundredYearsAgo = new Date(
      minDate.getFullYear() - 100,
      minDate.getMonth(),
      minDate.getDate()
    );
    if (birthdate > currentDate || birthdate < hundredYearsAgo) {
      return { invalidBirthdate: true };
    }
    return null;
  }
  phoneValidator(control: FormControl) {
    const phoneRegex = /^\+?\d{13}$/;
    if (!phoneRegex.test(control.value)) {
      return { invalidPhone: true };
    }
    return null;
  }
  getUserData(index: any) {
    let storedUser: any = localStorage.getItem('user');
    if (storedUser) {
      this.usersData = JSON.parse(storedUser);
    }
    return this.usersData[index];
  }

  readURL(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.user.photo = e.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
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
        if (this.data == 'edit') {
          this.usersData.splice(this.idx, 1);
          localStorage.setItem('user', JSON.stringify(this.usersData));
        }
        this.usersData.push(this.user);
        console.log(this.user);
        localStorage.setItem('user', JSON.stringify(this.usersData));
      }
      this.createUserForm.reset();
      this.router.navigate(['/']);
    }
  }
}
