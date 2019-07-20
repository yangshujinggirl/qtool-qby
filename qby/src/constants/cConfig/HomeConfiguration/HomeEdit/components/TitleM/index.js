import './index.less';

function TitleM({title,type}) {
  return <span className={`title-componet ${type==0?'black-title':'white-title'}`}>{title}</span>
}
export default TitleM;
