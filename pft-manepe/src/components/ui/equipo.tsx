"use client";

function Equipo() {
  return (
    <div>
      <h2 className="starFont text-3xl text-left m-10 mt-20">
        Equipo
      </h2>
      <div className="flex justify-center items-center mb-10">
        <img
          src="/images/Nesss-27.png"
          alt="Nesss-27"
          className="h-30 w-30 object-cover border rounded-full m-4 "
        />
        <p className="max-w-[60%]"><a href="https://github.com/Nesss-27">@Nesss-27</a></p>
      </div>
      <div className="flex justify-center items-center mb-10">
        <img
          src="/images/pedro.png"
          alt=""
          className="h-30 w-30 object-cover border rounded-full m-4 "
        />
        <p className="max-w-[60%]"><a href="https://github.com/Pedro-Torres-git">@Pedro-Torres-git</a></p>
      </div>
      <div className="flex justify-center items-center mb-10">
        <img
          src="/images/marcos.png "
          alt=""
          className="h-30 w-30 object-cover border rounded-full m-4 "
        />
        <p className="max-w-[60%]"><a href="https://github.com/marcosbasado">@marcosbasado</a></p>
      </div>
    </div>
  );
}

export default Equipo;
