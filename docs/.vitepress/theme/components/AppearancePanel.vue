<script setup lang="ts">
import type { DisplayVariant } from '../themes/types'
import { useData } from 'vitepress'
import { themeRegistry } from '../themes/configs'
import { useTheme } from '../themes/themeHandler'
import { revealThemeChange } from '../themes/themeTransition'
import ColorPicker from './ColorPicker.vue'

const props = withDefaults(defineProps<{ closeOnSelect?: boolean }>(), {
  closeOnSelect: false
})

const emit = defineEmits<{ requestClose: [] }>()

const { displayVariant, setDisplayVariant, themeName } = useTheme()
const { isDark } = useData()

interface ModeChoice {
  variant: DisplayVariant
  label: string
  icon: string
}

const modeChoices: ModeChoice[] = [
  { variant: 'light', label: 'Light', icon: 'i-ph-sun-duotone' },
  { variant: 'dark', label: 'Dark', icon: 'i-ph-moon-duotone' },
  {
    variant: 'amoled',
    label: 'AMOLED',
    icon: 'i-ph-moon-stars-duotone'
  },
  { variant: 'mathy', label: 'Mathy', icon: 'i-ph-code-duotone' }
]

const isActiveChoice = (choice: ModeChoice) =>
  displayVariant.value === choice.variant

const requestClose = () => {
  if (props.closeOnSelect) emit('requestClose')
}

const selectMode = async (choice: ModeChoice, event: MouseEvent) => {
  event.stopPropagation()
  requestClose()

  await revealThemeChange(event, choice.variant !== 'light', () => {
    setDisplayVariant(choice.variant)
    isDark.value = choice.variant !== 'light'
  })

  requestClose()
}
</script>

<template>
  <div class="appearance-panel">
    <div class="appearance-panel-title">Appearance</div>
    <div class="appearance-panel-title">Display variants</div>
    <div role="group" aria-label="Display mode">
      <button
        v-for="choice in modeChoices"
        :key="choice.label"
        type="button"
        class="appearance-panel-item"
        :class="{ active: isActiveChoice(choice) }"
        :aria-pressed="isActiveChoice(choice)"
        @click="selectMode(choice, $event)"
      >
        <div :class="[choice.icon, 'text-lg']" aria-hidden="true" />
        <span>{{ choice.label }}</span>
        <div
          v-if="isActiveChoice(choice)"
          class="i-ph-check text-base ml-auto"
          aria-hidden="true"
        />
      </button>
    </div>

    <div class="appearance-panel-divider" />

    <div class="appearance-panel-colors">
      <div class="appearance-panel-current">
        Theme: {{ themeRegistry[themeName]?.displayName || themeName }}
      </div>
      <ColorPicker compact @select="requestClose" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.appearance-panel {
  --appearance-panel-content-width: 180px;
  --appearance-panel-inline-padding: 8px;
  --appearance-panel-accent-subtle: var(--fmhy-c-accent-subtle);

  width: 100%;
  min-width: var(--appearance-panel-content-width);
}

.appearance-panel-title {
  padding: 6px var(--appearance-panel-inline-padding) 4px;
  color: var(--vp-c-text-3);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.appearance-panel-item {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 8px 12px;
  color: var(--vp-c-text-1);
  font-size: 14px;
  text-align: left;
  background: transparent;
  border: 0;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: var(--appearance-panel-accent-subtle);
  }

  &.active {
    color: var(--vp-c-brand-1);
    font-weight: 500;
  }

  span {
    flex: 1;
  }
}

.appearance-panel-divider {
  height: 1px;
  margin: 6px 0;
  background: var(--vp-c-divider);
}

.appearance-panel-colors {
  padding: 4px var(--appearance-panel-inline-padding) 6px;
}

.appearance-panel-current {
  margin-bottom: 8px;
  color: var(--vp-c-text-2);
  font-size: 12px;
}
</style>
