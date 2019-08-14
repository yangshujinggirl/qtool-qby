import { Steps } from 'antd';
import './index.less';

const { Step } = Steps;

function StepMod({step=0}) {
  return <Steps current={step} className="steps-wrap">
            <Step status="process" title="填写基本信息" />
            <Step status="wait" title="设置商品优惠" />
          </Steps>
}
export default StepMod;
