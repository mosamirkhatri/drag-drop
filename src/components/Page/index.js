// Library
import React, { useState, useRef, Fragment, useEffect } from "react";
import {
  cloneDeep,
  findIndex,
  includes,
  omit,
  remove,
  toInteger,
  uniqueId,
} from "lodash";
// Components
import Block from "components/Block";
import Label from "components/Label";
import Sidebar from "../Sidebar";
// Utils
import { useKeyPress, useOutsideClick } from "utils/helpers";
// Styles
import "./Page.styles.scss";
import Button from "components/Button";
import Input from "components/Input";
import Modal from "components/Modal";

const Page = ({ className, ...props }) => {
  const listFromLocal = localStorage.getItem("elementList");
  const [elementList, setElementList] = useState(
    listFromLocal ? JSON.parse(listFromLocal) : []
    // [
    // { id: 1, type: "label", x: 20, y: 50, text: "Hello!" },
    // { id: 2, type: "label", x: 50, y: 70, text: "Hi!" },
    // { id: 3, type: "label", x: 30, y: 100, text: "Name!" },
    // { id: 4, type: "button", x: 350, y: 200, text: "This Btn!" },
    // { id: 5, type: "button", x: 300, y: 250, text: "Yo Btn!" },
    // { id: 7, type: "button", x: 100, y: 100, text: "Name!" },
    // { id: 8, type: "input", x: 90, y: 200 },
    // { id: 9, type: "input", x: 80, y: 300 },
    // { id: 10, type: "input", x: 100, y: 400 },
    // { id: 11, type: "input", x: 500, y: 500 },
    // ]
  );

  console.log("something", localStorage.getItem("something"));

  const [activeElement, setActiveElement] = useState(null);

  const workingAreaRef = useRef(null);
  // workingAreaRef.current.offsetWidth => will give me current width of the working area to restrict the user from entering greater value

  const activeElementRef = useRef(null);

  const [modalState, setModalState] = useState({ isOpen: false });

  const onDragOver = (e) => {
    let event = e;
    event.stopPropagation();
    event.preventDefault();
  };

  const onDrop = (e) => {
    let newX = e.pageX;
    let newY = e.pageY;
    let data = JSON.parse(e.dataTransfer.getData("drag-data"));
    switch (data.operation) {
      case "update":
        const clone = cloneDeep(elementList);
        const index = findIndex(clone, (element) => element.id === data.id);
        clone[index].x = newX;
        clone[index].y = newY;
        setElementList(clone);
        break;
      case "add":
        if (data.type === "label")
          setModalState({
            isOpen: true,
            type: data.type,
            x: newX,
            y: newY,
            fontSize: "",
            fontWeight: "",
            text: "",
          });
        else if (data.type === "input")
          setModalState({ isOpen: true, type: data.type, x: newX, y: newY });
        else if (data.type === "button")
          setModalState({
            isOpen: true,
            type: data.type,
            x: newX,
            y: newY,
            text: "",
          });
        break;
      default:
        return;
    }
  };

  const onDelete = () => {
    if (activeElement) {
      let clone = cloneDeep(elementList);
      remove(clone, (element) => element.id === activeElement);
      setElementList(clone);
      setActiveElement(null);
    }
  };

  const onOpenModalForUpdate = () => {
    if (activeElement) {
      const element = cloneDeep(elementList).find(
        (ele) => ele.id === activeElement
      );
      setModalState({ isOpen: true, ...element });
    }
  };

  const closeModal = () => {
    setModalState({ isOpen: false });
  };

  const onChangeModalInputs = (e) => {
    const { name, value } = e.target;
    const clone = cloneDeep(modalState);
    clone[name] = value;
    setModalState(clone);
  };

  const addElement = () => {
    if (
      (modalState.type === "label" || modalState.type === "button") &&
      modalState.text === ""
    ) {
      alert("Text cannot be blank!");
      return;
    }
    if (
      toInteger(modalState.x) > workingAreaRef.current.offsetWidth ||
      toInteger(modalState.y) > window.innerHeight
    ) {
      alert("Your specified points exceed the working area!");
      return;
    }
    if (
      modalState.type === "label" &&
      (modalState.fontSize === "" || modalState.fontWeight === "")
    ) {
      alert("Please specify all typography properties!");
      return;
    }
    const newElement = omit(cloneDeep(modalState), ["isOpen"]);
    let id;
    if (newElement.id) {
      id = newElement.id;
    } else {
      const arrayOfIndex = elementList.map((ele) => ele.id);
      id = uniqueId(); // "2";
      let exists = includes(arrayOfIndex, id);
      while (exists) {
        id = uniqueId();
        exists = includes(arrayOfIndex, id);
      }
    }
    const clone = cloneDeep(elementList);
    const index = clone.findIndex((ele) => ele.id === id);
    if (index >= 0) {
      clone[index] = newElement;
      setElementList(clone);
    } else {
      setElementList((prev) => [...prev, { id: id, ...newElement }]);
    }
    closeModal();
  };

  useOutsideClick(activeElementRef, () => setActiveElement(null));

  useKeyPress(13, onOpenModalForUpdate);
  // enter -> 13, delete -> 46
  useKeyPress(46, onDelete);

  useEffect(() => {
    localStorage.setItem("elementList", JSON.stringify(elementList));
  }, [elementList]);

  return (
    <>
      {modalState.isOpen && (
        <Modal
          onClose={closeModal}
          onChange={onChangeModalInputs}
          onSubmit={addElement}
          {...modalState}
        />
      )}
      <div
        className={"page-wrapper " + (className ? className : "")}
        {...props}
      >
        <div
          className={"page-wrapper__working-area"}
          ref={workingAreaRef}
          onDragOver={onDragOver}
          onDrop={onDrop}
        >
          {elementList.map((element) => (
            <Fragment key={element.id}>
              {element.type === "label" && (
                <Label
                  className={
                    activeElement === element.id ? "active-element" : ""
                  }
                  ref={activeElement === element.id ? activeElementRef : null}
                  onClick={() => setActiveElement(element.id)}
                  onDragStart={(e) => {
                    let event = e;
                    event.dataTransfer.setData(
                      "drag-data",
                      JSON.stringify({
                        ...element,
                        operation: "update",
                      })
                    );
                  }}
                  x={element.x}
                  y={element.y}
                  fontSize={element.fontSize}
                  fontWeight={element.fontWeight}
                >
                  {element.text}
                </Label>
              )}
              {element.type === "button" && (
                <Button
                  className={
                    activeElement === element.id ? "active-element" : ""
                  }
                  ref={activeElement === element.id ? activeElementRef : null}
                  onClick={() => setActiveElement(element.id)}
                  onDragStart={(e) => {
                    let event = e;
                    event.dataTransfer.setData(
                      "drag-data",
                      JSON.stringify({
                        ...element,
                        operation: "update",
                      })
                    );
                  }}
                  x={element.x}
                  y={element.y}
                >
                  {element.text}
                </Button>
              )}
              {element.type === "input" && (
                <Input
                  className={
                    activeElement === element.id ? "active-element" : ""
                  }
                  ref={activeElement === element.id ? activeElementRef : null}
                  onClick={() => setActiveElement(element.id)}
                  onDragStart={(e) => {
                    let event = e;
                    event.dataTransfer.setData(
                      "drag-data",
                      JSON.stringify({
                        ...element,
                        operation: "update",
                      })
                    );
                  }}
                  x={element.x}
                  y={element.y}
                />
              )}
            </Fragment>
          ))}
        </div>
        <Sidebar className={"page-wrapper__sidebar"}>
          <Block
            onDragStart={(e) => {
              let event = e;
              event.dataTransfer.setData(
                "drag-data",
                JSON.stringify({
                  operation: "add",
                  type: "label",
                })
              );
            }}
            className={"page-wrapper__block"}
            type={"label"}
          >
            Label
          </Block>
          <Block
            onDragStart={(e) => {
              let event = e;
              event.dataTransfer.setData(
                "drag-data",
                JSON.stringify({
                  operation: "add",
                  type: "input",
                })
              );
            }}
            className={"page-wrapper__block"}
            type={"input"}
          >
            Input
          </Block>
          <Block
            onDragStart={(e) => {
              let event = e;
              event.dataTransfer.setData(
                "drag-data",
                JSON.stringify({
                  operation: "add",
                  type: "button",
                })
              );
            }}
            className={"page-wrapper__block"}
            type={"button"}
          >
            Button
          </Block>
        </Sidebar>
      </div>
    </>
  );
};

export default Page;
