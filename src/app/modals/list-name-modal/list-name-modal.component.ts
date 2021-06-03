import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from '@nativescript/angular';

@Component({
    selector: 'list-name-modal',
    templateUrl: './list-name-modal.component.html',
    styleUrls: ['./list-name-modal.component.css']
})
export class ListNameModalComponent implements OnInit {
    // ########################################

    constructor(private params: ModalDialogParams) {}

    // ########################################

    public ngOnInit(): void {

    }

    // ########################################

    public close(): void {
        this.params.closeCallback();
    }

    // ########################################
}
