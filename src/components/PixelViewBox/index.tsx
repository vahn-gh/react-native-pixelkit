import React, { useCallback, useMemo, useState } from 'react'

import {
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native'

import { shadeHexColor } from '../../utils/shadeHexColor'
import { PixelOutline } from './PixelOutline'
import { SteppedEdges, SteppedRect } from './SteppedRect'

const DEFAULT_OPTIONS = {
  outlineColor: '#000000',
  bevel: true,
  borderWidth: 3,
  borderRadius: 6,
  highlightRatio: 0.4,
  lipHeight: 5,
}

interface PixelViewBoxOptions {
  backgroundColor?: string
  outlineColor?: string
  bevel?: boolean
  borderWidth?: number
  borderRadius?: number
  highlightRatio?: number
  lipHeight?: number
}

interface Props {
  options?: PixelViewBoxOptions
  style?: StyleProp<ViewStyle>
  children?: React.ReactNode
}

export const PixelViewBox: React.FC<Props> = ({ options, style, children }) => {
  const {
    backgroundColor,
    outlineColor = DEFAULT_OPTIONS.outlineColor,
    bevel = DEFAULT_OPTIONS.bevel,
    borderWidth = DEFAULT_OPTIONS.borderWidth,
    borderRadius = DEFAULT_OPTIONS.borderRadius,
    highlightRatio = DEFAULT_OPTIONS.highlightRatio,
    lipHeight = DEFAULT_OPTIONS.lipHeight,
  } = options ?? {}

  const [minSide, setMinSide] = useState<number>()

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout
    setMinSide(Math.min(width, height))
  }, [])

  const isMeasured = minSide !== undefined

  const steps =
    isMeasured && borderWidth > 0
      ? Math.max(
          Math.min(
            Math.floor(borderRadius / borderWidth),
            Math.floor(minSide / (2 * borderWidth)) - 1
          ),
          0
        )
      : 0

  const highlight = useMemo(
    () => (backgroundColor ? shadeHexColor(backgroundColor, 22) : undefined),
    [backgroundColor]
  )
  const lip = useMemo(
    () => (backgroundColor ? shadeHexColor(backgroundColor, -30) : undefined),
    [backgroundColor]
  )

  const isBevelVisible = bevel && highlight && lip

  return (
    <View style={style ?? styles.default} onLayout={handleLayout}>
      {isMeasured && backgroundColor && (
        <View
          style={[
            styles.inner,
            {
              top: borderWidth,
              left: borderWidth,
              right: borderWidth,
              bottom: borderWidth,
            },
          ]}
        >
          <SteppedRect
            steps={steps}
            stepSize={borderWidth}
            color={backgroundColor}
          />

          {isBevelVisible && highlightRatio > 0 && (
            <View
              style={[styles.highlight, { height: `${highlightRatio * 100}%` }]}
            >
              <SteppedRect
                steps={steps}
                stepSize={borderWidth}
                color={highlight}
                edges={SteppedEdges.Top}
              />
            </View>
          )}

          {isBevelVisible && lipHeight > 0 && (
            <View style={[styles.lip, { height: lipHeight }]}>
              <SteppedRect
                steps={steps}
                stepSize={borderWidth}
                color={lip}
                edges={SteppedEdges.Bottom}
              />
            </View>
          )}
        </View>
      )}

      {children}

      {borderWidth > 0 && (
        <PixelOutline
          steps={steps}
          borderWidth={borderWidth}
          color={outlineColor}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  default: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignSelf: 'baseline',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    position: 'absolute',
    pointerEvents: 'none',
  },
  highlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
  },
  lip: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
  },
})
