// Library
import React from "react";
// Translucent Background
import TranslucentBackground from "components/TranslucentBackground";
import "./Modal.styles.scss";

const Modal = ({
  onClose,
  id,
  type,
  text,
  x,
  y,
  fontSize,
  fontWeight,
  onChange,
  onSubmit,
  ...props
}) => {
  const elementMapper = { label: "Label", input: "Input", button: "Button" };
  return (
    <TranslucentBackground>
      <div className={"modal-wrapper"}>
        <div className={"modal-wrapper__header"}>
          <p>
            {id ? `Edit` : `New`} {elementMapper[type]}
          </p>
          <svg
            onClick={onClose}
            width="15"
            height="14"
            viewBox="0 0 15 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.2"
              d="M8.91602 7.125L13.1406 2.94141L14.002 2.08008C14.125 1.95703 14.125 1.75195 14.002 1.58789L13.0996 0.685547C12.9355 0.5625 12.7305 0.5625 12.6074 0.685547L7.5625 5.77148L2.47656 0.685547C2.35352 0.5625 2.14844 0.5625 1.98438 0.685547L1.08203 1.58789C0.958984 1.75195 0.958984 1.95703 1.08203 2.08008L6.16797 7.125L1.08203 12.2109C0.958984 12.334 0.958984 12.5391 1.08203 12.7031L1.98438 13.6055C2.14844 13.7285 2.35352 13.7285 2.47656 13.6055L7.5625 8.51953L11.7461 12.7441L12.6074 13.6055C12.7305 13.7285 12.9355 13.7285 13.0996 13.6055L14.002 12.7031C14.125 12.5391 14.125 12.334 14.002 12.2109L8.91602 7.125Z"
              fill="black"
            />
          </svg>
        </div>
        <div className={"modal-wrapper__body"}>
          {(type === "label" || type === "button") && (
            <>
              <label>Text</label>
              <input
                type={"text"}
                name={"text"}
                value={text}
                onChange={onChange}
              />
            </>
          )}
          <label>X</label>
          <input type={"number"} name={"x"} value={x} onChange={onChange} />
          <label>Y</label>
          <input type={"number"} name={"y"} value={y} onChange={onChange} />
          {type === "label" && (
            <>
              <label>Font Size</label>
              <input
                type={"number"}
                name={"fontSize"}
                value={fontSize}
                onChange={onChange}
              />
            </>
          )}
          {type === "label" && (
            <>
              <label>Font Weight</label>
              <input
                type={"number"}
                name={"fontWeight"}
                value={fontWeight}
                onChange={onChange}
              />
            </>
          )}
          <button onClick={onSubmit} className={"modal-wrapper__save-button"}>
            {id ? `Save Changes` : `Create`}
          </button>
        </div>
      </div>
    </TranslucentBackground>
  );
};

export default Modal;
