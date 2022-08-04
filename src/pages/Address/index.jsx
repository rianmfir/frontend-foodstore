import React from 'react'

const Address = () => {
    return (
        <div className="col-lg-4">
            <div className="row">
                <div className="col-lg-12">
                    <div
                        className="card"
                        style={{ background: '#f3f3f3' }}
                    >

                        <div>
                            <ul type="none" className='container'>

                                <li className="d-flex mt-3">
                                    <p>ID Transaction </p>
                                    <p className='ms-auto'>SH12000%</p>
                                </li>
                                <hr style={{ color: 'green' }} className='mt-0' />

                                <li className="d-flex">
                                    <p>Subtotal</p>
                                    <p className='ms-auto fw-bolder'>Rp.123.000,00</p>
                                </li>
                                <hr style={{ color: 'green' }} className='mt-0' />

                                <li className="d-flex">
                                    <p>Ongkos Kirim</p>
                                    <p className='ms-auto fw-bolder'>Rp.15.000,00</p>
                                </li>
                                <hr style={{ color: 'green' }} className='mt-0' />

                                <li className="d-flex">
                                    <p>Bank Transfer</p>
                                    <p className='ms-auto fw-bolder'>BRI</p>
                                </li>
                                <hr style={{ color: 'green' }} className='mt-0' />

                                <li className="d-flex">
                                    <p>No. Rekening</p>
                                    <p className='ms-auto fw-bolder'>1122333445342</p>
                                </li>
                                <hr style={{ color: 'green' }} className='mt-0' />

                                <li className="d-flex">
                                    <p>Nama Penerima</p>
                                    <p className='ms-auto fw-bolder'>Wahyudi</p>
                                </li>
                                <hr style={{ color: 'green' }} className='mt-0' />

                                <li className="d-flex">
                                    <p>Total</p>
                                    <p className='ms-auto fw-bolder'>Rp.138.000,00</p>
                                </li>
                                <hr style={{ color: 'green' }} className='mt-0' />
                            </ul>
                        </div>
                        <a href="#"
                            className="btn text-light"
                            style={{ background: 'orange' }}
                        >PAID</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Address;
