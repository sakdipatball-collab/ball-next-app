"use client";

import HerbHome from "./main/herbhome";
import Footer from "./main/footer";
import { myPets } from "./dataMedical/datamed";
import { Children, useEffect, useState } from "react";
import AddMed from "./med/AddMed";

export default function Medical(){

    const Medical = [myPets];
    const [med, setTasks] = useState(myPets);
    const [myPets, setStatus] = useState(null);
    const [editingTask, setEditingTask] = useState(null);
    const resetAddName = () => setAddName(null);

    const Medical = 
            med == null ? med
            : med.filter(
                (item) => item.med == med
            );

    const updateMeds = (id, details, status) => {
        setMeds(
            tasks => tasks.map(
                t => t.id === id ?
                {
                    ...t,
                    title: title,
                    status: status
                } : t
            ));
            setEditingTask(null);
    }

    const onDelete = (id) => {
        const updateMed = Med.filter(
            item => item.id != id
        );
        setTasks(updateTasks);
    }

    const myPets = Medical.map((AddMed)=> {
        const {id, name, detail, type, supplier,} = myPets;
        return  (<div className="max-w-md mx-auto my-6 p-6 bg-white dark:bg-gray-800 rounded-xl border-2 border-solid border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300 ease-in-out" key={id}>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{name}</h2>
        <p className="text-gray-600 dark:text-gray-300">{detail}</p>
        <p className="text-gray-600 dark:text-gray-300">{type}</p>
        <p className="text-gray-600 dark:text-gray-300">{supplier}</p>

            <div className="flex gap-2 mt-2">
            {/* Delete */}
            <button onClick={(e)=>onDelete(id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
            </div>
        </div>);
        });

            
return (
        <>
            <HerbHome />

            <AddMed
                        addName={addName}
                        addDetail={}
                        addSupplier={}
                        editingTask={editingTask}
                        updateTask={updateTasks}
                        resetEditingTask={resetEditingTask}
            />

            <Footer />
        </>
    );
}