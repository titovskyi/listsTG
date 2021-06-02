import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Page } from '@nativescript/core';

@Component({
    selector: 'ns-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
    public loginLabel: string = 'Логин';
    public loginHint: string = 'Введите ваше имя';
    public passwordLabel: string = 'Пароль';
    public passwordHint: string = '************';

    // ########################################

    constructor(private page: Page) {
        page.actionBarHidden = true;
    }

    // ########################################
}
