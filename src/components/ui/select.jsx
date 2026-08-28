import { useEffect } from "react";
import ReactSelect from "react-select";

export function Select({ icon, message, value, name, arrayOptions = [], onChange, error }) {

  const handleSelectChange = (selected) => {
    onChange({
      target: {
        name: name,
        value: String(selected ? selected.value : "")
      }
    });
  };

  const selectedOption = arrayOptions.find(
    (opt) => String(opt.value) === String(value)
  ) ?? null;

  return (
    <div className="w-full flex flex-col gap-1">
      <div className="w-full bg-white rounded-full px-6 py-3 flex gap-2 items-center">
        {icon && (
          <i className={`${icon} ${error ? "text-red-800" : "text-(--color_azul)"}`} />
        )}

        <ReactSelect
          unstyled
          className="w-full"
          classNames={{  
            control: () => "min-h-[24px] p-none",
            placeholder: () => "text-gray-400 w-full text-start",
            singleValue: () => "text-[var(--color_azul)] text-start",
            input: () => "text-[var(--color_azul)]",
            menu: () => "bg-white text-[var(--color_azul)] rounded-xl p-2 mt-1 shadow-md overflow-hidden",
            option: ({ isFocused, isSelected }) =>
              `px-2 py-2 cursor-pointer rounded-xl mb-1 ${
                isSelected
                  ? "bg-[var(--color_azul)] text-white"
                  : isFocused
                  ? "bg-[var(--color_azul)]/10"
                  : ""
              }`,
            indicatorSeparator: () => "hidden",
            dropdownIndicator: () => "text-[var(--color_azul)] px-2",
          }}
          styles={{
            control: (base) => ({ ...base, minHeight: "24px"}),
          }}
          components={{
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null,
          }}
          placeholder={message}
          value={selectedOption}
          options={arrayOptions}
          onChange={handleSelectChange}
        />
      </div>

      {error && (
        <span
          className="pl-7 text-xs italic text-red-800 flex gap-2"
          id={`${name}-error`}
        >
          <i className="ri-error-warning-fill"></i> {error}
        </span>
      )}
    </div>
  );
}