import { useEffect, useMemo, useState } from "react";
import {
  ArrowClockwise,
  ArrowRight,
  BellRinging,
  CaretDown,
  ChartBar,
  CheckCircle,
  ClipboardText,
  ClockCounterClockwise,
  Database,
  FirstAidKit,
  HouseLine,
  LinkSimple,
  MapPinLine,
  MegaphoneSimple,
  Package,
  SealCheck,
  ShieldCheck,
  Truck,
  Warning,
} from "@phosphor-icons/react";

const fallbackData = {
  updatedAt: "2026-07-09 10:30",
  nextReview: "建议每30-60分钟核验一次",
  sourceSummary: "横州发布、南宁发布、广西新闻网等公开渠道",
  officialChannels: [
    {
      name: "横州市慈善会",
      role: "抗洪救灾爱心募捐倡议发布单位",
      link: "以横州发布 / 南宁发布原文为准",
      badge: "官方倡议",
    },
    {
      name: "南宁市慈善总会",
      role: "南宁市台风受灾区域群众救灾重建募捐",
      link: "咨询热线：0771-5567012、5527228",
      badge: "官方渠道",
    },
    {
      name: "横州市应急管理局",
      role: "防汛救灾与应急处置权威信息",
      link: "请以官方通报为准",
      badge: "官方信息",
    },
    {
      name: "横州发布 / 南宁发布",
      role: "权威通告、募捐倡议、辟谣信息发布",
      link: "微信公众号官方发布",
      badge: "权威发布",
    },
  ],
  donations: [
    {
      title: "横州市慈善会资金捐赠",
      type: "银行转账",
      details: [
        "账户：横州市慈善会",
        "开户行：广西北部湾银行横州市公园路支行",
        "账号：805478630100001",
        "备注：抗洪救灾+姓名/单位+联系电话",
      ],
      source: "来源：横州市慈善会抗洪救灾爱心募捐倡议书",
      verified: "需二次核对官方原文后使用",
    },
    {
      title: "横州市慈善会物资接收",
      type: "物资捐赠",
      details: [
        "办公室：0771-3480685",
        "接收地址：横州市横州镇柳明路130号横州市民政局一楼",
        "建议先电话确认当日急需清单和接收时间",
      ],
      source: "来源：横州市慈善会抗洪救灾爱心募捐倡议书",
      verified: "公开渠道",
    },
    {
      title: "南宁市慈善总会捐赠咨询",
      type: "咨询与票据",
      details: [
        "物资对接热线：0771-5567012、5527228",
        "票据咨询：0771-5505901",
        "建议通过官方页面确认收款账户与开票流程",
      ],
      source: "来源：南宁市慈善总会募捐倡议",
      verified: "公开渠道",
    },
  ],
  supplies: [
    { name: "饮用水", level: "紧缺", note: "优先确认安置点当日需求", trend: "持续需要" },
    { name: "方便食品", level: "紧缺", note: "适合即食、易分发、保质期明确", trend: "持续需要" },
    { name: "雨衣雨鞋", level: "紧缺", note: "用于转运、装卸、清淤场景", trend: "需要核量" },
    { name: "消杀用品", level: "重点", note: "灾后清洁与卫生防疫使用", trend: "逐步上升" },
    { name: "照明/电源", level: "重点", note: "手电、电池、移动电源等", trend: "按点位匹配" },
  ],
  frontline: [
    {
      area: "横州镇及周边安置点",
      status: "安置保障",
      summary: "公开信息显示，饮用水、方便食品、被褥、照明等保障类物资仍需按安置点核量匹配。",
      time: "待官方滚动更新",
    },
    {
      area: "云表镇、校椅镇、六景镇等受影响区域",
      status: "道路与转运",
      summary: "部分道路、低洼区域和村屯转运需求需以现场指挥和官方通报为准，不建议个人自行前往。",
      time: "待官方滚动更新",
    },
    {
      area: "灾后恢复阶段",
      status: "清理消杀",
      summary: "积水退去后，消杀、清淤、生活物资补给和困难群众帮扶会成为后续重点。",
      time: "待官方滚动更新",
    },
  ],
  rumorTips: [
    "不转发未经核验的伤亡、失联、溃坝、求助截图。",
    "捐款前核对账号、户名、开户行和官方原文。",
    "物资捐赠前先电话确认，避免不适用物资堆积。",
    "页面内容如与官方发布不一致，以官方发布为准。",
  ],
  faq: [
    {
      q: "这个页面是不是官方平台？",
      a: "不是。它只是民间远程信息整理页，用来减少找信息的成本。所有救援、捐赠、灾情发布均以官方渠道为准。",
    },
    {
      q: "为什么不开放志愿者注册？",
      a: "公开页面不适合直接招募和管理志愿者。灾害场景下更重要的是公开可靠信息、减少误传、保护隐私。",
    },
    {
      q: "信息如何保持时效性？",
      a: "页面由 data/status.json 驱动，并自动定时刷新。真实上线时，应安排专人只根据官方通报更新数据。",
    },
    {
      q: "可以直接照着页面捐款吗？",
      a: "请先打开官方原文或联系官方热线二次核对。页面只做整理提示，不替代官方收款说明。",
    },
  ],
};

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

