import { Badge } from 'react-bootstrap';
import { BsTagFill } from 'react-icons/bs';

const Tag = ({ items }) => {

    return (
        <>
            {
                items.map((item, index) => {
                    return (
                        <Badge
                            pill
                            bg="secondary"
                            style={{ fontSize: "0.7em", cursor: 'pointer' }}
                            className="me-1"
                            key={index}
                        >
                            <BsTagFill />
                            {item.name}
                        </Badge>
                    )
                })
            }
        </>
    )
}

export default Tag;
