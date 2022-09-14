import React from 'react'
import { Card, Col, Image, Placeholder } from 'react-bootstrap';
import { Button } from '../atoms';
import './cardProductPlaceholder.scss';

function CardProductPlaceholder({ perPage }) {
  return (
    Array.from({ length: perPage }).map((_, idx) => (
      <Col xxl="2" xl="3" md="4" sm="6" xs="12" key={idx}>
        <div className="food-card d-flex justify-content-center align-items-center flex-column">
          <div className="food-img">
            <Image src={`https://via.placeholder.com/130x130`} alt="" roundedCircle />
          </div>
          <Card.Body>
            <Placeholder as={Card.Title} animation="glow" className="food-name">
              <Placeholder xs={8} />
            </Placeholder>
            <Placeholder as={Card.Subtitle} animation="glow" className="food-name">
              <Placeholder xs={12} />
            </Placeholder>
            <br />

            <Button style={{ width: '100px' }} />
          </Card.Body>
        </div>
      </Col>
    ))
  )
}
export default CardProductPlaceholder;
