import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: IUser[] = [];
  private users$: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>(this.users);

  constructor() {
  }

  public getUsers(destroyed: Observable<void>): Observable<IUser[]> {
    return this.users$.pipe(takeUntil(destroyed));
  }

  public addUser(user: IUser): void {
    this.users.push(user);
    this.users$.next(this.users);
  }

  public deleteUserById(id: string): void {
    const itemIndex = this.users.findIndex(user => user.id === id);
    this.users.splice(itemIndex, 1);
    this.users$.next(this.users);
  }

  public updateUser(user: IUser): void {
    this.users = this.users.map(currentUser => currentUser.id === user.id ? user : currentUser);
    this.users$.next(this.users);
  }
}

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
}
