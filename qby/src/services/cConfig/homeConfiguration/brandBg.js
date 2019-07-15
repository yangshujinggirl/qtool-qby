import ajax from "../../../utils/req.js";

export function saveBgPicApi(values) {
  values = JSON.stringify(values);
  return ajax.post("/webrest.htm", {
    code: "qerp.web.config.module.brand.save",
    data: values
  });
}
export function searchBgPicApi(values) {
  values = JSON.stringify(values);
  return ajax.post("/webrest.htm", {
    code: "qerp.web.config.module.brand.query",
    data: values
  });
}
