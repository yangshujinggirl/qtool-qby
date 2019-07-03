import ajax from "../../../utils/req.js";

export function getListApi(values) {
  values = JSON.stringify(values);
  return ajax.post("/webrest.htm", {
    code: "qerp.web.homePage.config.list",
    data: values
  });
}
