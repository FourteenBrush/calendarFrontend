import { PropsWithChildren, useState } from "react"
import { StyleProp, TouchableOpacity, TouchableOpacityProps, View, ViewStyle } from "react-native"

export type HoverableOpacityProps = PropsWithChildren & TouchableOpacityProps & {
  hoverStyle?: StyleProp<ViewStyle>,
  hoverOpacity?: number,
  style?: StyleProp<ViewStyle>,
}

export default ({ hoverStyle, hoverOpacity, style, children, ...props }: HoverableOpacityProps) => {
  const [isHovering, setIsHovering] = useState(false)

  return (
    <View
      onPointerEnter={() => setIsHovering(true)}
      onPointerLeave={() => setIsHovering(false)}>
      <TouchableOpacity
        {...props}
        style={[style, isHovering && hoverStyle]}
      >
        {children}
      </TouchableOpacity>
    </View>
  )
}
