import { useMemo, useState } from "react";
import {
  ArrowRight,
  BellRinging,
  CaretDown,
  ChartBar,
  CheckCircle,
  ClipboardText,
  FirstAidKit,
  HouseLine,
  LockKey,
  MegaphoneSimple,
  Package,
  SealCheck,
  ShieldCheck,
  SignIn,
  Truck,
  UsersThree,
  Warning,
} from "@phosphor-icons/react";

const channels = [
  {
    name: "横州市人民政府防汛办",
    role: "发布权威通知与防汛信息",
    link: "www.hengzhou.gov.cn",
    badge: "官方",
  },
  {
    name: "横州市应急管理局",
    role: "应急指挥与协调",
    link: "0771-XXXXXXX（工作时间）",
    badge: "官方",
  },
  {
    name: "横州市红十字会",
    role: "接收社会捐赠与救助公示",
    link: "www.hengzhouredcross.org.cn",
    badge: "公益",
  },
  {
    name: "横州发布（官方公众号）",
    role: "权威信息发布平台",
    link: "微信公众号：横州发布",
    badge: "官方",
  },
];

const supplies = [
  { name: "饮用水", urgent: true, current: 1200, target: 5000, unit: "箱" },
  { name: "方便食品", urgent: true, current: 850, target: 3000, unit: "箱" },
  { name: "雨衣雨鞋", urgent: true, current: 320, target: 1500, unit: "套" },
  { name: "消毒用品", urgent: true, current: 200, target: 1000, unit: "件" },
  { name: "手电筒/电池", urgent: false, current: 180, target: 800, unit: "套" },
];

const needs = [
  { type: "物资需求", title: "横州镇某安置点缺少饮用水和方便面", area: "横州镇", time: "10:15", status: "已核验" },
  { type: "求助信息", title: "云表镇部分村庄道路受阻，需要冲锋舟协助转运", area: "云表镇", time: "09:50", status: "已核验" },
  { type: "物资需求", title: "校椅镇安置点需要雨衣、雨鞋", area: "校椅镇", time: "09:30", status: "已核验" },
  { type: "志愿协助", title: "志愿者团队可协助物资装卸与分发", area: "横州市区", time: "09:10", status: "已核验" },
  { type: "求助信息", title: "六景镇一处低洼路段积水，需排水设备支援", area: "六景镇", time: "08:45", status: "已核验" },
];

const faq = [
  {
    q: "如何确认信息的真实性？",
    a: "优先核验来源、时间、地点、回访记录和官方转交状态。未完成核验的信息不进入公开列表。",
  },
  {
    q: "我可以发布哪些信息？",
    a: "可以提交物资需求、可提供资源、志愿服务能力和已知官方渠道。请勿发布未经确认的伤亡、溃坝、失联传言。",
  },
  {
    q: "捐赠物资如何交接与公示？",
    a: "按官方接收点和当日需求清单操作，保留转运凭证，后台记录流向后再公开汇总数字。",
  },
  {
    q: "如何参与志愿服务？",
    a: "建议远程参与录入、核验、物资撮合和辟谣。线下行动需接受现场指挥，不建议自行前往危险区域。",
  },
  {
    q: "信息隐私如何保护？",
    a: "公开页只显示镇街级位置和匿名摘要，手机号、门牌、身份证、精确定位默认不公开。",
  },
];

const moderationQueue = [
  { type: "物资需求", content: "莲塘镇安置点需折叠床200张", source: "公众提交", time: "10:25", status: "待核验" },
  { type: "求助信息", content: "马岭镇有群众被困，需救援转运", source: "公众提交", time: "10:18", status: "待核验" },
];

const stats = [
  { label: "物资接收", value: "8,742", detail: "件/箱", delta: "较昨日 +1,253", icon: Package },
  { label: "物资发放", value: "6,315", detail: "件/箱", delta: "较昨日 +980", icon: Truck },
  { label: "志愿者参与", value: "1,286", detail: "人次", delta: "较昨日 +210", icon: UsersThree },
  { label: "爱心捐赠", value: "523.6", detail: "万元", delta: "较昨日 +68.3", icon: FirstAidKit },
];

