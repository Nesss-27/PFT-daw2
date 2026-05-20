'use client';

function Navbar() {

  return (

<div className="h-10 w-full px-10 justify-between items-center  mx-auto flex bg-black rounded-base shadow-xs border border-default">
<img src="/logo.svg" alt="Logo" className="h-10"  />
<a href="/">Manepe</a>
<a href="/signup">Dashboard</a>
<a href="/donate">Donar</a>
</div>

  )
}

export default Navbar;