import { Comment } from './../shared/interface';
import { PostService } from './../services/posts.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../shared/interface';
import { PostsSorting } from '../services/posts.enum';
import { TranslateService } from '@ngx-translate/core';
import { Langs } from '../shared/enums/languages.enum';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
    _user: User | null = null;
    replies: any;
    selectDayText: string;
    languages = Object.values(Langs).filter(v =>
        isNaN(Number(v)),
    ) as Array<string>;
    defaultLanguage: string;

    constructor(
        public authService: AuthService,
        private router: Router,
        private postService: PostService,
        private translate: TranslateService,
    ) {}

    ngOnInit() {
        this._user = this.authService.user;
        // this.authService.authReady().then( currentUser => {
        //     this.postService.getPosts(PostsSorting.byAuthor, ((currentUser as User).displayName) as string).then(
        //         result => {
        //             if (result && result.val()) {
        //                 const data = Object.fromEntries(
        //                     Object.entries(result.val() as Array<Comment>).filter(item => item[1].replies)
        //                 );
        //                 console.log(data);
        //             }
        //         }
        //     )
        // });

        console.log(Langs);

        // const localLanguage = localStorage.getItem('EDS.defaultLanguage');
    }

    get user() {
        return (this._user = this.authService.user);
    }

    logOut() {
        this.authService.logout();
        this.router.navigate(['']);
    }

    getPictureByDate(date: Date) {
        const dateMonth = date.getMonth() + 1;
        let month = '';

        if (dateMonth > 0 && dateMonth < 10) {
            month = `0${dateMonth}`;
        } else {
            month = dateMonth.toString();
        }

        const dateString = `${date.getFullYear()}-${month}-${date.getDate()}`;
        this.router.navigate([`day/${dateString}`]);
        console.log('getpic');
    }

    switchLanguage(language: string) {
        // this.defaultLanguage = localStorage.getItem('EDS.defaultLanguage')
        //     ? (localStorage.getItem('EDS.defaultLanguage') as string)
        //     : 'en';
        // console.log(this.defaultLanguage);
        // if (this.defaultLanguage) {
        //     this.translate.use(this.defaultLanguage);
        // } else {
        //     localStorage.setItem('EDS.defaultLanguage', language);
        // }
        this.translate.use(language);
        console.log('opa');
    }
}
