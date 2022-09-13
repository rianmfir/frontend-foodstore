import React from 'react'
import { Card, Col, Row } from 'react-bootstrap';

function DashboardCard({ label, icon, count }) {
    return (
        <Col md={4} className='mb-5'>
            <Card style={{
                borderRadius: '50px',
                background: 'white',
                boxShadow: '6px 6px 12px #c89e92, -6px -6px 12px #fffffc',
            }}>
                <Card.Body>
                    <Row className="px-3 gap-2">
                        <div className='justify-content-start'>
                            {icon}
                        </div>
                        <span style={{ fontSize: '16px' }} className='color-secondary '>Total {label}</span>
                        <span style={{ fontSize: '24px' }} className='fw-500 .color-primary '>{count}</span>
                    </Row>
                </Card.Body>
            </Card >
        </Col>
    )
}

export default DashboardCard;
