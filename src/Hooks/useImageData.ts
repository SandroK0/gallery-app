import axios, { AxiosRequestConfig } from "axios";

const accessKey = "Y4gTL_LNccpQkmeNI_BeRLKqg7w1q6ZfgDXOxLpqnbA";
const URL = "https://api.unsplash.com";

const requestConfig: AxiosRequestConfig = {
  params: {
    client_id: accessKey,
    per_page: 20,
    order_by: "popular",
  },
};

export default function useImageData() {
  const FetchData = async ({
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

  return {
    FetchData,
  };
}
