import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'custom-action-bar',
    templateUrl: './custom-action-bar.component.html',
    styleUrls: ['./custom-action-bar.component.css']
})
export class CustomActionBarComponent {
    // ########################################

    @Input() public title: string = '';

    @Input() public back: string = '';

    @Input() public menu: string = '';

    // ########################################

    @Output() public onMenuTap: EventEmitter<void> = new EventEmitter<void>();

    @Output() public onBackTap: EventEmitter<void> = new EventEmitter<void>();

    // ########################################
}
