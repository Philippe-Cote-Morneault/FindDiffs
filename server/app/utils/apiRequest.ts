import Axios, { AxiosResponse } from "axios";
import { NotFoundException } from "../../../common/errors/notFoundException";
import { ICommonImagePair } from "../../../common/model/imagePair";
import Config from "../config";
import { R } from "../strings";

export class ApiRequest {

    private static BASE_URL: string = `http://${Config.hostname}:${Config.port}`;

    public static async  getImagePairId(id: string): Promise<ICommonImagePair> {
        return Axios.get<ICommonImagePair>(`${ApiRequest.BASE_URL}/image-pair/${id}`)
        .then((response: AxiosResponse<ICommonImagePair>) => {
            return response.data;
        })
        .catch(() => {
            throw new NotFoundException(R.ERROR_UNKOWN_ID);
        });
    }

    public static async getImagePairDiffId(id: string): Promise<ArrayBuffer> {
        return Axios.get<ArrayBuffer>(`${ApiRequest.BASE_URL}/image-pair/${id}/difference`, {
            responseType: "arraybuffer",
          }).then((response: AxiosResponse) => Buffer.from(response.data, "binary").buffer)
          .catch(() => {
            throw new NotFoundException(R.ERROR_UNKOWN_ID);
          });
    }

}