function useReliefData() {
  const [data, setData] = useState(fallbackData);
  const [syncState, setSyncState] = useState("使用内置兜底数据");

  useEffect(() => {
    let cancelled = false;

    async function loadData() {
      try {
        const response = await fetch(`./data/status.json?ts=${Date.now()}`, { cache: "no-store" });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const nextData = await response.json();
        if (!cancelled) {
          setData({ ...fallbackData, ...nextData });
          setSyncState("已同步公开数据文件");
        }
      } catch {
        if (!cancelled) setSyncState("数据文件不可用，显示兜底示例");
      }
    }

    loadData();
    const timer = window.setInterval(loadData, 5 * 60 * 1000);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, []);

  return { data, syncState };
}

export function App() {
  const { data, syncState } = useReliefData();
  const [activeFilter, setActiveFilter] = useState("全部");
  const [openFaq, setOpenFaq] = useState(0);

  const filteredFrontline = useMemo(() => {
    if (activeFilter === "全部") return data.frontline;
    return data.frontline.filter((item) => item.status === activeFilter);
  }, [activeFilter, data.frontline]);

  const statusTypes = ["全部", ...Array.from(new Set(data.frontline.map((item) => item.status)))];

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">
            <ShieldCheck size={28} weight="fill" />
          </span>
          <div>
            <h1>横州防汛互助信息站</h1>
            <p>官方渠道 · 物资需求 · 一线状态 · 动态更新</p>
          </div>
        </div>
        <div className="topbar-actions">
          <span className="update-pill">动态信息</span>
          <span>最后同步：{data.updatedAt}</span>
          <button className="ghost">
            <HouseLine size={18} weight="duotone" />
            返回首页
          </button>
        </div>
      </header>

      <div className="notice">
        <MegaphoneSimple size={20} weight="duotone" />
        <span>本站只整理官方公开信息和已核验公共需求，不收款、不代收物资、不发布未核验求助。所有内容以官方原文为准。</span>
      </div>

      <section className="intent-strip" aria-label="本站原则">
        <div className="intent-copy">
          <p className="eyebrow">为什么做这个站</p>
          <h2>真心希望能帮到别人，也真心不想给一线添乱。</h2>
          <p>
            当前版本聚焦公开信息：官方捐赠方式、物资需求、一线状态、辟谣提醒和更新时间。页面不开放志愿者注册，不处理私人求助线索，不展示个人功劳。
          </p>
        </div>
        <div className="principle-list">
          <span><CheckCircle size={18} weight="duotone" />只放官方公开渠道</span>
          <span><CheckCircle size={18} weight="duotone" />捐赠前二次核对</span>
          <span><CheckCircle size={18} weight="duotone" />不公开私人求助</span>
          <span><CheckCircle size={18} weight="duotone" />每次更新保留来源</span>
        </div>
      </section>

      <section className="status-strip" aria-label="信息时效">
        <div>
          <ClockCounterClockwise size={22} weight="duotone" />
          <strong>{data.updatedAt}</strong>
          <span>页面数据最后同步时间</span>
        </div>
        <div>
          <ArrowClockwise size={22} weight="duotone" />
          <strong>5分钟</strong>
          <span>浏览器自动尝试刷新数据</span>
        </div>
        <div>
          <Database size={22} weight="duotone" />
          <strong>{syncState}</strong>
          <span>{data.nextReview}</span>
        </div>
      </section>

      <section className="public-grid">
        <Panel title="官方渠道" subtitle="先核对，再行动" icon={ShieldCheck} className="channels">
          <div className="channel-list">
            {data.officialChannels.map((item) => (
              <article className="channel-row" key={item.name}>
                <IconBox icon={item.name.includes("慈善") ? FirstAidKit : item.name.includes("发布") ? BellRinging : ShieldCheck} tone={item.name.includes("慈善") ? "red" : "blue"} />
                <div>
                  <h3>{item.name}<Badge>{item.badge}</Badge></h3>
                  <p>{item.role}</p>
                  <a href="#channels">{item.link}</a>
                </div>
                <Badge>公开渠道</Badge>
              </article>
            ))}
          </div>
        </Panel>

        <Panel title="官方捐赠信息" subtitle="转账前请核验官方原文" icon={FirstAidKit} className="donation-panel">
          <div className="donation-list">
            {data.donations.map((item) => (
              <article className="donation-card" key={item.title}>
                <div className="donation-title">
                  <h3>{item.title}</h3>
                  <Badge tone={item.verified.includes("核对") ? "orange" : "green"}>{item.type}</Badge>
                </div>
                <ul>
                  {item.details.map((detail) => <li key={detail}>{detail}</li>)}
                </ul>
                <p>{item.source}</p>
                <span className="verify-line"><SealCheck size={16} weight="duotone" />{item.verified}</span>
              </article>
            ))}
          </div>
        </Panel>

        <Panel title="当前物资需求" subtitle="按官方与接收点当日口径更新" icon={Package} className="supplies">
          <div className="supply-list supply-public">
            {data.supplies.map((item) => (
              <article className="supply-public-row" key={item.name}>
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.note}</p>
                </div>
                <Badge tone={item.level === "紧缺" ? "red" : "orange"}>{item.level}</Badge>
                <span>{item.trend}</span>
              </article>
            ))}
          </div>
        </Panel>

        <Panel title="辟谣与提醒" icon={Warning} className="rumors">
          <ul className="bullet-list">
            {data.rumorTips.map((tip) => <li key={tip}>{tip}</li>)}
          </ul>
          <div className="warning-box">如果信息与官方发布不一致，请以官方发布为准，并优先修正本页面。</div>
        </Panel>
      </section>

      <section className="secondary-grid public-secondary">
        <Panel
          title="一线状态"
          subtitle="只展示适合公开的信息"
          icon={ClipboardText}
          className="needs-panel"
          action={
            <div className="segmented" role="tablist" aria-label="一线状态筛选">
              {statusTypes.map((filter) => (
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
          <div className="frontline-list">
            {filteredFrontline.map((item) => (
              <article className="frontline-row" key={`${item.area}-${item.status}`}>
                <IconBox icon={MapPinLine} tone={item.status.includes("安置") ? "blue" : item.status.includes("转运") ? "orange" : "green"} />
                <div>
                  <h3>{item.area}<Badge tone="blue">{item.status}</Badge></h3>
                  <p>{item.summary}</p>
                  <time>{item.time}</time>
                </div>
              </article>
            ))}
          </div>
        </Panel>

        <Panel title="信息来源与更新机制" subtitle={data.sourceSummary} icon={ChartBar} className="source-panel">
          <div className="source-flow">
            <div><strong>1. 官方发布</strong><span>只采集政府、慈善会、红十字会、权威媒体等公开信息。</span></div>
            <div><strong>2. 人工核对</strong><span>更新前核对时间、来源、账号、热线和适用范围。</span></div>
            <div><strong>3. 页面刷新</strong><span>数据写入 status.json 后，页面自动读取最新内容。</span></div>
          </div>
          <button className="text-button">
            <LinkSimple size={16} weight="duotone" />
            公开数据文件：/data/status.json
          </button>
        </Panel>

        <Panel title="常见问题 / 规则" icon={ClipboardText} className="faq-panel">
          <div className="faq-list">
            {data.faq.map((item, index) => (
              <button className={`faq-item ${openFaq === index ? "open" : ""}`} key={item.q} onClick={() => setOpenFaq(openFaq === index ? -1 : index)}>
                <span>{index + 1}. {item.q}</span>
                <CaretDown size={16} weight="bold" />
                {openFaq === index && <p>{item.a}</p>}
              </button>
            ))}
          </div>
        </Panel>
      </section>

      <section className="closing-note">
        <Truck size={22} weight="duotone" />
        <p>页面目标：让想帮忙的人先找到正确渠道，让一线少接无效电话，让未核验信息少传播一点。</p>
      </section>
    </main>
  );
}
