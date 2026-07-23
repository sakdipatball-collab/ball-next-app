import Header from "../components/header";
import Footer from "../components/footer";
import { toDoList } from "../data/toDoList";

export default function ToDoList(){

    let name = "Sakdipat K.";
    const major = "เทคโนโลยีสารสนเทศ (Information Technology)";
    let classYear = 2;
    let classSec = "ทส.ท";
    let active = true;

    console.log(`Name: ${name}`);
    console.log(`Major: ${major}`);

    //Arrow const isActive = (act: boolean) => (act) ? "yes" : "no";
    const isActive = (act: boolean) => {
        if(act)
            return <samp style={{color: "green" }}>กำลังศึกษาอยู่</samp>;
         return <samp style={{color: "red" }}>ไม่ได้เป็นศึกษาแล้ว</samp>;
    }

    const tmpTdl = toDoList.map((item, index)=>
        <ul>
            <div className="max-w-md mx-auto my-6 p-6 bg-white dark:bg-gray-800 rounded-xl border-2 border-solid border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300 ease-in-out" key={index}>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{item.title}</h2>
        <p className="text-gray-600 dark:text-gray-300">{item.desc}</p>
        <p className="text-gray-600 dark:text-gray-300">{item.author} / {item.date_added}</p>
            </div>
        </ul>
    )

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

            <div className="flex justify-center gap-3 bg-cyan-100">
                {tmpTdl}
            </div>

            <Footer />
        </>
    );
}