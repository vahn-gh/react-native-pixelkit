import React from 'react'

import { StyleSheet, View } from 'react-native'

import { Segment } from './Segment'

export enum SteppedEdges {
  Top = 'Top',
  Bottom = 'Bottom',
  Both = 'Both',
}

interface Props {
  steps: number
  stepSize: number
  color: string
  edges?: SteppedEdges
}

export const SteppedRect: React.FC<Props> = ({
  steps,
  stepSize,
  color,
  edges = SteppedEdges.Both,
}) => {
  const hasTopStairs = edges !== SteppedEdges.Bottom
  const hasBottomStairs = edges !== SteppedEdges.Top
  const stairsHeight = steps * stepSize

  const rowInsets = Array.from(
    {
      length: steps,
    },
    (_, row) => (steps - row) * stepSize
  )

  return (
    <View style={styles.container}>
      {hasTopStairs &&
        rowInsets.map((inset, row) => (
          <Segment
            key={`top-${row}`}
            left={inset}
            right={inset}
            top={row * stepSize}
            height={stepSize}
            color={color}
          />
        ))}

      <Segment
        left={0}
        right={0}
        top={hasTopStairs ? stairsHeight : 0}
        bottom={hasBottomStairs ? stairsHeight : 0}
        color={color}
      />

      {hasBottomStairs &&
        rowInsets.map((inset, row) => (
          <Segment
            key={`bottom-${row}`}
            left={inset}
            right={inset}
            bottom={row * stepSize}
            height={stepSize}
            color={color}
          />
        ))}
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
