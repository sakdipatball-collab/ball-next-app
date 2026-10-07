"use client";

import Header from "./components/header";
import Footer from "./components/footer";
import HerbForm from "./components/HerbForm";

import { Samunprai } from "./data/samunprai";

import { useState } from "react";


export default function ToDoList() {

    const toDoList = [...Samunprai];
    const [tasks, setTasks] = useState(Samunprai); 
    const [type, setType] = useState(null);


    const [editingTask, setEditingTask] = useState(null);

    const resetEditingTask = () => setEditingTask(null);

    const filteredTasks = type == null ? tasks : tasks.filter((item) => item.type === type);

    // setTasks([toDoList]);

    

    const Status = (type: number) => {
  if (type === 1) {
    return <span style={{ color: "green" }}>ใช้ภายใน</span>;
  } else if (type === 2) {
    return <span style={{ color: "red" }}>ใช้ภายนอก</span>;
  } else if (type === 3) {
    return <span style={{ color: "blue" }}>ใช้ทั้งภายในและภายนอก</span>;
  }
  return null;
};
    
    

    const updateTask = (id, name, type, detail) => {
        setTasks(
            tasks => tasks.map(
                t => t.id === id ?
                {...t, 
                name: name,
                detail: detail,
                type: type}
                :t
            )
        );
        
    }

    const onDelete = (id) => {
       // alert(`Want to delete? AGEMASEN ${id}`);
       const updatedTasks = tasks.filter(
        item => item.id !== id
       );
       setTasks(updatedTasks);
    }

    // const toDoList = [...dataitem, ...appendItem];

    const tmpTDL = filteredTasks.map((item, index) => {
        const {id, name, detail, type, supplier} = item;
        return (
        <div className="max-w-md mx-auto my-6 p-6 bg-white dark:bg-gray-800 rounded-xl border-2 border-solid border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300 ease-in-out" key={id || index}>
        <span>ชื่อสมุนไพร: {name}</span><br />
        <span>รายระเอียด: {detail}</span><br />
        <span>ผู้ผลิต: {supplier}</span><br />
        <span>ประเภท: {Status(type)}</span>

        
        
        <div className="flex gap-2 mt-2">
            
            {/* Delete */}
        <button onClick={(e) =>onDelete(id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
        </div>
        </div>
        );
    }
    );


    const addTask = (tasks, type, detail) => {
        const newTask = {
            id: tasks.length + 1,
            name: name,
            detail: detail,
            date_added: "13/08/2569",
            author: "Sakdipat",
            type: type
        };

        setTasks([...tasks, newTask]);
       
        console.log("เพิ่มงานเรียบร้อยแล้ว");
    }



    return (
        <>
        <Header />
        <section className="relative bg-center flex items-center justify-center  mt-10 mb-1 repeat-" style={{ backgroundImage: `url('./images/BackgroundGray.jpg')` }}>

        

        <div>
         <div className="flex justify-center gap-3 space-y-3 flex justify-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 flex justify-center w-full my-6">
            <div className="grid grid-cols-1 text-center gap-4 bg-black p-4 ">
              
            <div className="items-center justify-center ">
                <HerbForm 
                    addTask={addTask} 
                    editingTask={editingTask}
                    updateTask={updateTask}
                    resetEditingTask={resetEditingTask}
                />

                
            </div>
           
            </div>
        </div>
        <div className = "text-black text-2xl">รายการสมุนไพรในระบบ</div>
        <div className="space-y-3 flex justify-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-cyan-100">
            {tmpTDL}
        
        </div>
        </div>
        </section>
        <Footer />
        </>
    )
}