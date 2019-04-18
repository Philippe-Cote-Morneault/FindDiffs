import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class MousePositionService {

    public setMousePosition(event: MouseEvent, mouse: THREE.Vector2,
                            divBoxInformation: ClientRect | DOMRect,
                            clientWidth: number, clientHeight: number): void {
        const differenceX: number = event.clientX - divBoxInformation.left;
        const differenceY: number = event.clientY - divBoxInformation.top;
        // tslint:disable:no-magic-numbers
        mouse.x = (differenceX / clientWidth) * 2 - 1;
        mouse.y = -(differenceY / clientHeight) * 2 + 1;
    }
}
