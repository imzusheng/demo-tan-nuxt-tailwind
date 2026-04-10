<script setup lang="ts">
import type { DemoItem, LocaleCode } from '~/composables/useLandingCopy'

const locale = useState<LocaleCode>('velvet-locale', () => 'zh')
const { localeOptions, current } = useLandingCopy(locale)

const showPromo = ref(true)
const copied = ref(false)
const activeDemoId = ref('install')
let rotateTimer: ReturnType<typeof setInterval> | null = null

const demoGroups = computed(() => {
  const groups: Array<{ name: string; items: DemoItem[] }> = []

  for (const item of current.value.demoItems) {
    const existing = groups.find((group) => group.name === item.group)
    if (existing) {
      existing.items.push(item)
      continue
    }

    groups.push({ name: item.group, items: [item] })
  }

  return groups
})

const activeDemo = computed(() => {
  return current.value.demoItems.find((item) => item.id === activeDemoId.value) ?? current.value.demoItems[0]
})

const setLocaleFromBrowser = () => {
  const stored = window.localStorage.getItem('velvet-locale') as LocaleCode | null
  const browser = navigator.language.toLowerCase()

  if (stored && localeOptions.some((item) => item.code === stored)) {
    locale.value = stored
    return
  }

  if (browser.startsWith('zh')) locale.value = 'zh'
  else if (browser.startsWith('ja')) locale.value = 'ja'
  else if (browser.startsWith('ko')) locale.value = 'ko'
  else if (browser.startsWith('es')) locale.value = 'es'
  else locale.value = 'en'
}

const startRotation = () => {
  if (rotateTimer) clearInterval(rotateTimer)

  rotateTimer = setInterval(() => {
    const list = current.value.demoItems
    const index = list.findIndex((item) => item.id === activeDemoId.value)
    const next = list[(index + 1) % list.length]
    activeDemoId.value = next.id
  }, 4800)
}

const selectDemo = (id: string) => {
  activeDemoId.value = id
  startRotation()
}

const copyCommand = async () => {
  try {
    await navigator.clipboard.writeText(current.value.command)
    copied.value = true
    window.setTimeout(() => { copied.value = false }, 1600)
  } catch (error) {
    console.error(error)
  }
}

watch(locale, (value) => {
  if (import.meta.client) {
    window.localStorage.setItem('velvet-locale', value)
    document.documentElement.lang = value
  }

  activeDemoId.value = current.value.demoItems[0].id
  startRotation()
}, { immediate: true })

onMounted(() => {
  setLocaleFromBrowser()
  startRotation()
})

onUnmounted(() => {
  if (rotateTimer) clearInterval(rotateTimer)
})

useHead(() => ({
  title: `${current.value.pageName} | Intimate Commerce Workflow`,
  meta: [
    { name: 'description', content: current.value.subtitle }
  ]
}))
</script>

