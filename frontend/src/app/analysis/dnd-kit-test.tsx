'use client';

import { useState } from 'react';
import { DndContext, closestCorners } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

export function DndKitTest() {
  //Credit to https://www.youtube.com/watch?v=dL5SOdgMbRY for the starter code!
  const [tasks, setTasks] = useState([
    {id:1, title:'Hello World 1'},
    {id:2, title:'Hello World 2'},
    {id:3, title:'Hello World 3'},
  ]);

  return (
    <DndContext collisionDetection={closestCorners}>
      <div className="column">
        <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        {tasks.map((task) => (
          <div key={task.id}>
            {task.title}
          </div>
        ))}
        </SortableContext>
      </div>
    </DndContext>
  );
}
