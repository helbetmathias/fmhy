import type { Theme } from '../types'

export const monochromeTheme: Theme = {
  name: 'monochrome',
  displayName: 'Mathy Dark',
  preview: 'linear-gradient(135deg, #0d0f12 50%, #8bc5ff 50%)',
  modes: {
    light: {
      brand: {
        1: '#245f90',
        2: '#3477ad',
        3: '#17476e',
        soft: '#a9d4f5'
      },
      bg: '#F6F7F9',
      bgAlt: '#FFFFFF',
      bgElv: 'rgba(255, 255, 255, 0.96)',
      bgMark: '#E5E9EF',
      text: {
        1: '#171A1F',
        2: '#46505D',
        3: '#6F7A89'
      },
      button: {
        brand: {
          bg: '#245F90',
          border: '#245F90',
          text: '#FFFFFF',
          hoverBorder: '#3477AD',
          hoverText: '#FFFFFF',
          hoverBg: '#3477AD',
          activeBorder: '#17476E',
          activeText: '#FFFFFF',
          activeBg: '#17476E'
        },
        alt: {
          bg: '#E5E9EF',
          text: '#27313D',
          hoverBg: '#D5DCE5',
          hoverText: '#171A1F'
        }
      },
      customBlock: {
        info: {
          bg: '#EDF6FD',
          border: '#8BC5FF',
          text: '#2C587B',
          textDeep: '#17476E'
        },
        tip: {
          bg: '#EEF8F3',
          border: '#86D7B0',
          text: '#35644F',
          textDeep: '#214B39'
        },
        warning: {
          bg: '#FBF6E8',
          border: '#E6C96E',
          text: '#665727',
          textDeep: '#4D421D'
        },
        danger: {
          bg: '#FCF0F2',
          border: '#EA8E99',
          text: '#713940',
          textDeep: '#582A30'
        }
      },
      selection: {
        bg: '#C7E3F8'
      },
      home: {
        heroNameColor: 'transparent',
        heroNameBackground:
          '-webkit-linear-gradient(120deg, #171a1f 25%, #3477ad)',
        heroImageBackground:
          'linear-gradient(135deg, #8bc5ff 0%, #a78bfa 100%)',
        heroImageFilter: 'blur(52px)'
      }
    },
    dark: {
      brand: {
        1: '#8BC5FF',
        2: '#A9D4F5',
        3: '#6AA9E9',
        soft: '#355A7A'
      },
      bg: '#0D0F12',
      bgAlt: '#171A1F',
      bgElv: 'rgba(24, 27, 32, 0.96)',
      bgMark: '#222832',
      text: {
        1: '#F4F6F8',
        2: '#C1C8D2',
        3: '#929CAA'
      },
      button: {
        brand: {
          bg: '#8BC5FF',
          border: '#8BC5FF',
          text: '#0D0F12',
          hoverBorder: '#B8DCFF',
          hoverText: '#0D0F12',
          hoverBg: '#B8DCFF',
          activeBorder: '#6AA9E9',
          activeText: '#0D0F12',
          activeBg: '#6AA9E9'
        },
        alt: {
          bg: '#232830',
          text: '#E7EBF0',
          hoverBg: '#303743',
          hoverText: '#FFFFFF'
        }
      },
      customBlock: {
        info: {
          bg: '#131C26',
          border: '#365A78',
          text: '#DCEEFF',
          textDeep: '#8BC5FF'
        },
        tip: {
          bg: '#112019',
          border: '#2E6550',
          text: '#C9F1DE',
          textDeep: '#86D7B0'
        },
        warning: {
          bg: '#211C10',
          border: '#75602B',
          text: '#F1E0A8',
          textDeep: '#E6C96E'
        },
        danger: {
          bg: '#261416',
          border: '#783D44',
          text: '#F4C7CC',
          textDeep: '#EA8E99'
        }
      },
      selection: {
        bg: '#284B68'
      },
      home: {
        heroNameColor: 'transparent',
        heroNameBackground:
          '-webkit-linear-gradient(120deg, #f4f6f8 25%, #8bc5ff)',
        heroImageBackground:
          'linear-gradient(135deg, #6b8eb0 0%, #a78bfa 100%)',
        heroImageFilter: 'blur(52px)'
      }
    }
  }
}
