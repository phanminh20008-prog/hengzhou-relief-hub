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
  "updatedAt": "2026-07-09 21:24",
  "nextReview": "建议每30-60分钟核验一次",
  "sourceSummary": "横州发布、南宁发布、广西新闻网、新华社、广西日报/澎湃新闻等公开渠道",
  "officialChannels": [
    {
      "name": "横州市慈善会",
      "role": "抗洪救灾爱心募捐倡议发布单位",
      "link": "查看募捐倡议公开来源",
      "url": "https://v.gxnews.com.cn/sp/21966809",
      "badge": "官方倡议"
    },
    {
      "name": "南宁市慈善总会",
      "role": "南宁市台风受灾区域群众救灾重建募捐",
      "link": "查看南宁市慈善总会倡议",
      "url": "https://v.gxnews.com.cn/sp/21966809",
      "badge": "官方渠道"
    },
    {
      "name": "横州市应急管理局",
      "role": "防汛救灾与应急处置权威信息",
      "link": "打开横州市人民政府官网",
      "url": "https://www.gxhx.gov.cn/",
      "badge": "官方信息"
    },
    {
      "name": "横州发布 / 南宁发布",
      "role": "权威通告、募捐倡议、辟谣信息发布",
      "link": "查看权威公开转载来源",
      "url": "https://v.gxnews.com.cn/sp/21966809",
      "badge": "权威发布"
    }
  ],
  "donations": [
    {
      "title": "横州市慈善会资金捐赠",
      "type": "银行转账",
      "details": [
        "账户：横州市慈善会",
        "开户行：广西北部湾银行横州市公园路支行",
        "账号：805478630100001",
        "备注：抗洪救灾+姓名/单位+联系电话"
      ],
      "source": "来源：横州市慈善会抗洪救灾爱心募捐倡议书",
      "sourceUrl": "https://v.gxnews.com.cn/sp/21966809",
      "verified": "需二次核对官方原文后使用"
    },
    {
      "title": "横州市慈善会物资接收",
      "type": "物资捐赠",
      "details": [
        "办公室：0771-3480685",
        "原公告接收地址：横州市横州镇柳明路130号横州市民政局一楼",
        "7月9日晚提示：送货前先电话确认柳明路是否可通行、是否仍接收，或是否改送马岭镇健康产业园等接收点"
      ],
      "source": "来源：横州市慈善会抗洪救灾爱心募捐倡议书",
      "sourceUrl": "https://v.gxnews.com.cn/sp/21966809",
      "verified": "原官方公告地址，当前送达需电话复核"
    },
    {
      "title": "南宁市慈善总会捐赠咨询",
      "type": "咨询与票据",
      "details": [
        "物资对接热线：0771-5567012、5527228",
        "票据咨询：0771-5505901",
        "建议通过官方页面确认收款账户与开票流程"
      ],
      "source": "来源：南宁市慈善总会募捐倡议",
      "sourceUrl": "https://m.nn.bendibao.com/news/79746.shtm",
      "verified": "公开渠道"
    }
  ],
  "materialChannels": [
    {
      "title": "横州市马岭镇健康产业园物资接收点",
      "priority": "最新现场接收点（媒体现场核验）",
      "contact": "暂无公开直达电话；先拨打横州市慈善会办公室 0771-3480685 或横州市应急管理局救灾股 7204510 核实路线、收货人和当日需求",
      "address": "横州市马岭镇健康产业园（7月9日现场报道中的物资接收点）",
      "action": "适合按指挥要求集中送达。不要临时直接冲到柳明路，先电话确认柳明路是否可通行、是否仍接收，或是否改送马岭等接收点。",
      "source": "广西日报/澎湃新闻7月9日现场报道",
      "sourceUrl": "https://www.thepaper.cn/newsDetail_forward_33548736"
    },
    {
      "title": "横州市慈善会物资接收点",
      "priority": "原公告接收点，需电话确认通行",
      "contact": "办公室 0771-3480685（送达前务必电话确认）",
      "address": "横州市横州镇柳明路130号横州市民政局一楼",
      "action": "该地址来自7月6日官方倡议；7月9日晚未见该地址最新通行确认。如有人反馈柳明路周边被淹，请不要直接前往，先电话确认是否仍接收或是否改送马岭镇健康产业园等接收点。",
      "source": "横州市慈善会抗洪救灾爱心募捐倡议书",
      "sourceUrl": "https://v.gxnews.com.cn/sp/21966809"
    },
    {
      "title": "横州市应急管理局救灾股",
      "priority": "应急物资官方对接",
      "contact": "救灾股电话 7204510（其余联系人请以官方原文为准）",
      "address": "按电话指引送达指定接收点",
      "action": "适合批量物资、运输车辆、应急设备等先行对接，避免盲目送货。",
      "source": "广西新闻网转载官方募捐信息",
      "sourceUrl": "https://v.gxnews.com.cn/sp/21966809"
    },
    {
      "title": "南宁市慈善总会物资对接",
      "priority": "南宁市级统筹通道",
      "contact": "物资对接热线 0771-5567012、0771-5527228",
      "address": "南宁市青秀区长湖路5号办公楼2楼205室",
      "action": "适合面向南宁市受灾区域的物资咨询、票据和统筹对接。",
      "source": "南宁市慈善总会募捐倡议",
      "sourceUrl": "https://m.nn.bendibao.com/news/79746.shtm"
    }
  ],
  "supplies": [
    {
      "name": "饮用水",
      "level": "紧缺",
      "note": "官方倡议列为最急需物资之一",
      "needed": "数量需电话核量",
      "received": "新华社7月9日报道确认已向安置点和自行疏散点持续投送饮用水",
      "gap": "以接收点当日口径为准"
    },
    {
      "name": "生活食品",
      "level": "紧缺",
      "note": "方便食品、即食食品、保质期明确",
      "needed": "数量需电话核量",
      "received": "新华社7月9日报道确认已同步投送食品，但未单列总量",
      "gap": "以接收点当日口径为准"
    },
    {
      "name": "防汛被褥",
      "level": "紧缺",
      "note": "南宁市慈善总会倡议列为急需",
      "needed": "数量需电话核量",
      "received": "未公开统一到货量",
      "gap": "以接收点当日口径为准"
    },
    {
      "name": "应急生活用品",
      "level": "紧缺",
      "note": "日用品、照明、电源、简易清洁用品等",
      "needed": "数量需电话核量",
      "received": "未公开统一到货量",
      "gap": "以接收点当日口径为准"
    },
    {
      "name": "母婴用品",
      "level": "急需",
      "note": "7月9日现场报道列为当前缺口之一",
      "needed": "数量需接收点电话核量",
      "received": "横州市马岭镇健康产业园物资接收点截至7月9日5时累计接收救援物资43万余件、运出30万余件，未单列母婴用品数量",
      "gap": "以马岭等接收点当日口径为准"
    },
    {
      "name": "消杀清理用品",
      "level": "急需",
      "note": "7月9日现场报道列为当前缺口之一，灾后清淤消杀阶段需求上升",
      "needed": "数量需接收点电话核量",
      "received": "横州市马岭镇健康产业园物资接收点截至7月9日5时累计接收救援物资43万余件、运出30万余件，未单列消杀物资数量",
      "gap": "以马岭等接收点当日口径为准"
    }
  ],
  "frontline": [
    {
      "area": "马岭镇健康产业园物资接收点",
      "status": "物资接收",
      "summary": "广西日报/澎湃新闻7月9日15:10现场报道，横州市马岭镇健康产业园物资接收点正在运转；截至7月9日5时已累计接收救援物资43万余件、运出30万余件，目前仍缺母婴用品、消杀物资等。",
      "time": "7月9日21:24核验",
      "source": "广西日报/澎湃新闻现场报道",
      "sourceUrl": "https://www.thepaper.cn/newsDetail_forward_33548736"
    },
    {
      "area": "横州市转移安置点、受灾村屯与抢修一线",
      "status": "转移安置完成并持续保供",
      "summary": "新华社7月9日报道援引南宁市防汛救灾新闻发布会信息称，截至7月9日11时，横州市应转移的5.45万人已全部安全转移安置到位；全市已向安置点和自行疏散点输送10万件衣物以及饮用水、食品、药品、充电宝等生活必需品，6.3万用户恢复供电，通信基站正常使用率恢复到87.7%。",
      "time": "7月9日16:40核验",
      "source": "新华社 / 南宁市防汛救灾新闻发布会",
      "sourceUrl": "https://www.news.cn/local/20260709/f5edbe6b57274020a867624bd5401d5d/c.html"
    },
    {
      "area": "横州镇、校椅镇、云表镇等临时安置点",
      "status": "安置保障",
      "summary": "新华社报道，横州市已在多个乡镇设置6个临时安置点，配备饮用水、方便食品、被褥、应急照明等生活必需物资；部分安置点现场发放方便面、面包、饮用水等。",
      "time": "7月9日13:38核验",
      "source": "新华社防汛救灾一线见闻",
      "sourceUrl": "https://www.news.cn/20260708/70741643fb9f463f8bebadbb7c21b6fc/c.html"
    },
    {
      "area": "云表镇及周边医疗保障点",
      "status": "医疗保障",
      "summary": "新华社通报，横州市云表镇、宾阳县甘棠镇等地设置11个临时医疗点，提供24小时医疗救治服务，配备常用药品和急救设备。",
      "time": "7月9日13:38核验",
      "source": "新华社/新华网通报",
      "sourceUrl": "https://www.news.cn/20260707/83d36f41d57c4ae79041451a8aa103e0/c.html"
    },
    {
      "area": "镇龙乡东圩路段及受阻村屯",
      "status": "通道抢修",
      "summary": "横州市政府7月8日通报，镇龙乡多处道路因塌方和积水阻断通行，校椅镇青桐村委小学已设救援物资堆放点，物资经榃可村中转后再人工背运入村；安能公司已进场抢修，关键路段基本打通，无人机同步用于物资投送和灾情排查。",
      "time": "7月9日13:38核验",
      "source": "横州市人民政府门户网站",
      "sourceUrl": "https://www.gxhx.gov.cn/yw/hzsyw/2026nhzsyw/t6677747.html"
    },
    {
      "area": "云表镇安置点及周边保障点",
      "status": "安置保障",
      "summary": "广西日报客户端7月9日现场报道显示，云表镇洪水正逐步退去，安置点周边仍在持续发放和分装物资；云表收费站附近临时爱心食堂保持24小时供餐，已送出一万多份热饭热菜，安置保障仍在高强度运行。",
      "time": "7月9日13:38核验",
      "source": "广西日报客户端 / 手机广西网",
      "sourceUrl": "https://v.gxnews.com.cn/a/21967653"
    },
    {
      "area": "云表镇现场医疗点及蛇伤救治通道",
      "status": "医疗保障",
      "summary": "新华社7月8日报道，横州市已紧急扩充市人民医院蛇毒血清库存，当前储备量可满足救治需求；云表镇持续布设现场医疗点位，并开通蛇伤急救绿色通道，支持快速接诊、快速处置、快速救治。",
      "time": "7月9日14:38核验",
      "source": "新华社 / 新华网",
      "sourceUrl": "https://www.news.cn/local/20260708/786c1b90f8654437a33266c431a82268/c.html"
    }
  ],
  "rumorTips": [
    "不转发未经核验的伤亡、失联、溃坝、求助截图。",
    "捐款前核对账号、户名、开户行和官方原文。",
    "物资捐赠前先电话确认，避免不适用物资堆积。",
    "网传“横州抗蛇毒血清告急”等说法未获权威证实；新华社7月8日报道显示当地血清储备可满足当前救治需求。",
    "横州市公安局7月8日已辟谣“南康村发现很多尸体”等说法，未见权威通报前不要转发灾情聊天记录或二手截图。",
    "广西网络举报平台7月8日已辟谣“横州娘山水库即将溃坝”等说法不实，涉及水库险情的信息只以官方通报为准。",
    "页面内容如与官方发布不一致，以官方发布为准。"
  ]
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
          <span>数据核验：{data.updatedAt}</span>
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
          <span>页面数据最近核验时间</span>
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
                  <a className="channel-link" href={item.url} target="_blank" rel="noreferrer">
                    {item.link} <ArrowRight size={14} />
                  </a>
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
                {item.sourceUrl && <a className="source-link" href={item.sourceUrl} target="_blank" rel="noreferrer">查看公开来源 <ArrowRight size={14} /></a>}
                <span className="verify-line"><SealCheck size={16} weight="duotone" />{item.verified}</span>
              </article>
            ))}
          </div>
        </Panel>

        <Panel title="官方捐物资通道" subtitle="最重要：先联系，再送达" icon={Truck} className="material-panel">
          <div className="material-list">
            {data.materialChannels.map((item) => (
              <article className="material-card" key={item.title}>
                <div className="donation-title">
                  <h3>{item.title}</h3>
                  <Badge tone="green">{item.priority}</Badge>
                </div>
                <p><strong>联系方式：</strong>{item.contact}</p>
                <p><strong>接收地址：</strong>{item.address}</p>
                <p><strong>操作建议：</strong>{item.action}</p>
                <a className="source-link" href={item.sourceUrl} target="_blank" rel="noreferrer">查看来源：{item.source} <ArrowRight size={14} /></a>
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
                <span>需求数量：{item.needed}</span>
                <span>已到/已公开：{item.received}</span>
                <span>缺口口径：{item.gap}</span>
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
                  {item.sourceUrl && <a className="frontline-source" href={item.sourceUrl} target="_blank" rel="noreferrer">来源：{item.source} <ArrowRight size={14} /></a>}
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
            {(data.faq || []).map((item, index) => (
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
