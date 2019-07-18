import './index.less';

function TitleM({title,type}) {
  return <span className={`title-componet ${type==1?'black-title':'white-title'}`}>{title}</span>
}
export default TitleM;
