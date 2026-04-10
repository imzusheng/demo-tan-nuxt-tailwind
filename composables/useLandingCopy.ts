import { computed, type Ref } from 'vue'

export type LocaleCode = 'zh' | 'en' | 'ja' | 'ko' | 'es'

export interface LocaleOption {
  code: LocaleCode
  label: string
}

export interface DemoItem {
  id: string
  label: string
  group: string
  badge?: string
  prompt: string
  status: string
  summary: string
  chips: string[]
  previewTitle: string
  previewBody: string
  accent: string
}

export interface FaqItem {
  q: string
  a: string
}

export interface CopyBlock {
  brand: string
  promoPill: string
  promoText: string
  promoHighlight: string
  promoCta: string
  nav: string[]
  dashboard: string
  signIn: string
  breadcrumbHome: string
  pageName: string
  title: string
  subtitle: string
  commandLead: string
  command: string
  copied: string
  copyLabel: string
  localeLabel: string
  demoItems: DemoItem[]
  agentsTitle: string
  agentsBody: string
  capabilityCards: Array<{ title: string; body: string }>
  modelTitle: string
  modelBody: string
  models: string[]
  faqTitle: string
  faqBody: string
  faqs: FaqItem[]
}

const localeOptions: LocaleOption[] = [
  { code: 'zh', label: '中文' },
  { code: 'en', label: 'EN' },
  { code: 'ja', label: '日本語' },
  { code: 'ko', label: '한국어' },
  { code: 'es', label: 'ES' }
]

