import { LegacyRef, RefObject, useCallback, useRef } from "react"
import React, { FlatList, GestureResponderEvent, ListRenderItemInfo, StyleProp, StyleSheet, Text, useWindowDimensions, View, ViewabilityConfig, ViewStyle, ViewToken } from "react-native"
import { useTheme } from "@/hooks/useTheme"
import { CalendarItem, dateToMonthAndYear, Day, DAYS_PER_WEEK, WEEK_DAYS } from "@/utils"
import * as theme from "@/styles/theme"
import { renderCell } from "./CalendarCell"
import { useNavigation } from "@react-navigation/native"
import { useAuth } from "@/hooks/useAuth"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { NavParamsList } from "../../App"
import HoverableOpacity from "./HoverableOpacity"

export type CalendarGridProps = {
  readonly cells: Day[],
  setCells: (cells: Day[]) => void,
}

const CalendarGrid = ({ cells, setCells }: CalendarGridProps) => {
  const { height } = useWindowDimensions()
  const listRef = useRef<FlatList<Day> | null>(null)

  const viewabilityConfig = useRef<ViewabilityConfig>({
    minimumViewTime: 1,
    // a single pixel in the viewport makes the item visible
    viewAreaCoveragePercentThreshold: 0,
    waitForInteraction: true,
  })

  const cellHeight = Math.max(theme.MIN_CELL_HEIGHT, height / 7)

  const scrollToToday = () => {
    const today = new Date().getDate()
    const rowIndex = cells.findIndex(day => day.date.getDate() === today) / DAYS_PER_WEEK
    listRef.current?.scrollToIndex({ index: rowIndex, animated: true })
  }

  const updateItem = (newState: CalendarItem) => {
    console.debug("calendar grid notified to change item to", newState)

    const dayStr = newState.endDate.toLocaleDateString()
    const day = cells.find(({ date }) => date.toLocaleDateString() === dayStr)!

    // modify items
    day.items.some((item, i) => {
      if (item.id === newState.id) {
        day.items[i] = newState
        return true
      }
    })

    setCells(cells)
    console.table(cells)
  }

  const renderItem = (renderInfo: ListRenderItemInfo<Day>) => {
    const items = renderInfo.item.items
    return renderCell({ height: cellHeight, cellsCount: cells.length, items: items, updateItem, ...renderInfo })
  }

  const getItemLayout = (_: ArrayLike<Day> | null | undefined, index: number) => {
    const offset = Math.floor(index / DAYS_PER_WEEK) * cellHeight
    return { length: cellHeight, offset, index }
  }

  // NOTE: changing onViewableItemsChanged cb on the fly is not supported, needs to be cached
  const onViewableItemsChanged = useCallback(
    ({ changed, viewableItems }: { changed: ViewToken<Day>[], viewableItems: ViewToken<Day>[] }
    ) => {
    }, [])

  return (
    <>
      <CalendarHeader onTodayButtonPress={scrollToToday} />
      <WeekDaysHeader />
      <FlatList
        data={cells}
        renderItem={renderItem}
        ref={listRef}
        style={styles.container}
        pagingEnabled={true}
        // at a certain lower bound, this doesnt seem to apply anymore
        snapToInterval={cellHeight}
        numColumns={DAYS_PER_WEEK}
        showsVerticalScrollIndicator={false}
        getItemLayout={getItemLayout}
        viewabilityConfig={viewabilityConfig.current}
        onViewableItemsChanged={onViewableItemsChanged}
      />
    </>
  )
}

const WeekDaysHeader = () => {
  const { theme } = useTheme()
  return (
    <View style={styles.weekDaysHeader}>
      {WEEK_DAYS.map(day => (
        <Text key={day} style={[theme.textPrimary, styles.headerCell]}>{day}</Text>)
      )}
    </View>
  )
}

type CalendarHeaderProps = {
  onTodayButtonPress: (event: GestureResponderEvent) => void,
  style?: StyleProp<ViewStyle>,
}

const CalendarHeader = ({ onTodayButtonPress, style }: CalendarHeaderProps) => {
  const { theme } = useTheme()
  const { setAuthStatus } = useAuth()
  const navigator = useNavigation<NativeStackNavigationProp<NavParamsList>>()

  const monthTitle = dateToMonthAndYear(new Date())

  const createNewItem = () => navigator.push("login")
  const logout = async () => await setAuthStatus(false)

  return (
    <View style={[styles.weekDaysHeader, style]}>
      <HoverableOpacity
        onPress={onTodayButtonPress}
        style={[styles.button, styles.todayButton]}
        hoverStyle={styles.buttonHover}
        activeOpacity={0.45}
      >
        <Text style={[theme.textPrimary, styles.buttonText]}>Today</Text>
      </HoverableOpacity>

      <Text style={[styles.text, theme.textPrimary]}>Current month: {monthTitle}</Text>

      <HoverableOpacity
        onPress={createNewItem}
        style={[styles.button, styles.newItemButton]}
        hoverStyle={styles.buttonHover}
        activeOpacity={0.45}
      >
        <Text style={[theme.textPrimary, styles.buttonText]}>New Item</Text>
      </HoverableOpacity>

      <HoverableOpacity
        onPress={logout}
        style={[styles.button, styles.logoutButton]}
        hoverStyle={styles.buttonHover}
        activeOpacity={0.45}
      >
        <Text style={[theme.textPrimary, styles.buttonText]}>Logout</Text>
      </HoverableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    borderRadius: theme.BORDER_RADIUS,
  },
  header: {
    flex: 1,
    width: "100%",
    padding: 12,
  },
  weekDaysHeader: {
    paddingBottom: 3,
    flexDirection: "row",
  },
  cell: {
    flex: 1,
    justifyContent: "center",
    borderColor: "#303030",
    borderTopWidth: 1,
    borderLeftWidth: 1,
    //backgroundColor: "#1c1c1c",
    //backgroundColor: "#232323",
    backgroundColor: "#202020",
  },
  headerCell: {
    textAlign: "center",
    flex: 1,
  },
  button: {
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#282828",
    backgroundColor: "#232124",
  },
  todayButton: {
    marginRight: 40,
  },
  newItemButton: {
    marginLeft: 24,
  },
  logoutButton: {
    marginLeft: 40,
  },
  buttonHover: {
    opacity: theme.HOVER_OPACITY,
  },
  text: { fontSize: 20 },
  buttonText: { fontSize: 18 },
})

export default CalendarGrid
