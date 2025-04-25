import { useColorScheme } from 'react-native'
import { Colors } from '@/theme/colors'
import { useSettings } from '@/store/settings'

type ColorProps = keyof typeof Colors.light

export const useTheme = (color: ColorProps) => {
  const { darkMode } = useSettings()
  const theme = darkMode ? 'dark' : 'light'
  return Colors[theme][color]
}
