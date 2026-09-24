import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  type ViewStyle,
} from 'react-native'
import { PixelViewBox } from 'react-native-pixelkit'

interface Example {
  label: string
  layout?: ViewStyle
  backgroundColor?: string
  outlineColor?: string
  bevel?: boolean
  borderWidth?: number
  borderRadius?: number
  highlightRatio?: number
  lipHeight?: number
}

const ROWS: Example[][] = [
  [
    {
      label: 'Outline only',
      layout: {
        flex: 1,
      },
    },
    {
      label: 'Filled',
      layout: {
        flex: 1,
      },
      backgroundColor: '#4caf50',
    },
  ],
  [
    {
      label: 'Bevel',
      layout: {
        flex: 1,
      },
      backgroundColor: '#2196f3',
      bevel: true,
    },
  ],
  [
    {
      label: 'Custom bevel',
      layout: {
        flex: 2,
      },
      backgroundColor: '#e91e63',
      outlineColor: '#3b0a1c',
      bevel: true,
      borderWidth: 5,
      lipHeight: 8,
      highlightRatio: 0.5,
    },
    {
      label: '3 steps',
      layout: {
        flex: 1,
      },
      backgroundColor: '#9c27b0',
      bevel: true,
      borderWidth: 3,
      borderRadius: 9,
    },
  ],
  [
    {
      label: 'Square',
      layout: {
        width: 96,
        aspectRatio: 1,
      },
      backgroundColor: '#607d8b',
      bevel: true,
      borderRadius: 0,
    },
    {
      label: 'Fills remaining width',
      layout: {
        flex: 1,
      },
      backgroundColor: '#ff9800',
      bevel: true,
    },
  ],
  [
    {
      label: 'Fits content',
      backgroundColor: '#009688',
      bevel: true,
    },
  ],
]

export default function App() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PixelBoxes />
    </ScrollView>
  )
}

const PixelBoxes = () =>
  ROWS.map((row, rowIndex) => (
    <View key={rowIndex} style={styles.row}>
      {row.map(({ label, layout, ...options }) => (
        <PixelViewBox
          key={label}
          options={options}
          style={[styles.box, layout]}
        >
          <Text style={options.backgroundColor ? styles.label : undefined}>
            {label}
          </Text>
        </PixelViewBox>
      ))}
    </View>
  ))

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    gap: 16,
    padding: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  box: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  label: {
    color: '#ffffff',
    fontWeight: '700',
    textAlign: 'center',
  },
})
