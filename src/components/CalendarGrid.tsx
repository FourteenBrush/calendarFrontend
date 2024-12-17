import { MutableRefObject, useCallback, useRef } from "react"
import React, { FlatList, ListRenderItemInfo, StyleSheet, Text, useWindowDimensions, View, ViewabilityConfig, ViewToken } from "react-native"
import { useTheme } from "@/hooks/useTheme"
import { Day, DAYS_PER_WEEK, WEEK_DAYS } from "@/utils"
import * as theme from "@/styles/theme"
import { renderCell } from "./CalendarCell"
import { mockEventsData } from "@/mock"

export type CalendarGridProps = {
  listRef: MutableRefObject<FlatList<Day> | null>,
  readonly cells: Day[],
}

export default ({ listRef, cells }: CalendarGridProps) => {
  const { height } = useWindowDimensions()

  const viewabilityConfig = useRef<ViewabilityConfig>({
    minimumViewTime: 1,
    // a single pixel in the viewport makes the item visible
    viewAreaCoveragePercentThreshold: 0,
    waitForInteraction: true,
  })

  const cellHeight = Math.max(theme.MIN_CELL_HEIGHT, height / 7)

  const renderItem = (renderInfo: ListRenderItemInfo<Day>) => {
    const events = Math.random() < 0.3 ? mockEventsData : []
    return renderCell({ height: cellHeight, cellsCount: cells.length, events, ...renderInfo })
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
    <View style={styles.header}>
      {WEEK_DAYS.map(day => (
        <Text key={day} style={[theme.textPrimary, styles.headerCell]}>{day}</Text>)
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: theme.BORDER_RADIUS,
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
  header: {
    paddingBottom: 3,
    width: "100%",
    flexDirection: "row",
  },
  headerCell: {
    textAlign: "center",
    flex: 1,
  },
})
