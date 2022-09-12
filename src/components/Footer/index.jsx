import React from 'react'
import { Row } from 'react-bootstrap';

const Footer = () => {
    return (
        <div className="py-3"
            style={{

                position: 'relative',
                borderTop: '1px solid #e8e8e8',
                color: '#FF7C57',
                backgroundColor: 'white',
                bottom: 0,
                width: '100%',
                textAlign: 'center',

            }}>
            {/* <hr /> */}
            <Row>
                <p className="my-auto">
                    &copy;{new Date().getFullYear()} rianmfir | All rights reserved |
                    Terms Of Service | Privacy
                </p>
            </Row>
        </div >
    )
}

export default Footer;