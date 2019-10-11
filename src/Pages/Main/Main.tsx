import React, { Component } from 'react';


/**
 * This is App.
 */
class Main extends Component<{}, {}> {
    /**
     * @ignore
     */
    public render() {
        return (
            <div>
                {/*<!-- Navigation -->*/}
                <a className="menu-toggle rounded" href="#">
                    <i className="fas fa-bars" />
                </a>
                <nav id="sidebar-wrapper">
                    <ul className="sidebar-nav">
                        <li className="sidebar-brand">
                            <a className="js-scroll-trigger" href="#page-top">Start Bootstrap</a>
                        </li>
                        <li className="sidebar-nav-item">
                            <a className="js-scroll-trigger" href="#page-top">Home</a>
                        </li>
                        <li className="sidebar-nav-item">
                            <a className="js-scroll-trigger" href="#about">About</a>
                        </li>
                        <li className="sidebar-nav-item">
                            <a className="js-scroll-trigger" href="#services">Services</a>
                        </li>
                        <li className="sidebar-nav-item">
                            <a className="js-scroll-trigger" href="#portfolio">Portfolio</a>
                        </li>
                        <li className="sidebar-nav-item">
                            <a className="js-scroll-trigger" href="#contact">Contact</a>
                        </li>
                    </ul>
                </nav>

                {/* <!-- Header --> */}
                <header className="masthead d-flex">
                    <div className="container text-center my-auto">
                        <h1 className="mb-1">Stylish Portfolio</h1>
                        <h3 className="mb-5">
                            <em>A Free Bootstrap Theme by Start Bootstrap</em>
                        </h3>
                        <a className="btn btn-primary btn-xl js-scroll-trigger" href="#about">Find Out More</a>
                    </div>
                    <div className="overlay" />
                </header>

                {/* <!-- About --> */}
                <section className="content-section bg-light" id="about">
                    <div className="container text-center">
                        <div className="row">
                            <div className="col-lg-10 mx-auto">
                                <h2>Stylish Portfolio is the perfect theme for your next project!</h2>
                                <p className="lead mb-5">
                                    This theme features a flexible,
                                    UX friendly sidebar menu and stock photos from
                                    our friends at
                                    <a href="https://unsplash.com/">Unsplash</a>!</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* <!-- Portfolio --> */}
                <section className="content-section" id="portfolio">
                    <div className="container">
                        <div className="content-section-heading text-center">
                            <h3 className="text-secondary mb-0">Portfolio</h3>
                            <h2 className="mb-5">Recent Projects</h2>
                        </div>
                        <div className="row no-gutters">
                            <div className="col-lg-6">
                                <a className="portfolio-item" href="#">
                                    <span className="caption">
                                        <span className="caption-content">
                                            <h2>Stationary</h2>
                                            <p className="mb-0">
                                                A yellow pencil with envelopes on a clean, blue backdrop!
                                            </p>
                                        </span>
                                    </span>
                                    <img className="img-fluid" src="img/portfolio-1.jpg" alt="" />
                                </a>
                            </div>
                            <div className="col-lg-6">
                                <a className="portfolio-item" href="#">
                                    <span className="caption">
                                        <span className="caption-content">
                                            <h2>Ice Cream</h2>
                                            <p className="mb-0">
                                                A dark blue background with a colored pencil, a clip, and a tiny ice
                                                cream cone!
                                            </p>
                                        </span>
                                    </span>
                                    <img className="img-fluid" src="img/portfolio-2.jpg" alt="" />
                                </a>
                            </div>
                            <div className="col-lg-6">
                                <a className="portfolio-item" href="#">
                                    <span className="caption">
                                        <span className="caption-content">
                                            <h2>Strawberries</h2>
                                            <p className="mb-0">
                                                Strawberries are such a tasty snack, especially with a little sugar on
                                                top!
                                            </p>
                                        </span>
                                    </span>
                                    <img className="img-fluid" src="img/portfolio-3.jpg" alt="" />
                                </a>
                            </div>
                            <div className="col-lg-6">
                                <a className="portfolio-item" href="#">
                                    <span className="caption">
                                        <span className="caption-content">
                                            <h2>Workspace</h2>
                                            <p className="mb-0">
                                                A yellow workspace with some scissors, pencils, and other objects.
                                            </p>
                                        </span>
                                    </span>
                                    <img className="img-fluid" src="img/portfolio-4.jpg" alt="" />
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* <!-- Footer --> */}
                <footer className="footer text-center">
                    <div className="container">
                        <ul className="list-inline mb-5">
                            <li className="list-inline-item">
                                <a className="social-link rounded-circle text-white mr-3" href="#">
                                    <i className="icon-social-facebook" />
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a className="social-link rounded-circle text-white mr-3" href="#">
                                    <i className="icon-social-twitter" />
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a className="social-link rounded-circle text-white" href="#">
                                    <i className="icon-social-github" />
                                </a>
                            </li>
                        </ul>
                        <p className="text-muted small mb-0">Copyright &copy; Your Website 2019</p>
                    </div>
                </footer>

                {/* <!-- Scroll to Top Button--> */}
                <a className="scroll-to-top rounded js-scroll-trigger" href="#page-top">
                    <i className="fas fa-angle-up" />
                </a>
            </div>
        );
    }
}

export default Main;
