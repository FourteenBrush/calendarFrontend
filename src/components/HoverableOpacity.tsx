import { PropsWithChildren, useState } from "react"
import { StyleProp, TouchableOpacity, TouchableOpacityProps, View, ViewStyle } from "react-native"

export type HoverableOpacityProps = PropsWithChildren & TouchableOpacityProps & {
  hoverStyle: StyleProp<ViewStyle>,
  hoverOpacity: number,
}

export default ({ children, hoverStyle, hoverOpacity, ...props }: HoverableOpacityProps) => {
  const [isHovering, setIsHovering] = useState(false)

  return (
    <View
      onPointerEnter={() => setIsHovering(true)}
      onPointerLeave={() => setIsHovering(false)}>
      <TouchableOpacity
        style={isHovering && hoverStyle}
        activeOpacity={isHovering ? hoverOpacity : undefined}
        {...props}
      >
        {children}
      </TouchableOpacity>
    </View>
  )
}
