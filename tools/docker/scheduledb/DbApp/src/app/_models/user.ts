import { Injectable } from '@angular/core';
import { Role } from './role';

@Injectable({ providedIn: 'root' })
export class User {
    _id: string;
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    role: Role;
    email: string;
    mobile: string;
    inActive: boolean;
    createdDate: Date;
    token?: string;
}
