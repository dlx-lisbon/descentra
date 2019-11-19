import React, { Component } from 'react';

import Sidebar from '../../Components/Sidebar';
import News from './News';
import Pagination from './Pagination';
import SinglePostItem from './SinglePostItem';


/**
 * Welcome to the main component.
 */
class Main extends Component<{}, {}> {
    /**
     * @ignore
     */
    public render() {
        return (
            <>
                <section className="banner-area">
                    <div className="container box_1170">
                        <div className="row fullscreen d-flex align-items-center justify-content-center">
                            <div className="banner-content text-center col-lg-8">
                                <h1>
                                    Charter Yacht <br />
                                    The Luxury Of Traveling
                                </h1>
                            </div>
                        </div>
                    </div>
                </section>

                <News />

                <div className="main-body section-gap mt--30">
                    <div className="container box_1170">
                        <div className="row">
                            <div className="col-lg-8 post-list">
                                <section className="post-area">
                                    <SinglePostItem />
                                    <SinglePostItem />
                                    <SinglePostItem />
                                    <SinglePostItem />

                                    <Pagination />
                                </section>
                            </div>

                            <Sidebar />
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Main;
