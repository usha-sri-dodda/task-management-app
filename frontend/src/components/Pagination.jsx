const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
}) => {

    if (totalPages <= 1) {
        return null;
    }

    return (

        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                marginTop: "30px",
                marginBottom: "30px",
            }}
        >

            <button
                className="btn btn-secondary"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                Previous
            </button>

            <span>

                Page {currentPage} of {totalPages}

            </span>

            <button
                className="btn btn-secondary"
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                Next
            </button>

        </div>

    );

};

export default Pagination;