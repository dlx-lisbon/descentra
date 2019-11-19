import React, { Component } from 'react';


class News extends Component<{}, {}> {
    /**
     * @ignore
     */
    public render() {
        return (
            <section className="post-slider-area">
                <div className="container box_1170">
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div className="owl-carousel active-post-carusel">
                                <div className="post-box mb-30">
                                    <div className="d-flex">
                                        <div>
                                            <a href="#">
                                                <img src="img/author/a1.png" alt="" />
                                            </a>
                                        </div>
                                        <div className="post-meta">
                                            <div className="meta-head">
                                                <a href="#">Marvel Maison</a>
                                            </div>
                                            <div className="meta-details">
                                                <ul>
                                                    <li>
                                                        <a href="#">
                                                            <span className="lnr lnr-calendar-full" />
                                                            13th Oct, 2018
                                                            </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <span className="lnr lnr-picture" />
                                                            Image Post
                                                            </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <span className="lnr lnr-coffee-cup" />
                                                            Food & Travel
                                                            </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <span className="lnr lnr-bubble" />
                                                            03 Comments
                                                            </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet,
                                        consectetur adipisicing elit, sed do eiusmod tempor incididunt
                                        ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                        quis nostrud exercitation.
                                        </p>
                                    <div className="post-btn">
                                        <a href="#" className="primary-btn text-uppercase">Read More</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default News;
