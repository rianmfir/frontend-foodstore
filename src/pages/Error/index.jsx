import './error.css';

const Error = () => {
    return (
        <div className="empty-2-1 container mx-auto d-flex align-items-center justify-content-center flex-column" style="font-family: 'Poppins', sans-serif;">
            <img className="main-img img-fluid" src="http://api.elements.buildwithangga.com/storage/files/2/assets/Empty%20State/EmptyState2/Empty-2-1.png" alt="" />
            <div className="text-center w-100">
                <h1 className="title-text">
                    Opss! Something Missing
                </h1>
                <p className="title-caption">
                    The page you’re looking for isn’t found. We<br className="d-sm-block d-none" /> suggest you Back to Homepage.
                </p>
                <div className="d-flex justify-content-center">
                    <button className="btn btn-back d-inline-flex text-white" href="/">
                        Back to Homepage
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Error;
