import React from 'react'

import { StyleSheet, View, ViewStyle } from 'react-native'

type SegmentPosition = Pick<
  ViewStyle,
  'top' | 'right' | 'bottom' | 'left' | 'width' | 'height'
>

interface Props extends SegmentPosition {
  color: string
}

export const Segment: React.FC<Props> = ({ color, ...position }) => (
  <View style={[styles.segment, position, { backgroundColor: color }]} />
)

const styles = StyleSheet.create({
  segment: {
    position: 'absolute',
  },
})
