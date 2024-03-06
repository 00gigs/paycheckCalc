import React from "react";

const Advice = () => {
  return (
    //flex col flex = vertical stack

    <div className="flex flex-col items-center justify-center align-middle p-7 text-center">
      <h1 className="mb-5 text-lg font-bold">
        Meet Fin, the Ai financial friend 👋
      </h1>

      {/**result display /AI text */}
      <div className=" text-wrap  flex  w-3/4 border-4 border-orange-300 m-3 p-4 bg-slate-400 bg-opacity-25 rounded-md text-slate-200 max-h-80 overflow-y-auto tracking-widest">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut porttitor leo a
        diam sollicitudin tempor. Facilisis magna etiam tempor orci eu lobortis.
        Mattis enim ut tellus elementum sagittis vitae et leo. Arcu odio ut sem
        nulla. Gravida dictum fusce ut placerat orci nulla. At consectetur lorem
        donec massa sapien. Eu mi bibendum neque egestas. Massa enim nec dui
        nunc. Ac orci phasellus egestas tellus rutrum tellus. Proin sed libero
        enim sed faucibus turpis in eu. Ipsum consequat nisl vel pretium lectus
        quam. Bibendum arcu vitae elementum curabitur vitae. Arcu non odio
        euismod lacinia at quis risus sed vulputate. Vel eros donec ac odio
        tempor. Nibh praesent tristique magna sit amet purus gravida. Laoreet
        sit amet cursus sit amet dictum. Dolor sit amet consectetur adipiscing.
        Cursus vitae congue mauris rhoncus aenean vel. Sit amet nisl suscipit
        adipiscing bibendum est. Nullam eget felis eget nunc lobortis mattis.
        Integer quis auctor elit sed vulputate. Ligula ullamcorper malesuada
        proin libero nunc consequat. Habitasse platea dictumst vestibulum
        rhoncus est pellentesque elit ullamcorper dignissim. Lobortis
        scelerisque fermentum dui faucibus in ornare quam viverra. Ante in nibh
        mauris cursus mattis molestie a. Ultricies integer quis auctor elit sed
        vulputate. Augue mauris augue neque gravida. Velit laoreet id donec
        ultrices tincidunt arcu. Nulla at volutpat diam ut venenatis tellus in
        metus.
      </div>

      {/**submit button   */}

      <div className="flex items-center">
        <button className="flex mr-4 bg-orange-400 rounded-xl w-fit  p-1">+</button>
        {/**inpunt   */}
        <input className=" form-input mt-1 block w-fit p-2 rounded-md bg-inherit border-b-2"/>
      </div>
    </div>
  );
};

export default Advice;
