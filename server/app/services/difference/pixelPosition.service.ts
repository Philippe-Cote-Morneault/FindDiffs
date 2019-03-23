/*
import * as request from "request";
export class PixelPositionService {

    public constructor() {
    }


    // tslint:disable-next-line:no-any
    public postPixelPosition<Pixel>(imagePairId: string, x: number, y: number): Observal<any> {
        const requestBody: Object = { "image_pair_id": imagePairId, "x": x, "y": y};
        const clientServerOptions = {
            uri: 'http://localhost:3000/difference/simple',
            body: JSON.stringify(postData),
            method: "POST",
        }
         request(clientServerOptions, function (error, response) {
            console.log(response.body);
        });

        return this.http.post<Pixel>(`${SERVER_URL}/difference/simple`, requestBody).pipe(
            catchError((error) => this.handleError(error)),
        );
    }
}
*/