import React from "react";
import { Droppable } from "react-beautiful-dnd";
import ListItem from "./ListItem";

const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: 8,
    width: 250,
});

export default function List({ column }) {
    // console.log(column);
    return (
        // <div className="list">
        //     {/* <h1>{title}</h1> */}
        //     <Droppable droppableId="droppable">
        //         {(provided, snapshot) => (
        //             <div {...provided.droppableProps} ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
        //                 {data.map((item, index) => (
        //                     <ListItem item={item} key={index} index={index} />
        //                 ))}
        //                 {provided.placeholder}
        //             </div>
        //         )}
        //     </Droppable>
        // </div>
        // <div className="list">
        //     {data2.map((col, indexs) => (
        //         <Droppable droppableId="droppable" key={indexs}>
        //             {/* {console.log(col)} */}
        //             {(provided, snapshot) => (
        //                 <div {...provided.droppableProps} ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
        //                     {col.items.map((item, index) => (
        //                         <ListItem item={item} key={index} index={index} />
        //                     ))}
        //                     {provided.placeholder}
        //                 </div>
        //             )}
        //         </Droppable>
        //     ))}
        // </div>

        // <div className="list">
        //     <h1>{column.title}</h1>
        //     <div>
        //         <Droppable droppableId={column.id} key={tasks.id}>
        //             {(provided, snapshot) => (
        //                 <div {...provided.droppableProps} ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
        //                     {tasks.map((item, index) => (
        //                         <ListItem item={item} key={index} index={index} />
        //                     ))}
        //                     {provided.placeholder}
        //                 </div>
        //             )}
        //         </Droppable>
        //     </div>
        // </div>
        <div className="list">
            <h1>{column.title}</h1>
            <div>
                <Droppable droppableId={column.id} key={column.id}>
                    {(provided, snapshot) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
                            {column.taskIds.map((item, index) => (
                                <ListItem item={item} key={index} index={index} />
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        </div>
    );
}
