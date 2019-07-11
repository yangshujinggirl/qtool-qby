import ajax from "../../../utils/req.js";

export function saveApi(values) {
  values = JSON.stringify(values);
  return ajax.post("/webrest.htm", {
    code: "qerp.web.config.newUserGift.save",
    data: values
  });
}
export function getInfoApi(values) {
  values = JSON.stringify(values);
  return ajax.post("/webrest.htm", {
    code: "qerp.web.config.newUserGift.query",
    data: values
  });
}


