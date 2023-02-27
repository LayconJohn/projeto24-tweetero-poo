import Error from "../model/errorModel.js";

export function badRequestError() {
    return {
      name: "BadRequestError",
      message: "This is a Bad Request!",
    };
}