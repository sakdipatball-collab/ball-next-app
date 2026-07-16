export default function Header() {

    return (
    <header className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
  <nav className="max-w-7xl mx-auto px-4 flex justify-between h-16 items-center">
    <a href="#" className="text-2xl font-bold text-sky-500">Web Programming</a>

    <div className="hidden md:flex items-center gap-6 text-gray-600">
      <a href="/week02" className="hover:text-sky-500">หน้าแรก</a>
      <a href="/contact" className="bg-sky-500 text-white px-4 py-2 rounded-lg">ติดต่อ</a>
    </div>
  </nav>
</header>
    );

}