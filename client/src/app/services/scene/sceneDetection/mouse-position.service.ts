import { ElementRef, Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class MousePositionService {

    public setMousePosition(event: MouseEvent, mouse: THREE.Vector2, htmlElement: ElementRef<HTMLElement>): void {
        const divBoxInformation: ClientRect | DOMRect = htmlElement.nativeElement.getBoundingClientRect();
        const differenceX: number = event.clientX - divBoxInformation.left;
        const differenceY: number = event.clientY - divBoxInformation.top;
        // tslint:disable:no-magic-numbers
        mouse.x = (differenceX / htmlElement.nativeElement.clientWidth) * 2 - 1;
        mouse.y = -(differenceY / htmlElement.nativeElement.clientHeight) * 2 + 1;
    }
}
