import { Component, Input } from '@angular/core';

@Component({
    selector: 'main-input',
    templateUrl: './main-input.component.html',
    styleUrls: ['./main-input.component.css']
})
export class MainInputComponent {
    public isFocused: boolean = false;

    // ########################################

    @Input() public customHint: string | undefined;

    @Input() public label: string | undefined;

    // ########################################

    public onFocus(): void {
        this.isFocused = true;
    }

    public onBlur(): void {
        this.isFocused = false;
    }

    // ########################################
}