function Badge({ children, tone = "green" }) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}

function IconBox({ icon: Icon, tone = "blue" }) {
  return (
    <span className={`icon-box icon-${tone}`}>
      <Icon size={24} weight="duotone" />
    </span>
  );
}

function Panel({ title, subtitle, icon: Icon, children, className = "", action }) {
  return (
    <section className={`panel ${className}`}>
      <div className="panel-head">
        <div>
          <h2>
            {Icon && <Icon size={22} weight="duotone" />}
            {title}
          </h2>
          {subtitle && <p>{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

function Modal({ type, onClose }) {
  if (!type) return null;

  const isLogin = type === "login";
  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
        <div className="modal-head">
          <h2>{isLogin ? "协同员登录" : "提交互助信息"}</h2>
          <button onClick={onClose} aria-label="关闭">×</button>
        </div>
        <div className="form-grid">
          <label>
            <span>{isLogin ? "手机号 / 工作账号" : "信息类型"}</span>
            <input placeholder={isLogin ? "请输入授权账号" : "物资需求 / 志愿协助 / 官方渠道"} />
          </label>
          <label>
            <span>{isLogin ? "验证码" : "所在镇街"}</span>
            <input placeholder={isLogin ? "6位验证码" : "仅填写镇街，不填写门牌"} />
          </label>
          {!isLogin && (
            <label className="full">
              <span>内容摘要</span>
              <textarea placeholder="请描述需求、数量、对接人角色。不要填写身份证、精确住址或完整手机号。" />
            </label>
          )}
        </div>
        <div className="modal-note">
          <LockKey size={18} weight="duotone" />
          {isLogin ? "仅供授权志愿者和协调员使用。" : "提交后进入待核验队列，核验前不会公开发布。"}
        </div>
        <button className="primary full-width" onClick={onClose}>
          {isLogin ? "进入工作台预览" : "提交到待核验队列"}
        </button>
      </div>
    </div>
  );
}

export function App() {
  const [activeFilter, setActiveFilter] = useState("全部");
  const [openFaq, setOpenFaq] = useState(0);
  const [modal, setModal] = useState(null);

  const filteredNeeds = useMemo(() => {
    if (activeFilter === "全部") return needs;
    return needs.filter((item) => item.type === activeFilter);
  }, [activeFilter]);

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">
            <ShieldCheck size={28} weight="fill" />
          </span>
          <div>
            <h1>横州防汛互助信息站</h1>
            <p>公开透明 · 互助有序 · 共渡难关</p>
          </div>
        </div>
        <div className="topbar-actions">
          <span className="update-pill">今日更新</span>
          <span>最后更新：2026-07-09 10:30</span>
          <button className="ghost">
            <HouseLine size={18} weight="duotone" />
            返回首页
          </button>
        </div>
      </header>

      <div className="notice">
        <MegaphoneSimple size={20} weight="duotone" />
        <span>本站所有信息均经核验后发布，仅公开必要信息，保护救援对象隐私。遇紧急情况，请优先联系官方渠道。</span>
      </div>

      <section className="intent-strip" aria-label="本站原则">
        <div className="intent-copy">
          <p className="eyebrow">为什么做这个站</p>
          <h2>真心希望能帮到别人，也真心不想给一线添乱。</h2>
          <p>
            本站只是民间远程信息整理工具，不代表官方机构。我们只做公开渠道汇总、已核验需求展示和志愿协作入口；真实救援、捐赠接收与灾情发布均以官方安排为准。
          </p>
        </div>
        <div className="principle-list">
          <span><CheckCircle size={18} weight="duotone" />不收款、不放私人收款码</span>
          <span><CheckCircle size={18} weight="duotone" />不代替官方发布灾情</span>
          <span><CheckCircle size={18} weight="duotone" />不公开未核验求助信息</span>
          <span><CheckCircle size={18} weight="duotone" />不展示个人功劳或作秀内容</span>
        </div>
      </section>

      <section className="primary-grid">
        <Panel title="官方渠道" subtitle="已核验" icon={ShieldCheck} className="channels">
          <div className="channel-list">
            {channels.map((item) => (
              <article className="channel-row" key={item.name}>
                <IconBox icon={item.name.includes("红十字") ? FirstAidKit : item.name.includes("发布") ? BellRinging : ShieldCheck} tone={item.name.includes("红十字") ? "red" : "blue"} />
                <div>
                  <h3>{item.name}<Badge>{item.badge}</Badge></h3>
                  <p>{item.role}</p>
                  <a href="#channels">{item.link}</a>
                </div>
                <Badge>已核验</Badge>
              </article>
            ))}
          </div>
          <button className="text-button">查看全部官方渠道 <ArrowRight size={16} /></button>
        </Panel>

        <Panel title="当前急需物资" subtitle="已核验" icon={Package} className="supplies">
          <p className="section-note">根据一线反馈，以下物资最为紧缺</p>
          <div className="supply-list">
            {supplies.map((item) => (
              <div className="supply-row" key={item.name}>
                <div className="supply-label">
                  <span>{item.name}</span>
                  {item.urgent && <Badge tone="red">紧缺</Badge>}
                </div>
                <div className="supply-meter" aria-label={`${item.name}进度`}>
                  <span style={{ width: `${Math.min((item.current / item.target) * 100, 100)}%` }} />
                </div>
                <strong>{item.current} / {item.target} {item.unit}</strong>
              </div>
            ))}
          </div>
          <button className="text-button">查看全部需求清单 <ArrowRight size={16} /></button>
        </Panel>

        <Panel title="安全捐赠指引" subtitle="请按指引操作" icon={SealCheck} className="guides">
          <ol className="guide-steps">
            <li><strong>捐赠前</strong><span>先查看当前急需物资，按需捐赠</span></li>
            <li><strong>捐赠方式</strong><span>优先选择官方接收点或集中接收点</span></li>
            <li><strong>物资要求</strong><span>全新、在保质期内、包装完好</span></li>
            <li><strong>凭证保留</strong><span>请保留捐赠凭证，便于查询与公示</span></li>
          </ol>
          <button className="text-button">查看捐赠接收点与流程 <ArrowRight size={16} /></button>
        </Panel>

        <Panel title="辟谣与提醒" icon={Warning} className="rumors">
          <ul className="bullet-list">
            <li>请以官方渠道发布信息为准</li>
            <li>不信谣、不传谣、不造谣</li>
            <li>涉及险情、灾情请勿随意发布</li>
            <li>传播不实信息将依法追责</li>
          </ul>
          <div className="warning-box">如发现谣言或不实信息，请通过官方渠道举报。</div>
          <button className="text-button amber">查看最新辟谣信息 <ArrowRight size={16} /></button>
        </Panel>

        <Panel title="志愿者 / 协调员入口" subtitle="仅供授权人员使用" icon={UsersThree} className="volunteer">
          <button className="primary" onClick={() => setModal("login")}>
            <SignIn size={20} weight="duotone" />
            登录工作台
          </button>
          <button className="secondary" onClick={() => setModal("submit")}>志愿者注册</button>
          <div className="link-list">
            <a href="#guide">志愿者行为规范</a>
            <a href="#privacy">隐私与信息安全说明</a>
            <a href="#faq">常见问题（志愿者版）</a>
          </div>
        </Panel>
      </section>

      <section className="secondary-grid">
        <Panel
          title="需求动态"
          subtitle="已核验 · 匿名发布"
          icon={ClipboardText}
          className="needs-panel"
          action={
            <div className="segmented" role="tablist" aria-label="需求筛选">
              {["全部", "物资需求", "求助信息", "志愿协助"].map((filter) => (
                <button
                  key={filter}
                  className={activeFilter === filter ? "active" : ""}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
          }
        >
          <div className="needs-list">
            {filteredNeeds.map((item) => (
              <article className="need-row" key={`${item.title}-${item.time}`}>
                <Badge tone={item.type === "求助信息" ? "blue" : item.type === "志愿协助" ? "green" : "orange"}>{item.type}</Badge>
                <h3>{item.title}</h3>
                <span>{item.area}</span>
                <time>{item.time}</time>
                <Badge>{item.status}</Badge>
              </article>
            ))}
          </div>
          <button className="text-button">查看全部需求动态 <ArrowRight size={16} /></button>
        </Panel>

        <Panel title="常见问题 / 规则" icon={ClipboardText} className="faq-panel">
          <div className="faq-list">
            {faq.map((item, index) => (
              <button className={`faq-item ${openFaq === index ? "open" : ""}`} key={item.q} onClick={() => setOpenFaq(openFaq === index ? -1 : index)}>
                <span>{index + 1}. {item.q}</span>
                <CaretDown size={16} weight="bold" />
                {openFaq === index && <p>{item.a}</p>}
              </button>
            ))}
          </div>
          <button className="text-button">查看全部问题与规则 <ArrowRight size={16} /></button>
        </Panel>

        <Panel title="公开进展" subtitle="数据定时更新" icon={ChartBar} className="stats-panel">
          <div className="stats-grid">
            {stats.map((item) => {
              const Icon = item.icon;
              return (
                <article className="stat-card" key={item.label}>
                  <IconBox icon={Icon} tone={item.label.includes("发放") ? "green" : item.label.includes("志愿") ? "orange" : item.label.includes("捐赠") ? "purple" : "blue"} />
                  <div>
                    <strong>{item.value}</strong>
                    <span>{item.label}（{item.detail}）</span>
                    <p>{item.delta}</p>
                  </div>
                </article>
              );
            })}
          </div>
          <p className="source-note">数据来源：示例数据。真实上线需接入横州市红十字会 / 应急管理局公示口径。</p>
          <button className="text-button">查看详细公示与说明 <ArrowRight size={16} /></button>
        </Panel>
      </section>

      <Panel title="协调员工作台预览" subtitle="仅展示非敏感数据" icon={BellRinging} className="workspace-preview">
        <div className="workspace-grid">
          <div className="queue-table">
            <div className="queue-head">
              <h3>待处理信息 <Badge tone="red">{moderationQueue.length}</Badge></h3>
            </div>
            <div className="table">
              <div className="table-row table-title">
                <span>类型</span><span>内容摘要</span><span>来源</span><span>时间</span><span>状态</span><span>操作</span>
              </div>
              {moderationQueue.map((row) => (
                <div className="table-row" key={row.content}>
                  <span>{row.type}</span><span>{row.content}</span><span>{row.source}</span><span>{row.time}</span><span><Badge tone="orange">{row.status}</Badge></span>
                  <span className="row-actions"><button>查看</button><button>核验通过</button><button className="danger">驳回</button></span>
                </div>
              ))}
            </div>
          </div>
          <div className="quick-actions">
            <h3>快捷操作</h3>
            <button><MegaphoneSimple size={20} weight="duotone" />发布公告</button>
            <button><ShieldCheck size={20} weight="duotone" />发布辟谣</button>
            <button><Package size={20} weight="duotone" />更新物资需求</button>
            <button><ChartBar size={20} weight="duotone" />查看数据报表</button>
          </div>
          <div className="work-tips">
            <h3>工作提示</h3>
            <ul>
              <li>及时核验并处理新提交的信息。</li>
              <li>发布前请再次确认内容准确性。</li>
              <li>保护个人隐私，勿公开未核验信息。</li>
            </ul>
            <button className="text-button">进入工作台（完整版） <ArrowRight size={16} /></button>
          </div>
        </div>
      </Panel>

      <Modal type={modal} onClose={() => setModal(null)} />
    </main>
  );
}
