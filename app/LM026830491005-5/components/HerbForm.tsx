"use client";

import { useState , useEffect} from "react";

export default function ToDoForm ({addTask , editingTask, updateTask, resetEditingTask}) {

    const [title, setTitle] = useState('');
    const [detail, setDetail] = useState('');
    const [supplier, setSupplier] = useState('');
    //const [taskStatus, setTaskStatus] = useState(false);
    const [taskStatus, setTaskStatus] = useState<number>(3);

    useEffect(() => {
        
        if(editingTask){
          const {title, status} = editingTask;
          setTitle(title);
          setTaskStatus(status);
        }else{
          setTitle('');
          setTaskStatus(3);
        }
    }, [editingTask]);

    const handleCancel = (e) => {
        setTitle('');
        setDetail('');
        setSupplier('');
        setTaskStatus(3);
        resetEditingTask();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;
        else
        addTask(title, taskStatus, detail);
        

        handleCancel;
      }

      const newItem = {
  id: Date.now(),
  name: title,
  detail: detail,
  supplier: supplier,
  type: Number(taskStatus),
};
    
    return (
        <form onSubmit={handleSubmit}>
        <div className="m-3 p-6 bg-white rounded-xl shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">เพิ่มข้อมูลสมุนไพร</h3>
        <div className="flex">
          <label className="mb-2 text-sm font-medium text-slate-700">ชื่อสมุนไพร:</label>
          <input
            type="text"
            placeholder="Enter herb..."
            className="w-11/12 ms-4 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease-content focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div><br />
        <div className="flex">
          <label className="mb-2 text-sm font-medium text-slate-700">รายระเอียด:</label>
          <input
            type="textarea"
            placeholder="Enter detail..."
            className="w-11/12 ms-4 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease-content focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
          />
        </div><br />
        <div className="flex">
          <label className="mb-2 text-sm font-medium text-slate-700">ผู้ผลิต:</label>
          <input
            type="text"
            placeholder="Enter supplier..."
            className="w-11/12 ms-4 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease-content focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            value={supplier}
            onChange={(e) => setSupplier(e.target.value)}
          />
        </div>
        <div className="flex gap-3">
        <label className="mt-4 py-4 text-sm font-medium text-slate-700">ประเภทสมุนไพร:</label>

        {/* ใช้ภายนอก (type = 2) */}
        <label className="mt-4 px-4 py-4 flex items-center gap-3 cursor-pointer hover:bg-gray-50 rounded-lg">
          <input 
            type="radio" 
            name="taskStatus" 
            value={2} 
            checked={taskStatus === 2} 
            onChange={() => setTaskStatus(2)} 
            className="h-4 w-4 accent-blue-600 cursor-pointer" 
          />
          <span className="text-sm font-medium text-gray-700">ใช้ภายนอก</span>
        </label>

        {/* ใช้ภายใน (type = 1) */}
        <label className="ms-2 mt-4 px-4 py-4 flex items-center gap-3 cursor-pointer hover:bg-gray-50 rounded-lg">
          <input 
            type="radio" 
            name="taskStatus" 
            value={1} 
            checked={taskStatus === 1} 
            onChange={() => setTaskStatus(1)} 
            className="h-4 w-4 accent-blue-600 cursor-pointer" 
          />
          <span className="text-sm font-medium text-gray-700">ใช้ภายใน</span>
        </label>

        {/* ใช้ทั้งภายในและภายนอก (type = 3) */}
        <label className="ms-2 mt-4 px-4 py-4 flex items-center gap-3 cursor-pointer hover:bg-gray-50 rounded-lg">
          <input 
            type="radio" 
            name="taskStatus" 
            value={3} 
            checked={taskStatus === 3} 
            onChange={() => setTaskStatus(3)} 
            className="h-4 w-4 accent-blue-600 cursor-pointer" 
          />
          <span className="text-sm font-medium text-gray-700">ใช้ทั้งภายในและภายนอก</span>
        </label>
        </div>
        <div className="flex mt-4 gap-2 justify-center">
          <button className="bg-blue-600 text-white px-4 py-1 rounded">
            {editingTask ? 'บันทึก' : 'บันทึก'}
          </button>
          <button className="bg-gray-600 text-white px-4 rounded" onClick={handleCancel}>
            Clear
          </button>
        </div>
      </div>
    </form>
    )
}