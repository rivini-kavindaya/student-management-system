function Toast({ message, type = "success", onClose }) {

    if (!message) return null;

    const isSuccess = type === "success";

    return (
        <div
            className={`custom-toast ${
                isSuccess
                    ? "custom-toast-success"
                    : "custom-toast-error"
            }`}
        >
            <div className="custom-toast-icon">
                {isSuccess ? "✓" : "!"}
            </div>

            <div className="custom-toast-content">
                <strong>
                    {isSuccess ? "Success" : "Error"}
                </strong>

                <span>{message}</span>
            </div>

            <button
                type="button"
                className="custom-toast-close"
                onClick={onClose}
                aria-label="Close notification"
            >
                ×
            </button>
        </div>
    );
}

export default Toast;