import React, { Component } from 'react';


class SinglePostItem extends Component<{}, {}> {
    /**
     * @ignore
     */
    public render() {
        return (
            <div className="single-post-item">
                <figure>
                    <img className="post-img img-fluid" src="img/posts/p1.jpg" alt="" />
                </figure>
                <h3>
                    <a href="blog-details.html">It's Hurricane Season But We Are Visiting Hilton Island</a>
                </h3>
                <p>Lorem ipsum dolor sit amet, consectetur
                    adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
                    magna aliqua. Ut enim ad minim veniam,
                    quis nostrud exercitation ullamco laboris nisi ut aliquip.</p>
                <a href="blog-details.html" className="primary-btn text-uppercase mt-15">continue Reading</a>
                <div className="post-box">
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
                </div>
            </div>
        );
    }
}

export default SinglePostItem;
