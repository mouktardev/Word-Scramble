import { h, Component } from "preact";

const Checkbox = ({ id, type, name, handleClick, isChecked, label }) => {
  return (
    <>
      <input
        class="sr-only peer"
        id={id}
        name={name}
        type={type}
        onChange={handleClick}
        checked={isChecked}
      />
      <label
        class="flex font-poppins font-bold text-3xl uppercase py-2 px-4 text-fuchsia-900 focus:outline-none peer-checked:bg-purple-500 cursor-pointer rounded-full"
        for={id}
      >
        {label}
      </label>
    </>
  );
};

export default Checkbox;
