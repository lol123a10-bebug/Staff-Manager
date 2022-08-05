import axios from "axios";
import { IEmployee } from "../models/staff";

class StaffApi {
  async fetchStaff() {
    const { data } = await axios.get("/staff.json");

    const array: IEmployee[] = [];
    for (const item in data) {
      const obj = { ...data[item], id: item };
      array.push(obj);
    }

    return array;
  }

  async fetchEmployee(id: string) {
    const { data } = await axios.get(`/staff/${id}.json`);

    return data;
  }

  async addEmployee(params) {
    const { data } = await axios.post("/staff.json", params);

    return data;
  }

  async editEmployee(params) {
    const { id, ...others } = params;
    const { data } = await axios.patch(`/staff/${id}.json`, others);

    return data;
  }

  async removeEmployee(id: string) {
    const { data } = await axios.delete(`/staff/${id}.json`);

    return data;
  }
}

export default new StaffApi();
