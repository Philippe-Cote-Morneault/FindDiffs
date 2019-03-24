import * as axios from "axios";
import { ICommon } from "../../../../common/model/reveal";

export class PixelPositionService {
    private static instance: PixelPositionService;

    public static getInstance(): PixelPositionService {
        if (!PixelPositionService.instance) {
            PixelPositionService.instance = new PixelPositionService();
        }

        return PixelPositionService.instance;
    }

    public async post3DClick(imagePairId: string, x: number, y: number): Promise<ICommonReveal | null> {
        const requestBody: Object = { "image_pair_id": imagePairId, "x": x, "y": y};
        try {
            return (await axios.default.post("http://localhost:3000/difference/free", requestBody)).data as ICommonReveal;
        } catch (error) {
            return null;
        }
    }
}
