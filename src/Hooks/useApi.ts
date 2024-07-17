import axios, { AxiosRequestConfig } from "axios";
import { UnsplashPhoto } from "../Types";

const accessKey = "Y4gTL_LNccpQkmeNI_BeRLKqg7w1q6ZfgDXOxLpqnbA";
const URL = "https://api.unsplash.com";

const requestConfig: AxiosRequestConfig = {
  params: {
    client_id: accessKey,
    per_page: 30,
  },
};

export default function useApi() {
  const FetchPages = async ({
    queryKey,
    pageParam,
  }: {
    queryKey: string[];
    pageParam: number;
  }) => {
    let query = queryKey[0];
    let page = pageParam;

    const response = await axios.get(`${URL}/${query ? "search/" : ""}photos`, {
      ...requestConfig,
      params: {
        ...requestConfig.params,
        query,
        page,
      },
    });

    let data = query ? response.data.results : response.data;

    return data;
  };

  const getPhotoStats = async (id: string) => {
    const response = await axios.get(`${URL}/photos/${id}/statistics`, {
      params: {
        client_id: accessKey,
      },
    });
    return response.data;
  };

  const trackPhotoDownload = async (id: string) => {
    const response = await axios.get(`${URL}/photos/${id}/download`, {
      params: {
        client_id: accessKey,
      },
    });
    if (response.status === 200) {
      return response.data;
    }
    return false;
  };

  return {
    FetchPages,
    getPhotoStats,
    trackPhotoDownload,
    accessKey,
  };
}
