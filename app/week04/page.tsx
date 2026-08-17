"use client";

import Header from "../components/header";
import Footer from "../components/footer";
import { dataItem, appendItem } from "../data/dataItem";
import { Children, useState } from "react";
import ToDoForm from "./components/ToDoForm";
import Modal from "./components/Modal";

export default function ToDoList(){

    const toDoList = [...dataItem, ...appendItem];
    const [tasks, setTasks] = useState(toDoList);
    const [numOfTasks, setNoft] = useState(tasks.length);
    const [status, setStatus] = useState(null);
    // const [open, setOpen] = useState(false);

    const [openId, setOpenId] = useState(null);

    const filteredTasks =
            status == null ? tasks
            : tasks.filter(
                (item) => item.status == status
            );

    let name = "Sakdipat K.";
    const major = "เทคโนโลยีสารสนเทศ (Information Technology)";
    let classYear = 2;
    let classSec = "ทส.ท";
    let active = true;

    console.log(`Name: ${name}`);
    console.log(`Major: ${major}`);

    const isActive = (act: boolean) => {
        if(act)
            return <samp style={{color: "green" }}>กำลังศึกษาอยู่</samp>;
         return <samp style={{color: "red" }}>ไม่ได้เป็นศึกษาแล้ว</samp>;
    }
    const Status = (status: boolean) => {
    if(status)
            return <samp style={{color: "green" }}>Completed</samp>;
        return <samp style={{color: "red" }}>Pending</samp>;
}

    const onEdit = (t) => {
        alert(`งานที่คุณต้องการแก้ไข ${t}`);
    }

    const onDelete = (id) => {
        alert(`คุณต้องการลบข้อมูล รหัสงาน ${id}?`);
    }

    const tmpTdl = filteredTasks.map((item)=> {
        const {id, title, desc, author, date_added, status} = item;
        return  (<div className="max-w-md mx-auto my-6 p-6 bg-white dark:bg-gray-800 rounded-xl border-2 border-solid border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300 ease-in-out" key={id}>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h2>
        <p className="text-gray-600 dark:text-gray-300">{desc}</p>
        <p className="text-gray-600 dark:text-gray-300">{author} / {date_added}</p>
        <p className="text-gray-600 dark:text-gray-300">{Status(status)}</p>

        {/* <Modal open={open} onClose={()=>setOpen(false)}>
            xxx
        </Modal> */}

        <Modal open={openId === id} onClose={()=>setOpenId(null)}>
            <div className="p-4">
            <h2 className="text-2xl font-bold mb-2">{title}</h2>
            <p className="text-gray-700 mb-2">รายละเอียด: {desc}</p>
            <p className="text-sm text-gray-500">ผู้เพิ่ม: {author}</p>
            <p className="text-sm text-gray-500">วันที่: {date_added}</p>
            <p className="text-sm text-gray-500">สถานะ: {Status(status)}</p>
            </div>
        </Modal>

            <div className="flex gap-2 mt-2">
            {/* View */}
            {/* <button onClick={(e)=>setOpen(true)} className="bg-green-500 text-white px-3 py-1 rounded">View</button> */}
            <button onClick={(e)=>setOpenId(id)} className="bg-green-500 text-white px-3 py-1 rounded">View</button>

            {/* Edit */}
            <button onClick={(e)=>onEdit(item)} className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>

            {/* Delete */}
            <button onClick={(e)=>onDelete(id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
            </div>
        </div>);
        });

    const addTask = (title, status) => {
        const newTask = {
            id: tasks.length+1,
            title: title,
            desc: "Test",
            date_added: "17/08/2569",
            author: "Test",
            status: status
        };

        setTasks([...tasks, newTask]);
        setNoft(tasks.length+1);
    }

    return (
        <>
            <Header />
        
            <a href="#"className=" bg-cyan-100 block max-w-sm mx-auto my-6 p-6 dark:bg-slate-800 rounded-xl shadow-xl overflow-hidden mt-20 mb-6 class= border-2 border-solid shadow-md hover:shadow-xl transition-all duration-300 ease-in-out">
        <h5 className="mb-3 text-2x1 font-semibold">To Do Lists:</h5>
            <p>
            ชื่อ-สกุล: {name} <br></br>
            สาขาวิชา: {major} <br></br>
            กลุ่มเรียน/ชั้นชั้นปี: {classSec} / {classYear} <br></br>
            สถานะภาพนักศึกษา: {isActive(active)} <br></br>
            </p>
            </a>

            <div className="grid grid-cols-1 text-center gap-4 bg-black p-4">
                <div>
                    <div className = "text-white">งานที่ต้องทำ {numOfTasks} รายการ</div>
                    <ToDoForm addTask={addTask} />
                    {/* <button className = "bg-white text-black px-3 py-1 rounded-lg" onClick={addTask}>เพิ่มงาน</button> */}
                    <div className = "text-white">ตัวกรองการค้นหา</div>
                    <button className = "bg-blue-200 text-black px-3 py-1 rounded-lg" onClick={() => setStatus(null)}>[A] All</button>
                    <button className = "bg-green-200 text-black px-3 py-1 rounded-lg" onClick={() => setStatus(true)}>[C] Completed</button>
                    <button className = "bg-red-200 text-black px-3 py-1 rounded-lg" onClick={() => setStatus(false)}>[P] Pending</button>
                </div>
            </div>

            <div className="space-y-3 flex justify-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-cyan-100">
                {tmpTdl}
            </div>

            <Footer />
        </>
    );
}