import axiosInstance from "@/config/axios";
import transformQuery from "@/middlewares/transform/query";
import IComment from "@/interfaces/Comment";
import transformComment from "../middlewares/transform/comment";

export default class QueryService {
  async getList() {
    const response = await axiosInstance.post("/trainer/list_queries", {});
    const queries = response.data.ListQuery.map((el: any) =>
      transformQuery(el)
    );

    console.log( queries , 'Queries');
    return queries;
  }

  async getQuery(id: string) {
    const response = await axiosInstance.post("/trainer/list_queries_id", {
      id,
    });
    const query = transformQuery(response.data.ListQueryId[0]);
    console.log('Query', query);
    return query;
  }

  async postComment(
    reply: string,
    query?: number,
    reply_by?: number,
    replier_icon?: string
  ) {
    try {
      const response = await axiosInstance.post(
        "/trainee/reply_on_others_queries",
        {
          query: query,
          reply: reply,
          reply_by: reply_by,
          replier_Icon: replier_icon,
        }
      );
      let comments: IComment[] = response.data.ReplyQuery;
      return comments;
    } catch (error) {
      console.log(error);
    }
  }
}
