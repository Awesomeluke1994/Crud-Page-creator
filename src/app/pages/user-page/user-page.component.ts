import {Component, OnDestroy} from '@angular/core';
import {IUser, UserService} from '../../services/user-service/user.service';
import {Observable, Subject} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {CrudFormDialogComponent, FormTypes, ICrudDialogConfig} from '../../components/crud-form-dialog/crud-form-dialog.component';
import {v4 as uuidv4} from 'uuid';
import {ICrudTableConfig} from '../../components/crud-table/crud-table.component';
import {ICrudPageConfig} from '../../components/crud-page/crud-page.component';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnDestroy {
  public users: Observable<IUser[]>;
  public crudPageConfig: ICrudPageConfig<IUser>;
  private destroyed$: Subject<void> = new Subject<void>();
  private readonly deleteUser: (user: IUser) => void;
  private readonly editUser: (user: IUser) => void;

  constructor(
    private userService: UserService,
    private dialog: MatDialog
  ) {
    this.users = this.userService.getUsers(this.destroyed$);

    this.deleteUser = (user: IUser) => {
      this.userService.deleteUserById(user.id);
    };

    this.editUser = (user: IUser) => {
      const dialogRef = this.dialog.open(CrudFormDialogComponent, {
        width: '500px',
        data: this.createFormConfig(user, 'Edit User')
      });

      dialogRef.afterClosed().subscribe((editedUser: IUser) => {
        if (editedUser) {
          this.userService.updateUser(editedUser);
        }
      });
    };

    const addUser = () => {
      const dialogRef = this.dialog.open(CrudFormDialogComponent, {
        width: '500px',
        data: this.createFormConfig({} as IUser, 'Create user')
      });
      dialogRef.afterClosed().subscribe((createdUser: IUser) => {
        if (createdUser) {
          this.userService.addUser({
            emailAddress: createdUser.emailAddress,
            lastName: createdUser.lastName,
            firstName: createdUser.firstName,
            id: uuidv4()
          });
        }
      });
    };

    this.crudPageConfig = {
      onCreate: addUser,
      tableConfig: this.setUpTableConfig(),
      dataSource: this.userService.getUsers(this.destroyed$)
    };
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
  }

  private createFormConfig(user: IUser, title: string): ICrudDialogConfig<IUser> {
    return {
      title,
      formField: [
        {
          formType: FormTypes.text,
          label: 'First Name',
          dataSelector: 'firstName'
        },
        {
          formType: FormTypes.text,
          label: 'Last Name',
          dataSelector: 'lastName'
        },
        {
          formType: FormTypes.text,
          label: 'Email address',
          dataSelector: 'emailAddress'
        }
      ],
      data: {...user}
    };
  }

  public setUpTableConfig(): ICrudTableConfig<IUser> {
    return {
      displayedColumns: ['firstName', 'lastName', 'emailAddress'],
      columnHeaders: new Map<keyof IUser, string>([
        ['emailAddress', 'Email address'],
        ['lastName', 'Last name'],
        ['firstName', 'First name']
      ]),
      onDelete: this.deleteUser,
      onEdit: this.editUser
    };
  }
}
