import { Modal } from "react-bootstrap";
import React from "react";
import starfill from "../../assets/starfill.svg";
import "./dishes.css";

const ModelSaff = ({ show, setBrowseValue, setModalShow, categories }) => {
  const handleclick = async (_id) => {
    setTimeout(() => {
      const selectedDish = document.getElementById(_id);
      selectedDish.click();
      selectedDish.scrollIntoView();
    });
    setModalShow(false)
  };

  return (
    <Modal
      show={show}
      onHide={() => setModalShow(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="modalDishes"
    >
      <Modal.Body>
        {categories &&
          categories?.map((data, i) => (
            <div key={i} onClick={() => handleclick(data._id)} className="modaldata">
              <div className="modal-title-heading">
                {/* <div>{data.active && <img src={starfill} />}</div> */}
                <p>{data.name}</p>
              </div>
              <div className="modal-title-number">{data?.dishes?.length}</div>
            </div>
          ))}
      </Modal.Body>
    </Modal>
  );
};

export default ModelSaff;
