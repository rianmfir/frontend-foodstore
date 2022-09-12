import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './error.css';

const Error = () => {

    const role = useSelector(state => state.auth.user?.user?.role);
    const backToName = role === 'admin' ? 'Dashboard' : 'Homepage';

    return (
        <div className="empty-2-1 container mx-auto d-flex align-items-center justify-content-center flex-column" style={{ fontFamily: 'Poppins' }}>
            <img className="main-img img-fluid" src="http://api.elements.buildwithangga.com/storage/files/2/assets/Empty%20State/EmptyState2/Empty-2-1.png" alt="" />
            <div className="text-center w-100">
                <h1 className="title-text">
                    Opss! Something Missing
                </h1>
                <p className="title-caption">
                    The page you’re looking for isn’t found. We<br className="d-sm-block d-none" /> suggest you Back to {backToName}.
                </p>
                <div className="d-flex justify-content-center">
                    <Button
                        as={Link}
                        to={role === 'admin' ? '/admin/dashboard' : '/'}
                        variant=''
                        className="btn btn-back d-inline-flex text-white">
                        Back to {backToName}
                    </Button>
                </div>
            </div>
        </div >
    )
}

export default Error;
