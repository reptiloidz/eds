import { Comment } from '../shared/interface';
import { AccountService } from './../services/account.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { passValidator } from '../shared/validators/passValidator';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { PostService } from '../services/posts.service';
import { PostsSorting } from '../services/posts.enum';
import { User } from '@angular/fire/auth';

@Component({
    selector: 'app-profile-page',
    templateUrl: './profile-page.component.html'
})
export class ProfilePageComponent implements OnInit {
    user: User | null;
    idToken: string | null = null;
    popup = false;
    comments: Array<Comment>;
    commentsNames: Array<string>;
    nameExist: string | null;
    error = false;

    name = new FormControl({value: '', disabled: true}, [Validators.required]);
    email = new FormControl({value: '', disabled: true}, [Validators.required, Validators.email]);
    pass = new FormControl({value: '', disabled: true}, [
        Validators.required,
        Validators.minLength(6),
        passValidator()
    ]);

    constructor(
        private accountService: AccountService,
        private authService: AuthService,
        private router: Router,
        private postService: PostService,
    ) {}

    ngOnInit(): void {
        this.authService.authState().then(() => {
            this.user = this.authService.user;
        });
        this.postService.getPosts(PostsSorting.byAuthor, (this.user?.displayName as string))
            .then(
                response => {
                    if (response.val()) {
                        this.comments =  Object.values(response.val()) as Array<Comment>;
                        this.commentsNames = Object.keys(response.val());
                    }
                }
            );
    }

    cancelEdit() {
        this.name.disable();
        this.email.disable();
        this.pass.disable();

        this.name.reset();
        this.email.reset();
        this.pass.reset();
    }

    enableNameInput() {
        this.name.enable();
    }

    changeName() {
        const displayName = this.name.value;

        if (this.name.value) {
            this.authService.getName('displayName', this.name.value).then(
                response => {
                    if (response.val()) {
                        this.nameExist = 'This name already exist';
                        setTimeout(() => {
                            this.nameExist = null;
                        }, 3000);
                        this.error = false;
                        return;
                    } else if (this.user) {
                        this.authService.updateProfile(this.user, { displayName }).then(() => {
                            this.error = false;
                            this.name.disable();
                            this.authService.authState().then(() => {
                                this.user = this.authService.user;
                            });
                            this.authService.addNewName({displayName: displayName});
                            console.log(this.authService.user);
                            this.authService.logout();
                        },
                        error => {
                            this.error = true;
                            console.log(error);
                        });
                    }
                },
                error => {
                    this.error = true;
                    console.log(error);
                }
            )

        }
    }

    enableEmailInput() {
        this.email.enable();
    }

    changeEmail() {
        if (this.user && this.email.value) {
            this.accountService.updateEmail(this.user, this.email.value).then(() => {
                this.authService.logout();
                this.router.navigate(['/login']);
            });
        }
    }

    enablePassInput() {
        this.pass.enable();
    }

    changePass() {
        if(this.user && this.pass.value) {
            this.authService.updatePassword(this.user, this.pass.value).then( () => {
                this.pass.disable();
                this.pass.reset();
                this.authService.logout();
                this.router.navigate(['/login']);
            }, error => {
                this.user = null;
                console.log(error);
                this.router.navigate(['/login']);
            });
        }

    }

    switchPopup() {
        this.popup = !this.popup;
    }

    delProfile() {
        if (this.user) {
            this.authService.deleteUser(this.user).then( () => {
                this.authService.logout();
                this.router.navigate(['']);
            });
        }
    }

    onDelete(index: number) {
        const post = this.commentsNames[index];

        if (post) {
            this.postService.delPost(post).then(
                () => {
                    this.postService.getPosts(PostsSorting.byAuthor, (this.user?.displayName as string))
                        .then(
                            response => {
                                if (response.val()) {
                                    this.comments =  Object.values(response.val()) as Array<Comment>;
                                    this.commentsNames = Object.keys(response.val());
                                } else {
                                    this.comments = [];
                                }
                            }
                        );
                },
                err => {
                    console.log(err);
                }
            );
        }
    }

    onEdit(event: any, index: number) {
        const commentID = this.commentsNames[index];
        const comment = this.comments[index];

        if (comment && commentID) {
            comment.text = event.newText;
            this.postService.editPost(commentID, comment).then(
                () => {
                    this.postService.getPosts(PostsSorting.byAuthor, (this.user?.displayName as string))
                        .then(
                            response => {
                                if (response.val()) {
                                    this.comments =  Object.values(response.val()) as Array<Comment>;
                                    this.commentsNames = Object.keys(response.val());
                                }
                            }
                        );
                },
                err => console.log(err)
            );
        }
    }
}
