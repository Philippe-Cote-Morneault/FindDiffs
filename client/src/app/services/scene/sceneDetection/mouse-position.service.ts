import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class MousePositionService {
    public divBoxInformation: ClientRect | DOMRect;
    public differenceX: number;
    public differenceY: number;
    // tslint:disable-next-line: variable-name
    public setMousePosition(event: MouseEvent, mouse: THREE.Vector2, HTMLElement: HTMLElement): THREE.Vector2 {
        this.divBoxInformation = HTMLElement.getBoundingClientRect();
        this.differenceX = event.clientX - this.divBoxInformation.left;
        this.differenceY = event.clientY - this.divBoxInformation.top;
        // tslint:disable:no-magic-numbers
        mouse.x = (this.differenceX / HTMLElement.clientWidth) * 2 - 1;
        mouse.y = -(this.differenceY / HTMLElement.clientHeight) * 2 + 1;

        return mouse;
    }
}
