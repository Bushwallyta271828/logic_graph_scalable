'use client';

import { useState } from 'react';
import { useSensors, useSensor, PointerSensor, DndContext, closestCorners, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable, arrayMove } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Menu } from '@headlessui/react'

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
      <div className="relative">
      <Menu>
        <Menu.Button className={`bg-medium-text hover:bg-bright-text h-full w-20 p-2 rounded-l-md`}>
          <p className="text-white text-sm truncate">123456</p>
          <p className="text-white text-sm truncate">local</p>
        </Menu.Button>
        <Menu.Items className="absolute w-40 origin-top-right z-10 bg-transparent outline-none rounded-md shadow-xl text-white text-sm font-normal">
          <div>
              <Menu.Item>
                {({ active }) => (
                  <a
                    className={`block px-4 py-2 rounded-t-md ${active ? 'bg-bright-definition' : 'bg-medium-definition'}`}>
                    Attach Definition
                  </a>
                )}
              </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  className={`block px-4 py-2 rounded-b-md ${active ? 'bg-bright-danger' : 'bg-medium-danger'}`}>
                  Delete Claim
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Menu>
    </div>
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

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  return (
    <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
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