const en: CopyBlock = {
  brand: 'Velvet',
  promoPill: 'LIMITED OFFER',
  promoText: '365 Unlimited Free',
  promoHighlight: 'Pleasure Scene Kit',
  promoCta: 'Get It Now',
  nav: ['Use Cases', 'AI Tools', 'Resources', 'Models', 'Skill', 'API', 'Pricing'],
  dashboard: 'Dashboard',
  signIn: 'Sign In',
  breadcrumbHome: 'Home',
  pageName: 'Velvet Skill',
  title: 'Velvet Skill for OpenClaw',
  subtitle: 'Plug Velvet Skill into your AI assistant and unlock tasteful product visuals, campaign scripts, localized pages, and voice-ready assets in one unified toolkit.',
  commandLead: 'Copy to your agent to install',
  command: 'Install Velvet Skill for me: https://github.com/velvetai/skill.git',
  copied: 'Copied',
  copyLabel: 'Copy command',
  localeLabel: 'Language',
  demoItems: [
    {
      id: 'install',
      group: 'Quick Start',
      label: 'Install Skill',
      prompt: 'Install Velvet Skill for me: https://github.com/velvetai/skill.git',
      status: 'Velvet Skill installed successfully',
      summary: 'You now have access to discreet product visuals, multilingual pages, campaign scripts, and voice-ready content through your AI assistant.',
      chips: ['Product visuals', 'Ad scripts', 'Localized PDP', 'Voice & TTS', 'Discreet copy', 'Scene edits'],
      previewTitle: 'Skill connected',
      previewBody: 'Everything is ready for product workflows.',
      accent: 'violet'
    },
    {
      id: 'video',
      group: 'Video',
      badge: 'DEMO',
      label: 'Generate Videos',
      prompt: 'Create a 15s vertical launch video for a premium intimate massager. Tone: refined, calm, discreet. Market: US + Japan.',
      status: 'AI analysis',
      summary: 'Structuring shot list, key selling points, duration, and region-safe copy before generation.',
      chips: ['9:16 launch cut', 'Close-up texture', 'Soft rim light', 'Market-safe wording'],
      previewTitle: 'Velvet Curve',
      previewBody: 'Premium silicone body, whisper-quiet motor, discreet shipping.',
      accent: 'rose'
    },
    {
      id: 'avatar',
      group: 'Video',
      badge: 'DEMO',
      label: 'Create Talking Avatars',
      prompt: 'Turn this product portrait into a calm presenter video that introduces safety, texture, and private packaging in English and Japanese.',
      status: 'AI analysis',
      summary: 'Matching presenter tone, subtitles, and soft motion timing for a brand-safe product intro.',
      chips: ['Talking avatar', 'EN / JP captions', 'Private packaging', 'Trust-first script'],
      previewTitle: 'Soft-led explainer',
      previewBody: 'Presenter-led intro with careful wording and clean subtitle pacing.',
      accent: 'violet'
    },
    {
      id: 'image',
      group: 'Image',
      badge: 'DEMO',
      label: 'Generate Images',
      prompt: 'Generate 4 hero images for a matte-black couple toy on satin fabric, dark studio lighting, premium ecommerce style.',
      status: 'Scene building',
      summary: 'Preparing hero shots, listing-image crops, and social-safe lighting variations.',
      chips: ['Hero image set', 'Satin backdrop', 'Dark studio', 'Ecommerce crop'],
      previewTitle: 'Hero image pack',
      previewBody: 'A grid of premium stills tuned for PDP and ads.',
      accent: 'gold'
    },
    {
      id: 'edit',
      group: 'Image',
      badge: 'DEMO',
      label: 'Image Editing',
      prompt: 'Keep the product shape unchanged. Replace the background with smoked glass, brushed metal, and a dim cherry glow.',
      status: 'Editing scene',
      summary: 'Preserving silhouette and finish while rebuilding the environment around the product.',
      chips: ['Background swap', 'Material safe', 'Shadow cleanup', 'Brand tone'],
      previewTitle: 'Scene replacement',
      previewBody: 'Product stays fixed while atmosphere is upgraded.',
      accent: 'rose'
    },
    {
      id: 'model',
      group: 'Image',
      badge: 'DEMO',
      label: 'Product Model Images',
      prompt: 'Create hand-held lifestyle shots for a compact vibrator with a neutral robe look, no explicit posture, and warm editorial light.',
      status: 'Casting style',
      summary: 'Building a tasteful hand-held showcase with non-explicit body language and controlled framing.',
      chips: ['Lifestyle stills', 'Editorial light', 'Neutral styling', 'Safe framing'],
      previewTitle: 'Lifestyle product shots',
      previewBody: 'Hands, texture, and packaging are presented without vulgar framing.',
      accent: 'gold'
    },
    {
      id: 'voice',
      group: 'Audio',
      badge: 'DEMO',
      label: 'Generate Voiceovers',
      prompt: 'Write and voice a 20-second ad script for a beginner-friendly product. English female voice, warm and reassuring.',
      status: 'Voice generation',
      summary: 'Generating a warm, low-pressure narration with retail-safe pacing and pronunciation.',
      chips: ['Warm female voice', '20s ad script', 'Retail-safe tone', 'US English'],
      previewTitle: 'Voice-ready ad cut',
      previewBody: 'Waveform, captions, and script are generated together.',
      accent: 'violet'
    }
  ],
  agentsTitle: 'Connect Velvet Skill to the agents you already use',
  agentsBody: 'Keep the original product page rhythm, but swap the workflow to intimate-commerce assets with stricter visual tone and safer copy.',
  capabilityCards: [
    { title: 'Campaign-safe visuals', body: 'Dark, premium, and controlled. Built for brand pages and paid ads rather than noisy novelty styling.' },
    { title: 'Localized product pages', body: 'Prepare EN, ZH, JA, KO, and ES storefront copy from one brief and one visual system.' },
    { title: 'Tasteful lifestyle mockups', body: 'Show texture, scale, and packaging without crossing into explicit presentation.' },
    { title: 'Voice + script bundle', body: 'Output short-form voiceovers, subtitles, and ad-ready scripts in the same loop.' }
  ],
  modelTitle: 'Supported models',
  modelBody: 'Same grid logic as the reference page, but tuned for intimate retail work instead of general AI media.',
  models: ['Hero Shot', 'Dark Studio', 'Soft Editorial', 'Texture Boost', 'Scene Replace', 'Voiceover', 'Subtitle Sync', 'PDP Crop'],
  faqTitle: 'Frequently asked questions',
  faqBody: 'Answers stay practical: brand-safe, retail-safe, and built around product marketing.',
  faqs: [
    { q: 'Can this page switch languages?', a: 'Yes. The homepage supports multiple locales and keeps the same layout shell while switching copy.' },
    { q: 'Can I upload local product images?', a: 'Yes. The workflow is designed around local reference images, packaging photos, and short clips.' },
    { q: 'Does it stay discreet?', a: 'Yes. The visual direction stays premium and controlled instead of explicit.' },
    { q: 'Can I reuse the same brief for multiple markets?', a: 'Yes. Product copy, scripts, subtitles, and hero images can all branch from one brief.' }
  ]
}

