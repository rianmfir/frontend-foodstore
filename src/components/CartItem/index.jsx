import './cartItem.scss';
import { useRef, useState } from 'react';
import { Modal } from 'bootstrap';

import { MdShoppingCart } from 'react-icons/md'

const CartItem = () => {
    const [qty, setQty] = useState(1);

    const modalRef = useRef()

    const showModal = () => {
        const modalEle = modalRef.current
        const bsModal = new Modal(modalEle, {
            backdrop: 'static',
            keyboard: false
        })
        bsModal.show()
    }

    const hideModal = () => {
        const modalEle = modalRef.current
        const bsModal = Modal.getInstance(modalEle)
        bsModal.hide()
    }

    return (
        <div className="shoppingCart ">
            <a className={qty ? "nav-link badge-notif" : "nav-link"}
                data-badge={qty} width="50" height="50" onClick={showModal}>
                <li>
                    <MdShoppingCart className='fs-2' color='#F7F5F2' />
                </li>
            </a>

            {/* Modal */}
            <div className="modal fade" ref={modalRef} tabIndex="-1" >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">List Cart</h5>
                            <button type="button" className="btn-close" onClick={hideModal} aria-label="Close"></button>

                        </div>
                        <div className="modal-body">
                            ...
                            {/* Isi Cart Yang Dipilih */}
                        </div>

                        {
                            qty ?
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={hideModal}>Batalkan</button>
                                    <button type="button" className="btn btn-primary vissual-hidden">Checkout</button>
                                </div>
                                :
                                ""
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItem;