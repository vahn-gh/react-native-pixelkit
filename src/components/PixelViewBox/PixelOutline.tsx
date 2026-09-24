import React from 'react'

import { StyleSheet, View } from 'react-native'

import { Segment } from './Segment'

interface Props {
  steps: number
  borderWidth: number
  color: string
}

export const PixelOutline: React.FC<Props> = ({
  steps,
  borderWidth,
  color,
}) => {
  const edgeInset = steps * borderWidth
  const sideInset = (steps + 1) * borderWidth
  const rows = Array.from({ length: steps }, (_, index) => index + 1)

  const barWidth = borderWidth * 2

  return (
    <View style={styles.container}>
      <Segment
        top={0}
        left={edgeInset}
        right={edgeInset}
        height={borderWidth}
        color={color}
      />
      <Segment
        bottom={0}
        left={edgeInset}
        right={edgeInset}
        height={borderWidth}
        color={color}
      />
      <Segment
        left={0}
        top={sideInset}
        bottom={sideInset}
        width={borderWidth}
        color={color}
      />
      <Segment
        right={0}
        top={sideInset}
        bottom={sideInset}
        width={borderWidth}
        color={color}
      />

      {rows.map(row => {
        const horizontal = (steps - row) * borderWidth
        const vertical = row * borderWidth

        return (
          <React.Fragment key={row}>
            <Segment
              left={horizontal}
              top={vertical}
              width={barWidth}
              height={borderWidth}
              color={color}
            />
            <Segment
              right={horizontal}
              top={vertical}
              width={barWidth}
              height={borderWidth}
              color={color}
            />
            <Segment
              left={horizontal}
              bottom={vertical}
              width={barWidth}
              height={borderWidth}
              color={color}
            />
            <Segment
              right={horizontal}
              bottom={vertical}
              width={barWidth}
              height={borderWidth}
              color={color}
            />
          </React.Fragment>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
  },
})
