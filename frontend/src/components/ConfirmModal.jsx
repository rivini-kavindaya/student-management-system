function ConfirmModal({
    show,
    title = "Confirm Action",
    message = "Are you sure you want to continue?",
    confirmText = "Confirm",
    cancelText = "Cancel",
    type = "danger",
    loading = false,
    onConfirm,
    onCancel
}) {

    if (!show) return null;

    const confirmButtonClass =
        type === "danger"
            ? "btn btn-danger"
            : "btn btn-primary";

    return (
        <div className="confirm-modal-backdrop">

            <div className="confirm-modal">

                <div className="confirm-modal-icon">
                    !
                </div>

                <div className="confirm-modal-content">

                    <h4 className="fw-bold mb-2">
                        {title}
                    </h4>

                    <p className="text-muted mb-0">
                        {message}
                    </p>

                </div>

                <div className="confirm-modal-actions">

                    <button
                        type="button"
                        className="btn btn-outline-secondary px-4"
                        onClick={onCancel}
                        disabled={loading}
                    >
                        {cancelText}
                    </button>

                    <button
                        type="button"
                        className={`${confirmButtonClass} px-4`}
                        onClick={onConfirm}
                        disabled={loading}
                    >

                        {loading ? (
                            <>
                                <span
                                    className="spinner-border spinner-border-sm me-2"
                                    role="status"
                                ></span>

                                Processing...
                            </>
                        ) : (
                            confirmText
                        )}

                    </button>

                </div>

            </div>

        </div>
    );
}

export default ConfirmModal;