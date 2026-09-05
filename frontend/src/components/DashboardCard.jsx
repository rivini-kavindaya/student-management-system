function DashboardCard({ title, value, icon, subtitle }) {

    return (
        <div className="card border-0 shadow-sm h-100 rounded-4">

            <div className="card-body p-4">

                <div className="d-flex justify-content-between align-items-start">

                    <div>

                        <p className="text-muted mb-2 fw-medium">
                            {title}
                        </p>

                        <h2 className="fw-bold mb-1">
                            {value}
                        </h2>

                        {subtitle && (
                            <small className="text-muted">
                                {subtitle}
                            </small>
                        )}

                    </div>

                    <div
                        className="d-flex align-items-center justify-content-center rounded-3 bg-primary-subtle text-primary"
                        style={{
                            width: "52px",
                            height: "52px",
                            fontSize: "24px"
                        }}
                    >
                        {icon}
                    </div>

                </div>

            </div>

        </div>
    );
}

export default DashboardCard;