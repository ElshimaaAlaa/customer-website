function MainBtn({ text, onclick, btnType, ...props }) {
  return (
    <div>
      <button
        className="bg-primary h-14 rounded-md text-lg text-white font-bold outline-none w-full rtl:text-[17px]"
        onClick={onclick}
        type={btnType}
      >
        {text}
      </button>
    </div>
  );
}
export default MainBtn;