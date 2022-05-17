import React from "react";
import { Modal, Form } from "react-bootstrap";
import CloseIcon from '../../assets/x-lg.svg'

const ModelCuisines = ({ browseValue, setBrowseValue }) => {

    const data = [
        {
            label: 'American',
            value: false
        },
        {
            label: 'Chinese',
            value: false
        },
        {
            label: 'French',
            value: false
        },
        {
            label: 'Indian',
            value: true
        },
        {
            label: 'Italian',
            value: false
        },
        {
            label: 'Japanese',
            value: false
        },
        {
            label: 'Moroccan',
            value: false
        },
        {
            label: 'Turkish',
            value: false
        },
        {
            label: 'Spanish',
            value: false
        },
        {
            label: 'Thai',
            value: false
        }
    ]
    return (
        <Modal
            show={browseValue.model}
            onHide={() => setBrowseValue(false)}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="modalCuisines"
        >

            <Modal.Body>
                <div className="modal-top-sec">
                    <div onClick={() => setBrowseValue({ model: false })} className="colse-btn">
                        <img src={CloseIcon} alt="CloseIcon" />
                    </div>
                    <h6 className="modal-head">Choose your favourite cuisines</h6>
                </div>
                <div className="modal-select-sec">
                    <div className="modal-radio-sec">
                        {data.map(({ label, value }, i) => {
                            return (
                                <div key={i} className="radio-item">
                                    <input type="checkbox" checked={true} name="ritem" value="ropt1" />
                                    <label for="American">{label}</label>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="modal-btn">
                    <button className="clear-btn" type="button">Clear</button>
                    <button className="apply-btn" type="button">Apply</button>
                </div>
            </Modal.Body>
        </Modal>
    );
}
export default ModelCuisines;