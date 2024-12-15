import { MutableRefObject } from "react"
import React, { FlatList, ListRenderItemInfo, StyleProp, StyleSheet, Text, useWindowDimensions, View, ViewStyle } from "react-native"
import { useTheme } from "@/hooks/useTheme"
import { Day, DAYS_PER_WEEK, WEEK_DAYS } from "@/utils"

export type CalendarGridProps = {
  listRef: MutableRefObject<FlatList<Day> | null>,
  days: Day[],
}

export default ({ listRef, days }: CalendarGridProps) => {
  const { height } = useWindowDimensions()
  const { theme } = useTheme()

  const cellHeight = Math.max(45, height / 6)

  const today = new Date()
  const numRows = Math.ceil(days.length / DAYS_PER_WEEK)

  const renderCell = ({ item, index }: ListRenderItemInfo<Day>) => {
    // ensure no overlapping borders get shown
    const dayNumber = item.date.getDate()
    const isToday = dayNumber === today.getDate()
    const lastColumn = (dayNumber % DAYS_PER_WEEK === 0) || index === days.length - 1
    const lastRow = Math.ceil(dayNumber / DAYS_PER_WEEK) == numRows

    return (
      <CalendarCell
        dayNumber={dayNumber}
        isToday={isToday}
        height={cellHeight}
        style={[
          styles.cell,
          lastColumn && styles.borderRight,
          lastRow && styles.borderBottom,
        ]}
      />
    )
  }

  return (
    <>
      <View style={styles.header}>
        {WEEK_DAYS.map(day => (
          <Text key={day}
            style={[theme.textPrimary, styles.headerCell]}>{day}
          </Text>)
        )}
      </View>

      <FlatList
        ref={listRef}
        style={styles.container}
        pagingEnabled={true}
        // at a certain lower bound, this doesnt seem to apply anymore
        snapToInterval={cellHeight}
        numColumns={DAYS_PER_WEEK}
        showsVerticalScrollIndicator={false}
        data={days}
        renderItem={renderCell}
        //initialScrollIndex={1} // row, requires getItemLayout
        //getItemLayout={(_data, index) => {
        //  const offset = Math.floor(index / DAYS_A_WEEK) * cellHeight
        //  return { length: cellHeight, offset, index }
        //}}
      />
    </>
  )
}

type CalendarCellProps = {
  dayNumber: number,
  isToday: boolean,
  height: number,
  style?: StyleProp<ViewStyle>,
}

const CalendarCell = ({ dayNumber, isToday, height, style }: CalendarCellProps) => {
  const { theme } = useTheme()

  return (
    <View style={[style, { height }]}>
      <Text
        style={[styles.dayNumber, theme.textPrimary,
        isToday && styles.currentDayNumber]}
      >{dayNumber}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 8,
  },
  cell: {
    flex: 1,
    justifyContent: "center",
    borderColor: "#303030",
    borderTopWidth: 1,
    borderLeftWidth: 1,
    backgroundColor: "#1c1c1c",
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
  borderRight: {
    borderRightWidth: 1,
  },
  borderBottom: {
    borderBottomWidth: 1,
  },
  header: {
    paddingBottom: 2,
    width: "100%",
    flexDirection: "row",
  },
  headerCell: {
    textAlign: "center",
    flex: 1,
  },
})
