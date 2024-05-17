import React from 'react';

export function Organization() {
  // const [open, setOpen] = React.useState<boolean>(true); // Annotate type here

  // const handleOpen = (value: boolean) =>
  //   setOpen(open === value ? false : value); // Annotate type here

  return (
    <div className="w-full border-t border-[#E6E3D6] p-5">
      <div className="max-w-[652px] m-auto w-full">
        <div className="container mx-auto">
          <div className="m-8 rounded overflow-hidden">
            <div className="group outline-none accordion-section" tabIndex={1}>
              <div className="group bg-gray-900 flex justify-between px-4 py-3 items-center text-gray-500 transition ease duration-500 cursor-pointer pr-10 relative">
                <div className="group-focus:text-white transition ease duration-500"></div>
                <div className="h-8 w-8 border border-gray-700 rounded-full items-center inline-flex justify-center transform transition ease duration-500 group-focus:text-white group-focus:-rotate-180 absolute top-0 right-0 mb-auto ml-auto mt-2 mr-2">
                  <i className="fas fa-chevron-down"></i>
                </div>
              </div>
              <div className="group-focus:max-h-screen max-h-0 bg-gray-800 px-4 overflow-hidden ease duration-500">
                <p className="p-2 text-gray-400 text-justify">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Fugiat, repellat amet doloribus consequuntur eos similique
                  provident tempora voluptates iure quia fuga dicta voluptatibus
                  culpa mollitia recusandae delectus id suscipit labore?
                </p>
              </div>
            </div>
            <div className="group outline-none accordion-section" tabIndex={1}>
              <div className="group bg-gray-900 flex justify-between px-4 py-3 items-center text-gray-500 transition ease duration-500 cursor-pointer pr-10 relative">
                <div className="group-focus:text-white transition ease duration-500">
                  Title for Tab - 2
                </div>
                <div className="h-8 w-8 border border-gray-700 rounded-full items-center inline-flex justify-center transform transition ease duration-500 group-focus:text-white group-focus:-rotate-180 absolute top-0 right-0 mb-auto ml-auto mt-2 mr-2">
                  <i className="fas fa-chevron-down"></i>
                </div>
              </div>
              <div className="group-focus:max-h-screen max-h-0 bg-gray-800 px-4 overflow-hidden ease duration-500">
                <p className="p-2 text-gray-400 text-justify">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Fugiat, repellat amet doloribus consequuntur eos similique
                  provident tempora voluptates iure quia fuga dicta voluptatibus
                  culpa mollitia recusandae delectus id suscipit labore?
                </p>
              </div>
            </div>
            <div className="group outline-none accordion-section" tabIndex={1}>
              <div className="group bg-gray-900 flex justify-between px-4 py-3 items-center text-gray-500 transition ease duration-500 cursor-pointer pr-10 relative">
                <div className="group-focus:text-white transition ease duration-500">
                  Title for Tab - 3
                </div>
                <div className="h-8 w-8 border border-gray-700 rounded-full items-center inline-flex justify-center transform transition ease duration-500 group-focus:text-white group-focus:-rotate-180 absolute top-0 right-0 mb-auto ml-auto mt-2 mr-2">
                  <i className="fas fa-chevron-down"></i>
                </div>
              </div>
              <div className="group-focus:max-h-screen max-h-0 bg-gray-800 px-4 overflow-hidden ease duration-500">
                <p className="p-2 text-gray-400 text-justify">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Fugiat, repellat amet doloribus consequuntur eos similique
                  provident tempora voluptates iure quia fuga dicta voluptatibus
                  culpa mollitia recusandae delectus id suscipit labore?
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full fixed bottom-0 text-center bg-red-700 py-4 text-white">
          Pure CSS Accordion Built using TailwindCSS. CSS is generated using the
          built tool by making tweaks to the <strong>tailwind.config.js</strong>
        </div>
      </div>
    </div>
  );
}

export default Organization;
