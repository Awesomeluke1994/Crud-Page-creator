import {Component, OnDestroy} from '@angular/core';
import {IUser, UserService} from '../../services/user-service/user.service';
import {Observable, Subject} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {CrudFormDialogComponent, FormTypes, ICrudDialogConfig} from '../../components/crud-form-dialog/crud-form-dialog.component';
import {v4 as uuidv4} from 'uuid';
import {ICrudTableConfig} from '../../components/crud-table/crud-table.component';
import {ICrudPageConfig} from '../../components/crud-page/crud-page.component';
import {FormControl, Validators} from '@angular/forms';
import {ConfirmDialogComponent, IConfirmDialogConfig} from '../../components/confirm-dialog/confirm-dialog.component';
import {takeUntil} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';

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
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.users = this.userService.getUsers(this.destroyed$);

    this.deleteUser = (user: IUser) => {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '500px',
        data: {title: `Confirm deletion of ${user.firstName} ${user.lastName}`} as IConfirmDialogConfig
      });
      dialogRef.afterClosed().pipe(takeUntil(this.destroyed$)).subscribe(confirmed => {
        if (confirmed) {
          this.userService.deleteUserById(user.id);
          this.snackBar.open('Deleted user');
        }
      });
    };

    this.editUser = (user: IUser) => {
      const dialogRef = this.dialog.open(CrudFormDialogComponent, {
        width: '500px',
        data: this.createFormConfig(user, 'Edit User')
      });

      dialogRef.afterClosed().subscribe((editedUser: IUser) => {
        if (editedUser) {
          this.userService.updateUser(editedUser);
          this.snackBar.open('Edited user');
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
            id: uuidv4(),
          });
          this.snackBar.open('Created user');
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
          dataSelector: 'firstName',
          required: true,
          formControl: new FormControl('', [])
        },
        {
          formType: FormTypes.text,
          label: 'Last Name',
          dataSelector: 'lastName',
          required: true,
          formControl: new FormControl('', [])
        },
        {
          formType: FormTypes.text,
          label: 'Email address',
          dataSelector: 'emailAddress',
          required: true,
          formControl: new FormControl('', [Validators.email]),
          placeholder: 'email@placeholder.com'
        },
      ],
      data: {...user},
      fieldErrorMessagesByErrorKey: new Map([
        ['email', 'Email address is not valid'],
        ['required', 'Value is required']
      ])
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

  public createTenTestUsers(): void {
    for (let i = 0; i < 10; i++) {
      this.userService.addUser({
        id: uuidv4(),
        firstName: `FirstName${i}`,
        lastName: `LastName${i}`,
        emailAddress: `EmailAddress${i}@email.com`
      });
    }
  }
}
