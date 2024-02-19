import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function CustomPicker() {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    if (theme === "light") {
      document.documentElement.classList.remove("dark");
    } else if (theme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, [theme]);
  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date().setMonth(11),
  });

  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };

  function handleMode() {
    setTheme((pre) => {
      if (pre === "light") {
        return "dark";
      } else if (pre === "dark") {
        return "light";
      }
    });
  }
  console.log(theme);

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-screen-lg">
        <div className="flex font-bold text-white bg-green-500">
          <div className="w-1/12">1</div>
          <div className="w-2/12">Office Name</div>
          <div className="w-3/12">Office Rule</div>
          <div className="w-2/12">Office Time</div>
          <div className="w-2/12">Office Machine</div>
        </div>

        <DragDropContext direction="vertical">
          <Droppable droppableId="table">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {[2, 4, 5, 8, 6, 10].map((item, index) => (
                  <Draggable
                    key={item}
                    draggableId={`item-${item}`}
                    index={index}
                    isDragDisabled={false} // Enable dragging
                  >
                    {(provided, snapshot) => (
                      <div
                        className="flex p-4 mb-2 text-white bg-red-500"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div className="w-1/12">1</div>
                        <div className="w-2/12">{item}</div>
                        <div className="w-3/12">Office Rule</div>
                        <div className="w-2/12">Office Time</div>
                        <div className="w-2/12">Office Machine</div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}

export default CustomPicker;
