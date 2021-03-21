import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faDumpster } from "@fortawesome/free-solid-svg-icons";

import "./List.css";
import { Button } from "../buttons/Button";

type ListProps = {
  onReorder?: () => {};
  children;
};

type ListItemProps = {
  id: string;
  children: string;
  onDelete?: () => {};
  onDragStart?: () => {};
  onDragEnd?: () => {};
  onDragEnter?: () => {};
  onDragLeave?: () => {};
  onDragOver?: () => {};
  draggable?: boolean;
};

export const List: React.FC<ListProps> = ({ onReorder, children }) => {
  const draggable = Boolean(onReorder);

  const handleDrop = (currentId, droppedId) => {
    const ids = React.Children.map(children, (child) => child.props.id);
    const originalIndex = ids.indexOf(droppedId);
    const newIndex = ids.indexOf(currentId);

    ids.splice(originalIndex, 1);
    ids.splice(newIndex, 0, droppedId);

    onReorder(ids); // pass reordered list of ids
  };

  return (
    <ul className="list" onDragOver={() => {}}>
      {React.Children.map(children, (child, i) => {
        return React.cloneElement(child, {
          key: child.props.id,
          draggable,
          onDrop: handleDrop,
        });
      })}
    </ul>
  );
};

export const ListItem: React.FC<ListItemProps> = ({
  children,
  id,
  onDelete,
  draggable,
  onDrop,
}) => {
  const [dragged, setIsDragged] = React.useState(false);
  const [draggedOver, setIsDraggedOver] = React.useState(false);

  const handleDrop = (e: DragEvent) => {
    onDrop(id, e.dataTransfer.getData("id"));
  };

  // TODO: fix classnames, use enum for dragging state

  return (
    <li
      className={`item ${draggable ? "draggable" : ""} ${
        dragged ? "dragged" : ""
      } ${draggedOver ? "covered" : ""}`}
      onDrop={handleDrop}
      onDragStart={(e: DragEvent) => {
        e.dataTransfer.setData("id", id);
        setIsDragged(true);
      }}
      onDragEnd={() => setIsDragged(false)}
      onDragOver={(e: DragEvent) => {
        e.preventDefault();
        setIsDraggedOver(true);
      }}
      onDragLeave={() => setIsDraggedOver(false)}
      draggable={draggable}
    >
      {draggable && <FontAwesomeIcon className="dragHandle" icon={faBars} />}
      {children}
      {onDelete && (
        <Button
          variant="icon"
          icon={<FontAwesomeIcon icon={faDumpster} />}
          onClick={() => onDelete(id)}
        />
      )}
    </li>
  );
};
