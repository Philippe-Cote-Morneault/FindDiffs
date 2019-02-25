import Axios, { AxiosResponse } from "axios";
import { NotFoundException } from "../../../common/errors/notFoundException";
import { ICommonImagePair } from "../../../common/model/imagePair";
import { ICommonScene } from "../../../common/model/scene/scene";
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
            throw new NotFoundException(R.ERROR_UNKNOWN_ID);
        });
    }

    public static async getSceneId(id: string): Promise<ICommonScene> {
        return Axios.get<ICommonScene>(`${ApiRequest.BASE_URL}/scene/${id}`)
        .then((response: AxiosResponse<ICommonScene>) => {
            return response.data;
        })
        .catch(() => {
            throw new NotFoundException(R.ERROR_UNKNOWN_ID);
        });
    }

    public static async getImagePairDiffId(id: string): Promise<ArrayBuffer> {
        return Axios.get<ArrayBuffer>(`${ApiRequest.BASE_URL}/image-pair/${id}/difference`, {
            responseType: "arraybuffer",
          }).then((response: AxiosResponse) => Buffer.from(response.data, "binary").buffer)
          .catch(() => {
            throw new NotFoundException(R.ERROR_UNKNOWN_ID);
          });
    }

    public static async getImagePairDiffJSONId(id: string): Promise<number[]> {
        return Axios.get<ArrayBuffer>(`${ApiRequest.BASE_URL}/image-pair/${id}/difference.json`, {
            responseType: "number[]",
          }).then((response: AxiosResponse) => response.data as number[])
          .catch((err: Error) => {
            throw new NotFoundException(R.ERROR_UNKNOWN_ID);
          });
    }

}