const zh: CopyBlock = {
  brand: 'Velvet',
  promoPill: '限时优惠',
  promoText: '365 次无限生成',
  promoHighlight: '情趣用品素材包',
  promoCta: '立即体验',
  nav: ['使用场景', 'AI 工具', '资源', '模型', 'Skill', 'API', '价格'],
  dashboard: '工作台',
  signIn: '登录',
  breadcrumbHome: '首页',
  pageName: 'Velvet Skill',
  title: 'Velvet Skill for OpenClaw',
  subtitle: '把 Velvet Skill 接到你的 AI 助手里，统一做情趣用品主图、投放视频、商品页多语言文案和语音素材，整体风格保持克制和高级。',
  commandLead: '复制给你的 Agent 安装',
  command: 'Install Velvet Skill for me: https://github.com/velvetai/skill.git',
  copied: '已复制',
  copyLabel: '复制命令',
  localeLabel: '语言',
  demoItems: [
    {
      id: 'install',
      group: '快速开始',
      label: '安装 Skill',
      prompt: 'Install Velvet Skill for me: https://github.com/velvetai/skill.git',
      status: 'Velvet Skill 安装成功',
      summary: '现在可以直接用 AI 助手生成情趣用品主图、投放脚本、多语言详情页和语音内容。',
      chips: ['商品主图', '投放脚本', '多语言详情页', '语音生成', '隐私文案', '场景替换'],
      previewTitle: 'Skill 已连接',
      previewBody: '已经可以开始产品内容工作流。',
      accent: 'violet'
    },
    {
      id: 'video',
      group: '视频',
      badge: 'DEMO',
      label: '生成视频',
      prompt: '做一个 15 秒竖版新品视频，产品是高端情趣按摩器，调性克制、安静、高级，投放美国和日本市场。',
      status: 'AI 分析中',
      summary: '正在组织镜头、卖点、时长和合规文案，再进入生成。',
      chips: ['9:16 竖版', '近景质感', '柔和轮廓光', '合规表达'],
      previewTitle: 'Velvet Curve',
      previewBody: '柔感硅胶外壳，低噪电机，支持隐私包装。',
      accent: 'rose'
    },
    {
      id: 'avatar',
      group: '视频',
      badge: 'DEMO',
      label: '讲解人视频',
      prompt: '把这张产品肖像图做成讲解视频，重点介绍安全材质、手感和隐私包装，输出英文和日文字幕。',
      status: 'AI 分析中',
      summary: '正在匹配讲解语气、字幕节奏和口播结构，保持品牌安全。',
      chips: ['讲解人视频', '英日字幕', '隐私包装', '信任感脚本'],
      previewTitle: '讲解型短视频',
      previewBody: '偏温和讲解，不做低俗表达。',
      accent: 'violet'
    },
    {
      id: 'image',
      group: '图片',
      badge: 'DEMO',
      label: '生成图片',
      prompt: '给一款磨砂黑情侣玩具做 4 张主图，背景用缎面布料，暗调摄影棚光感，适合高端电商。',
      status: '场景生成中',
      summary: '正在准备主图、列表图和社媒裁切版本。',
      chips: ['主图套组', '缎面背景', '暗调影棚', '电商裁切'],
      previewTitle: '主图素材包',
      previewBody: '一套适合详情页和投放的高级静物图。',
      accent: 'gold'
    },
    {
      id: 'edit',
      group: '图片',
      badge: 'DEMO',
      label: '图片编辑',
      prompt: '产品形状不要动，把背景改成烟熏玻璃、拉丝金属和暗红色边缘光。',
      status: '场景编辑中',
      summary: '保留产品轮廓和材质，只替换整体氛围。',
      chips: ['背景替换', '材质保持', '阴影清理', '品牌调性'],
      previewTitle: '场景替换',
      previewBody: '不动产品，只升级画面氛围。',
      accent: 'rose'
    },
    {
      id: 'model',
      group: '图片',
      badge: 'DEMO',
      label: '产品模特图',
      prompt: '做一组手持生活化产品图，服装中性，姿势克制，不要露骨，偏暖色编辑风。',
      status: '模特风格处理中',
      summary: '正在控制动作、取景和肢体表达，保持品味和安全边界。',
      chips: ['生活化展示', '编辑风灯光', '中性穿搭', '安全构图'],
      previewTitle: '生活方式图',
      previewBody: '展示手感、大小和包装，不做露骨构图。',
      accent: 'gold'
    },
    {
      id: 'voice',
      group: '音频',
      badge: 'DEMO',
      label: '生成配音',
      prompt: '写一段 20 秒新品广告词并直接配音，英文女声，温和、可靠、适合新手用户。',
      status: '语音生成中',
      summary: '正在生成温和的口播节奏和零压迫感文案。',
      chips: ['英文女声', '20 秒广告', '合规口播', '新手友好'],
      previewTitle: '配音广告片段',
      previewBody: '波形、字幕和脚本一起出。',
      accent: 'violet'
    }
  ],
  agentsTitle: '把 Velvet Skill 接到你已经在用的 Agent 上',
  agentsBody: '页面结构和原站保持同一路子，但内容换成情趣用品品牌、电商和投放工作流。',
  capabilityCards: [
    { title: '投放可用的高级视觉', body: '整体偏暗、偏高级、偏克制，适合品牌页和广告，不走杂乱玩具风。' },
    { title: '多语言商品页', body: '同一份 brief，快速拆成中英日韩西等版本。' },
    { title: '生活方式产品图', body: '重点展示材质、尺度和包装，不做露骨呈现。' },
    { title: '配音和脚本一体', body: '短视频脚本、字幕和口播可以一起出。' }
  ],
  modelTitle: '支持模型',
  modelBody: '保留参考页那种规则网格，但能力标签换成更适合情趣用品电商的类型。',
  models: ['主图生成', '暗调影棚', '柔光编辑风', '材质增强', '场景替换', '配音', '字幕同步', '详情页裁切'],
  faqTitle: '常见问题',
  faqBody: '回答尽量务实，只围绕品牌安全、零售安全和产品营销。',
  faqs: [
    { q: '这个页面支持多语言吗？', a: '支持。首页可以切多语言，布局保持一致，只切换文案。' },
    { q: '能直接上传本地产品图吗？', a: '能。产品图、包装图、短视频都可以直接喂进去。' },
    { q: '整体会不会做得太露骨？', a: '不会。默认就是高级、克制、适合品牌和电商的表达。' },
    { q: '同一套 brief 能不能多市场复用？', a: '可以。文案、字幕、脚本和主图都能从一份 brief 往外拆。' }
  ]
}

const messages: Record<LocaleCode, CopyBlock> = {
  zh,
  en,
  ja: en,
  ko: en,
  es: en
}

export const useLandingCopy = (locale: Ref<LocaleCode>) => {
  const current = computed(() => messages[locale.value] ?? messages.en)
  return { localeOptions, current }
}
