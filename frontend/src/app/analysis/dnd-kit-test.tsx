'use client';

import { useState } from 'react';
import { DndContext, closestCorners, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable, arrayMove } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function Task({id, title}: {id:number, title: string}) {
  const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id});

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}>
      {title}
      <input type="text" value="Hi!"/>
      <button onClick={e => {console.log("button pressed!");}}>
        Hey
      </button>
    </div>
  );
}

export function DndKitTest() {
  //Credit to https://www.youtube.com/watch?v=dL5SOdgMbRY for the starter code!
  const [tasks, setTasks] = useState([
    {id:1, title:'Hello World 1'},
    {id:2, title:'Hello World 2'},
    {id:3, title:'Hello World 3'},
  ]);

  const handleDragEnd = (event: DragEndEvent) => {
    const {active, over} = event;
    if (over) {
      if (active.id === over.id) return;
      setTasks(tasks => {
        const originalPos = tasks.findIndex(task => {return task.id === active.id;});
        const newPos = tasks.findIndex(task => {return task.id === over.id;});
        return arrayMove(tasks, originalPos, newPos);
      });
    }
  }

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <div className="column">
        <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        {tasks.map((task) => (
          <Task id={task.id} title={task.title} key={task.id} />
        ))}
        </SortableContext>
      </div>
    </DndContext>
  );
}
