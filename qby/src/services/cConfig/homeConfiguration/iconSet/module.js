import ajax from "../../../../utils/req.js";

//商品分类
export function saveModuleApi(values) {
  values = JSON.stringify(values);
  return ajax.post("/webrest.htm", {
    code: "qerp.web.config.module.icon.setting",
    data: values
  });
}
