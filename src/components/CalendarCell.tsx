import React, { ListRenderItemInfo, LogBox, StyleProp, StyleSheet, Text, TextInput, View, ViewStyle } from "react-native"
import { CalendarItem, dateToMonth, Day, DAYS_PER_WEEK, WeekDay } from "@/utils"
import * as theme from "@/styles/theme"
import { useTheme } from "@/hooks/useTheme"
import CalendarItemLine from "@/components/CalendarItemLine"
import HoverableOpacity from "@/components/HoverableOpacity"
import { useNavigation } from "@react-navigation/native"
import { NavParamsList } from "../../App"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

// we are not using state persistance or deep linking, so passing functions is fine
LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
])

export type CalendarCellRenderInfo = ListRenderItemInfo<Day> & {
  height: number,
  cellsCount: number,
  readonly items: CalendarItem[],
  updateItem: (newState: CalendarItem) => void,
}

export const renderCell = ({ item, index, height, cellsCount: daysCount, items, updateItem }: CalendarCellRenderInfo) => {
  // create round corners
  const isTopLeft = index === 0
  const isTopRight = index === DAYS_PER_WEEK - 1
  const isBottomLeft = index === daysCount - DAYS_PER_WEEK
  const isBottomRight = index === daysCount - 1

  // ensure no overlapping borders get shown
  const isLastRow = daysCount - index <= DAYS_PER_WEEK
  const isLastColumn = (index + 1) % DAYS_PER_WEEK === 0
  const isWeekend = item.weekDay === WeekDay.Saturday || item.weekDay === WeekDay.Sunday

  const style = [
    styles.container,
    isTopLeft && styles.topLeft,
    isTopRight && styles.topRight,
    isBottomLeft && styles.bottomLeft,
    isBottomRight && styles.bottomRight,

    isLastRow && styles.borderBottom,
    isLastColumn && styles.borderRight,
    isWeekend && styles.weekend,
  ]

  return (
    <CalendarCell
      day={item}
      height={height}
      items={items}
      updateItem={updateItem}
      style={style}
    />
  )
}

type CalendarCellProps = {
  day: Day,
  height: number,
  readonly items: CalendarItem[],
  updateItem: (newState: CalendarItem) => void,
  style: StyleProp<ViewStyle>,
}

const CalendarCell = ({ day, height, style, items, updateItem }: CalendarCellProps) => {
  const { theme } = useTheme()
  const navigator = useNavigation<NativeStackNavigationProp<NavParamsList>>()
  const isToday = day.date.toLocaleDateString() === new Date().toLocaleDateString()
  const isStartOfMonth = day.date.getDate() === 1

  // TODO: events overflow day number, add some kind of nowrap
  return (
    <View style={[style, { height }]}>
      {/* start of the month */}
      {isStartOfMonth && <Text style={theme.textPrimary}>{dateToMonth(day.date)}</Text>}

      {/* calendar items */}
      <View style={{ flex: 1, overflow: "hidden" }}>
        {items.map(item => (
          <HoverableOpacity
            key={item.id}
            hoverStyle={styles.itemLineHover}
            onPress={() => {
              navigator.navigate("details", { passedItem: item, updateItem })
            }}>
            <CalendarItemLine key={item.title} title={item.title} />
          </HoverableOpacity>
        ))}
      </View>

      <Text style={[
        styles.dayNumber,
        day.isCurrentMonth ? theme.textPrimary : styles.dayNumberDifferentMonth,
        isToday && styles.currentDayNumber,
      ]}
      >{day.date.getDate()}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: "#303030",
    borderTopWidth: 1,
    borderLeftWidth: 1,
    //backgroundColor: "#1c1c1c",
    //backgroundColor: "#232323",
    backgroundColor: "#202020",
  },
  dayNumber: {
    position: "absolute",
    bottom: 3,
    right: 2,
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 4,
  },
  currentDayNumber: {
    backgroundColor: "#f15550",
  },
  dayNumberDifferentMonth: {
    color: "#5e5e5e",
  },

  topLeft: { borderTopLeftRadius: theme.BORDER_RADIUS },
  topRight: { borderTopRightRadius: theme.BORDER_RADIUS },
  bottomLeft: { borderBottomLeftRadius: theme.BORDER_RADIUS },
  bottomRight: { borderBottomRightRadius: theme.BORDER_RADIUS },

  borderRight: { borderRightWidth: 1 },
  borderBottom: { borderBottomWidth: 1 },

  weekend: {
    //backgroundColor: "#1c1c1c",
    backgroundColor: "#222222",
  },
  itemLineHover: {
    opacity: theme.HOVER_OPACITY,
  }
})

export default CalendarCell
