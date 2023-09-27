"ues client";
interface InputProps {
  type: string;
  name: string;
  id: string;
  refTarget: React.Ref<HTMLInputElement>;
}

const FormInput = ({ type, name, id, refTarget }: InputProps) => {
  return (
    <input
      type={type}
      name={name}
      id={id}
      className="w-full border-b-[1px] outline-0 border-slate-500 bg-transparent"
      ref={refTarget}
    />
  );
};

export default FormInput;
