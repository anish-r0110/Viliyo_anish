import axiosInstance from "@/config/axios";
import transformNotePad from "@/middlewares/transform/notePad";
import INotes from "@/interfaces/Notes";

export default class NotePadService {
  async getData(sessionSegmentId: any) {
    try {
      const response = await axiosInstance.post(
        "/trainee/get_trainee_notes",
        sessionSegmentId
      );
      const getNotes: INotes[] = response.data.map((el: any) =>
        transformNotePad(el)
      );
      console.log("getNotes21", getNotes);
      return getNotes;
    } catch (error) {
      console.log("err", error);
    }
  }
  async postData(data: any) {
    try {
      const response = await axiosInstance.post(
        "/trainee/create_trainee_notes",
        data
      );
      const createNotes = response.data.map((el: any) => transformNotePad(el));

      return createNotes;
    } catch (error) {}
  }

  async deleteNotePadData(id: number) {
    try {
      const response = await axiosInstance.post(
        "/trainee/delete_trainee_notes",
        { id: id }
      );
      const getNotes = response.data.map((el: any) => transformNotePad(el));
      console.log("getNotes", getNotes);
      return getNotes;
    } catch (error) {}
  }
}
