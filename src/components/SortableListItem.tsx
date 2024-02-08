import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { useDndContext } from "@dnd-kit/core";

type SortableItemProps<T> = {
  id: string;
  item: T;
  itemIndex: number;
  isDragged?: boolean;
};

export default function SortableListItem<T extends object>(
  props: Readonly<SortableItemProps<T>>
) {
  const {
    id,
    item,
    // itemIndex,
    isDragged = false,
    // handleItemChange,
    // handleItemDelete,
  } = props;

  const { active } = useDndContext();
  const { setNodeRef, attributes, listeners, transform, activeIndex, index } =
    useSortable({ id });

  function dragOpacity() {
    if (isDragged) {
      return 0;
    }
    if (index >= 0 && activeIndex === index) {
      return 0.5;
    }
    return 1;
  }

  return (
    <li
      {...attributes}
      ref={setNodeRef}
      style={{
        opacity: dragOpacity(),
        transform: CSS.Transform.toString(transform),
        transition: active ? "transform 300ms ease" : "",
      }}
    >
      <div {...listeners} className="sortable-item">
        <div className="thumbnail"></div>
        <div className="body">
          <p className="title">{item.name}</p>
          <p className="description">{item.description}</p>
        </div>
      </div>
    </li>
  );
}
