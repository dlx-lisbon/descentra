import React, { Component } from 'react';


class Pagination extends Component<{}, {}> {
    /**
     * @ignore
     */
    public render() {
        return (
            <nav className="blog-pagination justify-content-center d-flex">
                <ul className="pagination">
                    <li className="page-item">
                        <a href="#" className="page-link" aria-label="Previous">
                            <span aria-hidden="true">
                                <span className="lnr lnr-arrow-left" />
                            </span>
                        </a>
                    </li>
                    <li className="page-item"><a href="#" className="page-link">01</a></li>
                    <li className="page-item active">
                        <a href="#" className="page-link">02</a>
                    </li>
                    <li className="page-item"><a href="#" className="page-link">03</a></li>
                    <li className="page-item"><a href="#" className="page-link">04</a></li>
                    <li className="page-item"><a href="#" className="page-link">09</a></li>
                    <li className="page-item">
                        <a href="#" className="page-link" aria-label="Next">
                            <span aria-hidden="true">
                                <span className="lnr lnr-arrow-right" />
                            </span>
                        </a>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default Pagination;