<template>
  <main class="min-h-screen bg-black text-white">
    <div
      v-if="showPromo"
      class="flex h-10 items-center justify-center bg-[linear-gradient(90deg,#6f2bff_0%,#4e40f3_55%,#6f2bff_100%)] px-4 text-sm shadow-promo"
    >
      <div class="flex w-full max-w-[1400px] items-center justify-center gap-4">
        <span class="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[12px] font-semibold tracking-[0.08em]">
          {{ current.promoPill }}
        </span>
        <span class="font-medium text-white/95">{{ current.promoText }}</span>
        <span class="font-extrabold text-[#ffe24b]">{{ current.promoHighlight }}</span>
        <button class="rounded-full bg-white px-4 py-1 text-[13px] font-semibold text-brand" type="button">
          {{ current.promoCta }}
        </button>
      </div>
      <button class="absolute right-4 top-2.5 text-xl text-white/70" type="button" @click="showPromo = false">
        ×
      </button>
    </div>

    <header class="page-shell flex items-center justify-between py-4 md:py-5">
      <div class="flex items-center gap-3">
        <div class="grid h-9 w-9 place-items-center rounded-xl bg-white text-black">
          <svg viewBox="0 0 24 24" class="h-5 w-5">
            <path d="M4 15 8 9l3 4 3-7 6 9" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.4" />
          </svg>
        </div>
        <div class="text-[20px] font-bold tracking-[-0.03em]">{{ current.brand }}</div>
      </div>

      <nav class="hidden items-center gap-6 text-[16px] text-white/70 lg:flex">
        <a
          v-for="item in current.nav"
          :key="item"
          href="#"
          class="flex items-center gap-1 transition hover:text-white"
        >
          <span>{{ item }}</span>
          <svg v-if="['Use Cases', 'AI Tools', 'Resources', 'Models', '使用场景', 'AI 工具', '资源', '模型'].includes(item)" viewBox="0 0 20 20" class="h-4 w-4 text-white/50">
            <path d="m5 7 5 5 5-5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" />
          </svg>
        </a>
      </nav>

      <div class="flex items-center gap-3">
        <div class="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 xl:flex">
          <button
            v-for="option in localeOptions"
            :key="option.code"
            class="rounded-full px-3 py-1 text-[12px] font-semibold text-white/65 transition"
            :class="locale === option.code ? 'bg-white text-black' : 'hover:text-white'"
            type="button"
            @click="locale = option.code"
          >
            {{ option.label }}
          </button>
        </div>
        <button class="rounded-[22px] bg-brand px-6 py-3 text-[14px] font-semibold text-white transition hover:bg-[#5d50ff]" type="button">
          {{ current.dashboard }}
        </button>
        <button class="rounded-[22px] bg-brand px-6 py-3 text-[14px] font-semibold text-white transition hover:bg-[#5d50ff]" type="button">
          {{ current.signIn }}
        </button>
      </div>
    </header>

    <section class="purple-glow relative overflow-hidden border-b border-white/5 pb-12 pt-6 md:pt-8">
      <div class="page-shell relative">
        <div class="flex items-center justify-between text-sm text-white/60">
          <div class="flex items-center gap-3">
            <svg viewBox="0 0 20 20" class="h-4 w-4">
              <path d="M3 9.5 10 4l7 5.5v6a1 1 0 0 1-1 1h-3.5v-4h-5v4H4a1 1 0 0 1-1-1z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="1.6" />
            </svg>
            <span>{{ current.breadcrumbHome }}</span>
            <span>›</span>
            <span class="text-white/82">{{ current.pageName }}</span>
          </div>
          <div class="xl:hidden">
            <select v-model="locale" class="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white outline-none">
              <option v-for="option in localeOptions" :key="option.code" :value="option.code">{{ option.label }}</option>
            </select>
          </div>
        </div>

        <div class="mx-auto mt-10 max-w-[1200px] text-center">
          <h1 class="text-[34px] font-extrabold tracking-[-0.04em] text-white md:text-[48px]">
            {{ current.title }}
          </h1>
          <p class="mx-auto mt-5 max-w-[768px] text-[16px] leading-8 text-muted md:text-[18px]">
            {{ current.subtitle }}
          </p>

          <div class="mx-auto mb-10 mt-6 flex max-w-5xl justify-center">
            <div class="inline-flex max-w-full items-center gap-3 rounded-[20px] border border-slate-600 bg-black px-4 py-3 text-left shadow-[0_16px_40px_rgba(0,0,0,0.22)] backdrop-blur">
              <div class="flex max-w-full items-center gap-3">
                <div class="hidden whitespace-nowrap text-[14px] font-bold text-white md:block">
                  {{ current.commandLead }}
                </div>
                <code class="block max-w-[520px] overflow-hidden text-ellipsis whitespace-nowrap rounded-full border border-white/10 bg-white/[0.05] px-3 py-2 font-mono text-[12px] text-[#d8def0] md:max-w-[560px] md:text-[13px]">
                  {{ current.command }}
                </code>
              </div>
              <button
                class="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.02] text-white/80 transition hover:bg-white/[0.06]"
                type="button"
                :aria-label="current.copyLabel"
                @click="copyCommand"
              >
                <svg v-if="!copied" viewBox="0 0 20 20" class="h-5 w-5">
                  <path d="M7 7h8v10H7z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="1.7" />
                  <path d="M5 13H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v1" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="1.7" />
                </svg>
                <svg v-else viewBox="0 0 20 20" class="h-5 w-5 text-emerald-400">
                  <path d="m4 10 4 4 8-9" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                </svg>
              </button>
            </div>
          </div>

          <div class="mx-auto mb-8 flex h-auto max-w-[1200px] flex-col overflow-hidden rounded-[32px] border border-white/10 bg-[#151515] text-left shadow-shell md:h-[680px] md:flex-row">
            <aside class="flex w-full shrink-0 flex-col border-b border-white/6 px-3 py-5 md:w-[200px] md:border-b-0 md:border-r">
              <div v-for="group in demoGroups" :key="group.name" class="border-b border-white/10 pb-3 last:border-b-0 last:pb-0">
                <div class="mb-3 flex items-center justify-between px-3 pt-2">
                  <p class="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/55">
                    <svg viewBox="0 0 20 20" class="h-3.5 w-3.5">
                      <path d="m10 2.5 1.5 5 5.5.2-4.4 3.2 1.5 5.1L10 13l-4.1 3 1.5-5.1-4.4-3.2 5.5-.2z" fill="currentColor" />
                    </svg>
                    {{ group.name }}
                  </p>
                  <span v-if="group.items.some((item) => item.badge)" class="text-[10px] uppercase tracking-[0.16em] text-white/18">
                    DEMO
                  </span>
                </div>

                <div class="flex flex-col gap-1 px-0">
                  <button
                    v-for="item in group.items"
                    :key="item.id"
                    class="rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors"
                    :class="activeDemo.id === item.id ? 'bg-white/[0.10] text-white' : 'text-white/55 hover:bg-white/[0.04] hover:text-white/80'"
                    type="button"
                    @click="selectDemo(item.id)"
                  >
                    {{ item.label }}
                  </button>
                </div>
              </div>
            </aside>

            <section class="relative min-h-0 min-w-0 flex-1 overflow-hidden">
              <div class="h-full space-y-6 overflow-y-auto px-5 pb-6 pt-3 md:px-6 md:pb-8 md:pt-4">
                <div class="ml-auto flex w-fit max-w-[720px] items-start gap-3">
                  <div class="max-w-[680px]">
                    <div class="flex items-start gap-3 rounded-2xl rounded-tr-md border border-white/10 bg-white/[0.05] px-4 py-4 shadow-sm">
                      <div class="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-xl bg-[linear-gradient(135deg,#53413d,#1e1e1e)]">
                        <div class="relative h-11 w-8 rounded-full bg-[linear-gradient(180deg,#f3d2c8,#9b6d5b)]">
                          <div class="absolute inset-x-1 bottom-1 h-4 rounded-full bg-[linear-gradient(180deg,#3a2c2b,#0f0f11)]" />
                        </div>
                      </div>
                      <p class="text-sm leading-relaxed text-white/92 md:text-base">
                        {{ activeDemo.prompt }}
                      </p>
                    </div>
                  </div>
                  <div class="grid h-10 w-10 place-items-center rounded-full bg-white/[0.08] text-base text-white/85">
                    U
                  </div>
                </div>

                <div v-if="activeDemo.id === 'install'" class="space-y-5">
                  <div class="rounded-3xl border border-white/10 bg-white/[0.05] px-4 py-4 md:px-6">
                    <code class="font-mono text-[16px] font-semibold text-[#7fd1ff]">
                      {{ current.command }}
                    </code>
                  </div>

                  <div class="rounded-[28px] border border-white/10 bg-white/[0.04] p-4 md:p-6">
                    <div class="flex items-center gap-3">
                      <div class="grid h-7 w-7 place-items-center rounded-full bg-emerald-500/20 text-emerald-400">
                        <svg viewBox="0 0 20 20" class="h-4 w-4">
                          <path d="m4 10 4 4 8-9" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                        </svg>
                      </div>
                      <h3 class="text-[18px] font-bold">{{ activeDemo.status }}</h3>
                    </div>
                    <p class="mt-4 text-[15px] leading-7 text-white/65">
                      {{ activeDemo.summary }}
                    </p>

                    <div class="mt-5 grid gap-3 md:grid-cols-3">
                      <div
                        v-for="chip in activeDemo.chips"
                        :key="chip"
                        class="rounded-2xl border border-white/8 bg-white/[0.04] px-4 py-4 text-[15px] text-white/85"
                      >
                        {{ chip }}
                      </div>
                    </div>

                    <div class="mt-5 rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                      <div class="text-xs font-semibold uppercase tracking-[0.16em] text-white/75">Supported models</div>
                      <div class="mt-4 flex flex-wrap gap-2">
                        <span
                          v-for="model in current.models"
                          :key="model"
                          class="rounded-full bg-white/[0.05] px-4 py-2 text-[14px] text-white/80"
                        >
                          {{ model }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div v-else class="space-y-5">
                  <div class="flex items-center gap-3">
                    <div class="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-[18px]">
                      🦞
                    </div>
                    <div class="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/85">
                      {{ activeDemo.status }}
                    </div>
                  </div>

                  <div class="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
                    <div class="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,#202020,#191919)] p-5">
                      <div class="text-sm leading-7 text-white/68">{{ activeDemo.summary }}</div>
                      <div class="mt-5 flex flex-wrap gap-2">
                        <span
                          v-for="chip in activeDemo.chips"
                          :key="chip"
                          class="rounded-full border border-white/10 bg-white/[0.05] px-3 py-2 text-[13px] text-white/80"
                        >
                          {{ chip }}
                        </span>
                      </div>

                      <div
                        v-if="['video', 'avatar'].includes(activeDemo.id)"
                        class="relative mt-6 h-[320px] overflow-hidden rounded-[26px] border border-white/10 bg-[radial-gradient(circle_at_50%_35%,rgba(124,77,255,0.28),transparent_35%),linear-gradient(180deg,#19131f,#120f14)]"
                      >
                        <div class="absolute left-1/2 top-12 h-52 w-52 -translate-x-1/2 rounded-full bg-brand/15 blur-3xl animate-pulseGlow" />
                        <div class="absolute left-10 top-10 rounded-full bg-black/35 px-3 py-1 text-xs uppercase tracking-[0.16em] text-white/55">
                          {{ activeDemo.previewTitle }}
                        </div>
                        <div class="absolute bottom-7 left-1/2 h-52 w-36 -translate-x-1/2 rounded-[48px] border border-white/10 bg-[linear-gradient(180deg,#2b2938,#121217)] shadow-[0_24px_60px_rgba(0,0,0,0.5)]">
                          <div class="absolute inset-x-4 top-4 h-14 rounded-[28px] bg-[linear-gradient(180deg,rgba(255,255,255,0.22),rgba(255,255,255,0.03))]" />
                          <div class="absolute inset-x-7 bottom-7 h-16 rounded-[32px] border border-white/12 bg-[linear-gradient(180deg,#ff77b5,#8a2854)]" />
                        </div>
                        <div class="absolute bottom-6 left-6 max-w-[240px] text-sm leading-6 text-white/72">
                          {{ activeDemo.previewBody }}
                        </div>
                      </div>

                      <div
                        v-else-if="['image', 'edit', 'model'].includes(activeDemo.id)"
                        class="mt-6 grid gap-4 sm:grid-cols-2"
                      >
                        <div
                          v-for="index in 4"
                          :key="index"
                          class="relative h-[150px] overflow-hidden rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,#1e1a1a,#121212)]"
                        >
                          <div class="absolute inset-0 bg-[radial-gradient(circle_at_70%_25%,rgba(240,86,141,0.20),transparent_30%),radial-gradient(circle_at_30%_80%,rgba(242,177,97,0.18),transparent_24%)]" />
                          <div class="absolute bottom-4 left-4 h-20 w-12 rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,#39343c,#17171b)]" />
                          <div class="absolute bottom-3 left-11 h-7 w-10 rounded-full bg-[linear-gradient(180deg,#f279a8,#a0305d)]" />
                          <div class="absolute right-4 top-4 rounded-full bg-black/30 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-white/60">
                            {{ index === 1 ? 'Hero' : index === 2 ? 'Detail' : index === 3 ? 'Scene' : 'Pack' }}
                          </div>
                        </div>
                      </div>

                      <div v-else class="mt-6 rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,#1d1b22,#121214)] p-5">
                        <div class="mb-4 text-sm text-white/72">{{ activeDemo.previewBody }}</div>
                        <div class="flex h-28 items-end gap-2">
                          <span v-for="index in 24" :key="index" class="w-2 rounded-full bg-brand/70 animate-waveform" :style="{ height: `${24 + (index % 7) * 10}px`, animationDelay: `${index * 0.06}s` }" />
                        </div>
                      </div>
                    </div>

                    <div class="rounded-[28px] border border-white/10 bg-white/[0.03] p-5">
                      <div class="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">{{ current.localeLabel }}</div>
                      <div class="mt-3 flex flex-wrap gap-2">
                        <span
                          v-for="option in localeOptions"
                          :key="option.code"
                          class="rounded-full border px-3 py-1.5 text-xs"
                          :class="locale === option.code ? 'border-brand bg-brand/20 text-white' : 'border-white/10 bg-white/[0.03] text-white/60'"
                        >
                          {{ option.label }}
                        </span>
                      </div>

                      <div class="mt-6 rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,#1d1d1d,#141414)] p-5">
                        <div class="text-xs uppercase tracking-[0.16em] text-white/45">{{ activeDemo.previewTitle }}</div>
                        <div class="mt-3 text-[20px] font-bold text-white">{{ activeDemo.label }}</div>
                        <p class="mt-3 text-sm leading-7 text-white/65">
                          {{ activeDemo.previewBody }}
                        </p>

                        <div
                          class="mt-5 rounded-[22px] p-4"
                          :class="activeDemo.accent === 'gold' ? 'bg-[linear-gradient(180deg,rgba(242,177,97,0.14),rgba(255,255,255,0.03))]' : activeDemo.accent === 'rose' ? 'bg-[linear-gradient(180deg,rgba(240,86,141,0.16),rgba(255,255,255,0.03))]' : 'bg-[linear-gradient(180deg,rgba(78,64,243,0.16),rgba(255,255,255,0.03))]'"
                        >
                          <div class="text-[13px] font-medium text-white/78">
                            {{ activeDemo.status }}
                          </div>
                          <div class="mt-2 text-[13px] leading-6 text-white/58">
                            {{ activeDemo.summary }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>

    <section class="page-shell py-20">
      <div class="mx-auto max-w-[980px] text-center">
        <h2 class="text-[30px] font-extrabold tracking-[-0.04em] md:text-[42px]">
          {{ current.agentsTitle }}
        </h2>
        <p class="mx-auto mt-4 max-w-[760px] text-[16px] leading-8 text-muted">
          {{ current.agentsBody }}
        </p>
      </div>

      <div class="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <article
          v-for="card in current.capabilityCards"
          :key="card.title"
          class="rounded-[28px] border border-white/10 bg-[#111111] p-6"
        >
          <div class="text-xs font-semibold uppercase tracking-[0.16em] text-white/35">Capability</div>
          <h3 class="mt-4 text-[22px] font-bold tracking-[-0.03em]">{{ card.title }}</h3>
          <p class="mt-4 text-[15px] leading-7 text-white/62">{{ card.body }}</p>
        </article>
      </div>
    </section>

    <section class="page-shell border-t border-white/5 py-20">
      <div class="mx-auto max-w-[980px] text-center">
        <h2 class="text-[30px] font-extrabold tracking-[-0.04em] md:text-[42px]">
          {{ current.modelTitle }}
        </h2>
        <p class="mx-auto mt-4 max-w-[760px] text-[16px] leading-8 text-muted">
          {{ current.modelBody }}
        </p>
      </div>

      <div class="mx-auto mt-10 grid max-w-[980px] gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="item in current.models"
          :key="item"
          class="rounded-[22px] border border-white/10 bg-[#111111] px-4 py-4 text-center text-[15px] font-medium text-white/82"
        >
          {{ item }}
        </div>
      </div>
    </section>

    <section class="page-shell border-t border-white/5 py-20">
      <div class="mx-auto max-w-[980px] text-center">
        <h2 class="text-[30px] font-extrabold tracking-[-0.04em] md:text-[42px]">
          {{ current.faqTitle }}
        </h2>
        <p class="mx-auto mt-4 max-w-[760px] text-[16px] leading-8 text-muted">
          {{ current.faqBody }}
        </p>
      </div>

      <div class="mx-auto mt-10 grid max-w-[1200px] gap-4 lg:grid-cols-2">
        <details
          v-for="faq in current.faqs"
          :key="faq.q"
          class="rounded-[24px] border border-white/10 bg-[#111111] px-5 py-4"
        >
          <summary class="cursor-pointer list-none text-[16px] font-semibold text-white">
            <span class="mr-3 inline-grid h-7 w-7 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-sm text-white/70">+</span>
            {{ faq.q }}
          </summary>
          <p class="mt-4 text-[15px] leading-7 text-white/65">
            {{ faq.a }}
          </p>
        </details>
      </div>
    </section>
  </main>
</template>
