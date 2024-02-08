import { useCallback, useState } from "react";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  restrictToFirstScrollableAncestor,
  restrictToVerticalAxis,
} from "@dnd-kit/modifiers";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import SortableListItem from "./SortableListItem";

type SortableListProps<T> = {
  items: T[];
  itemIds: string[];
  onDragEnd: (newData: any) => void;
};

export default function SortableList<T extends object>(
  props: Readonly<SortableListProps<T>>
) {
  const { items, itemIds, onDragEnd } = props;

  const [activeId, setActiveId] = useState<string | undefined>();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (over && active.id !== over.id) {
        const oldIndex = itemIds.indexOf(active.id as string);
        const newIndex = itemIds.indexOf(over.id as string);

        onDragEnd(arrayMove(items, oldIndex, newIndex));
      }

      setActiveId(undefined);
    },
    [itemIds, items, onDragEnd]
  );

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      collisionDetection={closestCenter}
      // modifiers={[restrictToFirstScrollableAncestor, restrictToVerticalAxis]}
    >
      <SortableContext items={itemIds} strategy={horizontalListSortingStrategy}>
        {itemIds.map((id, index) => (
          <SortableListItem
            key={id}
            id={id}
            item={items[index]}
            itemIndex={index}
          />
        ))}
      </SortableContext>

      {createPortal(
        <DragOverlay adjustScale={false} dropAnimation={null}>
          {activeId ? (
            <SortableListItem
              id={activeId}
              item={items[itemIds.indexOf(activeId.toString())]}
              itemIndex={itemIds.indexOf(activeId)}
              isDragged
            />
          ) : null}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );
}
