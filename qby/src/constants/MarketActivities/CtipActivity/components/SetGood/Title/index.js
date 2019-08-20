import "./index.less";
const des = {
  scene1: "<p>用户最终购买的价格为折扣价与会员价的最低价<p>",
  scene2: `<p><span>此工具满足场景：买A赠A买2送1  买3送2  买5送3；<span><br/><span>如买A送A，以A商品100元买4送一为例，结算计算规则为：按照折算的折扣享受优惠，即100*4/（4+1）=80元</span></p>`,
  scene3: `<p><span>多级优惠最多可设置三级，每级优惠力度逐层递增。若用户购买数量在两级优惠门槛之间，则按照较低优惠门槛参与活动。<span><br/><span>若用户购买超过最高等级，则超出门槛数量的商品不享受优惠</span></p>`,
  scene4: `<p>多级优惠最多可设置三级，每级优惠力度逐层递增。若用户购买数量在两级优惠门槛之间，则按照较低优惠门槛参与活动。超门槛后不重复享受优惠，即满300减30，如用户购买600依旧减30，如叠加了直降活动，优惠门槛按照直降后的价格计算</p>`,
  scene5: `<p><span>多级优惠最多可设置三级，每级优惠力度逐层递增。若用户购买数量在两级优惠门槛之间，则按照较低优惠门槛参与活动。<span><br/><span>若用户购买超过最高等级，则超出门槛数量的商品不享受优惠</span><span>买X免Y活动用户提单时自动减免金额较低的商品</span></p>`
};
function SetTitle({ type = 0 }) {
  return (
    <div
      className="goods_title"
      dangerouslySetInnerHTML={{ __html: des["scene" + type] }}
    />
  );
}
export default SetTitle;
