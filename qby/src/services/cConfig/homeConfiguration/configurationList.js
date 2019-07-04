import ajax from "../../../utils/req.js";

//首页版本list
export function getListApi(values) {
  values = JSON.stringify(values);
  return ajax.post("/webrest.htm", {
    code: "qerp.web.homePage.config.list",
    data: values
  });
}
//新增首页版本
export function addVersionApi(values) {
  values = JSON.stringify(values);
  return ajax.post("/webrest.htm", {
    code: "qerp.web.homePage.config.create",
    data: values
  });
}
//首页禁用
export function versionBanApi(values) {
  values = JSON.stringify(values);
  return ajax.post("/webrest.htm", {
    code: "qerp.web.homePage.config.Prohibit",
    data: values
  });
}
