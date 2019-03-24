import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class MousePositionService {

    // tslint:disable-next-line: variable-name
    public setMousePosition(event: MouseEvent, mouse: THREE.Vector2, HTMLElement: HTMLElement): THREE.Vector2 {
        const divBoxInformation: ClientRect | DOMRect = HTMLElement.getBoundingClientRect();
        const differenceX: number = event.clientX - divBoxInformation.left;
        const differenceY: number = event.clientY - divBoxInformation.top;
        // tslint:disable:no-magic-numbers
        mouse.x = (differenceX / HTMLElement.clientWidth) * 2 - 1;
        mouse.y = -(differenceY / HTMLElement.clientHeight) * 2 + 1;

        return mouse;
    }
}
