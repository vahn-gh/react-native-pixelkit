import { FlatList, StyleSheet, Text, View, ViewStyle } from 'react-native'
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

const HEADER_ROWS: Example[][] = [
  [
    { label: 'Outline only', layout: { flex: 1 } },
    { label: 'Filled', layout: { flex: 1 }, backgroundColor: '#4caf50' },
  ],
  [
    {
      label: 'Bevel',
      layout: { flex: 1 },
      backgroundColor: '#2196f3',
      bevel: true,
    },
  ],
  [
    {
      label: 'Custom bevel',
      layout: { flex: 2 },
      backgroundColor: '#e91e63',
      outlineColor: '#3b0a1c',
      bevel: true,
      borderWidth: 5,
      lipHeight: 8,
      highlightRatio: 0.5,
    },
    {
      label: '3 steps',
      layout: { flex: 1 },
      backgroundColor: '#9c27b0',
      bevel: true,
      borderWidth: 3,
      borderRadius: 9,
    },
  ],
  [
    {
      label: 'Square',
      layout: { width: 96, aspectRatio: 1 },
      backgroundColor: '#607d8b',
      bevel: true,
      borderRadius: 0,
    },
    {
      label: 'Fills remaining width',
      layout: { flex: 1 },
      backgroundColor: '#ff9800',
      bevel: true,
    },
  ],
  [{ label: 'Fits content', backgroundColor: '#009688', bevel: true }],
]

const LIST_COLORS = [
  '#f44336',
  '#e91e63',
  '#9c27b0',
  '#3f51b5',
  '#2196f3',
  '#009688',
  '#4caf50',
  '#ff9800',
  '#795548',
  '#607d8b',
]

const LIST_ITEMS: Example[] = Array.from({ length: 90 }, (_, index) => ({
  label: `Box ${index + 1}`,
  backgroundColor: LIST_COLORS[index % LIST_COLORS.length],
}))

export default function App() {
  return (
    <FlatList
      data={LIST_ITEMS}
      keyExtractor={item => item.label}
      ListHeaderComponent={Header}
      ListHeaderComponentStyle={styles.header}
      contentContainerStyle={styles.container}
      renderItem={({ item: { label, layout, ...options } }) => (
        <PixelViewBox options={options} style={[styles.box, layout]}>
          <Text style={styles.label}>{label}</Text>
        </PixelViewBox>
      )}
    />
  )
}

const Header = () =>
  HEADER_ROWS.map((row, rowIndex) => (
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
    gap: 16,
    paddingHorizontal: 24,
    paddingVertical: 64,
  },
  header: {
    gap: 16,
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
